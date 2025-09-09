import { fetchCategories } from "@/entities/complaints/model/fetchComplaints";
import { useComplaints } from "@/entities/complaints/model/useComplaints";
import { useEffect } from "react";

function CategoriesList() {

    const { categories, setCategories } = useComplaints();

    useEffect(() => {
        fetchCategories();
    }, [])


    return (
        <div className="grid gap-3">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="p-4 rounded-4xl bg-white px-6 py-4"
                >
                    <div className="font-semibold text-lg">{category.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{category.content}</div>
                </div>
            ))}
        </div>
    );
}

export default CategoriesList;