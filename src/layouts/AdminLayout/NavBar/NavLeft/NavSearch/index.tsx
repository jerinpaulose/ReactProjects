import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavSearchProps {
  windowWidth?: number;
}

const NavSearch: React.FC<NavSearchProps> = ({ windowWidth = 0 }) => {
  const [isOpen, setIsOpen] = useState<boolean>(windowWidth < 600);
  const [searchString, setSearchString] = useState<string>(windowWidth < 600 ? '100px' : '');

  const searchOnHandler = () => {
    if (windowWidth && windowWidth < 600) {
      const navbarRight = document.querySelector('#navbar-right');
      if (navbarRight) navbarRight.classList.add('d-none');
    }
    setIsOpen(true);
    setSearchString('100px');
  };

  const searchOffHandler = () => {
    setIsOpen(false);
    setSearchString('0');
    setTimeout(() => {
      if (windowWidth && windowWidth < 600) {
        const navbarRight = document.querySelector('#navbar-right');
        if (navbarRight) navbarRight.classList.remove('d-none');
      }
    }, 500);
  };

  let searchClass: string[] = ['main-search'];
  if (isOpen) {
    searchClass = [...searchClass, 'open'];
  }

  return (
    <React.Fragment>
      <div id="main-search" className={searchClass.join(' ')}>
        <div className="input-group">
          <input
            type="text"
            id="m-search"
            className="form-control"
            placeholder="Search . . ."
            style={{ width: searchString }}
          />
          <Link to="#" className="input-group-append search-close" onClick={searchOffHandler}>
            <i className="feather icon-x input-group-text" />
          </Link>
          <span
            onKeyDown={searchOnHandler}
            role="button"
            tabIndex={0}
            className="input-group-append search-btn btn btn-primary"
            onClick={searchOnHandler}
            style={{ borderRadius: '50%', marginLeft: 5 }}
          >
            <i className="feather icon-search input-group-text" />
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavSearch;
