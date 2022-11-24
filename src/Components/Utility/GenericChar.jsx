import React from 'react';
import { Mage } from '../Characters/Mage';
import { Warrior } from '../Characters/Warrior';
import { RandEnemy } from '../Characters/RandEnemy';

export class GenericChar extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { classe } = statSheet;
    let Tag;
    switch (classe) {
      case 'Warrior':
        Tag = Warrior;
        break;
      case 'Mage':
        Tag = Mage;
        break;
      case 'enemy':
        Tag = RandEnemy;
        break;
    }
    return (
      <div>
        <Tag statSheet={ statSheet } />
      </div>
    )
  }
}