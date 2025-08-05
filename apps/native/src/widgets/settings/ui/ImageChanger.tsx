import { Alert, View, Text, Animated, Easing } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef } from "react";
import PressableScale from "~/shared/ui/PressableScale";
import Avatar from "~/shared/ui/Avatar";
import { useAuth } from "~/entities/student/model/useAuth";
import { pickImage } from "~/features/settings/model/pickImage";
import { useImageLoader } from "~/features/settings/model/imageLoader";
import { cn } from "~/shared/module/merge";

function ImageChanger() {
    const { loggedUser, } = useAuth();
    const { isLoading } = useImageLoader();

    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isLoading) {
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        } else {
            rotateAnim.stopAnimation(() => {
                rotateAnim.setValue(0);
            });
        }
    }, [isLoading, rotateAnim]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Доступ запрещён", "Нужно разрешение на доступ к галерее.");
            }
        })();
    }, []);

    return (
        <View className="flex flex-row justify-between items-center gap-12 flex-1">
            <View className="flex-1">
                <Text className="font-semibold text-2xl">Изображение профиля</Text>
                <Text className="mt-1 text-secondary">Максимальный размер - 2 МБ</Text>
            </View>

            <PressableScale onPress={pickImage} className="relative flex justify-center items-center">
                {loggedUser && (<Avatar user={loggedUser} className={cn("w-32 h-32", isLoading && 'opacity-50')} />)}
                {isLoading && (<Animated.View className="absolute w-36 h-36 border-primary border-4 border-t-transparent rounded-full" style={{ transform: [{ rotate: spin }] }} />)}
            </PressableScale>
        </View>
    );
}

export default ImageChanger;