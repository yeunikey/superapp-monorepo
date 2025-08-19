'use client'

import Container from "@/shared/ui/Container";
import Image from "next/image";
import { useAuth } from "@/entities/user/model/useAuth";

function Header() {

    const { loggedUser } = useAuth();

    if (!loggedUser) {
        return <></>;
    }

    return (
        <div className="bg-white py-2 w-full rounded-b-[48px]">
            <Container className="flex justify-between">
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

                <div className="flex items-center gap-6 cursor-pointer">
                    <div className="flex gap-3 items-center">
                        <img className="rounded-full w-10 h-10 bg-secondary" src={`http://${process.env.NEXT_PUBLIC_HOST}:4003/images/${loggedUser.imageId}`} />

                        <div className="flex flex-col">
                            <div className="text font-semibold">
                                {`${loggedUser?.name} ${loggedUser?.surname}`}
                            </div>
                            <div className="text-sm -mt-1 text-secondary">
                                Разработчик
                            </div>
                        </div>
                    </div>

                    <div className="rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9BA3AE"><path d="M480-360 280-560h400L480-360Z" /></svg>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Header;