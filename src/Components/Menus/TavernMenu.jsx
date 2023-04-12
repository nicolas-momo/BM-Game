import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { generateFantasyName } from "../../Data";
import { MessageBox } from "../Utility/MessageBox";
import { ShowMoney } from "../Utility/ShowMoney";
import { BuyCharIcon } from "../Utility/BuyCharIcon";
import '../../Styles/TavernTeam.css'

export class TavernMenu extends React.Component {
  state = {
    teamList: [],
    allAlliesList: [],
    baseChars: [],
    showBench: true,
    showBaseChars: false,
    savedId: null,
    moneyQty: 0,
  };

  componentDidMount() {
    this.createAllies();
    this.getMoneyQty();
  }

  getMoneyQty = () => {
    const moneys = JSON.parse(localStorage.getItem('moneys')) || 0;
    this.setState({ moneyQty: moneys })
  }

  addChar = (char) => {
    const { teamList } = this.state;
    const team = [...teamList, char ];
    let benchList = JSON.parse(localStorage.getItem('benchList'));
    benchList.forEach((element, index) => {
      if (element.id === char.id) {
        benchList.splice(index, 1);
      }
    });
    if (team.length <= 3 ) { 
      localStorage.setItem('teamList', JSON.stringify(team));
      localStorage.setItem('benchList', JSON.stringify(benchList));
      this.setState({ teamList: team });
    }
    if (team.length === 3) { this.setState({ showBench: false }) }
  }

  deleteChar = (char) => {
    let benchList = JSON.parse(localStorage.getItem('benchList'));
    let allAlliesList = JSON.parse(localStorage.getItem('allAlliesList'));
    benchList.forEach((element, index) => {
      if (element.id === Number(char.id)) {
        benchList.splice(index, 1);
      }
    });
    allAlliesList.forEach((element, index) => {
      if (element.id === Number(char.id)) {
        allAlliesList.splice(index, 1);
      }
    });
    localStorage.setItem('benchList', JSON.stringify(benchList));
    localStorage.setItem('allAlliesList', JSON.stringify(allAlliesList));
    this.setState({ savedId: null });
  }

  clickDelete = (char) => {
    this.setState({ savedId: char.id });
  }

  addBaseChar = (char) => {
    const { teamList } = this.state;
    console.log('chamou')
    const benchList = JSON.parse(localStorage.getItem('benchList'));
    if (benchList.length + teamList.length >= 5) {
      this.setState({ maxCharMessage: true })
      return 
    }
    const teamIds = teamList.map((hero) => hero.id);
    const listIds = benchList.map((hero) => hero.id);
    teamIds.push(...listIds)
    const newId = teamIds.reduce((acc, val) => {
      acc = ( acc === undefined || val > acc) ? val : acc
      return acc;
    }, 0);
    char.id = newId + 1;
    const newName = generateFantasyName();
    char.name = newName;
    const team = [...teamList, char ];
    const allAlliesList = [...team, ...benchList];
    localStorage.setItem('allAlliesList', JSON.stringify(allAlliesList));
    if (team.length <= 3 ) {
      localStorage.setItem('teamList', JSON.stringify(team));
      this.setState({ teamList: team });
    }
    if (team.length === 3) { this.setState({ showBench: false }) }
  }

