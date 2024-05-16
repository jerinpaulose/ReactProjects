import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface SocialCardProps {
  params: {
    class?: string;
    icon?: string;
    primaryTitle?: string;
    primaryText?: number;
    secondaryText?: string;
    variant?: string;
    label?: string;
  };
}

const SocialCard: React.FC<SocialCardProps> = ({ params }) => {
  let iconClass: string[] = ['d-block f-40'];
  if (params.class) {
    iconClass = [...iconClass, 'text-c-' + params.class];
  }
  if (params.icon) {
    iconClass = [...iconClass, params.icon];
  }

  return (
    <Card>
      <Card.Body className="text-center">
        <i className={iconClass.join(' ')} />
        <h4 className="m-t-20">
          <span className={'text-c-' + params.class}>{params.primaryTitle}</span> {params.primaryText}
        </h4>
        <p className="m-b-20">{params.secondaryText}</p>
        <Button variant={params.variant} className="btn-sm btn-round">
          {params.label}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SocialCard;
