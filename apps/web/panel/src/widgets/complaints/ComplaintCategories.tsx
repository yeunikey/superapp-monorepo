import { fetchCategories } from "@/entities/complaints/model/fetchComplaints";
import { useComplaints } from "@/entities/complaints/model/useComplaints";
import { useComplaintStore } from "@/features/complaints/model/useComplaintStore";
import { useEffect } from "react";

function ComplaintCategories() {

    const { categories } = useComplaints();
    const { setOpenAddModal, setEditingCategory, setOpenEditModal } = useComplaintStore();

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
                    <div key={i} className="relative w-full aspect-[2] bg-white rounded-3xl cursor-pointer p-6" onClick={() => {
                        setOpenEditModal(true);
                        setEditingCategory(newItem);
                    }}>
                        <div className="text-dark font-semibold text-lg">
                            {newItem.title}
                        </div>

                        <div className="text-secondary text-sm mt-1">
                            {newItem.content}
                        </div>
                    </div>
                ))}

        </div>
    );
}

export default ComplaintCategories;