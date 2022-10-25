import './App.css';
import { Warrior } from './Components/Warrior';
import { Mage } from './Components/Mage';


const App = () => {
  return (
    <div className="App">
       <Warrior hp={200} str={60} mp={100} dmg={5}/>
      <Mage hp={200} int={60} mp={100} dmg={5}/>

    </div>
  );
}

export default App;