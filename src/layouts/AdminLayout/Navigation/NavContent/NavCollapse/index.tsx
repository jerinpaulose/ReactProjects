import React, { useContext, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NavItem from '../NavItem';
import LoopNavCollapse from './index';
import NavIcon from '../NavIcon';
import NavBadge from '../NavBadge';

import { ConfigContext } from '../../../../../contexts/ConfigContext';
import * as actionType from '../../../../../store/actions';

interface NavCollapseProps {
  collapse: {
    id: number;
    title: string;
    icon?: string;
    children?: {
      [key: string]: {
        id: number;
        type: string;
        title: string;
        icon?: string;
      };
    };
  };
  type: string;
}

const NavCollapse: React.FC<NavCollapseProps> = ({ collapse, type }) => {
  const configContext = useContext(ConfigContext);
  const { dispatch } = configContext;

  const { layout, isOpen, isTrigger } = configContext.state;

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === collapse.id.toString());
    if (currentIndex > -1) {
      dispatch({ type: actionType.COLLAPSE_TOGGLE, menu: { id: collapse.id, type: type } });
    }
  }, [collapse, dispatch, type]);

  let navItems: JSX.Element | false = '';
  if (collapse.children) {
    const collapses = collapse.children;
    navItems = Object.keys(collapses).map((itemKey) => {
      const item = collapses[itemKey];
      switch (item.type) {
        case 'collapse':
          return <LoopNavCollapse key={item.id} collapse={item} type="sub" />;
        case 'item':
          return <NavItem layout={layout} key={item.id} item={item} />;
        default:
          return false;
      }
    });
  }

  let itemTitle: JSX.Element | string = collapse.title;
  if (collapse.icon) {
    itemTitle = <span className="pcoded-mtext">{collapse.title}</span>;
  }

  let navLinkClass: string[] = ['nav-link'];

  let navItemClass: string[] = ['nav-item', 'pcoded-hasmenu'];
  const openIndex = isOpen.findIndex((id) => id === collapse.id);
  if (openIndex > -1) {
    navItemClass = [...navItemClass, 'active'];
  }

  const triggerIndex = isTrigger.findIndex((id) => id === collapse.id);
  if (triggerIndex > -1) {
    navItemClass = [...navItemClass, 'pcoded-trigger'];
  }

  const currentIndex = document.location.pathname
    .toString()
    .split('/')
    .findIndex((id) => id === collapse.id.toString());
  if (currentIndex > -1) {
    navItemClass = [...navItemClass, 'active'];
  }

  const subContent = (
    <React.Fragment>
      <Link
        to="#"
        className={navLinkClass.join(' ')}
        onClick={() => dispatch({ type: actionType.COLLAPSE_TOGGLE, menu: { id: collapse.id, type: type } })}
      >
        <NavIcon items={collapse} />
        {itemTitle}
        <NavBadge items={collapse} />
      </Link>
      <ListGroup variant="flush" bsPrefix=" " as="ul" className={'pcoded-submenu'}>
        {navItems}
      </ListGroup>
    </React.Fragment>
  );

  let mainContent: JSX.Element | null = null;

  mainContent = (
    <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
      {subContent}
    </ListGroup.Item>
  );

  return <React.Fragment>{mainContent}</React.Fragment>;
};

export default NavCollapse;
