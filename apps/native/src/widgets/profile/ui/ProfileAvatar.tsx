import { View, Image } from 'react-native';

function ProfileAvatar() {
    return (
        <View className='w-full relative flex items-center justify-center'>
            <View className='absolute w-32 h-32 bg-background flex items-center justify-center rounded-full -top-20'>
                <Image
                    source={require('@assets/images/avatar.jpg')}
                    className='w-28 h-28 aspect-square rounded-full'
                />
            </View>
        </View>
    );
}

export default ProfileAvatar;