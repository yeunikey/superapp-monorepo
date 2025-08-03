import { View, FlatList, Text } from "react-native";
import { cn } from "~/shared/module/merge";

function EventsList() {
    return (
        <View className='pt-3 flex gap-3'>
            <FlatList
                data={['Клубы', 'Мероприятия', 'Проекты', 'Карта']}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item, index }) => {
                    const isFirst = index === 0;
                    const isLast = index === 2;

                    return (
                        <View
                            className={cn(
                                'rounded-full p-2 px-6',
                                item === 'Мероприятия' ? 'bg-primary' : 'bg-white',
                                isFirst ? 'ms-6' : '',
                                isLast ? 'me-6' : 'mr-3',
                            )}
                        >
                            <Text className={cn(
                                'text-xl font-semibold',
                                item === 'Мероприятия' ? 'text-white' : 'text-dark',
                            )}>
                                {item}
                            </Text>
                        </View>
                    );
                }}
            />

            <View className='bg-white rounded-[32px] p-6'>
                <Text className='text-3xl font-semibold'>Будущие мероприятия</Text>

                <View className='pt-3 flex flex-col gap-1'>
                    <View className='flex flex-row items-center justify-between bg-background p-4 rounded-3xl'>
                        <Text className='text-xl font-semibold'>Посвящение в студенты</Text>
                        <Text className='text-secondary'>через 10 д.</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between bg-background p-4 rounded-3xl'>
                        <Text className='text-xl font-semibold'>Ярмарка клубов</Text>
                        <Text className='text-secondary'>через 24 д.</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default EventsList;