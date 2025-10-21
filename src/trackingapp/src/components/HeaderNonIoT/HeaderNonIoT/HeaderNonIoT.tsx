
import Search from '../../Search';
import './HeaderNonIoT.scss';
import fpLogo from '../../../assets/vectors/fp-logo.svg';
import React from 'react';


function HeaderNonIot(_props: any) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  
  return(
    <header className={`HeaderNonIoT bg-white shadow shadow-sm ${_props.className}`}>
      <div className={`d-flex header-inner align-items-center px-4 py-3 
      position-relative container`}
      >
        <a href="http://www.freightpeople.com.au" className="d-block">
          <img src={fpLogo} 
            className="img-fluid me-auto fp-logo" 
            alt="Freight People Logo"
          />
        </a>
        {/* Search button */}
        <Search 
          loading={_props.isLoading}
          showSearch={searchOpen}
          onShowSearch={setSearchOpen}
        />
      </div>
    </header>
  )
}

export default HeaderNonIot;