import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";

export class CharMenu extends React.Component {
  state = {
    teamStat: [],
    xpPoint: 0,
    xpTable: {
      '0': 0,
      '1': 100,
      '2': 300,
      '3': 600,
      '4': 1000,
      '5': 1500,
      '6': 2100,
      '7': 2800,
      '8': 3600,
      '9': 4500,
      '10': 5500,
      '11': 6600,
      '12': 7800,
      '13': 9100,
      '14': 10500,
      '15': 12000,
      '16': 13600,
      '17': 15300,
      '18': 17100,
      '19': 19000,
      '20': 21000,
      '21': 23100,
      '22': 25300,
      '23': 27600,
      '24': 30000,
      '25': 32500,
      '26': 35100,
      '27': 37800,
      '28': 40600,
      '29': 43500,
      '30': 46500,
      '31': 49600,
      '32': 52800,
      '33': 56100,
      '34': 59500,
      '35': 63000,
      '36': 66600,
      '37': 70300,
      '38': 74100,
      '39': 78000,
      '40': 82000,
      '41': 86100,
      '42': 90300,
      '43': 94600,
      '44': 99000,
      '45': 103500,
      '46': 108100,
      '47': 112800,
      '48': 117600,
      '49': 122500,
      '50': 127500,
      '51': 132600,
      '52': 137800,
      '53': 143100,
      '54': 148500,
      '55': 154000,
      '56': 159600,
      '57': 165300,
      '58': 171100,
      '59': 177000,
      '60': 183000,
      '61': 189100,
      '62': 195300,
      '63': 201600,
      '64': 208000,
      '65': 214500,
      '66': 221100,
      '67': 227800,
      '68': 234600,
      '69': 241500,
      '70': 248500,
      '71': 255600,
      '72': 262800,
      '73': 270100,
      '74': 277500,
      '75': 285000,
      '76': 292600,
      '77': 300300,
      '78': 308100,
      '79': 316000,
      '80': 324000,
      '81': 332100,
      '82': 340300,
      '83': 348600,
      '84': 357000,
      '85': 365500,
      '86': 374100,
      '87': 382800,
      '88': 391600,
      '89': 400500,
      '90': 409500,
      '91': 418600,
      '92': 427800,
      '93': 437100,
      '94': 446500,
      '95': 456000,
      '96': 465600,
      '97': 475300,
      '98': 485100,
      '99': 495000
    },
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
    const { teamStat, xpTable, xpPoint } = this.state;
    const char = teamStat.find((char) => char.id === +i);
    if (char.exp >= xpTable[char.lvl]) {
      char.exp -= xpTable[char.lvl];
      char.lvl += 1;
      this.setState({ teamStat, xpPoint: xpPoint +5 }, () => {
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
    char.stat = char.stat + extraStat;
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
    char.mp = char.mp + extraMp;
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
    let condicao = op === 'add' ? (xpPoint > 0) : (oldChar[stat] < char[stat]);
    if(condicao) {
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

  saveEdit = () => {
    const { teamStat } = this.state;
    localStorage.setItem('teamStat', JSON.stringify(teamStat));
    this.setState({teamStat});
  }

  render() {
     const { match: { params: { id } } } = this.props;
     const { teamStat, xpPoint } = this.state;
     const char = teamStat.find((char) => char.id === +id);
     const myStyle = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
     }
     const buttons = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
     }
     const squircle = {
      width: 50 + "px",
      height: 50 + "px",
      borderRadius: `calc(${50}px * 0.316 + 0.5px)`,
      fontSize: '30px',
      color: '#fff',
      backgroundColor: '#333',
      padding: '8px 16px',
      border: 'none',
      backgroundImage: 'linear-gradient(to bottom, #333, #222)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      cursor: "pointer"
     }
     const saveButton = {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      width: '143px',
      backgroundColor: xpPoint !== 0 ? '#D3D3D3' : '#333',
      border: 'none',
      borderRadius: '5px',
      marginLeft: '3px', 
      padding: '8px 12px',
      cursor: 'pointer',
      alignSelf: 'center',
      color: xpPoint !== 0 ? 'black' : 'white',
    };
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
                <CustomButton name={ char.id } onClick={ () => this.spendExp(id) } label={ 'SPEND EXP' } />
                <GenericChar statSheet={ char } />
              </div>            
            }})}
            <div>
            <h3 style={{ textAlign: 'center' }}>{`Stat Points: ${xpPoint}`}</h3>
            <table style={{ textAlign: 'center' }}>
              <tbody>
                <tr>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.changeStats("hp", 'add')}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3 style={ { color: 'red' } }>{char.hp}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.changeStats("hp", 'remove')}>
                      -
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.changeStats("stat", 'add')}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3>{char.stat}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.changeStats("stat", 'remove')}>
                      -
                    </button>
                  </td>
                </tr>
                { char && char.mp !==0 &&
                <tr>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.changeStats("mp", 'add')}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3 style={ { color: 'blue' } }>{char.mp}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.changeStats("mp", 'remove')}>
                      -
                    </button>
                  </td>
                </tr> }
                <tr>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.changeStats("speed", 'add')}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3>{char.speed}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.changeStats("speed", 'remove')}>
                      -
                    </button>
                  </td>
                </tr>
                </tbody>
                </table>
                <button type="button" style={saveButton} disabled={ xpPoint !== 0 } onClick={ this.saveEdit }> SAVE </button>                
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
