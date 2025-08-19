import { ReactNode } from "react";
import { cn } from "../lib/merge";

type ContainerProps = {
    className?: string,
    children?: ReactNode
}

function Container({ className, children }: ContainerProps) {
    return (
        <div className={cn('px-4 md:px-0 md:w-[80%] mx-auto', className)}>
            {children}
        </div>
    );
}

export default Container;