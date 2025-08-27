import { User } from "@/entities/data/types/user";
import { cn } from "../lib/merge";

type AvatarType = {
    user?: User,
    className?: string
}

function Avatar({ user, className }: AvatarType) {
    return (
        <>
            {user?.imageId ? (
                <img
                    className={cn("rounded-full w-10 h-10 bg-secondary", className)}
                    src={`http://${process.env.NEXT_PUBLIC_HOST}:4003/images/${user.imageId}`}
                    alt={`${user.name} ${user.surname}`}
                />
            ) : (
                <div className={cn("rounded-full w-10 h-10 bg-background flex justify-center items-center text-secondary", className)}>
                    {user?.name[0] + '' + user?.surname[0]}
                </div>
            )}
        </>
    );
}

export default Avatar;