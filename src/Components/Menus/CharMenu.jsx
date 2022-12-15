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

  addStats = (stat) => {
    const { xpPoint, teamStat } = this.state;
    const { match: { params: { id } } } = this.props;
    const char = teamStat.find((char) => char.id === +id);
    if(xpPoint > 0) {
      switch (stat) {
        case 'hp': char[stat] = char[stat] + 10;
          break;

        case 'stat':  char[stat] = char[stat] + 1;
          break;

        case 'mp':  char[stat] = char[stat] + 5;
          break;

        case 'speed':  char[stat] = char[stat] + 0.5;
          break;
      
        default:
          break;
      }
      this.setState({teamStat});
      this.setState({ xpPoint: xpPoint -1 });
    }
  }

  reduceStats = (stat) => {
    const { xpPoint, teamStat } = this.state;
    const { match: { params: { id } } } = this.props;
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    const char = teamStat.find((char) => char.id === +id);
    const oldChar = allyTeam.find((char) => char.id === +id);
    if(oldChar[stat] !== char[stat]) {
      switch (stat) {
        case 'hp': char[stat] = char[stat] - 10;
          break;

        case 'stat':  char[stat] = char[stat] - 1;
          break;

        case 'mp':  char[stat] = char[stat] - 5;
          break;

        case 'speed':  char[stat] = char[stat] - 0.5;
          break;
      
        default:
          break;
      }
      this.setState({teamStat});
      this.setState({ xpPoint: xpPoint +1 });
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
      backgroundColor: xpPoint !== 0 ? '#D3D3D3' : '#333',
      border: 'none',
      borderRadius: '5px',
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
                <div onClick={ () => this.addChar(char) }>
                <GenericChar statSheet={ char } />
                </div>   
              </div>            
            }})}
            <div>
            <h3 style={{ textAlign: 'center' }}>{`Stat Points: ${xpPoint}`}</h3>
            <table style={{ textAlign: 'center' }}>
              <tbody>
                <tr>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.addStats("hp")}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3>{char.hp}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.reduceStats("hp")}>
                      -
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.addStats("stat")}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3>{char.stat}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.reduceStats("stat")}>
                      -
                    </button>
                  </td>
                </tr>
                { char && char.mp !==0 &&
                <tr>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.addStats("mp")}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3>{char.mp}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.reduceStats("mp")}>
                      -
                    </button>
                  </td>
                </tr> }
                <tr>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.addStats("speed")}>
                      +
                    </button>
                  </td>
                  <td>
                    {char && <h3>{char.speed}</h3>}
                  </td>
                  <td>
                    <button style={squircle} type="button" onClick={() => this.reduceStats("speed")}>
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
