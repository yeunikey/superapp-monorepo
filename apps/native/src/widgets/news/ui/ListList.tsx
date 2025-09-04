import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { View, FlatList, ImageBackground, Text } from "react-native";
import { useNews } from "~/entities/news/model/useNews";
import { cn } from "~/shared/module/merge";
import PressableScale from "~/shared/ui/PressableScale";
import { fetchNews } from "../model/newService";
import { host } from "~/shared/api/instance";
import { useNavigationTabs } from "~/shared/lib/useNavigationTabs";
import { New } from "~/entities/news/types/new";
import { Image } from "expo-image";

function NewsList() {

    const { news, setView } = useNews();
    const navigation = useNavigationTabs();

    const handleView = (newItem: New) => {
        setView(newItem);
        navigation.navigate('NewTab', { animation: 'slide_from_right' });
    }

    useEffect(() => {
        if (news.length !== 0) return;

        fetchNews();
    }, [news])

    return (
        <View className='bg-white rounded-[32px] py-6'>
            <FlatList
                data={[...news].sort(
                    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
                )}
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

                            onPress={() => handleView(item)}
                        >

                            <Image
                                source={{ uri: `${host}:4003/images/${item.imageId}` }}
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

                            <View className="absolute bottom-3 left-4 right-4">
                                <Text className="text-white text-xl font-semibold">{item.title}</Text>
                            </View>
                        </PressableScale>
                    );
                }}
            />
        </View>
    );
}

export default NewsList;