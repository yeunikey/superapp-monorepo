import * as SecureStore from 'expo-secure-store';

import { Alert, TextInput } from "react-native";
import { useRef, useState } from "react";

import { ApiResponse } from "~/types";
import { User } from "~/entities/student/types/user";
import { api } from "~/shared/api/instance";
import { useAuth } from "~/entities/student/model/useAuth";
import { useNavigationTabs } from "~/shared/lib/useNavigationTabs";

export function useAuthForm() {
    const [type, setType] = useState<'login' | 'code'>('login');
    const [barcode, setBarcode] = useState('');
    const [code, setCode] = useState(['', '', '', '']);

    const { setLoggedUser, setAuth, setLoading, isLoading, setToken } = useAuth();
    const navigation = useNavigationTabs();

    const inputRefs = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
    ];

    const handleCodeChange = (value: string, index: number) => {
        if (/^\d?$/.test(value)) {
            const updated = [...code];
            updated[index] = value;
            setCode(updated);

            if (value && index < 3) inputRefs[index + 1].current?.focus();
            if (!value && index > 0) inputRefs[index - 1].current?.focus();
        }
    };

    const handleAuth = async () => {
        if (isLoading) return;
        setLoading(true);

        try {
            if (type === 'login') {
                if (!barcode) return Alert.alert("Ошибка", "Введите баркод");

                const res = await api.post<ApiResponse<unknown>>('auth/code', { barcode });
                setType('code');

                if (res.data.statusCode !== 200) {
                    Alert.alert("Ошибка", res.data.message);
                }

            } else {
                const enteredCode = code.join('');
                const res = await api.post<ApiResponse<{ token: string, user: User }>>('auth/confirm', {
                    barcode,
                    code: enteredCode,
                });

                if (res.data.statusCode !== 200) {
                    Alert.alert("Ошибка", res.data.message);
                } else {
                    const token = res.data.data.token;
                    const user = res.data.data.user;

                    setAuth(true);
                    setLoggedUser(user);
                    setToken(token);
                    await SecureStore.setItemAsync('token', token);

                    navigation.navigate('Main', { animation: 'slide_from_right' });
                }
            }
        } catch (err: any) {
            console.error(err);
            Alert.alert("Ошибка", err?.response?.data?.message ?? 'Что-то пошло не так');
        } finally {
            setLoading(false);
        }
    };

    return {
        type,
        barcode,
        code,
        isLoading,
        inputRefs,
        handleCodeChange,
        setBarcode,
        handleAuth
    };
}
