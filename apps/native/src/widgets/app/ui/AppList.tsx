import { View } from 'react-native';
import AppCard from './AppCard';

function AppList() {
    return (
        <View className='bg-white rounded-[32px] p-6 gap-3'>
            <View className='flex flex-row gap-3'>
                <AppCard
                    title='Клубы и проекты'
                    subtitle='26+ клубов'
                    image={require('@assets/images/3d-illustration-business-teamwork-unity-png 1.png')}
                    size='large'
                />
                <AppCard
                    title='Карта'
                    image={require('@assets/images/pngtree-social-media-3d-map-icons-png-image_5931986 1.png')}
                    tab='MapService'
                />
            </View>

            <View className='flex flex-row gap-3'>
                <AppCard
                    title='Жалобы & идеи'
                    image={require('@assets/images/4089425 1.png')}
                    tab='ComplaintsService'
                />
                <AppCard
                    title='Мероприятия'
                    subtitle='16+ мероприятий'
                    image={require('@assets/images/pngtree-calendar-3d-icon-render-png-image_6275730 1.png')}
                    size='large'
                />
            </View>
        </View>
    );
}

export default AppList;