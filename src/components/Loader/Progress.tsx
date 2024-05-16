// Progress.tsx
import React from 'react';
import Bar from './Bar';
import Container from './Container';
import Spinner from './Spinner';

interface ProgressProps {
  isAnimating?: boolean;
  isFinished?: boolean;
  progress?: number;
  animationDuration: number;
}

const Progress: React.FC<ProgressProps> = ({ isAnimating, isFinished, progress, animationDuration }) => {
  const shouldAnimate = isAnimating !== undefined ? isAnimating : !isFinished && progress !== undefined;

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={shouldAnimate ? progress || 0 : 0} />
      {shouldAnimate && <Spinner />}
    </Container>
  );
};

export default Progress;
