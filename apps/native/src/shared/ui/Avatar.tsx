import { Image, Text, View } from "react-native";

import { User } from "~/entities/student/types/user";
import { cn } from "../module/merge";
import { host } from "../api/instance";

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
                source={{ uri: `${host}:4003/images/${user.imageId}` }}
                className={cn('w-12 h-12 rounded-full', className)}
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
