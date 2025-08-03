import Tab from "~/shared/ui/Tab";
import { ScrollView, View, Text, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import PressableScale from "~/shared/ui/PressableScale";
import { useAuth } from "~/entities/student/model/useAuth";

function SettingsTab() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const { loggedStudent } = useAuth();

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Доступ запрещён", "Нужно разрешение на доступ к галерее.");
            }
        })();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            setAvatar(result.assets[0].uri);
        }
    };

    return (
        <Tab
            title="Персональные данные"
            className="flex flex-col flex-1 relative"
        >
            <ScrollView className="p-6 flex-1">
                <View className="flex flex-row justify-between items-center gap-12 flex-1">
                    <View className="flex-1">
                        <Text className="font-semibold text-2xl">
                            Изображение профиля
                        </Text>
                        <Text className="mt-1 text-secondary">
                            Максимальный размер - 2 МБ
                        </Text>
                    </View>
                    <PressableScale onPress={pickImage}>
                        <Image
                            source={
                                avatar
                                    ? { uri: avatar }
                                    : require("@assets/images/avatar.jpg") // заглушка
                            }
                            className="w-32 h-32 rounded-full bg-gray-200"
                        />
                    </PressableScale>
                </View>

                <View className="mt-12 flex flex-row gap-24 justify-between items-center">
                    <Text className="text-xl font-medium flex-1 text-[#999]">Имя Фамилия</Text>
                    <Text className="text-xl font-semibold">{loggedStudent?.name + ' ' + loggedStudent?.surname}</Text>
                </View>

                <View className="mt-6 flex flex-row gap-24 justify-between items-center">
                    <Text className="text-xl font-medium flex-1 text-[#999]">Баркод</Text>
                    <Text className="text-xl font-semibold">{loggedStudent?.barcode}</Text>
                </View>

                <View className="mt-6 flex flex-row gap-24 justify-between items-center">
                    <Text className="text-xl font-medium flex-1 text-[#999]">Группа</Text>
                    <Text className="text-xl font-semibold">{loggedStudent?.group.name}</Text>
                </View>
            </ScrollView>
        </Tab>
    );
}

export default SettingsTab;
