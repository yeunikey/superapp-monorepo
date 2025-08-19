import { useEffect, useRef } from "react";

import { Animated } from "react-native";
import { cn } from "../module/merge";

type LoadingType = {
    className?: string
}

function Loading({ className }: LoadingType) {

    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );
        loop.start();

        return () => loop.stop();
    }, [rotateAnim]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <Animated.View style={{ transform: [{ rotate: spin }] }}
            className={cn(
                "w-12 h-12 rounded-full border-[5px] border-primary border-t-transparent",
                className
            )}
        />
    );
}

export default Loading;