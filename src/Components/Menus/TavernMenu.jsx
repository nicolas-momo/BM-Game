import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { generateFantasyName } from "../../CharData";
import { MessageBox } from "../Utility/MessageBox";

export class TavernMenu extends React.Component {
  state = {
    teamStat: [],
    baseChars: [],
    tavernTeam: false,
    savedId: null,
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
    this.setState({ savedId: null });
  }

  clickDelete = (char) => {
    this.setState({ savedId: char.id });
  }

  addBaseChar = (char) => {
    const { teamStat } = this.state;
    const charList = JSON.parse(localStorage.getItem('charList'));
    if (charList.length + teamStat.length >= 5) {
      this.setState({ maxCharMessage: true })
      return 
    }
    const teamIds = teamStat.map((hero) => hero.id);
    const listIds = charList.map((hero) => hero.id);
    teamIds.push(...listIds)
    const newId = teamIds.reduce((acc, val) => {
      acc = ( acc === undefined || val > acc) ? val : acc
      return acc;
    }, 0);
    char.id = newId + 1;
    const newName = generateFantasyName();
    char.name = newName;
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
      this.setState({ leastCharMessage: true })
    }
  }

  showList = () => {
    const { tavernTeam } = this.state;
    this.setState({ savedId: null });
    this.setState({ tavernTeam: !tavernTeam });
  }

  hideMessage = () => {
    this.setState({ maxCharMessage: false, leastCharMessage: false });
  };

  charMenu = (id) => {
    const { history } = this.props;
    history.push(`/char/${id}`);
  }

  render() {
     const { teamStat, tavernTeam, savedId, maxCharMessage, leastCharMessage } = this.state;
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
                      <div key={ char.id }>
                        <CustomButton name={ char.id } onClick={ savedId === char.id ? () => this.deleteChar(char) : () => this.clickDelete(char) } label={ savedId === char.id ? 'CONFIRM' : 'DELETE' } />
                        <div onClick={ () => this.addChar(char) } >
                        <GenericChar statSheet={ char } />
                        </div>                       
                      </div>
                    )}
                  </div> }        
               </div>
              {maxCharMessage && <MessageBox onHide={this.hideMessage} message={'You may only have up to 5 characters at a time, including reserves!'}/>}
              {leastCharMessage && <MessageBox onHide={this.hideMessage} message={'You must have at least 1 character on your team!'}/>}
                <div style={ mystyle }>
                  <section>
                  <CustomButton onClick={ teamStat[0] ? () => this.rmvChar(0) : this.showList } label={ teamStat[0] ? 'REMOVE' : (tavernTeam ? 'CANCEL':'ADD') } />
                  { teamStat[0] && <div>
                  <GenericChar statSheet={teamStat[0]} />   
                  <CustomButton onClick={ () => this.charMenu(teamStat[0].id) } label={ 'Char Menu' } />
                  </div> 
                  }
                  </section>
                  <section>
                  <CustomButton onClick={ teamStat[1] ? () => this.rmvChar(1) : this.showList } label={ teamStat[1] ? 'REMOVE' : (tavernTeam ? 'CANCEL':'ADD') } />
                  { teamStat[1] && <div>
                  <GenericChar statSheet={teamStat[1]} />   
                  <CustomButton onClick={ () => this.charMenu(teamStat[1].id) } label={ 'Char Menu' } />
                  </div> 
                  }
                  </section>
                  <section>
                  <CustomButton onClick={ teamStat[2] ? () => this.rmvChar(2) : this.showList } label={ teamStat[2] ? 'REMOVE' : (tavernTeam ? 'CANCEL':'ADD') } />
                  { teamStat[2] && <div>
                  <GenericChar statSheet={teamStat[2]} />   
                  <CustomButton onClick={ () => this.charMenu(teamStat[2].id) } label={ 'Char Menu' } />
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

TavernMenu.propTypes = {
  history: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }),
}.isRequired;
