import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

// Правильный пароль
const correctPassword = 'Ritsy'; // Здесь нужно указать правильный пароль

// Ключ для хранения в localStorage
const storageKey = 'tournamentAuthorized';

// Функция для проверки пароля
export const checkPassword = (password: string): boolean => {
    // Если введён текст "123456", перенаправляем на Рик Ролл
    if (password === '123456') {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        return false;
    }
    return password === correctPassword;
};

// Функция для сохранения авторизации в localStorage
export const saveAuthToLocalStorage = () => {
    localStorage.setItem(storageKey, 'true');
};

// Функция для проверки авторизации из localStorage
export const isAuthorizedFromLocalStorage = (): boolean => {
    return localStorage.getItem(storageKey) === 'true';
};

// Хук для управления авторизацией
export const useAuth = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        const storedAuth = isAuthorizedFromLocalStorage();
        if (storedAuth) {
            setIsAuthorized(true);
        }
    }, []);

    const handleCheckPassword = () => {
        if (checkPassword(password)) {
            setIsAuthorized(true);
            setErrorMessage('');
            saveAuthToLocalStorage();
        } else {
            setErrorMessage(t('TurnamentInfo.password.error'));
        }
    };

    return {
        isAuthorized,
        password,
        setPassword,
        handleCheckPassword,
        errorMessage,
        t
    };
};