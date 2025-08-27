"use client";

import Link from "next/link";
import { pages } from "../lib/pages";
import { usePathname } from "next/navigation";

function NavBar() {
    const pathname = usePathname();

    return (
        <div className="w-72 flex flex-col gap-12">
            <div className="w-full flex flex-col gap-1">
                {pages.map((page) => {
                    const isActive = pathname === page.root;

                    return (
                        <Link
                            key={page.root}
                            href={page.root}
                            className={`w-full py-3 px-6 rounded-4xl cursor-pointer flex gap-3 items-center transition ${isActive
                                ? "bg-white text-dark"
                                : "hover:bg-gray-100 text-secondary"
                                }`}
                        >
                            <span
                                className={`${isActive ? "fill-dark" : "fill-secondary"
                                    }`}
                            >
                                {page.icon}
                            </span>
                            <div>{page.title}</div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default NavBar;
