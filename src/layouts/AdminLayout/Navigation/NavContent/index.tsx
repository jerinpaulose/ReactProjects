import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import NavGroup from './NavGroup';

interface NavContentProps {
  navigation: {
    id: number;
    type: string;
    children?: {
      [key: string]: {
        id: number;
        type: string;
        title: string;
      };
    };
  }[];
}

const NavContent: React.FC<NavContentProps> = ({ navigation }) => {
  const navItems = navigation.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={'nav-group-' + item.id} group={item} />;
      default:
        return false;
    }
  });

  let mainContent: JSX.Element | null = null;

  mainContent = (
    <div className="navbar-content datta-scroll">
      <PerfectScrollbar>
        <ListGroup variant="flush" as="ul" bsPrefix=" " className="nav pcoded-inner-navbar" id="nav-ps-next">
          {navItems}
        </ListGroup>
      </PerfectScrollbar>
    </div>
  );

  return <React.Fragment>{mainContent}</React.Fragment>;
};

export default NavContent;
