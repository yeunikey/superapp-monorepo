import { Text, View } from "react-native";

import { ReactNode } from "react";
import SafeView from "./SafeView";
import { SvgXml } from "react-native-svg";
import { cn } from "../module/merge";
import { useNavigation } from "@react-navigation/native";

type TabProps = {
    children?: ReactNode;
    title: string;
    className?: string;
}

function Tab({ children, title, className }: TabProps) {
    const navigation = useNavigation();

    return (
        <SafeView className="flex-1 bg-white">
            <View className="bg-background flex-1">
                <View className='relative flex justify-center items-center bg-white p-6 pt-3 rounded-b-[32px] '>
                    <Text className='text-2xl font-semibold'>{title}</Text>

                    <View className="absolute right-6 top-3" onTouchEnd={navigation.goBack}>
                        <SvgXml width="28px" height="28px" xml={'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9BA3AE"><path d="m480-424 116 116q11 11 28 11t28-11q11-11 11-28t-11-28L536-480l116-116q11-11 11-28t-11-28q-11-11-28-11t-28 11L480-536 364-652q-11-11-28-11t-28 11q-11 11-11 28t11 28l116 116-116 116q-11 11-11 28t11 28q11 11 28 11t28-11l116-116ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"/></svg>'} />
                    </View>
                </View>

                <View className={cn("flex-1 bg-background", className)}>
                    {children}
                </View>
            </View>
        </SafeView>
    );
}

export default Tab;