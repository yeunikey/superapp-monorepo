import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "~/shared/types/root";

const handleNavigate = (navigation: NativeStackNavigationProp<RootStackParamList>, currentRouteName: string, pageKey: string) => {

    if (pageKey === 'Profile') {
        navigation.navigate('Profile', {
            animation: 'ios_from_right'
        });
    } else if (pageKey === 'Main') {
        navigation.navigate('Main', {
            animation: 'ios_from_left'
        });
    } else if (pageKey === 'NotificationsTab') {
        navigation.navigate('NotificationsTab', {
            animation: currentRouteName === 'Main' ? 'ios_from_right' : 'ios_from_left'
        });
    }

};

export {
    handleNavigate
}