import { fetchCategories } from "@/entities/complaints/model/fetchComplaints";
import { useComplaints } from "@/entities/complaints/model/useComplaints";
import { ComplaintCategory } from "@/entities/complaints/types/category";
import { useSendStore } from "@/features/send/model/useSendStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function CategoriesList() {

    const router = useRouter();

    const { categories } = useComplaints();
    const { setSelectedCategory } = useSendStore();

    useEffect(() => {
        fetchCategories();
    }, [])

    const handleClick = async (category: ComplaintCategory) => {
        router.push('/send')
        setSelectedCategory(category);
    }

    return (
        <div className="space-y-3">
            <div className="text-2xl font-semibold mx-6">Выберите категорию</div>

            <div className="grid gap-3">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="p-4 rounded-4xl bg-white px-6 py-4"
                        onClick={() => handleClick(category)}
                    >
                        <div className="font-semibold text-lg">{category.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{category.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesList;