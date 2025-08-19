'use client'

import { ReactNode, useEffect } from 'react';

import { ApiResponse } from '@/types';
import Cookies from 'js-cookie'
import { User } from '@/entities/user/types/user';
import { authApi } from '@/shared/api/instance';
import { useAuth } from "@/entities/user/model/useAuth";

type AuthProps = {
    children?: ReactNode
}

function Authorize({ children }: AuthProps) {

    const { setLoggedUser, setToken } = useAuth();

    const fetchData = async (token: string) => {

        await authApi.get<ApiResponse<User>>('/profile', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(({ data: response }) => {

                if (response.statusCode == 200) {
                    setLoggedUser(response.data)
                    setToken(token);
                }

            }).catch(() => {
                // Cookies.remove('token');
            })
    }

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            fetchData(token);
        }

    }, [])

    return (
        <>{children}</>
    );
}

export default Authorize;