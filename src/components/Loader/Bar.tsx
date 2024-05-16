import React from 'react';

interface BarProps {
  animationDuration?: number;
  progress?: number;
}

const Bar: React.FC<BarProps> = ({ animationDuration, progress }) => {
  return (
    <div
      style={{
        background: '#fff',
        height: 2,
        left: 0,
        marginLeft: `${(-1 + (progress || 0)) * 100}%`,
        position: 'fixed',
        top: 0,
        transition: `margin-left ${animationDuration || 0}ms linear`,
        width: '100%',
        zIndex: 1031
      }}
    >
      <div
        style={{
          boxShadow: '0 0 10px #29d, 0 0 5px #29d',
          display: 'block',
          height: '100%',
          opacity: 1,
          position: 'absolute',
          right: 0,
          transform: 'rotate(3deg) translate(0px, -4px)',
          width: 100
        }}
      />
    </div>
  );
};

export default Bar;
