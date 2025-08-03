import { Animated, View } from "react-native";

type LoaderProps = {
    animatedWidth?: Animated.AnimatedInterpolation<string | number>;
}

function LoaderProgress({ animatedWidth }: LoaderProps) {
    return (
        <View className="relative mt-12 h-2 w-36 bg-background rounded-[32px]">
            <Animated.View className="absolute left-0 top-0 h-full bg-primary rounded-l-[32px]" style={{ width: animatedWidth }} />
        </View>
    );
}

export default LoaderProgress;