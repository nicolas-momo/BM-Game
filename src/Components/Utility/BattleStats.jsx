import React from 'react';
import PropTypes from "prop-types"
import { CustomButton } from './CustomButton';
import { withRouter } from 'react-router-dom';
import { ReactComponent as CoinStack } from '../../Styles/svgs/coinStack.svg'

export class BattleStats extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
  const { turnStats, teamList, moneyEarned, expEarned, enemyKilled, allyKilled } = this.props;

  const names = teamList.map(el => { return { id: el.id, name: el.name} } )

  if (turnStats.length > 0) {
    turnStats.forEach(char => {
    const turn = names.find(el => (Number(el.id) === Number(char.id)))
    char.name = turn.name
    })
  }

  const coverScreen = { 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 50,
  }
  const boxStyle = {
    position: 'relative',
    width:'27rem',
    height: '25rem',
    userSelect: 'none',
    backgroundColor: 'white',
    borderRadius: '3rem',
    border: '5px solid',
    textAlign: 'left',
  }
  const beforeStyle = {
    position: 'relative',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '5px',
    backgroundColor: 'black',
  };
  const expStyle = {
    background: 'linear-gradient(to bottom, #2cfc03, #30b017)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  return (
    <div style={coverScreen}>
      <div style={boxStyle}>
        { enemyKilled && <h1 style={{ textAlign: 'center' }}>Victory!</h1>}
        { allyKilled && <h1 style={{ textAlign: 'center' }}>Defeat!</h1>}
        <div style={beforeStyle}></div>
        <div style={{position:'relative', display: 'grid',gridTemplateColumns: '1fr 1fr', alignItems: 'center',  }}> 
          <div style={{display: 'flex', position: 'absolute', left:'10%', top:'10%', flexDirection:'row', marginTop: '5px', marginBottom:'-5px'}}>
            <CoinStack style={{ width: '50px', height: '50px' }}/>
            <h2>{`: ${moneyEarned}`}</h2>
          </div>
          <div style={{display: 'flex', position: 'absolute', right:'10%', top:'10%', flexDirection:'row', marginTop: '5px', marginBottom:'-5px'}}>
            <h2 style={expStyle}>EXP </h2>
            <h2>{`: ${expEarned}`}</h2>
          </div>
        </div>
        <div style={{position: 'absolute', bottom: '0'}}>
          { turnStats.map((char, i) =>
          <div key={char.id + i}>
            <h3 style={{marginLeft: '14px'}}>{`${char.name} | Dmg: ${char.totalDmg}`} {char.totalHeal ? `Heal: ${char.totalHeal}` : ''}</h3>
          </div>
          )}
          <div style={{ textAlign: 'center',position: 'relative', left: '70%' }}>
            <CustomButton onClick={ this.goHome } label={ 'Home' } />
          </div>
        </div>
      </div>
    </div>
  );
  }
}

BattleStats.propTypes = {
  turnStats: PropTypes.array,
  expEarned: PropTypes.number,
  moneyEarned: PropTypes.number,
  enemyKilled: PropTypes.string,
  allyKilled: PropTypes.string,
}.isRequired;


export default withRouter(BattleStats);
