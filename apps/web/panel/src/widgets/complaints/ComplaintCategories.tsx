import { fetchCategories } from "@/entities/complaints/model/fetchComplaints";
import { useComplaints } from "@/entities/complaints/model/useComplaints";
import { useComplaintStore } from "@/features/complaints/model/useComplaintStore";
import { useEffect } from "react";

function ComplaintCategories() {

    const { categories } = useComplaints();
    const { setOpenAddModal } = useComplaintStore();

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">

            <div
                className="w-full aspect-[2] rounded-4xl flex justify-center items-center text-5xl text-gray border-gray cursor-pointer hover:bg-gray/15 transition-all duration-300"
                style={{
                    border: "2px dashed"
                }}
                onClick={() => setOpenAddModal(true)}
            >
                +
            </div>

            {categories
                .map((newItem, i) => (
                    <div key={i} className="relative w-full aspect-[2] bg-background rounded-3xl flex items-end overflow-hidden cursor-pointer" onClick={() => {
                        // setEditOpen(true);
                        // setEditingNew(newItem);
                    }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        <div className="text-white px-4 py-4 font-semibold text-lg line-clamp-2 z-10">
                            {newItem.title}
                        </div>
                    </div>
                ))}

        </div>
    );
}

export default ComplaintCategories;