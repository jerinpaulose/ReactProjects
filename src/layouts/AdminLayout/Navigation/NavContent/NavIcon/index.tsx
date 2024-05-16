import React from 'react';

interface NavIconProps {
  items: {
    icon?: string;
  };
}

const NavIcon: React.FC<NavIconProps> = ({ items }) => {
  let navIcons: JSX.Element | false = false;
  if (items.icon) {
    navIcons = (
      <span className="pcoded-micon">
        <i className={items.icon} />
      </span>
    );
  }

  return <React.Fragment>{navIcons}</React.Fragment>;
};

export default NavIcon;
