import { Text } from "react-native";
import { cn } from "../module/merge";
import PressableScale from "./PressableScale";

type ButtonProps = {
    className?: string;
    onPress?: () => void;
    label: string;
    textContainer?: string;
}

function Button({ label, className, textContainer, onPress }: ButtonProps) {
    return (
        <PressableScale onPress={onPress} className={cn("w-full py-4 px-16 bg-primary rounded-3xl flex items-center", className)}>
            <Text className={cn("text-white text-2xl font-semibold", textContainer)}>{label}</Text>
        </PressableScale >
    );
}

export default Button;