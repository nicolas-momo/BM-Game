import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";

export class Tavern extends React.Component {
  state = {
    teamStat: [],
    addChar: false,
    charList: [],
    teste: false,
    baseWarrior: {
        id: 0,
        classe: 'Warrior',
        hp: 150,
        stat: 5,
        mp: 0,
        dmg: 2,
        speed: 10,
        exp: 0,
        counter: 0,
        weight: 3,
        maxHp: 150,
        maxMp: 0,
      },
    baseMage: {
        id: 1,
        classe: 'Mage',
        hp: 100,
        stat: 5,
        mp: 50,
        dmg: 0,
        speed: 7,
        exp: 0,
        counter: 0,
        weight: 2,
        maxHp: 100,
        maxMp: 50,
      },
    basePaladin: {
        id: 2,
        classe: 'Paladin',
        hp: 200,
        stat: 5,
        mp: 50,
        dmg: 0,
        speed: 5,
        exp: 0,
        counter: 0,
        weight: 4,
        maxHp: 200,
        maxMp: 50,
      },
  };

  componentDidMount() {
    this.createAllies();
  }

  addChar = (char) => {
    const { teamStat } = this.state;
    const team = [...teamStat, char ];
    let charsDisponiveis = JSON.parse(localStorage.getItem('charList'));
    charsDisponiveis.forEach((element, index) => {
      if (element.id === char.id) {
        charsDisponiveis.splice(index, 1);
      }
    });
    localStorage.setItem('charList', JSON.stringify(charsDisponiveis));
    localStorage.setItem('teamStat', JSON.stringify(team));
    if (team.length === 3) { this.setState({ addChar: false }) }
    this.setState({ teamStat: team });
  }

  createAllies = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    this.setState({ teamStat: allyTeam });
  }

  // const { baseWarrior } = this.state;
  // const highestId = allyTeam.reduce((prev, curr) => {
  //   return prev.id > curr.id ? prev.id : curr.id;
  //  });
  // baseWarrior.id = highestId + 1;

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
    let charsDisponiveis = JSON.parse(localStorage.getItem('charList'));
    charsDisponiveis.push(teamStat[i]);
    localStorage.setItem('charList', JSON.stringify(charsDisponiveis));
    teamStat.splice(i, 1);
    localStorage.setItem('teamStat', JSON.stringify(teamStat));
    this.setState({ teamStat });
    } else {
      alert('NO')
    }
  }

  showList = () => {
    const { addChar } = this.state;
    this.setState({ addChar: !addChar });
  }

  spendExp = (i) => {
    const { teamStat } = this.state;
    const char = teamStat[i]; 
    console.log(char);
  }

  render() {
     const { teamStat, addChar, teste } = this.state;
     const mystyle = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-evenly",
     }
     const charList = JSON.parse(localStorage.getItem('charList'));
      return (
        <>
          <div>
              <CustomButton onClick={ this.goHome } label={ 'Home' } />
              <CustomButton onClick={ this.startBattle } label={ 'BATTLE!' } />
              <div>
               <div style={{ backgroundColor: 'pink' }}>
                { addChar && <div>
                    { charList.length !== 0 && charList.map((char) => 
                      <div onClick={ () => { this.addChar(char); this.setState({ teste2: !teste }); } } key={ char.id + Math.random() }>
                        <GenericChar statSheet={ char } />
                      </div>
                    )}
                  </div> }
               </div>
                <div style={ mystyle }>
                  <section>
                  <CustomButton onClick={ teamStat[0] ? () => this.rmvChar(0) : this.showList } label={ teamStat[0] ? 'REMOVE' : (addChar ? 'CANCEL':'ADD') } />
                  { teamStat[0] && <div>
                  <GenericChar statSheet={teamStat[0]} />   
                  <CustomButton onClick={ () => this.spendExp(0) } label={ 'Spend EXP' } />
                  </div> 
                  }
                  </section>
                  <section>
                  <CustomButton onClick={ teamStat[1] ? () => this.rmvChar(1) : this.showList } label={ teamStat[1] ? 'REMOVE' : (addChar ? 'CANCEL':'ADD') } />
                  { teamStat[1] && <div>
                  <GenericChar statSheet={teamStat[1]} />   
                  <CustomButton onClick={ () => this.spendExp(1) } label={ 'Spend EXP' } />
                  </div> 
                  }
                  </section>
                  <section>
                  <CustomButton onClick={ teamStat[2] ? () => this.rmvChar(2) : this.showList } label={ teamStat[2] ? 'REMOVE' : (addChar ? 'CANCEL':'ADD') } />
                  { teamStat[2] && <div>
                  <GenericChar statSheet={teamStat[2]} />   
                  <CustomButton onClick={ () => this.spendExp(2) } label={ 'Spend EXP' } />
                  </div> 
                  }
                  </section>
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

