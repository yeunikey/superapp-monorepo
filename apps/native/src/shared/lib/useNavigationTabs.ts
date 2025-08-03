import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '~/shared/types/root';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function useNavigationTabs() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return navigation;
}
