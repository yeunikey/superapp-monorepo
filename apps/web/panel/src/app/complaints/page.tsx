'use client'

import { useComplaintStore } from "@/features/complaints/model/useComplaintStore";
import NewCategoryModal from "@/features/complaints/ui/NewCategoryModal";
import View from "@/shared/ui/View";
import ComplaintCategories from "@/widgets/complaints/ComplaintCategories";
import ComplaintControls from "@/widgets/complaints/ComplaintControls";

function ComplaintsPage() {

    const { type } = useComplaintStore();

    return (
        <View>

            <NewCategoryModal />

            <div className="text-3xl font-semibold text-dark">
                Управление жалобами
            </div>

            <ComplaintControls />

            {type === "categories" && (
                <ComplaintCategories />
            )}

        </View>
    );
}

export default ComplaintsPage;