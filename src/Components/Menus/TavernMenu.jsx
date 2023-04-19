import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { generateFantasyName } from "../../Data";
import { MessageBox } from "../Utility/MessageBox";
import { ShowMoney } from "../Utility/ShowMoney";
import { BuyCharIcon } from "../Utility/BuyCharIcon";
import { ReactComponent as TrashCan } from '../../Styles/svgs/trashCan.svg'
import '../../Styles/tavern.css'

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

  createAllies = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamList'));
    const baseTeam = JSON.parse(localStorage.getItem('baseCharList'));
    this.setState({ teamList: allyTeam, baseChars: baseTeam });
  }

  getMoneyQty = () => {
    const moneys = JSON.parse(localStorage.getItem('moneys')) || 0;
    this.setState({ moneyQty: moneys })
  }

  moveCharToTeam = (char) => {
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
    // isso fecharia o manageTeam quando tiver 3 chars no teamList
    // if (team.length === 3) { this.setState({ showBench: false }) } 
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

  buyBaseChar = (char) => {
    const { teamList } = this.state;
    const benchList = JSON.parse(localStorage.getItem('benchList'));
    const moneys = JSON.parse(localStorage.getItem('moneys')) || 0;
    if (benchList.length + teamList.length >= 5) {
      this.setState({ maxCharMessage: true })
      return 
    }
    if (Number(char.buyCost) > moneys) {
      return 
    } else {
      const newMoneyQty = Number(moneys) - char.buyCost;
      localStorage.setItem('moneys', JSON.stringify(newMoneyQty));
      this.setState({ moneyQty: newMoneyQty })
    }
    const teamIds = teamList.map((hero) => hero.id);
    const listIds = benchList.map((hero) => hero.id);
    const newName = generateFantasyName();
    teamIds.push(...listIds);
    const newId = teamIds.reduce((acc, val) => {
      acc = ( acc === undefined || val > acc) ? val : acc
      return acc;
    }, 0);

    char.id = newId + 1;
    char.name = newName;

    const team = [...teamList, char ];
    const allAllies = [...team, ...benchList];
    if (team.length <= 3 ) {
      localStorage.setItem('teamList', JSON.stringify(team));
      localStorage.setItem('allAlliesList', JSON.stringify(allAllies));
      this.setState({ teamList: team });
    }
    if (benchList.length <= 3 && teamList.length === 3) {
      const bench = [ char, ...benchList];
      localStorage.setItem('allAlliesList', JSON.stringify(allAllies));
      localStorage.setItem('benchList', JSON.stringify(bench));
      this.setState({ allAlliesList: allAllies });
    }
    // isso fecharia o manageTeam quando tiver 3 chars no teamList
    // if (team.length === 3) { this.setState({ showBench: false }) }
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
    if (!showBench) {
      this.setState({ showBench: !showBench, showBaseChars: false, savedId: null  });
    }
  }

  showBaseCharList = () => {  
    const { showBaseChars, showBench } = this.state;
    this.setState({ savedId: null, showBaseChars: !showBaseChars, showBench: !showBench, showDelete: false  });
  }

  showDeleteBtns = () => {
    const { showDelete } = this.state;
    this.setState({ showDelete: !showDelete, savedId: null });
  }

  hideMessage = () => {
    this.setState({ maxCharMessage: false, leastCharMessage: false });
  };
  
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

  render() {
      const { teamList, showBench, savedId, maxCharMessage,
        leastCharMessage, showBaseChars, moneyQty, showDelete } = this.state;
      const mystyle = {
      position: 'relative',
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
      <div style={{overflow: 'hidden'}}>
        <div style={ buttons }>
            <CustomButton onClick={ this.goHome } label={ 'Home' } />
            <CustomButton isDisabled={ true } label={ 'Tavern' } />
            <CustomButton onClick={ this.goShop } label={ 'Shop' } />
            <CustomButton onClick={ this.goBattle } label={ 'Battle!' } />
        </div>
        <div style={ mystyle }>
          <CustomButton onClick={ this.showBenchList } label={ 'Manage Team' } />
          { (showBench && !showBaseChars) && <CustomButton onClick={ this.showDeleteBtns } label={ 'Delete Hero' } />}
          { showBench && <CustomButton onClick={ this.showBaseCharList } label={ 'Buy Heroes' } />}
        </div>
        <ShowMoney moneyQty={ moneyQty }/>
        { (showBench && !showBaseChars) && <div className="tavernContainer"> {/* Bench */}
            { benchList.length !== 0 && benchList.map((char) =>
              <div className={`item`} key={ char.id }>
                    {/* n sei como fazer isso sem inline .-. */}
                    {showDelete && <TrashCan style={{
                      padding: '10px',
                      border: savedId === char.id ? ' 10px solid red' : 'none',
                      borderRadius: '50%',
                      margin: '10px 2px',
                      cursor: 'pointer',
                      width: '50%',
                      filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))',
                      position: 'absolute',
                      left:'50%',
                      top:'50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex:'2'
                      }} 
                      name={ char.id }
                      onClick={ savedId === char.id ? () => this.deleteChar(char) : () => this.clickDelete(char) }
                    />}
                  <div onClick={ () => this.moveCharToTeam(char) } style={{ position:'absolute', width: '25rem', height: '25rem', zIndex:'1' }}/>
                  <GenericChar statSheet={ char } />
              </div>
            )}
          </div> }
        { showBaseChars && <div className="tavernContainer" id="allAllies">
            { allAlliesList.length !== 0 && allAlliesList.map((char) =>
              <div className={`item`} key={ char.id }>
                <div style={{ position:'relative' }}>
                  <div onClick={ () => this.moveCharToTeam(char) } style={{ position:'absolute', width: '10rem', height: '10rem', zIndex:'1' }} />
                  <GenericChar statSheet={ char } />
                </div>
              </div>
            )}
          </div> }        
        {maxCharMessage && <MessageBox onHide={this.hideMessage} message={'You may only have up to 5 characters at a time, including reserves!'}/>}
        {leastCharMessage && <MessageBox onHide={this.hideMessage} message={'You must have at least 1 character on your team!'}/>}
        <div className="teamContainer">
          { !showBaseChars && <div style={ mystyle }>
            { teamList[0] && <div style={{ position:'relative', display:'grid', justifyContent: 'center', width: '25rem', height: '25rem' }}>
              <div onClick={ showBench ? () => this.benchChar(0) : null } style={{ position:'absolute', width: '25rem', height: '25rem', zIndex:'1' }} />
              <GenericChar statSheet={teamList[0]} />   
            </div>
            }
            { teamList[1] && 
              <div style={{ position:'relative', display:'grid', justifyContent: 'center', width: '25rem', height: '25rem' }}>
                <div onClick={ showBench ? () => this.benchChar(1) : null } style={{ position:'absolute', width: '25rem', height: '25rem', zIndex:'1' }} />
                <GenericChar statSheet={teamList[1]} />   
              </div>
            }
            { teamList[2] && <div style={{ position:'relative', display:'grid', justifyContent: 'center', width: '25rem', height: '25rem' }}>
              <div onClick={ showBench ? () => this.benchChar(2) : null } style={{ position:'absolute', width: '25rem', height: '25rem', zIndex:'1' }} />
              <GenericChar statSheet={teamList[2]} />   
            </div>
            }
          </div>}
        </div>
        { showBaseChars && <div style={{display: 'flex'}}>
            { baseCharList.length !== 0 && baseCharList.map((char) =>
              <div style={{width: '200px', cursor:'pointer'}}  onClick={ () => this.buyBaseChar(char) } key={ char.classe }>
                <BuyCharIcon classe={char.classe}/>
              </div>
            )}
          </div> }
      </div>
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
