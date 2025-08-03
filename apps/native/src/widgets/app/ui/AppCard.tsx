import { Text, Image, ImageSourcePropType } from 'react-native';
import { useNavigationTabs } from '~/shared/lib/useNavigationTabs';
import { RootStackParamList } from '~/shared/types/root';
import PressableScale from '~/shared/ui/PressableScale';

type AppProps = {
    title: string;
    subtitle?: string;
    image: ImageSourcePropType;
    size?: 'large' | 'small';
    tab?: keyof RootStackParamList;
    className?: string;
};

function AppCard({ title, subtitle, image, size = 'small', tab, className }: AppProps) {
    const navigation = useNavigationTabs();
    const isLarge = size === 'large';

    const handlePress = () => {
        if (tab) {
            navigation.navigate(tab, {
                animation: 'slide_from_right'
            });
        }
    };

    return (
        <PressableScale className={isLarge ? 'relative overflow-hidden flex-1 bg-background rounded-[32px] p-5 gap-1' : 'relative overflow-hidden w-40 h-36 bg-background rounded-[32px] p-5'}
            onPress={handlePress}
        >
            <Text className='text-2xl font-semibold'>{title}</Text>
            {subtitle && <Text className='font-semibold text-secondary'>{subtitle}</Text>}

            <Image
                source={image}
                resizeMode='contain'
                className={
                    isLarge
                        ? 'absolute -bottom-6 -right-6 h-44 w-44'
                        : 'absolute -bottom-5 -right-3 h-32 w-32'
                }
            />
        </PressableScale>
    );
}

export default AppCard;