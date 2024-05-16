import React from 'react';
import { ListGroup } from 'react-bootstrap';
import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';

interface NavGroupProps {
  layout: string;
  group: {
    id: number;
    title: string;
    children?: {
      [key: string]: {
        id: number;
        type: string;
        title: string;
      };
    };
  };
}

const NavGroup: React.FC<NavGroupProps> = ({ layout, group }) => {
  let navItems: JSX.Element | false = '';

  if (group.children) {
    const groups = group.children;
    navItems = Object.keys(groups).map((itemKey) => {
      const item = groups[itemKey];
      switch (item.type) {
        case 'collapse':
          return <NavCollapse key={item.id} collapse={item} type="main" />;
        case 'item':
          return <NavItem layout={layout} key={item.id} item={item} />;
        default:
          return false;
      }
    });
  }

  return (
    <React.Fragment>
      <ListGroup.Item as="li" bsPrefix=" " key={group.id} className="nav-item pcoded-menu-caption">
        <label>{group.title}</label>
      </ListGroup.Item>
      {navItems}
    </React.Fragment>
  );
};

export default NavGroup;
