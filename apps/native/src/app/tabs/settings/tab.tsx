import Tab from "~/shared/ui/Tab";
import { ScrollView, View, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import PressableScale from "~/shared/ui/PressableScale";
import { useAuth } from "~/entities/student/model/useAuth";
import Button from "~/shared/ui/Button";
import * as SecureStore from "expo-secure-store";
import { useNavigationTabs } from "~/shared/lib/useNavigationTabs";
import axios from "axios";
import Avatar from "~/shared/ui/Avatar";

function SettingsTab() {
    const { loggedUser, token, setLoggedUser } = useAuth();
    const navigation = useNavigationTabs();

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Доступ запрещён", "Нужно разрешение на доступ к галерее.");
            }
        })();
    }, []);
    function getMimeType(uri: string): string {
        const extension = uri.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            case 'webp':
                return 'image/webp';
            default:
                return 'application/octet-stream';
        }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            const image = result.assets[0];
            const name = image.uri.split("/").pop();
            const type = getMimeType(image.uri);

            const formData = new FormData();
            formData.append("file", {
                uri: image.uri,
                name,
                type,
            } as any);


            try {
                const uploadRes = await axios.post("http://192.168.88.156:4003/images/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                const imageId = uploadRes.data.data.id;

                await axios.post("http://192.168.88.156:4001/users", {
                    ...loggedUser,
                    imageId,
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });

                if (loggedUser) {
                    setLoggedUser({
                        ...loggedUser,
                        imageId
                    })
                }

                Alert.alert("Успех", "Фото обновлено");
            } catch (error) {
                console.error(error);
                Alert.alert("Ошибка", "Не удалось загрузить фото");
            }
        }
    };



    const logout = async () => {
        await SecureStore.deleteItemAsync("token");
        navigation.navigate("Auth", {
            animation: "slide_from_right",
        });
    };

    return (
        <Tab title="Персональные данные" className="flex flex-col flex-1 relative">
            <ScrollView className="p-6 flex-1">
                <View className="flex flex-row justify-between items-center gap-12 flex-1">
                    <View className="flex-1">
                        <Text className="font-semibold text-2xl">Изображение профиля</Text>
                        <Text className="mt-1 text-secondary">Максимальный размер - 2 МБ</Text>
                    </View>
                    <PressableScale onPress={pickImage}>
                        {loggedUser && (<Avatar user={loggedUser} className="w-32 h-32" />)}
                    </PressableScale>
                </View>

                <View className="mt-12 flex flex-row gap-24 justify-between items-center">
                    <Text className="text-xl font-medium flex-1 text-[#999]">Имя Фамилия</Text>
                    <Text className="text-xl font-semibold">
                        {loggedUser?.name + " " + loggedUser?.surname}
                    </Text>
                </View>

                <View className="mt-6 flex flex-row gap-24 justify-between items-center">
                    <Text className="text-xl font-medium flex-1 text-[#999]">Баркод</Text>
                    <Text className="text-xl font-semibold">{loggedUser?.barcode}</Text>
                </View>

                <View className="mt-6 flex flex-row gap-24 justify-between items-center">
                    <Text className="text-xl font-medium flex-1 text-[#999]">Группа</Text>
                    <Text className="text-xl font-semibold">{loggedUser?.group.name}</Text>
                </View>

                <Button
                    label={"Выйти из аккаунта"}
                    className="bg-transparent mt-16 border-[1px] border-red py-4"
                    textContainer="text-red text-xl"
                    onPress={logout}
                />
            </ScrollView>
        </Tab>
    );
}

export default SettingsTab;
