import { useEffect, useState } from "react";
import { useContent } from "../store/useContent";
import axios from "axios";

const useGetTrending = () => {
    const [trendingContent, setTrendingContent] = useState(null);
    const {contentType} = useContent();

    useEffect(() => {
        const getTrendingContent = async () => {
            const response = await axios.get(`/api/v1/${contentType}/trending`);
            setTrendingContent(response.data.content);
        }
        getTrendingContent();
    },[contentType])

    return {trendingContent};
}

export default useGetTrending;