import React from 'react';
import { Mage } from '../Mage';
import { Warrior } from '../Warrior';
import { RandEnemy } from '../RandEnemy';

export class GenericChar extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { classe } = statSheet;
    return (
      <div>
        { classe === 'Mage' && <Mage statSheet={ statSheet }></Mage> }
        { classe === 'Warrior' && <Warrior statSheet={ statSheet }></Warrior> }
        { classe === 'RandEnemy' && <RandEnemy statSheet={ statSheet }></RandEnemy> }
      </div>
    )
  }
}