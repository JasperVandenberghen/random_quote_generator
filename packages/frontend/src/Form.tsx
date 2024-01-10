interface QuoteFormProps {
  queryParams: {
    limit: string;
    minLength: string;
    maxLength: string;
    tags: string;
    author: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getQuote: () => Promise<string[]>;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ queryParams, handleChange, getQuote }) => {

  // Event handler for input changes with additional validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Additional validation for specific input fields
    if (name === 'limit') {
      if (!/^\d+$/.test(value) || +value <= 0) {
        console.error('Limit must be a positive integer');
        return;
      }
    } else if (name === 'minLength' || name === 'maxLength') {
      if (!/^\d+$/.test(value) || +value < 0) {
        console.error('Min and Max Length must be non-negative integers');
        return;
      }
    }

    handleChange(e);
  };

  return (
    <form>
      <label>
        Limit:
        <input
          type="text"
          name="limit"
          value={queryParams.limit}
          onChange={handleInputChange}
          className={"border-2 rounded-lg p-2 mx-4 my-2 drop-shadow-sm"}
        />
      </label>
      <br />
      <label>
        Min Length:
        <input
          type="number"
          name="minLength"
          value={queryParams.minLength}
          onChange={handleInputChange}
          className={"border-2 rounded-lg p-2 mx-4 my-2 drop-shadow-sm"}
        />
      </label>
      <br />
      <label>
        Max Length:
        <input
          type="number"
          name="maxLength"
          value={queryParams.maxLength}
          onChange={handleInputChange}
          className={"border-2 rounded-lg p-2 mx-4 my-2 drop-shadow-sm"}
        />
      </label>
      <br />
      <label>
        Tags:
        <input
          type="text"
          name="tags"
          value={queryParams.tags}
          onChange={handleChange}
          className={"border-2 rounded-lg p-2 mx-4 my-2 drop-shadow-sm"}
        />
      </label>
      <br />
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={queryParams.author}
          onChange={handleChange}
          className={"border-2 rounded-lg p-2 mx-4 my-2 drop-shadow-sm"}
        />
      </label>
      <br />
      <button type="button" onClick={getQuote} className="bg-orange-400 rounded-full px-4 py-2 text-white my-4 drop-shadow-md">
        Generate Quote
      </button>
    </form>
  );
};

export default QuoteForm;
