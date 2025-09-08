"use client"

import { useComplaintStore } from "@/features/complaints/model/useComplaintStore";
import { cn } from "@/shared/lib/merge";

function ComplaintControls() {

    const { type, setType } = useComplaintStore();

    return (
        <div className="mt-6 flex gap-6">
            <div className="flex gap-3">
                <div className={cn("rounded-full py-2 px-6 cursor-pointer", type == "complaints" ? "bg-primary text-white" : "bg-white text-dark")}
                    onClick={() => setType("complaints")}
                >
                    Список жалоб
                </div>

                <div className={cn("rounded-full py-2 px-6 cursor-pointer", type == "categories" ? "bg-primary text-white" : "bg-white text-dark")}
                    onClick={() => setType("categories")}
                >
                    Категории
                </div>
            </div>
        </div>
    );
}

export default ComplaintControls;