import { View } from 'react-native';
import { useAuth } from '~/entities/student/model/useAuth';
import Avatar from '~/shared/ui/Avatar';

function ProfileAvatar() {

    const { loggedUser } = useAuth();

    return (
        <View className='w-full relative flex items-center justify-center'>
            <View className='absolute w-32 h-32 bg-background flex items-center justify-center rounded-full -top-20'>
                {loggedUser && <Avatar user={loggedUser} className='bg-white w-28 h-28' textContainer='text-4xl' />}
            </View>
        </View>
    );
}

export default ProfileAvatar;