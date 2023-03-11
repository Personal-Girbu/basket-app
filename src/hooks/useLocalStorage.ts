import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = (newValue: T) => void;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const storageItem = localStorage.getItem(key);
  const storageValue = storageItem
    ? (JSON.parse(storageItem ?? '') as T)
    : initialValue;

  const [storedValue, setStoredValue] = useState<T>(storageValue);

  const setValue = useCallback<SetValue<T>>(
    newValue => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    },
    [key]
  );

  useEffect(() => {
    if (!storageItem) {
      setValue(initialValue);
    }
  }, [initialValue, setValue, storageItem]);

  return [storedValue, setValue];
}

export default useLocalStorage;
