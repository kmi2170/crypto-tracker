import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initValue: T) {
  const [value, setValue] = useState<T>(initValue);

  //to avoid the reference error to localStorage
  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue != null) {
      setValue(JSON.parse(storedValue) as T);
    }
  }, [key]);

  // const [value, setValue] = useState<T>(() => {
  //   const storedValue = localStorage.getItem(key);
  //   if (storedValue != null) {
  //     return JSON.parse(storedValue) as T;
  //   }
  //   return initValue;
  // });

  const setValueToLocalStorage = useCallback((key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  }, []);

  return { value, setValueToLocalStorage };
}
