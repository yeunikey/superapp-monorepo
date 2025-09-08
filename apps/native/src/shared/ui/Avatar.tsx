import { Text, View } from "react-native";

import { Image } from "expo-image";
import { User } from "~/entities/student/types/user";
import { baseURL } from "../api/instance";
import { cn } from "../module/merge";

type AvatarProps = {
    user: User;
    className?: string;
    textContainer?: string;
};

function Avatar({ user, className, textContainer }: AvatarProps) {
    const hasImage = !!user.imageId;

    if (hasImage) {
        return (
            <Image
                source={{ uri: `${baseURL}/images/${user.imageId}` }}
                className={cn('w-12 h-12 rounded-full', className)}
                cachePolicy={"disk"}
            />
        );
    }

    return (
        <View className={cn('w-12 h-12 rounded-full bg-background items-center justify-center', className)}>
            <Text className={cn('text-gray font-semibold text-base', textContainer)}>
                {user.surname[0] + user.name[0]}
            </Text>
        </View>
    );
}

export default Avatar;
