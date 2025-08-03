import { Text } from "react-native";
import { cn } from "../module/merge";
import PressableScale from "./PressableScale";

type ButtonProps = {
    className?: string;
    onPress?: () => void;
    label: string;
}

function Button({ label, className, onPress }: ButtonProps) {
    return (
        <PressableScale onPress={onPress} className="w-full py-4 px-16 bg-primary rounded-3xl flex items-center">
            <Text className={cn("text-white text-2xl font-semibold", className)}>{label}</Text>
        </PressableScale>
    );
}

export default Button;