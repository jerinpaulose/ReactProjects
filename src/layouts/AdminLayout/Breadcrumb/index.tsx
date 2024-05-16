import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import navigation, { MenuGroup, MenuCollapse, MenuItem, MenuItemType } from '../../../menu-items';
import { BASE_TITLE } from '../../../config/constant';

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  const [main, setMain] = useState<MenuGroup | MenuCollapse | MenuItem[]>([]);
  const [item, setItem] = useState<MenuItem>();

  useEffect(() => {
    navigation.items.forEach((menuItem) => {
      if (menuItem.type === 'group') {
        getCollapse(menuItem as MenuGroup, Number(menuItem.id)); // Explicitly cast to number
      }
    });
  }, []);

  const getCollapse = (item: MenuGroup | MenuCollapse, index: number) => {
    if (item.children) {
      item.children.forEach((collapse: MenuItemType) => {
        if (collapse.type === 'collapse') {
          getCollapse(collapse as MenuCollapse, index);
        } else if (collapse.type === 'item') {
          if (location.pathname === (collapse as MenuItem).url) {
            setMain(item);
            setItem(collapse as MenuItem);
          }
        }
      });
    }
  };

  let mainContent: JSX.Element | null = null;
  let itemContent: JSX.Element | null = null;
  let breadcrumbContent: JSX.Element | null = null;
  let title = '';

  if (main && ('type' in main) && main.type === 'collapse') {
    mainContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{(main as MenuCollapse).title}</Link>
      </ListGroup.Item>
    );
  }

  if (item && item.type === 'item') {
    title = item.title;
    itemContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{title}</Link>
      </ListGroup.Item>
    );

    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <>
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="page-header-title">
                    <h5 className="m-b-10">{title}</h5>
                  </div>
                  <ListGroup as="ul" bsPrefix=" " className="breadcrumb">
                    <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                      <Link to="/">
                        <i className="feather icon-home" />
                      </Link>
                    </ListGroup.Item>
                    {mainContent}
                    {itemContent}
                  </ListGroup>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    document.title = title + BASE_TITLE;
  }

  return <>{breadcrumbContent}</>;
};

export default Breadcrumb;
