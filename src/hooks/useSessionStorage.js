import { useState, useEffect } from 'react'

export function useSessionStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const storageValue = sessionStorage.getItem(key);
        return storageValue !== null
            ? JSON.parse(storageValue)
            : defaultValue;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}