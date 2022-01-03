import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const navigate = useNavigate();
    const onSubmit = e => {
        navigate('/home');
        e.preventDefault()
    };

    return <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
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
            autocomplete="off"
        />
    </form>
};

export default SearchBar;