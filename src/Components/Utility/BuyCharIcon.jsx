import React from 'react';
import PropTypes from "prop-types"
import { ReactComponent as WizHat } from '../../Styles/svgs/wizardHat.svg'
import { ReactComponent as WarriorHelmet } from '../../Styles/svgs/warriorHelmet.svg'
import { ReactComponent as PaladinShield } from '../../Styles/svgs/paladinShield.svg'

export class BuyCharIcon extends React.Component {
  render() {
    const { classe } = this.props;
    let Icon;
    switch (classe) {
      case 'Warrior':
        Icon = WarriorHelmet;
        break;
      case 'Mage':
        Icon = WizHat;
        break;
      case 'Paladin':
        Icon = PaladinShield;
        break;
      default : console.log('ERROR CLASS RENDER')
        break;
    }
    return (
      <div style={{ display: 'grid', width:'200px' }}>
        <h2>Gold Cost: 150 </h2>
        <Icon style={{ width: '200px', filter: 'drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.5))'}} />
      </div>
    )
  }
}

BuyCharIcon.propTypes = {
  classe: PropTypes.string,
}.isRequired

