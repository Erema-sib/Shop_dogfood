import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debVal, setDebVal] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebVal(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debVal;
};

export default useDebounce;
