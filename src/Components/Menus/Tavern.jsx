import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";

export class Tavern extends React.Component {
  state = {
    teamStat: [],
    baseChars: [],
    tavernTeam: false,
    savedId: null,
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

  addChar = (char) => {
    const { teamStat } = this.state;
    const team = [...teamStat, char ];
    let charList = JSON.parse(localStorage.getItem('charList'));
    charList.forEach((element, index) => {
      if (element.id === char.id) {
        charList.splice(index, 1);
      }
    });
    if (team.length <= 3 ) { 
      localStorage.setItem('teamStat', JSON.stringify(team));
      localStorage.setItem('charList', JSON.stringify(charList));
      this.setState({ teamStat: team });
    }
    if (team.length === 3) { this.setState({ tavernTeam: false }) }
  }

  deleteChar = (char) => {
    let charList = JSON.parse(localStorage.getItem('charList'));
    charList.forEach((element, index) => {
      if (element.id === Number(char.id)) {
        charList.splice(index, 1);
      }
    });
    localStorage.setItem('charList', JSON.stringify(charList));
    this.setState({ savedId: char.id });
  }

  clickDelete = (char) => {
    this.setState({ savedId: char.id });
  }

  addBaseChar = (char) => {
    const { teamStat } = this.state;
    const charList = JSON.parse(localStorage.getItem('charList'));
    const teamIds = teamStat.map((hero) => hero.id);
    const listIds = charList.map((hero) => hero.id);
    teamIds.push(...listIds)
    const newId = teamIds.reduce((acc, val) => {
      acc = ( acc === undefined || val > acc) ? val : acc
      return acc;
    }, 0);
    char.id = newId + 1;
    const team = [...teamStat, char ];
    if (team.length <= 3 ) { 
      localStorage.setItem('teamStat', JSON.stringify(team));
      this.setState({ teamStat: team });
    }
    if (team.length === 3) { this.setState({ tavernTeam: false }) }
  }

  createAllies = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    const baseTeam = JSON.parse(localStorage.getItem('baseList'));
    this.setState({ teamStat: allyTeam, baseChars: baseTeam });
  }

  startBattle = () => {
    const { history } = this.props;
    history.push('/battle');
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  rmvChar = (i) => {
    const { teamStat } = this.state;
    if (teamStat.length > 1) {
    let charList = JSON.parse(localStorage.getItem('charList'));
    charList.push(teamStat[i]);
    localStorage.setItem('charList', JSON.stringify(charList));
    teamStat.splice(i, 1);
    localStorage.setItem('teamStat', JSON.stringify(teamStat));
    this.setState({ teamStat });
    } else {
      alert('NO')
    }
  }

  showList = () => {
    const { tavernTeam } = this.state;
    this.setState({ tavernTeam: !tavernTeam });
  }

  spendExp = (i) => {
    const { teamStat, xpTable } = this.state;
    const char = teamStat[i];
    if (char.exp >= xpTable[char.lvl]) {
      char.exp -= xpTable[char.lvl];
      char.lvl += 1;
    }
    this.setState({ teamStat });
  }

  render() {
     const { teamStat, tavernTeam, savedId } = this.state;
     const mystyle = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-evenly",
     }
     const buttons = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
     }

     const charList = JSON.parse(localStorage.getItem('charList'));
     const baseList = JSON.parse(localStorage.getItem('baseList'));
      return (
        <>
          <div> 
              <div style={ buttons }>
              <CustomButton onClick={ this.goHome } label={ 'Home' } />
              <CustomButton onClick={ this.startBattle } label={ 'BATTLE!' } />
              <CustomButton onClick={ this.showList } label={ 'Team Builder' } />
              </div>
              <div>
               <div>
                { tavernTeam && <div style={ mystyle }>
                    { charList.length !== 0 && charList.map((char) => 
                      <div  key={ char.id }>
                        <CustomButton name={ char.id } onClick={ savedId === char.id ? () => this.deleteChar(char) : () => this.clickDelete(char) } label={ savedId === char.id ? 'CONFIRM' : 'DELETE' } />
                        <div onClick={ () => this.addChar(char) } >
                        <GenericChar statSheet={ char } />
                        </div>                       
                      </div>
                    )}
                  </div> }        
               </div>
                <div style={ mystyle }>
                  <section>
                  <CustomButton onClick={ teamStat[0] ? () => this.rmvChar(0) : this.showList } label={ teamStat[0] ? 'REMOVE' : (tavernTeam ? 'CANCEL':'ADD') } />
                  { teamStat[0] && <div>
                  <GenericChar statSheet={teamStat[0]} />   
                  <CustomButton onClick={ () => this.spendExp(0) } label={ 'Spend EXP' } />
                  </div> 
                  }
                  </section>
                  <section>
                  <CustomButton onClick={ teamStat[1] ? () => this.rmvChar(1) : this.showList } label={ teamStat[1] ? 'REMOVE' : (tavernTeam ? 'CANCEL':'ADD') } />
                  { teamStat[1] && <div>
                  <GenericChar statSheet={teamStat[1]} />   
                  <CustomButton onClick={ () => this.spendExp(1) } label={ 'Spend EXP' } />
                  </div> 
                  }
                  </section>
                  <section>
                  <CustomButton onClick={ teamStat[2] ? () => this.rmvChar(2) : this.showList } label={ teamStat[2] ? 'REMOVE' : (tavernTeam ? 'CANCEL':'ADD') } />
                  { teamStat[2] && <div>
                  <GenericChar statSheet={teamStat[2]} />   
                  <CustomButton onClick={ () => this.spendExp(2) } label={ 'Spend EXP' } />
                  </div> 
                  }
                  </section>
                  { tavernTeam && <div>
                    { baseList.length !== 0 && baseList.map((char) => 
                      <div onClick={ () => this.addBaseChar(char) } key={ char.classe }>
                        <GenericChar statSheet={ char } />
                      </div>
                    )}
                  </div> }
                </div>
              </div>
          </div>
        </>
    );
  }
}

Tavern.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

