"use client";

import { useCallback } from "react";

export default function useLocalStorage<T>(key: string, initValue: T) {
  const getItemFromLocalStorage = () => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initValue;
  };

  const setItemToLocalStorage = useCallback((value: T) => {
    const valueToStore = JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
    window.dispatchEvent(new Event("storage"));
  }, []);

  return {
    getItemFromLocalStorage,
    setItemToLocalStorage,
  };
}
