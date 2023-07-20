import PropsType from 'props-type';

export const Searchbar = ({ setDefaultPage, inputSearchText }) => {
  const formHandler = e => {
    e.preventDefault();

    inputSearchText(e.target.input.value);
    setDefaultPage();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={formHandler}>
        <button type="submit" className="SearchForm-button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="input"
        />
      </form>
    </header>
  );
};

Searchbar.propsType = {
  searchText: PropsType.string,
};
