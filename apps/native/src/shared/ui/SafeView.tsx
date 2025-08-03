import { View } from "react-native";
import { cn } from "../module/merge";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeViewProps = {
    children?: React.ReactNode;
    className?: string;
}

function SafeView({ children, className }: SafeViewProps) {
    const insets = useSafeAreaInsets();

    return (
        <View className={cn(className, 'flex-1')} style={{ paddingTop: insets.top }}>
            {children}
        </View>
    );
}

export default SafeView;