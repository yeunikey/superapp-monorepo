'use client'

import Avatar from "./Avatar";
import Container from "@/shared/ui/Container";
import Cookies from 'js-cookie';
import Image from "next/image";
import { useAuth } from "@/entities/data/model/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Header() {
    const { loggedUser } = useAuth();
    const [expanded, setExpanded] = useState(false);

    const router = useRouter();

    const logout = () => {
        Cookies.remove('token');
        router.refresh();
    };

    return (
        <div className="bg-white py-2 w-full rounded-b-[48px]">
            <Container className="flex justify-between items-center">
                <div className="flex gap-8 items-center">
                    <Image
                        src={'/logo.png'}
                        alt="Astana IT University Logotype"
                        width={1400}
                        height={700}
                        className="h-16 w-auto"
                    />

                    <div className="text-lg text-secondary">
                        Панель управления
                    </div>
                </div>

                {loggedUser ? (
                    <div
                        className="relative"
                        onMouseEnter={() => setExpanded(true)}
                        onMouseLeave={() => setExpanded(false)}
                    >
                        <div
                            className={`flex items-center gap-6 cursor-pointer px-4 py-2 transition-colors rounded-t-4xl ${expanded ? "bg-[#f2f2f2]" : ""}`}
                        >
                            <div className="flex gap-3 items-center">
                                <Avatar user={loggedUser} />

                                <div className="flex flex-col">
                                    <div className="text font-semibold">
                                        {`${loggedUser?.name} ${loggedUser?.surname}`}
                                    </div>
                                    <div className="text-sm -mt-1 text-secondary">
                                        {loggedUser.role?.name}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`${expanded ? "" : "rotate-180"} transition-transform`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#9BA3AE"
                                >
                                    <path d="M480-360 280-560h400L480-360Z" />
                                </svg>
                            </div>
                        </div>

                        <div
                            className={`absolute left-0 px-4 py-4 pt-6 w-full bg-[#f2f2f2] rounded-b-4xl
                            transform transition-all duration-300
                            ${expanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                        >
                            <div
                                className="w-full flex gap-3 py-1.5 border-[1px] border-red rounded-2xl justify-center items-center cursor-pointer"
                                onClick={logout}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="fill-red"
                                    height="20px"
                                    viewBox="0 -960 960 960"
                                    width="20px"
                                >
                                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                                </svg>
                                <div className="text-red">Выйти</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="test"></div>
                )}
            </Container>
        </div>
    );
}

export default Header;
