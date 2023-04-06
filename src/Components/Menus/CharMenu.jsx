import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from '../Utility/CustomButton';
import { GenericChar } from '../Utility/GenericChar';
import { xpData } from '../../Data';

export class CharMenu extends React.Component {
  state = {
    teamStat: [],
    xpPoint: 0,
    renameText: '',
    editingName: false,
    spendingExp: false,
  };

  componentDidMount() {
    this.createAllies();
  }

  createAllies = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    this.setState({ teamStat: allyTeam });
  }

  startBattle = () => {
    const { history } = this.props;
    history.push('/battle');
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  goTavern = () => {
    const { history } = this.props;
    history.push('/tavern');
  }
  
  spendExp = (i) => {
    const { teamStat, xpPoint } = this.state;
    const xpTable = xpData;
    const char = teamStat.find((char) => char.id === +i);
    if (char.exp >= xpTable[char.lvl]) {
      char.exp -= xpTable[char.lvl];
      char.lvl += 1;
      this.setState({ teamStat, xpPoint: xpPoint +5, spendingExp: true }, () => {
      });
    }
  }

  changeHp = (char, op) => {
    let extraHp;
    switch (char.classe) {
      case 'Warrior':
        extraHp = 12;
        break;
      case 'Mage':
        extraHp = 8;
        break;
      case 'Paladin':
        extraHp = 15;
        break;
      default:
        console.log('ERRO_CHANGE_HP');
        break;
    }
    if (op === 'remove') extraHp = -1 * extraHp;
    char.hp = char.hp + extraHp;
    char.maxHp = char.maxHp + extraHp;
  }
  changeStat = (char, op) => {
    let extraStat;
    switch (char.classe) {
      case 'Warrior':
        extraStat = 1.2;
        break;
      case 'Mage':
        extraStat = 1.5;
        break;
      case 'Paladin':
        extraStat = 1;
        break;
      default:
        console.log('ERRO_CHANGE_STAT');
        break;
    }
    if (op === 'remove') extraStat = -1 * extraStat;
    char.stat = (char.stat * 10 + extraStat * 10)/10;
  }
  changeMp = (char, op) => {
    let extraMp;
    switch (char.classe) {
      case 'Warrior':
        extraMp = 0;
        break;
      case 'Mage':
        extraMp = 10;
        break;
      case 'Paladin':
        extraMp = 5;
        break;
      default:
        console.log('ERRO_CHANGE_MP');
        break;
    }
    if (op === 'remove') extraMp = -1 * extraMp;
    char.mp = (char.mp * 10 + extraMp * 10)/10;
    char.maxMp = char.maxMp + extraMp;
  }
  changeSpeed = (char, op) => {
    let extraSpeed;
    switch (char.classe) {
      case 'Warrior':
        extraSpeed = 0.5;
        break;
      case 'Mage':
        extraSpeed = 0.3;
        break;
      case 'Paladin':
        extraSpeed = 0.2;
        break;
      default:
        console.log('ERRO_CHANGE_SPEED');
        break;
    }
    if (op === 'remove') extraSpeed = -1 * extraSpeed;
    const speed = +(char.speed + extraSpeed).toFixed(1);
    char.speed = speed;
  }

  changeStats = (stat, op) => {
    const { xpPoint, teamStat } = this.state;
    const { match: { params: { id } } } = this.props;
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    const char = teamStat.find((char) => char.id === +id);
    const oldChar = allyTeam.find((char) => char.id === +id);
    let condition = op === 'add' ? (xpPoint > 0) : (oldChar[stat] < char[stat]);
    if(condition) {
      switch (stat) {
        case 'hp': this.changeHp(char, op);
          break;

        case 'stat':  this.changeStat(char, op);
          break;

        case 'mp':  this.changeMp(char, op);
          break;

        case 'speed':  this.changeSpeed(char, op);
          break;
      
        default:
          console.log('ERRO_CHANGE_STATS');
          break;
      }
      this.setState({teamStat});
      let newXp = op === 'add' ? -1 : 1;
      this.setState({ xpPoint: xpPoint + newXp });
    }
  }

  changeName = (char) => {
    const { text, teamStat } = this.state;
    char.name = text
    localStorage.setItem('teamStat', JSON.stringify(teamStat));
    this.setState({ text:'', teamStat, editingName: false });
  }

  saveEdit = () => {
    const { teamStat } = this.state;
    localStorage.setItem('teamStat', JSON.stringify(teamStat));
    this.setState({ teamStat, spendingExp: false});
  }

  handleNameChange = (event) => {
    const typing = event.target.value;
    if (typing.length > 0) {
      this.setState({ text: typing, editingName: true });
    } else {
      this.setState({ text: typing, editingName: false });
    }
  }

  render() {
     const { match: { params: { id } } } = this.props;
     const { teamStat, xpPoint, text, editingName, spendingExp } = this.state;
     const char = teamStat.find((char) => char.id === +id);
     const xpTable = xpData;
     let toNextLvl = 0;
     if (char) { toNextLvl = xpTable[char.lvl] }    

     const myStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
     }
     const buttons = {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
     }
     const squircle = {
      width: '50px',
      height: '50px',
      borderRadius: `calc(${50}px * 0.316 + 0.5px)`,
      fontSize: '30px',
      color: '#fff',
      backgroundColor: '#333',
      border: 'none',
      backgroundImage: 'linear-gradient(to bottom, #333, #222)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer'
     }
     const renameButton = {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      width: '141px',
      backgroundColor: xpPoint !== 0 || spendingExp ? '#D3D3D3' : '#333',
      border: 'none',
      borderRadius: '5px',
      marginLeft: '3px', 
      padding: '8px 12px',
      cursor: 'pointer',
      color: xpPoint !== 0 || spendingExp  ? 'black' : 'white',
      transition: 'background-color 0.33s ease-in-out, color 0.23s ease-in-out',
    }
     const saveButton = {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      width: '141px',
      backgroundColor: xpPoint !== 0 ? '#D3D3D3' : '#333',
      border: 'none',
      borderRadius: '5px',
      marginLeft: '3px', 
      padding: '8px 12px',
      cursor: 'pointer',
      color: xpPoint !== 0 ? 'black' : 'white',
      transition: 'background-color 0.33s ease-in-out, color 0.23s ease-in-out',
    }
    const spendExpButton = {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      width: '143px',
      backgroundColor: editingName ? '#D3D3D3' : '#333',
      border: 'none',
      borderRadius: '5px',
      marginLeft: '3px', 
      padding: '8px 12px',
      cursor: 'pointer',
      color: editingName ? 'black' : 'white',
      transition: 'background-color 0.33s ease-in-out, color 0.23s ease-in-out',
    }
    const inputStyle = {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      width: '127px',
      height: '40px',
      backgroundColor: 'white',
      border: 'solid',
      borderRadius: '5px',
      marginTop:'5px',
      margin: '2px',
      padding: '4px',
      cursor: 'text',
      color: 'black',
      transition: 'background-color 0.33s ease-in-out',
    }
      return (
        <>
          <div> 
            <div style={ buttons }>
              <CustomButton onClick={ this.goHome } label={ 'Home' } />
              <CustomButton onClick={ this.goTavern } label={ 'TAVERN' } />
              <CustomButton onClick={ this.startBattle } label={ 'BATTLE!' } />
            </div>
            <div style={ myStyle }>
            
            { teamStat.map((char) => {
              if(char.id === +id) {
                return <div key={ char.id }>
                <button style={renameButton} type='button' disabled={ xpPoint !== 0 || spendingExp } onClick={ () => this.changeName(char) }> RENAME</button>
                <button style={spendExpButton} type='button' disabled={ editingName } name={ char.id } onClick={ () => this.spendExp(id) }>SPEND EXP</button>
                <div style={{display: 'flex'}}>
                  <input style={inputStyle} type='text' placeholder='Enter name here' value={text || ''} onChange={this.handleNameChange} />
                <h3 style={inputStyle} >{`EXP to LVL: ${toNextLvl}`} </h3>
                </div>
                <GenericChar statSheet={ char } />
                </div>
              }})}
            <div>

            <h3 style={{ textAlign: 'center' }}>{`Stat Points: ${xpPoint}`}</h3>
            <table style={{ textAlign: 'center' }}>
              <tbody>
                <tr>
                  <td>
                    <button style={squircle} type='button' onClick={() => this.changeStats('hp', 'add')}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3 style={ { color: 'red' } }>{char.hp}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type='button' onClick={() => this.changeStats('hp', 'remove')}>
                      -
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button style={squircle} type='button' onClick={() => this.changeStats('stat', 'add')}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3 style={ { color: '#9b00a6' } }>{char.stat}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type='button' onClick={() => this.changeStats('stat', 'remove')}>
                      -
                    </button>
                  </td>
                </tr>
                { char && char.mp !==0 &&
                <tr>
                  <td>
                    <button style={squircle} type='button' onClick={() => this.changeStats('mp', 'add')}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3 style={ { color: '#03f7ff' } }>{char.mp}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type='button' onClick={() => this.changeStats('mp', 'remove')}>
                      -
                    </button>
                  </td>
                </tr> }
                <tr>
                  <td>
                    <button style={squircle} type='button' onClick={() => this.changeStats('speed', 'add')}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3 style={ { color: '#fad905' } }>{char.speed}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type='button' onClick={() => this.changeStats('speed', 'remove')}>
                      -
                    </button>
                  </td>
                </tr>
                </tbody>
                </table>
                <button type='button' style={saveButton} disabled={ xpPoint !== 0 } onClick={ this.saveEdit }> SAVE </button>                
              </div>
            </div>
            </div>
        </>
    );
  }
}

CharMenu.propTypes = {
  history: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }),
}.isRequired;
