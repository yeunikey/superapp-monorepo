import { useEffect, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';

import { Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/shared/types/root';
import { useAuth } from '~/entities/student/model/useAuth';
import { ApiResponse } from '~/types';
import { api } from '~/shared/api/instance';
import { User } from '~/entities/student/types/user';

const useLoaderAnimation = (navigation: NativeStackNavigationProp<RootStackParamList>) => {
    const progressAnim = useRef(new Animated.Value(0)).current;
    const { isAuth, setAuth, setLoading, setLoggedUser, setToken } = useAuth.getState();

    const checkAuth = async () => {
        const token = await SecureStore.getItemAsync('token');

        setAuth(token == null ? false : true);
        setLoading(false);

        return token == null ? false : true
    }

    const navigate = async () => {

        const auth = await checkAuth();

        if (auth) {
            const token = await SecureStore.getItemAsync('token');

            const res = await api.get<ApiResponse<User>>('/profile', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            setLoggedUser(res.data.data)
            setToken(token ?? '');
        }

        navigation.navigate(auth ? 'Main' : 'Auth', {
            animation: 'slide_from_right',
        });
    }

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: 4,
            duration: 5000,
            useNativeDriver: false,
        }).start(() => {
            navigate()
        });
    }, [navigation, progressAnim]);

    const animatedWidth = progressAnim.interpolate({
        inputRange: [0, 1, 3, 4],
        outputRange: ['0%', '10%', '90%', '100%'],
    });

    return { animatedWidth };
}

export { useLoaderAnimation };