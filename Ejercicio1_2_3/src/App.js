import logo from './logo.svg';
import './App.css';
import ContDef from './components/pure/Contacto';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ContDef></ContDef>
      </header>
    </div>
  );
}

export default App;
