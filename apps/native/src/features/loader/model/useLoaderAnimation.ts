import { useEffect, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Animated } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/shared/types/root';

import { api } from '~/shared/api/instance';
import { ApiResponse } from '~/types';
import { useAuth } from '~/entities/student/model/useAuth';
import { User } from '~/entities/student/types/user';

type LoaderAnimationProps = {
    navigation: NativeStackNavigationProp<RootStackParamList>;
};

export function useLoaderAnimation({ navigation }: LoaderAnimationProps) {
    const progressAnim = useRef(new Animated.Value(0)).current;
    const {
        setAuth,
        setLoading,
        setLoggedUser,
        setToken
    } = useAuth.getState();

    const checkAuth = async (): Promise<boolean> => {
        const token = await SecureStore.getItemAsync('token');

        const isAuthenticated = Boolean(token);
        setAuth(isAuthenticated);
        setLoading(false);

        return isAuthenticated;
    };

    const navigateAfterAuth = async () => {
        let isAuthenticated = await checkAuth();

        if (isAuthenticated) {
            try {
                const token = await SecureStore.getItemAsync('token');

                const res = await api.get<ApiResponse<User>>('/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.statusCode === 200) {
                    setLoggedUser(res.data.data);
                    setToken(token ?? '');
                } else {
                    setAuth(false);
                    isAuthenticated = false;
                }
            } catch {
                setAuth(false);
                isAuthenticated = false;
            }
        }

        navigation.navigate(isAuthenticated ? 'Main' : 'Auth', {
            animation: 'slide_from_right'
        });
    };

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: 4,
            duration: 5000,
            useNativeDriver: false
        }).start(() => {
            navigateAfterAuth();
        });
    }, []);

    const animatedWidth = progressAnim.interpolate({
        inputRange: [0, 1, 3, 4],
        outputRange: ['0%', '10%', '90%', '100%']
    });

    return { animatedWidth };
}
