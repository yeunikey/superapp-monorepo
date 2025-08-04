import { useEffect, useRef } from 'react';

import { Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/shared/types/root';
import { useAuth } from '~/entities/student/model/useAuth';

const useLoaderAnimation = (navigation: NativeStackNavigationProp<RootStackParamList>) => {
    const progressAnim = useRef(new Animated.Value(0)).current;
    const { isAuth } = useAuth.getState();

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: 4,
            duration: 5000,
            useNativeDriver: false,
        }).start(() => {
            navigation.navigate(isAuth ? 'Main' : 'Auth', {
                animation: 'slide_from_right',
            });
        });
    }, [navigation, progressAnim]);

    const animatedWidth = progressAnim.interpolate({
        inputRange: [0, 1, 3, 4],
        outputRange: ['0%', '10%', '90%', '100%'],
    });

    return { animatedWidth };
}

export { useLoaderAnimation };