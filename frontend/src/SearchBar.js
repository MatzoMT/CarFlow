import './SearchBar.css';
import './index.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const navigate = useNavigate();
    const onSubmit = e => {
        navigate('/home');
        e.preventDefault()
    };
    const onFocus = () => {
        document.getElementById("search-results").style.display = "block";
        };

    const onBlur = () => {
        setTimeout(function(){
            document.getElementById("search-results").style.display = "none";
            document.getElementById("search-results").style.display = "font-family: 'Quicksand'";

        }, 300); 
    
    };


    return <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search a vehicle</span>
        </label>
        <input
            type="text"
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            class="header-search"
            placeholder="Search by year, make, model..."
            name="s"
            onFocus={onFocus}
            onBlur={onBlur}
            autocomplete="off"
        />


    </form>
};

export default SearchBar;