import Container from "./Container";
import Header from "./Header";
import NavBar from "./NavBar";
import { ReactNode } from "react";
import { cn } from "../lib/merge";

type ViewType = {
    className?: string;
    children?: ReactNode
}

function View({ className, children }: ViewType) {
    return (
        <>
            <Header />
            
            <Container>

                <div className="flex flex-col md:flex-row grow h-full gap-12 py-12">
                    <NavBar />

                    <div className={cn("flex-1 grow", className)}>
                        {children}
                    </div>
                </div>
            </Container>
        </>
    );
}

export default View;