  createAllies = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamList'));
    const baseTeam = JSON.parse(localStorage.getItem('baseCharList'));
    this.setState({ teamList: allyTeam, baseChars: baseTeam });
  }

  goShop = () => {
    const { history } = this.props;
    history.push('/shop');
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  goBattle = () => {
    const { history } = this.props;
    history.push('/battle');
  }

  benchChar = (i) => {
    const { teamList } = this.state;
    if (teamList.length > 1) {
    let benchList = JSON.parse(localStorage.getItem('benchList'));
    benchList.push(teamList[i]);
    localStorage.setItem('benchList', JSON.stringify(benchList));
    teamList.splice(i, 1);
    localStorage.setItem('teamList', JSON.stringify(teamList));
    this.setState({ teamList });
    } else {
      this.setState({ leastCharMessage: true })
    }
  }

  showBenchList = () => {
    const { showBench } = this.state;
    this.setState({ savedId: null });
    this.setState({ showBench: !showBench });
    this.setState({ showBaseChars: false });
  }

  showBaseCharList = () => {  
    const { showBaseChars } = this.state;
    this.setState({ savedId: null });
    this.setState({ showBaseChars: !showBaseChars });
    this.setState({ showDelete: false });
  }

  showDeleteBtns = () => {
    const { showDelete } = this.state;
    this.setState({ showDelete: !showDelete });
  }

  hideMessage = () => {
    this.setState({ maxCharMessage: false, leastCharMessage: false });
  };

  render() {
     const { teamList, showBench, savedId, maxCharMessage,
       leastCharMessage, showBaseChars, moneyQty, showDelete } = this.state;
     const mystyle = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
     }
     const buttons = {
      width:'100vw',
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor:'#393D3F',
     }
     const benchList = JSON.parse(localStorage.getItem('benchList'));
     const baseCharList = JSON.parse(localStorage.getItem('baseCharList'));
     const allAlliesList = JSON.parse(localStorage.getItem('allAlliesList'));
      return (
      <>
        <div style={ buttons }>
            <CustomButton onClick={ this.goHome } label={ 'Home' } />
            <CustomButton isDisabled={ true } label={ 'Tavern' } />
            <CustomButton onClick={ this.goShop } label={ 'Shop' } />
            <CustomButton onClick={ this.goBattle } label={ 'Battle!' } />
        </div>
        <div style={ mystyle }>
          <CustomButton onClick={ this.showBenchList } label={ 'Manage Team' } />
        </div>
        <ShowMoney moneyQty={ moneyQty }/>
        <div style={mystyle}>
          { (showBench && !showBaseChars) && <CustomButton onClick={ this.showDeleteBtns } label={ 'Delete Character' } />}
          { showBench && <CustomButton onClick={ this.showBaseCharList } label={ 'Buy Heroes' } />}
        </div>
        { (showBench && !showBaseChars) && <div className="tavernContainer">
            { benchList.length !== 0 && benchList.map((char) =>
              <div className={`item`} key={ char.id }>
                <div>
                  <div style={{ transform: 'translate(25%, 0)'}}>
                    {showDelete && <CustomButton name={ char.id } onClick={ savedId === char.id ? () => this.deleteChar(char) : () => this.clickDelete(char) } label={ savedId === char.id ? 'CONFIRM' : 'DELETE' } />}
                  </div>
                  <div onClick={ () => this.addChar(char) } >
                    <GenericChar statSheet={ char } />
                  </div>
                </div>
              </div>
            )}
          </div> }
        { showBaseChars && <div className="tavernContainer" id="allAllies">
            { allAlliesList.length !== 0 && allAlliesList.map((char) =>
              <div className={`item`} key={ char.id }>
                <div>
                  <div style={{ transform: 'translate(25%, 0)'}}>
                    {showDelete && <CustomButton name={ char.id } onClick={ savedId === char.id ? () => this.deleteChar(char) : () => this.clickDelete(char) } label={ savedId === char.id ? 'CONFIRM' : 'DELETE' } />}
                  </div>
                  <div onClick={ () => this.addChar(char) } >
                    <GenericChar statSheet={ char } />
                  </div>
                </div>
              </div>
            )}
          </div> }        
        {maxCharMessage && <MessageBox onHide={this.hideMessage} message={'You may only have up to 5 characters at a time, including reserves!'}/>}
        {leastCharMessage && <MessageBox onHide={this.hideMessage} message={'You must have at least 1 character on your team!'}/>}
        { !showBaseChars && <div style={ mystyle }>
          { teamList[0] && <div onClick={ showBench ? () => this.benchChar(0) : null } style={{ display:'grid', justifyContent: 'center', width: '25rem', height: '25rem' }}>
          <GenericChar statSheet={teamList[0]} />   
          </div> 
          }
          { teamList[1] && <div onClick={ showBench ? () => this.benchChar(1) : null  } style={{ display:'grid', justifyContent: 'center', width: '25rem', height: '25rem' }}>
          <GenericChar statSheet={teamList[1]} />   
          </div> 
          }
          { teamList[2] && <div onClick={ showBench ? () => this.benchChar(2) : null  } style={{ display:'grid', justifyContent: 'center', width: '25rem', height: '25rem' }}>
          <GenericChar statSheet={teamList[2]} />   
          </div> 
          }
        </div>}
        { showBaseChars && <div style={{display: 'flex'}}>
            { baseCharList.length !== 0 && baseCharList.map((char) =>
              <div style={{width: '200px'}}  onClick={ () => this.addBaseChar(char) } key={ char.classe }>
                <BuyCharIcon classe={char.classe}/>
              </div>
            )}
          </div> }
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
