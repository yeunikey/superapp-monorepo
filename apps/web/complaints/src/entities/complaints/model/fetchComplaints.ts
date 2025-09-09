import { ApiResponse } from "@/types";
import { ComplaintCategory } from "../types/category";
import { useComplaints } from "./useComplaints";
import { api } from "@/shared/api/instance";
import { toast } from "react-toastify";
import { Complaint } from "../types/complaint";
import { useAuth } from "@/entities/data/model/useAuth";

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

const fetchComplaints = async () => {

    const { setComplaints } = useComplaints.getState();
    const { token } = useAuth.getState();

    await api.get<ApiResponse<Complaint[]>>('complaints', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(({ data }) => {
            if (data.statusCode != 200) {
                toast.error(data.message)
                return;
            }
            setComplaints(data.data)
        })
}

export {
    fetchCategories,
    fetchComplaints
}