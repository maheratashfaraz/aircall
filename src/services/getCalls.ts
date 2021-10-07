import axios, { AxiosResponse } from 'axios';

export const getCalls = async (token: string, offset: number, limit: number) => {

    const url = `${process.env.API_BASE_URL}/calls?offset=${offset}&limit=${limit}`;
    const getHeaders = () => ({
        Authorization: `Bearer ${token}`,
    });
    const result = (
        await axios.get<any, AxiosResponse<ServerContributionData>>(
            url,
            { headers: getHeaders() }
        )
    );

    return result
}