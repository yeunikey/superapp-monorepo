'use client'

import { useComplaintStore } from "@/features/complaints/model/useComplaintStore";
import EditCategoryModal from "@/features/complaints/ui/EditCategoryModal";
import NewCategoryModal from "@/features/complaints/ui/NewCategoryModal";
import View from "@/shared/ui/View";
import ComplaintCategories from "@/widgets/complaints/ComplaintCategories";
import ComplaintControls from "@/widgets/complaints/ComplaintControls";
import ComplaintList from "@/widgets/complaints/ComplaintList";

function ComplaintsPage() {

    const { type } = useComplaintStore();

    return (
        <View>

            <NewCategoryModal />
            <EditCategoryModal />

            <div className="text-3xl font-semibold text-dark">
                Управление жалобами
            </div>

            <ComplaintControls />

            {type === "categories" ? (
                <ComplaintCategories />
            ) : (
                <ComplaintList />
            )}

        </View>
    );
}

export default ComplaintsPage;