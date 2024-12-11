import { useCallback } from "react";

export default function useLocalStorage<T>(initValue: T) {
  const getItemFromLocalStorage = useCallback((key: string) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    } else {
      return initValue;
    }
  }, []);

  const setItemToLocalStorage = useCallback((key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
  }, []);

  return {
    getItemFromLocalStorage,
    setItemToLocalStorage,
  };
}
