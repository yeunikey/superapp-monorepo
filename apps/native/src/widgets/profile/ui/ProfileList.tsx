import { View } from 'react-native';
import ProfileCard from './ProfileCard';

function ProfileList() {
    return (
        <View className='w-full p-6 pt-12 gap-3'>
            <View className='flex flex-row gap-3'>
                <ProfileCard
                    title='Мои персональные данные'
                    image={require('@assets/images/setting-symbol-isolated-general-ui-icon-set-concept-3d-render-illustration-png 1.png')}
                    size='large'
                    tab='SettingsTab'
                />
                <ProfileCard
                    title='Язык'
                    image={require('@assets/images/language-translator-symbol-of-user-communication-language-icon-3d-rendering-illustration-png 1.png')}
                    className='opacity-40'
                />
            </View>

            <View className='flex flex-row gap-3'>
                <ProfileCard
                    title='Авторы'
                    image={require('@assets/images/code-icon-3d-rendering-symbol-of-web-development-png 1.png')}
                    tab='AuthorsTab'
                />
                <ProfileCard
                    title='Приватность и безопасность'
                    size='large'
                    tab='PolicyTab'
                />
            </View>
        </View>
    );
}

export default ProfileList;