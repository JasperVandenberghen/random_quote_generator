interface QuoteListProps {
    quotes: string[] | undefined;
    buttonClicked: boolean;
}

const QuoteList: React.FC<QuoteListProps> = ({ quotes, buttonClicked }) => {
    return (
        <ul className="list-disc">
            {buttonClicked && (!quotes || quotes.length === 0) && (
            <p>No quotes found for this criteria</p>
            )}
            {quotes &&
            quotes.map((quote, index) => (
                <li key={index} className="text-orange-400 drop-shadow-sm animate-pulse">
                {quote}
                </li>
            ))}
        </ul>
        );
};

export default QuoteList;