import React from 'react';
import PropTypes from "prop-types"
import { Mage } from '../Characters/Mage';
import Warrior from '../Characters/Warrior';
import { Paladin } from '../Characters/Paladin';
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
      case 'Paladin':
        Tag = Paladin;
        break;
      case 'enemy':
        Tag = RandEnemy;
        break;
      default : console.log('ERROR CLASS RENDER')
        break;
    }
    return (
      <div style={{ display: 'flex' }}>
        <Tag statSheet={ statSheet } />
      </div>
    )
  }
}

GenericChar.propTypes = {
  statSheet: PropTypes.object,
}

