import axios                    from "axios";
import { IGalleryResponse }     from "@/interfaces/IGalleryResponse";

const resource = "https://api.unsplash.com/photos";
const accessKey = 'oa-T76Ce9FmlBGbZ9nwhWsLuLzdVNCfjUWZEY6WsUy4';

const apiGallery = () => ({
    get( params: any ): Promise<IGalleryResponse> {
        return axios.get( resource, {
            headers: {
                Authorization: `Client-ID ${ accessKey }`,
                'Accept-Version': 'v1'
            },
            params
        } );
    }
});

export default apiGallery;
