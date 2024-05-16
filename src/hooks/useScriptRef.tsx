import { useRef, useEffect } from 'react';

const useScriptRef = (): React.MutableRefObject<boolean> => {
  const scripted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      scripted.current = false;
    };
  }, []);

  return scripted;
};

export default useScriptRef;
