import { Animated, TouchableWithoutFeedback } from "react-native";
import { useRef } from "react";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    onPress?: () => void;
    className?: string;
};

export default function PressableScale({ children, onPress, className }: Props) {
    const scale = useRef(new Animated.Value(1)).current;

    const pressIn = () => {
        Animated.spring(scale, {
            toValue: 1.025,
            useNativeDriver: true,
        }).start();
    };

    const pressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={pressIn}
            onPressOut={pressOut}
            onPress={onPress}
        >
            <Animated.View style={{ transform: [{ scale }] }} className={className}>
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}