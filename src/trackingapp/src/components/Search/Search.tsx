import React, { useCallback } from "react";
import './Search.scss';
import { useHistory } from "react-router-dom";

function Search(_props: any) {
  const { showSearch, onShowSearch, loading } = _props;
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [inputRef, setInputRef] = React.useState<any>(null);
  const history = useHistory();

  /**
   * Open/Close the search bar
   */
  const toggleSearch = useCallback((bool: boolean) => {
    setSearchOpen(bool); // Update this component state
    onShowSearch(bool); // Update the parent  
  }, [onShowSearch])

  React.useEffect(() => {
    toggleSearch(showSearch);
    // If the search is open, focus on the input
    if (showSearch && inputRef) { inputRef.focus() }
  }, [showSearch, inputRef, toggleSearch])

  return <React.Fragment>
    {
      !searchOpen && <button type="button"
        onClick={() => {
          inputRef.value = '';
          inputRef.focus();
          toggleSearch(true)
        }}
        className={
          `ms-auto p-2 bg-white border rounded-circle d-flex shadow
          align-items-center justify-content-center pointer-all search-button`
        }
        aria-label="Open Menu"
      >
        <span className="material-icons">search</span>
      </button>
    }

    <div className={
      `overflow-hidden search-wrapper position-absolute rounded-pill d-flex 
      align-items-center 
      ${searchOpen ? 'open border bg-white shadow' : '' }`
    }>
      <input type="text"
        ref={setInputRef}
        className="border-0 form-control bg-white ms-2 search-input"
        placeholder="Enter consignment number"
        disabled={loading}
        onKeyPress={(e) => {
          const target: any = e.target;
          const query = target.value;
          // If the user hits enter button. Redirect to find consignment
          if (e.key === 'Enter' && query) {
            history.push(`/${query}`);
          }
        }}
      />
      {
        loading ? (
          <div className="ms-auto me-4">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <button type="button"
            onClick={() => toggleSearch(false)}
            className={
              `bg-transparent border-0 btn-sm btn d-flex align-items-center
              ms-auto me-2 search-button`
            }>
            <span className="material-icons md-18">close</span>
          </button>
        )
      }
    </div>
  </React.Fragment>
}

export default Search;