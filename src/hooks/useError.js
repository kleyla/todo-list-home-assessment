import { useEffect, useRef, useState } from "react";

export const useError = (initialError = "") => {
  const [error, setError] = useState(initialError);
  const timeoutIdRef = useRef();

  const setTimeoutError = () => {
    timeoutIdRef.current = setTimeout(() => {
      setError(null);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, []);

  return [error, setTimeoutError, setError];
};
