import React, { useState } from 'react';
import { Dropdown, Card, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface MainCardProps {
  isOption?: boolean;
  title?: string;
  children?: React.ReactNode;
  cardClass?: string;
  optionClass?: string;
}

const MainCard: React.FC<MainCardProps> = (props) => {
  const { isOption, title, children, cardClass, optionClass } = props;

  const [collapseCard, setCollapseCard] = useState<boolean>(false);
  const [loadCard, setLoadCard] = useState<boolean>(false);
  const [cardRemove, setCardRemove] = useState<boolean>(false);

  const cardReloadHandler = () => {
    setLoadCard(true);
    setInterval(() => {
      setLoadCard(false);
    }, 3000);
  };

  const cardRemoveHandler = () => {
    setCardRemove(true);
  };

  let loader: JSX.Element | null = null;
  let cardHeaderRight: JSX.Element | null = null;
  let card: JSX.Element | null = null;
  let mainCardClass: string[] = [];

  if (isOption) {
    cardHeaderRight = (
      <div className={'card-header-right ' + (optionClass || '')}>
        <Dropdown align="end" className="btn-group card-option">
          <Dropdown.Toggle id="dropdown-basic" className="btn-icon">
            <i className="feather icon-more-horizontal" />
          </Dropdown.Toggle>
          <Dropdown.Menu as="ul" className="list-unstyled card-option">
            <Dropdown.Item as="li" className="dropdown-item" onClick={() => setCollapseCard(!collapseCard)}>
              <i className={collapseCard ? 'feather icon-plus' : 'feather icon-minus'} />
              <Link to="#"> {collapseCard ? 'Expand' : 'Collapse'} </Link>
            </Dropdown.Item>
            <Dropdown.Item as="li" className="dropdown-item" onClick={cardReloadHandler}>
              <i className="feather icon-refresh-cw" />
              <Link to="#"> Reload </Link>
            </Dropdown.Item>
            <Dropdown.Item as="li" className="dropdown-item" onClick={cardRemoveHandler}>
              <i className="feather icon-trash" />
              <Link to="#"> Remove </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  const cardHeader = (
    <Card.Header>
      <Card.Title as="h5">{title}</Card.Title>
      {cardHeaderRight}
    </Card.Header>
  );

  if (loadCard) {
    mainCardClass = [...mainCardClass, 'card-load'];
    loader = (
      <div className="card-loader">
        <i className="pct-loader1 anim-rotate" />
      </div>
    );
  }

  if (cardRemove) {
    mainCardClass = [...mainCardClass, 'd-none'];
  }

  if (cardClass) {
    mainCardClass = [...mainCardClass, cardClass];
  }

  card = (
    <Card className={mainCardClass.join(' ')}>
      {cardHeader}
      <Collapse in={!collapseCard}>
        <div>
          <Card.Body>{children}</Card.Body>
        </div>
      </Collapse>
      {loader}
    </Card>
  );

  return <React.Fragment>{card}</React.Fragment>;
};

export default MainCard;
