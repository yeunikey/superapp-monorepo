import { View, Image, Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { useAuth } from "~/entities/student/model/useAuth";
import { useNavigationTabs } from "~/shared/lib/useNavigationTabs";

function TopInfo() {
    const { loggedStudent } = useAuth();
    const navigation = useNavigationTabs();

    return (
        <View className='flex flex-row justify-between items-center bg-white p-6 pt-3 rounded-b-[32px]'>
            <View className='flex flex-row gap-4 items-center'>
                <Image
                    source={require('@assets/images/avatar.jpg')}
                    className='w-12 h-12 aspect-square rounded-full'
                />
                <View className='flex flex-col gap-0.5'>
                    <Text className='text-lg font-semibold'>{loggedStudent?.name} {loggedStudent?.surname[0] + '.'}</Text>
                    <View className='flex flex-row gap-1 items-center'>
                        <Text className='font-semibold text-secondary'>{loggedStudent?.score}</Text>
                        <SvgXml width="12px" height="12px" xml={'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9BA3AE"><path d="m320-80 40-280H160l360-520h80l-40 320h240L400-80h-80Z"/></svg>'} />
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('NotificationsTab', {
                animation: 'slide_from_right'
            })}>
                <SvgXml width="28px" height="28px" xml={'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9BA3AE"><path d="M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z"/></svg>'} />
            </TouchableOpacity>
        </View>
    );
}

export default TopInfo;
