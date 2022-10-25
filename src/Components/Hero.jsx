import React from "react";
import { useState } from 'react';

export const Hero = (props) => {
  const [counter, setCounter] = useState(props.hp);
    return (
        <>
        <button onClick={ () => setCounter((prevCount) => prevCount -5)}>-</button>
          <h3>Health: {counter},</h3>
          <h3>Intelligence: {props.int},</h3>
          <h3>Mana: {props.mp},</h3>
          <h3>Damage: {props.dmg},</h3>
          <img src="./Images/mage" alt=""></img>
        </>
  );
}