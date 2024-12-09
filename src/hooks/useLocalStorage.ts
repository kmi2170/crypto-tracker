import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initValue: T) {
  const [value, setValue] = useState<T>(initValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue != null) {
      setValue(JSON.parse(storedValue) as T);
    }
  }, [key]);

  const setValueToLocalStorage = useCallback((key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  }, []);

  return { value, setValueToLocalStorage };
}
