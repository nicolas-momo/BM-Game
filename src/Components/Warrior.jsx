import React from "react";
import warriorImage from "../Images/warrior.png"

export const Warrior = (props) => {
  return (
      <>
        <h3>Health: {props.hp},</h3>
        <h3>Strength: {props.str},</h3>
        <h3>Rage: {props.mp},</h3>
        <h3>Damage: {props.dmg},</h3>
        <img src={warriorImage} alt="Warrior"></img>
      </>
);
}