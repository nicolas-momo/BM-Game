import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from '../Utility/CustomButton';
import { GenericChar } from '../Utility/GenericChar';
import { xpData } from '../../Data';
import { ShowMoney } from '../Utility/ShowMoney';
import { MaxFloor } from '../Utility/MaxFloor';
import { GenericBar } from '../Utility/GenericBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as LeftArrow } from '../../Styles/svgs/leftArrow.svg';
import { ReactComponent as RightArrow } from '../../Styles/svgs/rightArrow.svg';
import { ReactComponent as FireRage } from '../../Styles/svgs/fireRage.svg';
import { ReactComponent as Strength } from '../../Styles/svgs/dumbbells.svg'
import { ReactComponent as PaladinCross } from '../../Styles/svgs/paladinCross.svg'
import '../../Styles/charMenu.css';
import '../../Styles/general.css';

export class CharMenu extends React.Component {
  state = {
    allAlliesList: [],
    teamList: [],
    xpPoint: 0,
    renameText: '',
    editingName: false,
    spendingExp: false,
    inventory: [],
    moneyQty: 0,
  };

  componentDidMount() {
    this.createAlly();
    this.getMoneyQty();
    this.createInventory();
  }

  createAlly = () => {
    const allAllies = JSON.parse(localStorage.getItem('allAlliesList'));
    const teamList = JSON.parse(localStorage.getItem('teamList'));
    const benchList = JSON.parse(localStorage.getItem('benchList'));
    this.setState({ allAlliesList: allAllies, teamList: teamList, benchList: benchList });
  }

  getMoneyQty = () => {
    const moneys = JSON.parse(localStorage.getItem('moneys')) || 0;
    this.setState({ moneyQty: moneys })
  }

