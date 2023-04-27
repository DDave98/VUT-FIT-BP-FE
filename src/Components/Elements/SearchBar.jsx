
const SearchBar = (
{
    onChange, 
    placeholder = "Hledat"
}) =>
{
    return (
        <>
            {/* <!-- searchbar --> */}
            <input 
                type="text"
                id="myInput"
                className="SearchBar"
                onKeyUp="FilterBySearch()"
                placeholder={placeholder}
                title="Type in a name" />
        </>
    );
}

export default SearchBar;