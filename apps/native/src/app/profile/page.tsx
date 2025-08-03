

import { ScrollView, View, Text } from 'react-native';
import { APP_VERSION } from '~/shared/config/constants';

import Navigation from '~/widgets/navigation/ui/Navigation';
import ProfileAvatar from '~/widgets/profile/ui/ProfileAvatar';
import ProfileInfo from '~/widgets/profile/ui/ProfileInfo';
import ProfileList from '~/widgets/profile/ui/ProfileList';

function ProfilePage() {
    return (
        <View className='bg-background flex-1 relative'>

            <ScrollView className='py-80 flex-1 z-10'>
                <View className='relative rounded-t-[32px] rounded-b-[32px] bg-white'>

                    <ProfileAvatar />
                    <ProfileInfo />
                    <ProfileList />

                </View>
            </ScrollView>

            <Text className="text-[#C3C3C3] text-lg text-semibold w-full text-center absolute bottom-32">
                {APP_VERSION}
            </Text>

            <Navigation />

        </View>
    )
}

export default ProfilePage;