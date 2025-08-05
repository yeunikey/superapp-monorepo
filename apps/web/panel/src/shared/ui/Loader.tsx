import { cn } from "../lib/merge";

type LoaderProps = {
    className?: string
}

function Loader({ className }: LoaderProps) {
    return (
        <div className={cn(`${className} flex justify-center items-center`)}>
            <div className="w-8 h-8 border-primary border-4 rounded-full border-t-transparent animate-spin" />
        </div>
    );
}

export default Loader;