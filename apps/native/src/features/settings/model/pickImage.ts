import xior from "xior";
import { getMimeType } from "./mime-type";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useAuth } from "~/entities/student/model/useAuth";
import { useImageLoader } from "./imageLoader";
import { host } from "~/shared/api/instance";

const pickImage = async () => {
    const { loggedUser, token, setLoggedUser } = useAuth.getState();
    const { isLoading, setLoading } = useImageLoader.getState();

    if (isLoading) {
        return;
    }


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
            setLoading(true);

            const uploadRes = await xior.post(`${host}:4003/images/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const imageId = uploadRes.data.data.id;

            await xior.post(`${host}:4001/users`, {
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

        } catch {
            Alert.alert("Ошибка", "Не удалось загрузить фото");
        }

        setLoading(false);
    }
};

export {
    pickImage
}