

import { ScrollView, View } from 'react-native';

import Navigation from '~/widgets/navigation/ui/Navigation';
import SafeView from '~/shared/ui/SafeView';
import TopInfo from '~/widgets/top/ui/TopInfo';
import EventsList from '~/widgets/events/ui/EventsList';
import NewsList from '~/widgets/news/ui/ListList';
import AppList from '~/widgets/app/ui/AppList';


function MainPage() {
    return (
        <SafeView className="bg-white flex-1">
            <View className='bg-background flex-1'>
                <TopInfo />

                <ScrollView>
                    <View className='flex gap-3 py-3'>
                        <NewsList />

                        <AppList />
                        <EventsList />

                    </View>
                </ScrollView>

                <Navigation />

            </View >
        </SafeView >
    )
}

export default MainPage;