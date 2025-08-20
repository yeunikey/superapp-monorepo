import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/root';
import { useNavigation } from '@react-navigation/native';

export function useNavigationTabs() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return navigation;
}
