import { cn } from "../lib/merge";

type LoaderProps = {
    className?: string,
    childClassName?: string,
}

function Loader({ className, childClassName }: LoaderProps) {
    return (
        <div className={cn(`${className} flex justify-center items-center`)}>
            <div className={cn("w-8 h-8 border-primary border-4 rounded-full border-t-transparent animate-spin", childClassName)} />
        </div>
    );
}

export default Loader;