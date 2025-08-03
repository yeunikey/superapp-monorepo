import Tab from "~/shared/ui/Tab";
import { View, Text, Image, ScrollView } from "react-native";

function AuthorsTab() {
    return (
        <Tab
            title="Авторы"
            className="flex flex-col flex-1 relative"
        >
            <ScrollView className="py-6 px-6">
                <View className="flex flex-row gap-6 justify-between items-center">
                    <Text className="text-4xl font-semibold flex-1">Цифровой комитет</Text>

                    <Image
                        source={require('@assets/images/committie.jpg')}
                        className="h-36 w-36 rounded-3xl"
                    />
                </View>

                <View className="mt-12 flex flex-row gap-24 justify-between items-center">
                    <Text className="text-xl font-medium flex-1 text-[#999]">Телеграм канал:</Text>
                    <Text className="text-xl font-semibold ">@digitilization_aitusa</Text>
                </View>

                <View className="mt-6 flex flex-row gap-24 justify-between items-center">
                    <Text className="text-xl font-medium flex-1 text-[#999]">Тимлид и ведущий разработчик:</Text>
                    <Text className="text-xl font-semibold">@yeunikey</Text>
                </View>
            </ScrollView>

            <Text className="absolute bottom-16 w-full text-center text-gray">All rights reserved.</Text>

        </Tab>
    );
}

export default AuthorsTab;