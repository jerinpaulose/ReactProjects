import React from 'react';
import { Alert } from 'react-bootstrap';

interface NotificationProps {
  message?: string;
  link?: string;
}

const Notification: React.FC<NotificationProps> = ({ message, link }) => {
  return (
    <React.Fragment>
      <Alert variant="warning">
        {message}
        <Alert.Link href={link} target="_blank" className="float-right">
          Demo & Documentation
        </Alert.Link>
      </Alert>
    </React.Fragment>
  );
};

export default Notification;
