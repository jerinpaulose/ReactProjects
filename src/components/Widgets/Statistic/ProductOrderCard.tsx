import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ProductOrderCardProps {
  image: string;
  orderId: number;
  name: string;
  rating?: number;
  price: number;
  delivered: string; // Change to string if it's a date string
  ordered: string; // Change to string if it's a date string
  description: string;
  total: number;
}

const ProductOrderCard: React.FC<ProductOrderCardProps> = ({
  image,
  orderId,
  name,
  rating,
  price,
  delivered,
  ordered,
  description,
  total,
}) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Row className="align-items-center justify-content-between">
            <Col>
              <div className="btn btn-primary">{orderId}</div>
            </Col>
            <Col className="text-right">
              <button className="btn btn-outline-primary">
                <i className="feather icon-map-pin" /> track
              </button>
            </Col>
          </Row>
          <div className="table-responsive">
            <table className="table m-0 mt-3">
              <tbody>
                <tr>
                  <td className="align-middle">
                    <img src={image} alt="contact-img" title="contact-img" className="rounded mr-3" height="80" />
                    <div className="m-0 d-inline-block align-middle font-16">
                      <Link to="#" className="text-body">
                        <h6 className="d-inline-block">{name}</h6>
                      </Link>
                      <br />
                      {rating &&
                        Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={`text-warning feather icon-star${rating >= i + 1 ? '-on' : ''}`}
                          />
                        ))}
                    </div>
                  </td>
                  <td>
                    <h5>${price}</h5>
                  </td>
                  <td className="text-right">
                    <div className="text-start d-inline-block">
                      <h6 className="my-0">Delivered on {delivered}</h6>
                      <small className="text-muted">{description}</small>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr className="mt-0" />
          <Row className="align-items-center justify-content-between">
            <Col>
              <span className="text-muted mr-1">Ordered On</span>
              <strong>{ordered}</strong>
            </Col>
            <Col className="text-right">
              <span className="text-muted mr-1">Ordered Amount</span>
              <strong>${total}</strong>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductOrderCard;
