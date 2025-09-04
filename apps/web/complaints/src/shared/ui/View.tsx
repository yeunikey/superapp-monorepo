import Container from "./Container";
import { ReactNode } from "react";
import { cn } from "../lib/merge";

type ViewType = {
    className?: string;
    children?: ReactNode
}

function View({ className, children }: ViewType) {
    return (
        <Container className={cn("flex flex-col", className)}>
            {children}
        </Container>
    );
}

export default View;