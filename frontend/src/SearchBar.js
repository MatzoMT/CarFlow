import './SearchBar.css';


const SearchBar = ({ searchQuery, setSearchQuery }) => (

    
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search a vehicle</span>
        </label>
        <input
            type="text"
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            id="header-search"
            placeholder="Search by year, make, model..."
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;