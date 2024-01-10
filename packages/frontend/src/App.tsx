import { useState } from 'react';
import './App.css';
import logo from './logo.png';
import QuoteForm from './Form';
import QuoteList from './QuotesList';

function App() {
  // State variables using the useState hook
  const [buttonClicked, setButtonClicked] = useState(false);
  const [quotes, setQuotes] = useState<string[]>([]);
  const [queryParams, setQueryParams] = useState({
    limit: '',
    minLength: '',
    maxLength: '',
    tags: '',
    author: '',
  });

  // Event handler for input changes in the form
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // Updating state based on the changed input
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

    // Fetching data from the server API
    const response = await fetch(`http://localhost:3000/api/quotes/random${queryString ? `?${queryString}` : ''}`);
    const json = await response.json(); 

    // Handling the response and updating state
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
