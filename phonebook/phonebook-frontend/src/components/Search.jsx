const Search = (props) => {
  return (
    <div>
      search
      <input value={props.searchTerm} onChange={props.handleSearchTermChange} />
    </div>
  );
};
export default Search;
