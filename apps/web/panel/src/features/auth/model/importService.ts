import { ApiResponse } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Cookies from 'js-cookie';
import { User } from "@/entities/data/types/user";
import { api } from "@/shared/api/instance";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/data/model/useAuth";
import { useAuthStore } from "./useAuthStore";

const handleSubmit = async (router: AppRouterInstance) => {

    const { setLoggedUser, setToken } = useAuth.getState();

    const {
        type, setType,
        fetching, setFetching,
        email,
        codeDigits,
    } = useAuthStore.getState();

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

        await api.post<ApiResponse>("auth/code", payload)
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

        await api.post<ApiResponse<{ token: string, user: User }>>("auth/confirm", payload)
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

export {
    handleSubmit
}