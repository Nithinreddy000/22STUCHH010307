import logo from './logo.svg';
import './App.css';
import { log } from './logger';
import Logger from './logger';

function App() {
  // Log when App renders
  log("frontend", "info", "api", "App component rendered");

  // Example: log on button click
  const handleClick = () => {
    log("frontend", "debug", "api", "User clicked button");
    alert("Button clicked!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleClick}>Click Me</button>
      </header>
    </div>
  );
}

export default App;
