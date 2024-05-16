
import React from 'react';
import Progress from './Progress';

const Loader: React.FC = () => {
  return (
    <React.Fragment>
      <Progress isFinished={false} progress={0.5} animationDuration={300} />
    </React.Fragment>
  );
};

export default Loader;
