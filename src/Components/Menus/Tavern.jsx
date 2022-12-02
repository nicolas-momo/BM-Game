import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";

export class Tavern extends React.Component {
  state = {
    teamStat: [],
    baseChars: [],
    addChar: false,
    confirmed: false,
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
    localStorage.setItem('charList', JSON.stringify(charList));
    localStorage.setItem('teamStat', JSON.stringify(team));
    if (team.length === 3) { this.setState({ addChar: false }) }
    this.setState({ teamStat: team });
  }
  // bugs aleatorios com delete, preciso de ajuda
  deleteChar = ({ target }) => {
    let charList = JSON.parse(localStorage.getItem('charList'));
    charList.forEach((element, index) => {
      if (element.id === Number(target.id)) {
        charList.splice(index, 1);
      }
    });
    localStorage.setItem('charList', JSON.stringify(charList));
    this.setState({ confirmed: false })
  }

  clickDelete = ({ target }, char) => {
    target.id = char.id;
    this.setState({ confirmed: true })
  }
  // bugs aleatorios com delete, preciso de ajuda
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
    localStorage.setItem('teamStat', JSON.stringify(team));
    if (team.length === 3) { this.setState({ addChar: false }) }
    this.setState({ teamStat: team });
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
    const { addChar } = this.state;
    this.setState({ addChar: !addChar });
  }

  spendExp = (i) => {
    const { teamStat } = this.state;
    const char = teamStat[i]; 
    console.log(char);
  }

  render() {
     const { teamStat, addChar, confirmed } = this.state;
     const mystyle = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-evenly",
     }

     const charList = JSON.parse(localStorage.getItem('charList'));
     const baseList = JSON.parse(localStorage.getItem('baseList'));
      return (
        <>
          <div>
              <CustomButton onClick={ this.goHome } label={ 'Home' } />
              <CustomButton onClick={ this.startBattle } label={ 'BATTLE!' } />
              <div>
               <div>
                { addChar && <div>
                    { charList.length !== 0 && charList.map((char) => 
                      <div style={{ display: "flex" }} key={ char.id }>
                        <div onClick={ () => this.addChar(char) } >
                        <GenericChar statSheet={ char } />
                        </div>
                        <CustomButton onClick={ confirmed ? (target) => this.deleteChar(target) : (target) => this.clickDelete(target, char) } label={ confirmed ? 'CONFIRM' : 'DELETE' } />
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
                  { addChar && <div>
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

