import { View, Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { pages } from "../model/pages";
import { useNavigationState } from "@react-navigation/native";
import { cn } from "~/shared/module/merge";
import { useNavigationTabs } from "~/shared/lib/useNavigationTabs";
import { handleNavigate } from "../model/navigation";

function Navigation() {
    const navigation = useNavigationTabs();

    const currentRouteName = useNavigationState(state => {
        const route = state.routes[state.index];
        return route.name;
    });

    return (
        <View className='flex flex-row gap-3 justify-center items-center bg-white pt-3 pb-10 rounded-t-[32px]'>
            {pages.map((page, i) => (
                <TouchableOpacity key={i} onPress={() => handleNavigate(navigation, currentRouteName, page.key)}>
                    <View className='flex flex-col w-24 items-center justify-center gap-1'>
                        <SvgXml width="28px" height="28px" fill={page.key === currentRouteName ? "#3D6390" : "#9BA3AE"} xml={page.icon} />
                        <Text className={cn('font-semibold', page.key === currentRouteName ? 'text-primary' : 'text-secondary')}>{page.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default Navigation;