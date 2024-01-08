import { useState } from 'react';
import './App.css';
import logo from './logo.png';

function App() {
  const [quote, setQuote] = useState<string>();

  const getQuote = async () => {
    const response = (await fetch('http://localhost:3000/api/quotes/random'));
    const json = await response.json()
    setQuote(json[0].content)
    return quote;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click the button for a random quote!
        </p>
        <button onClick={getQuote}>
          Random quote
        </button>
        {quote && <p>{quote}</p>}
      </header>
    </div>
  );
}

export default App;
