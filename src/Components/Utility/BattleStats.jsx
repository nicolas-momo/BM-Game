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
  const { turnStats, teamList, moneyEarned, expEarned, enemyKilled, allyKilled, resetState } = this.props;

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
    backgroundColor: 'rgba(0,0,0,0.75)',
    zIndex: 50,
  }
  const boxStyle = {
    position: 'relative',
    width:'30rem',
    height: '32rem',
    userSelect: 'none',
    backgroundColor: '#e2e2e2',
    borderRadius: '3rem',
    border: '5px solid rgba(0, 0, 0, 0.5)',
    textAlign: 'left',
  }
  const beforeStyle = {
    position: 'relative',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '5px',
    backgroundColor: '#d1d1d1',
  };
  const expStyle = {
    fontSize:'50px',
    color: '#2cfc03',
    margin: 'auto',
    textShadow: '-2px 0 #30b017, 0 2px #2cfc03, 2px 0 black, 0 -3px black',
    fontFamily: 'Roboto Mono, monospace',
  };
  const victoryStyle = {
    fontSize: '50px',
    textAlign: 'center',
    background: 'linear-gradient(to bottom, #2cfc03, #30b017)',
    margin: '20px',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '-2px 0 #30b017, 0 2px #2cfc03, 2px 0 black, 0 -1px black'
  };
  const defeatStyle = {
    fontSize: '50px',
    textAlign: 'center',
    margin: '20px',
    background: 'linear-gradient(to bottom, #f52a2a, #a61f1f)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
     textShadow: '-2px 0 #f52a2a, 0 2px #a61f1f, 2px 0 black, 0 -2px black'
  };

  return (
    <div style={coverScreen}>
      <div style={boxStyle}>
        { enemyKilled && <h1 style={victoryStyle}>VICTORY</h1>}
        { allyKilled && <h1 style={defeatStyle}>DEFEAT</h1>}
        <div style={beforeStyle}></div>
        <div style={{position:'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', height:'25%', width:'100%' }}> 
          <div style={{ display: 'flex', position: 'absolute', left:'5%', top:'10%', flexDirection:'column', marginTop: '5px', marginBottom:'-5px'}}>
            <CoinStack style={{ width: '60px', height: '60px', marginLeft:'20px' }}/>
            <h2 style={{ margin:'auto', textAlign:'left', fontSize:'35px', textShadow: '-2px 0 #d6cd8b, 0 2px #fff291, 1px 0 black, 0 -1px black',
              fontFamily: 'Roboto Mono, monospace'}}>{`+${moneyEarned}`}</h2>
          </div>
          <div style={{width:'200px', height:'100px',display: 'flex', position: 'absolute', right:'0', top:'10%', flexDirection:'column', marginTop: '5px', marginBottom:'-5px'}}>
            <h2 style={expStyle}>EXP</h2>
            <h2 style={{ margin:'auto', fontSize:'35px', textShadow: '-2px 0 #30b017, 0 2px #2cfc03, 1px 0 black, 0 -1px black',
              fontFamily: 'Roboto Mono, monospace'}}>{`+${expEarned}`}</h2>
          </div>
        </div>
          <div style={{ position: 'relative', textAlign:'center', width:'100%', height:'50%' }}>
            <table style={{ border: '3px solid rgba(0, 0, 0, 0.5)', position: 'absolute', left: 30, top: '10%', }}>
              <thead style={{ backgroundColor: '#C0C1B7', fontSize: '30px', fontFamily: 'Roboto Mono, monospace' }}>
                <tr>
                  <th style={{ position: 'sticky', top: 0, left:'0', padding: '10px' }}>Name</th>
                  <th style={{ position: 'sticky', top: 0, padding: '10px' }}>Damage</th>
                  <th style={{ position: 'sticky', top: 0, left:'0', padding: '10px', marginRight:'50px' }}>Healing</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: '#d1d1d1', fontSize: '20px', fontFamily: 'Roboto Mono, monospace' }}>
                {turnStats.map((char, i) => (
                  <tr key={char.id + i}>
                    <td>{char.name}</td>
                    <td>{char.totalDmg}</td>
                    <td>{char.totalHeal || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <div style={{ textAlign: 'center',position: 'absolute', left: '8%', bottom: '3%' }}>
            <CustomButton onClick={ this.goHome } label={ 'Home' } />
            <CustomButton onClick={ () => resetState() } label={ 'Continue' } />
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
  resetState: PropTypes.func,
}.isRequired;


export default withRouter(BattleStats);
