import React from "react";
import { GenericChar } from "./GenericChar";

export class CharList extends React.Component {
  state = {
    teamStat: [],
    charList: [],
  };
  componentDidMount() {
    this.setState({ teamStat: JSON.parse(localStorage.getItem('teamStat')) });
    this.setState({ charList: JSON.parse(localStorage.getItem('charList')) });
  }
  addChar(char) {
    const { teamStat } = this.state;
    const team = [...teamStat, char ];
    let charsDisponiveis = JSON.parse(localStorage.getItem('charList'));
    console.log(charsDisponiveis)
    charsDisponiveis.forEach((element, index) => {
      if (element.id === char.id) {
        charsDisponiveis.splice(index, 1);
      }
    });
    localStorage.setItem('charList', JSON.stringify(charsDisponiveis));
    localStorage.setItem('teamStat', JSON.stringify(team));
    this.setState({ teamStat: team });
  }
  render() {
    const { charList } = this.state;
    return (
      <>
        <div>
          { charList.length !== 0 && charList.map((char) => 
            <div onClick={ () => this.addChar(char) } key={char.id + Math.random()}>
              <GenericChar statSheet={char} />
            </div>
          )}
        </div>
      </>
    );
  }
}