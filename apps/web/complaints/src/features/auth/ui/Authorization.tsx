'use client'

import { useAuth } from "@/entities/data/model/useAuth";
import { ReactNode, useEffect } from "react";
import { ApiResponse } from "@/types";
import { User } from "@/entities/data/types/user";
import { api } from "@/shared/api/instance";

type AuthorizationProps = {
    children?: ReactNode;
}

function Authorization({ children }: AuthorizationProps) {

    const { setToken, setLoggedUser } = useAuth();

    const fetchUser = async (token: string) => {
        await api.get<ApiResponse<User>>('auth/profile', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(({ data: response }) => {

                if (response.statusCode == 200) {
                    setLoggedUser(response.data)
                    setToken(token);
                }

            });
    }

    useEffect(() => {
        const handleMessage: EventListener = (event: Event) => {
            const msg = event as MessageEvent;
            try {
                const data = typeof msg.data === "string" ? JSON.parse(msg.data) : msg.data;

                if (data.type === "token") {
                    setToken(data.data);
                    fetchUser(data.data)
                }
            } catch { }
        };

        document.addEventListener("message", handleMessage);
        window.addEventListener("message", handleMessage);

        return () => {
            document.removeEventListener("message", handleMessage);
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    return (<>{children}</>);
}

export default Authorization;