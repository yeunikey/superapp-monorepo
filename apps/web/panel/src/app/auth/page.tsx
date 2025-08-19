'use client'

import { useRef, useState } from "react";

import { ApiResponse } from "@/types";
import Cookies from 'js-cookie';
import Image from "next/image";
import { User } from "@/entities/user/types/user";
import { authApi } from "@/shared/api/instance";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/user/model/useAuth";
import { useRouter } from "next/navigation";

function AuthPage() {

    const { setLoggedUser, setToken } = useAuth();
    const router = useRouter();

    const [type, setType] = useState<"login" | "code">("login");
    const [fetching, setFetching] = useState<boolean>(false);

    const codeRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [email, setEmail] = useState<string>("");
    const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);

    const handleCodeChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newDigits = [...codeDigits];
        newDigits[index] = value;
        setCodeDigits(newDigits);

        if (value && index < 3) {
            codeRefs[index + 1].current?.focus();
        }
    };

    const handleSubmit = async () => {

        if (fetching) {
            toast.error('Ждём ответа от сервера, подождите')
            return;
        }

        if (type === "login") {

            if (!email) {
                toast.error('Вы не заполнили поле с почтой')
                return;
            }

            const payload = {
                barcode: email
            }

            setFetching(true);

            await authApi.post<ApiResponse>("/code", payload)
                .then(({ data: response }) => {

                    if (response.statusCode == 200) {
                        setType("code");
                    } else {
                        toast.error(response.message);
                    }

                }).finally(() => {
                    setFetching(false);
                })
        } else {
            const code = codeDigits.join("");

            const payload = {
                barcode: email,
                code: code
            }

            setFetching(true);

            await authApi.post<ApiResponse<{ token: string, user: User }>>("/confirm", payload)
                .then(({ data: response }) => {

                    if (response.statusCode == 200) {

                        setLoggedUser(response.data.user);
                        setToken(response.data.token);

                        Cookies.set('token', response.data.token);

                        router.push('/')

                    } else {
                        toast.error(response.message);
                    }

                }).finally(() => {
                    setFetching(false);
                })
        }
    };

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
                    <div className="space-y-2">
                        <div className="flex items-center bg-white py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary">
                            <input
                                type="text"
                                placeholder="Ваша почта"
                                className="outline-none text-dark bg-transparent w-full"

                                value={email}
                                onChange={(e) => {
                                    setEmail(e.currentTarget.value);
                                }}
                            />
                            <div className="text-secondary">@astanait.edu.kz</div>
                        </div>

                        <div className="text-secondary text-sm">
                            * корпоративная почта университета
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center gap-3 items-center">
                        <div className="flex gap-3">
                            {codeDigits.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={codeRefs[index]}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    className="w-12 h-12 text-xl text-center rounded-xl bg-white focus:outline-primary"
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Backspace" && codeDigits[index] === "" && index > 0) {
                                            codeRefs[index - 1].current?.focus();
                                        }
                                    }}
                                />
                            ))}
                        </div>

                        <div className="text-secondary text-sm text-center">
                            * из корпоративной почты
                        </div>
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    className="bg-primary rounded-4xl py-2 w-full text-white cursor-pointer font-medium box-content"
                >
                    {type === "login" ? "Отправить код" : "Подтвердить"}
                </button>
            </div>

        </div>
    );
}

export default AuthPage;