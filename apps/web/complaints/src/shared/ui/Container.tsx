import { ReactNode } from "react";
import { cn } from "../lib/merge";

type ContainerProps = {
    className?: string,
    children?: ReactNode
}

function Container({ className, children }: ContainerProps) {
    return (
        <div className={cn('px-6', className)}>
            {children}
        </div>
    );
}

export default Container;