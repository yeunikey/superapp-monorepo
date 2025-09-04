import { useNews } from "~/entities/news/model/useNews";
import { New } from "~/entities/news/types/new";
import { newsApi } from "~/shared/api/instance";
import { ApiResponse } from "~/types";

const fetchNews = async () => {

    const { setNews } = useNews.getState();

    await newsApi.get<ApiResponse<New[]>>('/news/all')
        .then(({ data }) => {
            if (data.statusCode != 200) {
                return;
            }
            setNews(data.data)
        })
}

export {
    fetchNews,
}