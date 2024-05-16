import React from 'react';

interface ContainerProps {
  animationDuration?: number;
  children?: React.ReactNode;
  isFinished?: boolean;
}

const Container: React.FC<ContainerProps> = ({ animationDuration, children, isFinished }) => {
  return (
    <div
      style={{
        opacity: isFinished ? 0 : 1,
        pointerEvents: 'none',
        transition: `opacity ${animationDuration || 0}ms linear`
      }}
    >
      {children}
    </div>
  );
};

export default Container;
