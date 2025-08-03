import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';

const { width } = Dimensions.get('window');

const data = [
    { title: 'Первый слайд', color: '#9DD6EB' },
    { title: 'Второй слайд', color: '#97CAE5' },
    { title: 'Третий слайд', color: '#92BBD9' },
];

export function CustomSwiper() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % data.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const onScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.slide, { backgroundColor: item.color }]}>
                        <Text style={styles.text}>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    slide: {
        width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
});
