import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

interface ProductCardProps {
  params: {
    class?: string;
    icon?: string;
    primaryText?: string;
    secondaryText?: string;
    title?: string;
    extraText?: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ params }) => {
  let cardClass: string[] = ['prod-p-card'];
  if (params.class) {
    cardClass = [...cardClass, params.class];
  }

  let iconClass: string[] = ['text-white'];
  if (params.icon) {
    iconClass = [...iconClass, params.icon];
  }

  let rowClass: string[] = ['align-items-center'];
  if (params.secondaryText) {
    rowClass = [...rowClass, 'm-b-25'];
  }

  return (
    <Card className={cardClass.join(' ')}>
      <Card.Body>
        <Row className={rowClass.join(' ')}>
          <Col>
            <h6 className="m-b-5 text-white">{params.title}</h6>
            <h3 className="m-b-0 text-white">{params.primaryText}</h3>
          </Col>
          <Col sm="auto">
            <i className={iconClass.join(' ')} />
          </Col>
        </Row>
        <p className="m-b-0 text-white">{params.secondaryText}</p>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
