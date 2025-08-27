'use client';

import CodeForm from "@/features/auth/ui/CodeForm";
import Image from "next/image";
import LoginForm from "@/features/auth/ui/LoginForm";
import { handleSubmit } from "@/features/auth/model/importService";
import { useAuthStore } from "@/features/auth/model/useAuthStore";
import { useRouter } from "next/navigation";

function AuthPage() {

    const { type } = useAuthStore();
    const router = useRouter();

    return (
        <div className="h-dvh w-full flex items-center justify-center">

            <div className="flex flex-col gap-12 items-center w-72">
                <Image
                    src={'/logo.png'}
                    alt="Astana IT University Logotype"
                    width={1400}
                    height={700}

                    className="h-32 w-auto"
                />

                {type === "login" ? (
                    <LoginForm />
                ) : (
                    <CodeForm />
                )}

                <button
                    onClick={() => handleSubmit(router)}
                    className="bg-primary rounded-4xl py-2 w-full text-white cursor-pointer font-medium box-content"
                >
                    {type === "login" ? "Отправить код" : "Подтвердить"}
                </button>
            </div>

        </div>
    );
}

export default AuthPage;