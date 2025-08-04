import * as SecureStore from 'expo-secure-store';

import { Image, Text, View } from "react-native";

import { APP_VERSION } from "~/shared/config/constants";
import LoaderProgress from "~/features/loader/ui/LoaderProgress";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~/shared/types/root";
import { preloadAssets } from "~/shared/module/images";
import { useAuth } from '~/entities/student/model/useAuth';
import { useEffect } from "react";
import { useLoaderAnimation } from "~/features/loader/model/useLoaderAnimation";

type Props = NativeStackScreenProps<RootStackParamList, 'Loader'>;

function LoaderPage({ navigation }: Props) {
    const { animatedWidth } = useLoaderAnimation(navigation);
    const { setAuth, setLoading } = useAuth();

    const checkAuth = async () => {
        const token = await SecureStore.getItemAsync('token');

        setAuth(!token ? false : true);
        console.log(!token ? false : true)
        setLoading(false);
    }

    useEffect(() => {
        preloadAssets();
        checkAuth();
    }, [])

    return (
        <View className="flex-1 bg-white relative justify-center items-center">
            <Image
                source={require('@assets/splash-logo.png')}
                className='h-28 aspect-square'
                resizeMode="contain"
            />

            <LoaderProgress animatedWidth={animatedWidth} />

            <Text className="text-[#C3C3C3] text-lg text-semibold absolute bottom-12">
                {APP_VERSION}
            </Text>
        </View>
    );
}

export default LoaderPage;