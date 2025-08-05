import { View, Text } from "react-native";
import { useAuth } from "~/entities/student/model/useAuth";

function UserInfo() {
    const { loggedUser } = useAuth();

    return (
        <>
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
        </>
    );
}

export default UserInfo;