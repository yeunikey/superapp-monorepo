import { ImageBackground, ScrollView, Text, View } from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import RenderHTML from "react-native-render-html";
import Tab from "~/shared/ui/Tab";
import { cn } from "~/shared/module/merge";
import { host } from "~/shared/api/instance";
import { useNews } from "~/entities/news/model/useNews";

function NewTab() {

    const { view } = useNews();

    if (view === null) {
        return (
            <Tab
                title="Nothing..."
                className="flex flex-col flex-1 relative"
            ></Tab>
        )
    }

    return (
        <Tab
            title={"Новости"}
            className="flex flex-col flex-1 relative"
        >
            <ScrollView className="p-6">

                <View
                    className={cn(
                        'w-full aspect-[2] rounded-[32px] overflow-hidden relative',
                    )}

                >
                    <ImageBackground
                        source={{ uri: `${host}:4003/images/${view.imageId}` }}
                        resizeMode="cover"
                        style={{ flex: 1 }}
                    >
                        <Image
                            source={{ uri: `${host}:4003/images/${view.imageId}` }}
                            style={{ flex: 1 }}
                            contentFit="cover"
                            cachePolicy={"disk"}
                        >

                        </Image>

                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.5)']}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '100%',
                                width: '100%'
                            }}
                        />

                        <View className="absolute bottom-6 left-6 right-6">
                            <Text className="text-white text-4xl font-semibold">{view.title}</Text>
                        </View>

                    </ImageBackground>
                </View>

                <View className="mt-12 mb-64">
                    <RenderHTML
                        source={{ html: view.content || "<p>Нет описания...</p>" }}
                        defaultTextProps={{
                            selectable: true, // ✅ разрешаем выделение текста
                        }}
                        renderersProps={{
                            text: {
                                selectable: true, // ✅ принудительно делаем <Text selectable>
                            },
                        }}
                        tagsStyles={{
                            h1: { fontSize: 28, fontWeight: "bold" },
                            h2: { fontSize: 22, fontWeight: "600" },
                            p: { fontSize: 16, lineHeight: 22 },
                            strong: { fontWeight: "700" },
                            a: { color: "#1e90ff" },
                            em: { fontStyle: "italic" },
                            blockquote: {
                                borderLeftWidth: 4,
                                borderLeftColor: "#ccc",
                                paddingLeft: 12,
                                marginVertical: 8,
                                fontStyle: "italic",
                                opacity: 0.8,
                            },
                        }}
                    />
                </View>

            </ScrollView>
        </Tab>
    );
}

export default NewTab;