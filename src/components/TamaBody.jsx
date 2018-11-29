import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Background from './assets/background.png';
import TamaDefault from './assets/tamaDefault.png';
import TamaSleep from './assets/tamaSleep.png';
import Stats from './Stats';
import PoopImg from './assets/poop.png';
import GhostImg from './assets/ghost.png';

function TamaBody(props) {
  const defaultStyle = 
    <style jsx>{`
      .tama-body {
        background-color: #f8f8f8;
        background-image: url("${Background}");
        background-size: 350px;
        background-repeat: no-repeat;
        height: 210px;
      }
      .tama-sprite {
        width: 100px;
        margin: 90px 0 0 120px;
      }
      .poop-img {
        width: 100px;
      }
    
    `}</style>;
  if(props.tamagotchi.displayStats){
    return(
      <div className='tama-body'>
        <Stats tamagotchi={props.tamagotchi}/>
      </div>
    );
  } else if (props.tamagotchi.isDead) {
    return(
      <div className='tama-body'>
        {defaultStyle}
        <img className='tama-sprite' src={GhostImg}/>
      </div>
    )
  } else if (props.tamagotchi.isSleeping) {
    return(
      <div className='tama-body'>
        {defaultStyle}
        <img className='tama-sprite' src={TamaSleep}/>
        {props.tamagotchi.isPoopy ? (
          <img className='poop-img' src={PoopImg}/>
        ) : (
          <img />
        )}
      </div>
    );
  } else {
    return(
      <div className='tama-body'>
        {defaultStyle}
        <img className='tama-sprite' src={TamaDefault} />
        {props.tamagotchi.isPoopy ? (
          <img className='poop-img' src={PoopImg}/>
        ) : (
          <img />
        )}
      </div>
    );
  }
}

TamaBody.propTypes = {
  tamagotchi: PropTypes.object
};

export default TamaBody;