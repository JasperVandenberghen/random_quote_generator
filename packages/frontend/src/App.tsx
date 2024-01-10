import { useState } from 'react';
import './App.css';
import logo from './logo.png';
import QuoteForm from './Form';
import QuoteList from './QuotesList';

function App() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [quotes, setQuotes] = useState<string[]>([]);
  const [queryParams, setQueryParams] = useState({
    limit: '',
    minLength: '',
    maxLength: '',
    tags: '',
    author: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setQueryParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const getQuote = async () => {
    const queryString = Object.entries(queryParams)
      .filter(([key, value]) => value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const response = await fetch(`http://localhost:3000/api/quotes/random${queryString ? `?${queryString}` : ''}`);
    const json = await response.json(); 

    if (Array.isArray(json)) {
      setQuotes(json.map((quote) => quote.content));
    } else {
      setQuotes([json[0].content]);
    }
    setButtonClicked(true);

    return quotes;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="font-bold">
          Click the button for a random quote!
        </p>
        <QuoteForm queryParams={queryParams} handleChange={handleChange} getQuote={getQuote} />
        <QuoteList quotes={quotes} buttonClicked={buttonClicked}/>
      </header>
    </div>
  );
}

export default App;
