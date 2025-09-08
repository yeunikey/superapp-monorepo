import { ApiResponse } from "@/types";
import { New } from "@/entities/news/types/news";
import { api } from "@/shared/api/instance";
import { toast } from "react-toastify";
import { useNews } from "@/entities/news/model/useNews";

const fetchNews = async () => {

    const { setNews } = useNews.getState();

    await api.get<ApiResponse<New[]>>('news')
        .then(({ data }) => {
            if (data.statusCode != 200) {
                toast.error(data.message)
                return;
            }
            setNews(data.data)
        })
}

export {
    fetchNews,
}