  createInventory = () => {
    const inventory = JSON.parse(localStorage.getItem('inventory'));
    this.setState({ inventory: inventory });
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
  
  spendExp = (id) => {
    const { allAlliesList, xpPoint } = this.state;
    const xpTable = xpData;
    const char = allAlliesList.find((char) => char.id === +id);
    if (!xpTable[char.lvl]) return
    if (char.exp >= xpTable[char.lvl]) {
      char.exp -= xpTable[char.lvl];
      char.lvl += 1;
      this.setState({ allAlliesList, xpPoint: xpPoint +5, spendingExp: true }, () => {
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
        extraMp = 5;
        break;
      case 'Mage':
        extraMp = 10;
        break;
      case 'Paladin':
        extraMp = 7;
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

  useStatPoints = (stat, op) => {
    const { xpPoint, allAlliesList } = this.state;
    const { match: { params: { id } } } = this.props;
    const allyTeam = JSON.parse(localStorage.getItem('allAlliesList'));
    const char = allAlliesList.find((char) => char.id === +id);
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
      this.setState({allAlliesList});
      let newXp = op === 'add' ? -1 : 1;
      this.setState({ xpPoint: xpPoint + newXp });
    }
  }

  changeName = (char) => {
    const { renameText, allAlliesList, teamList, benchList } = this.state;
    const { match: { params: { id } } } = this.props;
    if (renameText.length > 0 && renameText.length <= 10) {
      char.name = renameText
    }
    let oldTeamChar = teamList.find((char) => char.id === +id);
    let oldBenchChar = benchList.find((char) => char.id === +id);
    if (oldTeamChar) {
      oldTeamChar.name = char.name;
      localStorage.setItem('teamList', JSON.stringify(teamList));
    }
    if (oldBenchChar) {
      oldBenchChar.name = char.name;
      localStorage.setItem('benchList', JSON.stringify(benchList));
    }
    localStorage.setItem('allAlliesList', JSON.stringify(allAlliesList));
    localStorage.setItem('teamList', JSON.stringify(teamList));
    this.setState({ renameText:'', allAlliesList, editingName: false });
  }

  saveEdit = () => {
    const { allAlliesList, teamList, benchList } = this.state;
    const { match: { params: { id } } } = this.props;
    const newChar = allAlliesList.find((char) => char.id === +id);
    let oldTeamChar = teamList.find((char) => char.id === +id);
    let oldBenchChar = benchList.find((char) => char.id === +id);
    if (oldTeamChar) {
      Object.assign(oldTeamChar, newChar);
      localStorage.setItem('teamList', JSON.stringify(teamList));
    }
    if (oldBenchChar) {
      Object.assign(oldBenchChar, newChar);
      localStorage.setItem('benchList', JSON.stringify(benchList));
    }
    localStorage.setItem('allAlliesList', JSON.stringify(allAlliesList));
    this.setState({ allAlliesList, spendingExp: false});
  }

  handleNameChange = (event) => {
    const typing = event.target.value;
    if (typing.length <= 10) {
      this.setState({ renameText: typing, editingName: true });
    }
    if (typing.length === 0) {
      this.setState({ editingName: false });
    }
  }

  goShop = () => {
    const { history } = this.props;
    history.push('/shop');
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { allAlliesList, xpPoint, renameText, editingName, spendingExp, moneyQty } = this.state;
    const char = allAlliesList.find((char) => char.id === +id);
    const xpTable = xpData;
    const renderTable = true;
    let toNextLvl = 0;
    let hasEnoughExp = false;
    const iconsRender = {
      mpIcon: false,
      rageIcon: false,
      warriorIcon: false,
      paladinIcon: false,
      mageIcon: false,
    };

    if (char) {
      toNextLvl = xpTable[char.lvl];
      hasEnoughExp = char.exp >= toNextLvl;
      switch (char.classe) {
        case 'Warrior':
          iconsRender.rageIcon = true;
          iconsRender.warriorIcon = true;
          break;
        case 'Mage':
          iconsRender.mpIcon = true;
          iconsRender.mageIcon = true;
          break;
        case 'Paladin':
          iconsRender.mpIcon = true;
          iconsRender.paladinIcon = true;
          break;
        default:
          console.log('ERRO_CHANGE_SPEED');
          break;
      }
    }

    const renameButton = {
      backgroundColor: spendingExp ? '#D3D3D3' : '#333',
      border: spendingExp ? 'none' : '', 
      cursor: spendingExp ? 'not-allowed' : 'pointer',
      color: spendingExp ? 'black' : 'white',
      textShadow:  spendingExp ? 'none': '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    };
    const saveButton = {
      backgroundColor: xpPoint !== 0 ? '#D3D3D3' : '#333',
      border: xpPoint !== 0 ? 'none' : '', 
      cursor: xpPoint !== 0 ? 'not-allowed' : 'pointer',
      color: xpPoint !== 0 ? 'black' : 'white',
      textShadow: xpPoint !== 0 ? 'none': '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    };
    const spendExpButton = {
      backgroundColor: editingName ? '#D3D3D3' : '#333',
      border: editingName  ? 'none' : '', 
      cursor: editingName ? 'not-allowed' : 'pointer',
      color: editingName ? 'black' : (hasEnoughExp ? '#2cfc03' : 'white'),
      textShadow: editingName ? 'none': '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    };
    const learnSkillsButton = {
      backgroundColor: editingName ? '#D3D3D3' : '#333',
      border: editingName  ? 'none' : '', 
      cursor: editingName ? 'not-allowed' : 'pointer',
      color: editingName ? 'black' : 'white',
      textShadow: editingName ? 'none': '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    };
    const mpRageStyle = {
      color: iconsRender.rageIcon ? '#9e020c' : (iconsRender.mpIcon ? '#03f7ff' : ''),
    };


    return (
    <div className='screenDarkMode'> 
      <div className='topMenuButtons'>
        <CustomButton onClick={ this.goHome } label={ 'Home' } />
        <CustomButton onClick={ this.goTavern } label={ 'Tavern' } />
        <CustomButton onClick={ this.goShop } label={ 'Shop' } />
        <CustomButton onClick={ this.startBattle } label={ 'Battle!' } />
      </div>
      <ShowMoney moneyQty={ moneyQty }/>
      <MaxFloor />
        <div className='charMenuWrapper'>
          { char &&  
            <div>
              <div className='expBtnsWrapper'>
                <button type='button' className='spendExpButton' style={spendExpButton} disabled={ editingName } onClick={ () => this.spendExp(id) }>LVL UP</button>
                <button type='button' className='learnSkillsBtn' style={learnSkillsButton} disabled={ editingName } onClick={ () => console.log('TODO') }>Learn Skills</button>
              </div>
              <div className='expBarStyleCM'>
                <GenericBar propValue={char.exp} propMaxValue={toNextLvl} propName={'EXP'}/>
              </div>
              <div className='renameWrapper'>
                <input className='renameInput' type='text' placeholder={char.name} value={ renameText || ''} onChange={this.handleNameChange} />
                <button type='button' className='renameButton' style={renameButton} disabled={ xpPoint !== 0 || spendingExp } onClick={ () => this.changeName(char) }>RENAME</button>
                <GenericChar statSheet={ char } />
                <LeftArrow className='leftArrowIconStyleCM' />
                <RightArrow className='rightArrowIconStyleCM' />
              </div>
            </div>
          }
          { renderTable && <div className='tableStatsCM'> 
            <h2 className='tableStatsH2'>{`Stat Points: ${xpPoint}`}</h2>
            <table>
              <tbody>
                <div className='lineBetweenTr'></div>
                <tr>
                  <td>
                    <button type='button' className='squircle' onClick={() => this.useStatPoints('hp', 'remove')}>
                      -
                    </button>
                  </td>
                  <td>
                    <FontAwesomeIcon icon='heart' className='hpIconCM' size='xl' />
                  </td>
                  <td>
                    {char && <h2 className='hpStyleCM'>{char.hp}</h2>}
                  </td>
                  <td>
                    <button type='button' className='squircle' onClick={() => this.useStatPoints('hp', 'add')}>
                      +
                    </button>
                  </td>
                </tr>
                <div className='lineBetweenTrCM'></div>
                <tr>
                  <td>
                    <button type='button' className='squircle' onClick={() => this.useStatPoints('mp', 'remove')}>
                      -
                    </button>
                  </td>
                  { iconsRender.rageIcon && <td>
                    <FireRage className='rageIconCM' />
                  </td> }
                  { iconsRender.mpIcon && <td>
                    <FontAwesomeIcon icon='flask' className='mpIconCM' size='xl'/>
                  </td> }
                  <td>
                    {char && <h2 className='mpRageStyleCM' style={ mpRageStyle }>{char.mp}</h2>}
                  </td>
                  <td>
                    <button type='button' className='squircle' onClick={() => this.useStatPoints('mp', 'add')}>
                      +
                    </button>
                  </td>
                </tr>
                <div className='lineBetweenTrCM'></div>
                <tr>
                  <td>
                    <button type='button' className='squircle' onClick={() => this.useStatPoints('stat', 'remove')}>
                        -
                      </button>
                    </td>
                  { iconsRender.mageIcon && <td>
                    <FontAwesomeIcon icon='wand-sparkles' size='2xl' className='mageStatIconCM' />
                  </td> }
                  { iconsRender.warriorIcon && <td>
                    <Strength className='warriorStatIconCM' />
                  </td> }
                  { iconsRender.paladinIcon && <td>
                    <PaladinCross className='paladinStatIconCM' />
                  </td> }
                  <td>
                    {char && <h2 className='statStyleCM'>{char.stat}</h2>}
                  </td>
                  <td>
                    <button type='button' className='squircle' onClick={() => this.useStatPoints('stat', 'add')}>
                      +
                    </button>
                  </td>
                </tr>
                <div className='lineBetweenTrCM'></div>
                <tr>
                  <td>
                    <button type='button' className='squircle' onClick={() => this.useStatPoints('speed', 'remove')}>
                      -
                    </button>
                  </td>
                  <td>
                    <FontAwesomeIcon icon="running" size="2xl" className='speedIconCM' />
                  </td>
                  <td>
                    {char && <h2 className='speedStyleCM'>{char.speed}</h2>}
                  </td>
                  <td>
                    <button type='button' className='squircle' onClick={() => this.useStatPoints('speed', 'add')}>
                      +
                    </button>
                  </td>
                </tr>
                <div className='lineBetweenTrCM'></div>
              </tbody>
            </table>
            <button type='button' className='saveChangesButton' style={saveButton} disabled={ xpPoint !== 0 } onClick={ this.saveEdit }> SAVE </button>                
            </div>
          }
        </div>
      </div>
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
