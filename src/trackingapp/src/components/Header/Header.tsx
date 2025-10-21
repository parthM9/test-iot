import Search from '../Search';
import './Header.scss';

function Header(_props: any) {

  return(
    <header className="App-header">
      <div className={
        `d-flex d-lg-none px-3 px-sm-5 py-3 position-relative header-inner`
      }>
        {/* Menu Button */}
        <button type="button"
          className={
            `p-2 bg-white border rounded-circle d-flex align-items-center
            justify-content-center shadow pointer-all`
          }
          aria-label="Open Menu"
          onClick={() => _props.onOpen(true)}
        >
          <span className="material-icons">menu</span>
        </button>
        {/* Search button */}
        <Search 
          loading={_props.isLoading}
          showSearch={_props.showSearch}
          onShowSearch={_props.onShowSearch}
        />
      </div>
    </header>
  )
}

export default Header;