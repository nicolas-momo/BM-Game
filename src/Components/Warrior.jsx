import React from "react";
import warriorImage from "../Images/warrior.png"

export const Warrior = (props) => {
  return (
      <>
        <h3>Health: {props.hp},</h3>
        <h3>Intelligence: {props.int},</h3>
        <h3>Mana: {props.mp},</h3>
        <h3>Damage: {props.dmg},</h3>
        <img src={warriorImage} alt="Mage"></img>
      </>
);
}