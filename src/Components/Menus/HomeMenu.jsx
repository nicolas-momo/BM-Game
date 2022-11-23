import React from "react";
import { CustomButton } from "../Utility/CustomButton";
import { BattleMenu } from "./BattleMenu";

export class HomeMenu extends React.Component {
  state = {
    startBattle: false,  
  };
  render() {
    const { startBattle } = this.state;
      return (
          <>
            <div>
              <CustomButton onClick={ () => this.setState({startBattle: !startBattle }) } label={ 'BATTLE!' } />
              {startBattle && <BattleMenu />}
            </div>
          </>
    );
  }
}
