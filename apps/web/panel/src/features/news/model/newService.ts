import { ApiResponse } from "@/types";
import { newsApi } from "@/shared/api/instance";
import { toast } from "react-toastify";
import { New } from "@/entities/news/types/news";
import { useNews } from "@/entities/news/model/useNews";

const fetchNews = async () => {

    const { setNews } = useNews.getState();

    await newsApi.get<ApiResponse<New[]>>('/news/all')
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