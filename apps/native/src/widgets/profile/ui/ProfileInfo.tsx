
import { View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useAuth } from '~/entities/student/model/useAuth';

function ProfileInfo() {
    const { loggedUser } = useAuth();

    return (
        <View className="w-full flex items-center justify-center mt-16 gap-2">
            <Text className='text-3xl font-semibold'>{loggedUser?.name + " " + loggedUser?.surname}</Text>
            <View className='flex flex-row gap-4'>
                {loggedUser?.role && (
                    <Text className='text-muted-foreground py-1.5 px-4 bg-red font-semibold text-white rounded-full'>{loggedUser.role.name}</Text>
                )}

                <View className='flex flex-row gap-1 items-center'>
                    <Text className='font-semibold text-secondary text-lg'>{loggedUser?.scores}</Text>
                    <SvgXml width="14px" height="14px" xml={'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9BA3AE"><path d="m320-80 40-280H160l360-520h80l-40 320h240L400-80h-80Z"/></svg>'} />
                </View>
            </View>
        </View>
    );
}

export default ProfileInfo;