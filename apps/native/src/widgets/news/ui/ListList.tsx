import { LinearGradient } from "expo-linear-gradient";
import { View, FlatList, ImageBackground, Text } from "react-native";
import { cn } from "~/shared/module/merge";
import PressableScale from "~/shared/ui/PressableScale";

function NewsList() {

    const news = [
        {
            title: "Тур в боровое \n для студентов AITU",
            img: require(`@assets/new/photo1.jpg`)
        },
        {
            title: 'День государственных символов РК',
            img: require(`@assets/new/photo2.jpg`)
        },
    ];

    return (
        <View className='bg-white rounded-[32px] py-6'>
            <FlatList
                data={news}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item, index }) => {
                    const isFirst = index === 0;
                    const isLast = index === news.length - 1;

                    return (
                        <PressableScale
                            className={cn(
                                'h-36 aspect-[2] rounded-3xl overflow-hidden relative',
                                isFirst ? 'ms-6' : '',
                                isLast ? 'me-6' : 'mr-3'
                            )}
                        >
                            <ImageBackground
                                source={item.img}
                                resizeMode="cover"
                                style={{ flex: 1 }}
                            >
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.5)']}
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '100%',
                                    }}
                                />

                                <View className="absolute bottom-3 left-4 right-4">
                                    <Text className="text-white text-xl font-semibold">{item.title}</Text>
                                </View>
                            </ImageBackground>
                        </PressableScale>
                    );
                }}
            />
        </View>
    );
}

export default NewsList;