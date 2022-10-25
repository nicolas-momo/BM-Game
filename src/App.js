import './App.css';
import { Hero } from './Hero';

const App = () => {
  return (
    <div className="App">
      <Hero hp={200} int={60} mp={100} dmg={5}/>
    </div>
  );
}

export default App;