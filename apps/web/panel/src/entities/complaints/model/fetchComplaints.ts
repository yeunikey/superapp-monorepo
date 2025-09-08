import { ApiResponse } from "@/types";
import { ComplaintCategory } from "../types/category";
import { useComplaints } from "./useComplaints";
import { api } from "@/shared/api/instance";
import { toast } from "react-toastify";

const fetchCategories = async () => {

    const { setCategories } = useComplaints.getState();

    await api.get<ApiResponse<ComplaintCategory[]>>('complaints/categories')
        .then(({ data }) => {
            if (data.statusCode != 200) {
                toast.error(data.message)
                return;
            }
            setCategories(data.data)
        })
}

export {
    fetchCategories
}