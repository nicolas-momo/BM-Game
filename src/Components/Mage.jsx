import React from "react";
import mageImage from "../Images/mage.png"

export const Mage = (props) => {
    return (
        <>
          <h3>Health: {props.hp},</h3>
          <h3>Intelligence: {props.int},</h3>
          <h3>Mana: {props.mp},</h3>
          <h3>Damage: {props.dmg},</h3>
          <img src={mageImage} alt="Mage"></img>
        </>
  );
}