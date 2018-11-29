import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './assets/logo.png';
import Home from './Home';
import TamaDetail from './TamaDetail';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTama: 
      {
        name: 'Melagotchi',
        foodLevel: 100,
        sleepLevel: 50,
        isSleeping: false,
        happiness: 100,
        isSick: false,
        isPoopy: false,
        displayStats: false,
        weight: '1 lbs',
        age: 0,
        isBad: false,
        disciplineLevel: 50,
        alert: false,
        isDead: false,
        id: 0
      }
    };
    this.handleNewTama = this.handleNewTama.bind(this);
    this.handleFeed = this.handleFeed.bind(this);
    this.handleSleep = this.handleSleep.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleHeal = this.handleHeal.bind(this);
    this.handleFlush = this.handleFlush.bind(this);
    this.handleStats = this.handleStats.bind(this);
    this.handleDiscipline = this.handleDiscipline.bind(this);
  }

  componentDidMount() {
    this.foodLevelInterval = setInterval(() => this.foodLevelTime(), 800);
    this.sleepLevelInterval = setInterval(() => this.sleepLevelTime(), 500);
    this.playLevellInterval = setInterval(() => this.playLevelTime(), 200);
    this.ageInterval = setInterval(() => this.ageTime(), 10000);
    this.checkAlertInterval  = setInterval(() => {
      let tama = this.state.masterTama;
      if(tama.foodLevel < 25 || tama.sleepLevel <= 0 || tama.happiness < 25 || tama.isSick || tama.isPoopy || tama.isBad) {
        tama.alert = true;
      } else {
        tama.alert = false;        
      }
    }, 1000);
    this.checkDeathInterval = setInterval(() => {
      let newTama = this.state.masterTama;
      if(newTama.foodLevel <= 0 || newTama.happiness <= 0) {
        newTama.isDead = true;
        clearInterval(this.foodLevelInterval);
        clearInterval(this.sleepLevelInterval);
        clearInterval(this.playLevellInterval);
        clearInterval(this.ageInterval);
        clearInterval(this.checkDeathInterval);
        this.setState({masterTama: newTama});
      }
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.foodLevelInterval);
    clearInterval(this.sleepLevelInterval);
    clearInterval(this.playLevellInterval);
  }

  foodLevelTime() {
    let newTama = this.state.masterTama;
    newTama.foodLevel--;
    this.setState({masterTama: newTama});
  }

  sleepLevelTime() {
    let newTama = this.state.masterTama;
    newTama.sleepLevel--;
    this.setState({masterTama: newTama});
  }

  playLevelTime() {
    let newTama = this.state.masterTama;
    newTama.happiness--;
    this.setState({masterTama: newTama});
  }
  
  ageTime() {
    let newTama = this.state.masterTama;
    newTama.age++;
    this.setState({masterTama: newTama});
  }
  
  handleNewTama(newTamaName) {
    let newTama = this.state.masterTama;
    newTama.name = newTamaName;
    this.setState({masterTama: newTama});
  }

  handleFeed() {
    let newTama = this.state.masterTama;
    if (!newTama.isDead && !newTama.isSleeping) {
      if (newTama.foodLevel < 75) {
        newTama.foodLevel += 25;
      } else if (newTama.foodLevel <= 100) {
        newTama.foodLevel = 100;
      }
      setTimeout(() => {
        newTama.isPoopy = true;
        this.sickCountdown();
      }, 30000);
      this.setState({masterTama: newTama});
    }
  }

  sickCountdown() {
    let newTama = this.state.masterTama;
    if (newTama.isPoopy) {
      setTimeout(() => {
        if (newTama.isPoopy) {
          newTama.isSick = true;
          setTimeout(() => {
            if (newTama.isSick) 
              newTama.isDead = true;
          }, 60000);
        }
      }, 60000);
    }
  }

  handleSleep() {
    let newTama = this.state.masterTama;
    if (!newTama.isDead) {
      if (!newTama.isSleeping) {
        newTama.isSleeping = true;
        clearInterval(this.sleepLevelInterval);
        let sleepingInterval = setInterval(() => { 
          if (newTama.sleepLevel < 100) {
            newTama.sleepLevel += 1;
            this.setState({masterTama: newTama});
          } else {
            clearInterval(sleepingInterval);
            this.sleepLevelInterval = setInterval(() => this.sleepLevelTime(), 500);
            newTama.isSleeping = false;
          }
        }, 1000);
      }
    }
  }

  handlePlay() {
    let newTama = this.state.masterTama;
    if (!newTama.isDead && !newTama.isSleeping) {
      if (newTama.happiness < 75) {
        newTama.happiness += 25;
      } else if (newTama.happiness <= 100) {
        newTama.happiness = 100;
      } 
      this.setState({masterTama: newTama});
    }
  }

  handleSick() {
    let newTama = this.state.masterTama;
    newTama.isSick = false;
    this.setState({masterTama: newTama});
  }

  handleHeal() {
    let newTama = this.state.masterTama;
    newTama.isSick = false;
    this.setState({masterTama: newTama});
  }

  handleFlush() {
    let newTama = this.state.masterTama;
    newTama.isPoopy = false;
    this.setState({masterTama: newTama});
  }

  handleStats() {
    let newTama = this.state.masterTama;
    newTama.displayStats ? newTama.displayStats = false : newTama.displayStats = true;
    this.setState({masterTama: newTama});
  }

  handleDiscipline() {
    let newTama = this.state.masterTama;
    newTama.isBad ? (
      newTama.discipline += 20, 
      newTama.isBad = false
    ) : (
      newTama.displineLevel -= 5
    );
    this.setState({masterTama: newTama});
  }
  
  render() {
    return (
      <div className='container'>
        <style jsx>{`
          font-family: Helvetica;

          #logo {
            width: 100%;
          }
        `}</style>
        <img src={logo} id='logo'/>
        <Switch>
          <Route exact path='/' render={() => <Home onNewTama = {this.handleNewTama} tamagotchi={this.state.masterTama}/>} />
          <Route path='/detail' render={() => <TamaDetail 
            tamagotchi={this.state.masterTama}
            onFeed={this.handleFeed}
            onSleep={this.handleSleep}
            onPlay={this.handlePlay}
            onHeal={this.handleHeal}
            onFlush={this.handleFlush}
            onStats={this.handleStats}
            onDiscipline={this.handleDiscipline}
          />} />
        </Switch>
      </div>
    );
  }
}

export default App;
