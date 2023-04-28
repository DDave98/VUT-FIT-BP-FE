
const SearchBar = (
{
    onChange,
    title = "zadejte hledaný řetězec",
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
                placeholder={placeholder}
                title={title}
                onChange={(e) => onChange(e.target.value)}/>
        </>
    );
}

export default SearchBar;