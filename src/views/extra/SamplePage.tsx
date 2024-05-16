import React, { FC } from 'react';
import { Row, Col } from 'react-bootstrap';

import MainCard from '../../components/Card/MainCard';

const SamplePage: FC = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <MainCard title="Hello Card" isOption style={{ maxHeight: '100%', overflow: 'hidden' }}>
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&quot;
            </p>
          </MainCard>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SamplePage;
