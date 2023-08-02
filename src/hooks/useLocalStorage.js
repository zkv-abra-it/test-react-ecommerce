import { useState, useEffect } from 'react'

export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const storageValue = localStorage.getItem(key);
        return storageValue !== null
            ? JSON.parse(storageValue)
            : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}