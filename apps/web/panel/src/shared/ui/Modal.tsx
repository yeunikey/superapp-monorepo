import { ReactNode } from "react";
import { cn } from "../lib/merge";

type ModalType = {
    className?: string;
    parentClassName?: string;

    title: string;
    children?: ReactNode;

    close?: boolean;
    onClose?: () => void
}

function Modal({ close, onClose, title, parentClassName, className, children }: ModalType) {
    return (
        <>
            {close && (
                <div className="fixed top-0 left-0 h-dvh w-dvw bg-black/35 flex justify-center items-center" onClick={onClose}>
                    <div className={cn("z-10 bg-white rounded-4xl w-lg min-h-64 p-6", parentClassName)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">{title}</h2>

                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-full hover:bg-gray-100 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9BA3AE"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" /></svg>
                                </button>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <div className="bg-background w-full h-0.5" />
                        </div>

                        <div className={cn("mt-4", className)}>{children}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;