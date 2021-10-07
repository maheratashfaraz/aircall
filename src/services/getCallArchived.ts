import axios, { AxiosResponse } from 'axios';

export const getCallArchived = async (id: string, token: string) => {
    const url = `${process.env.API_BASE_URL}/calls/${id}/archive`;
    const getHeaders = () => ({
        Authorization: `Bearer ${token}`,
    });

    const result = (
        await axios.put<any, AxiosResponse<Call>>(
            url,
            { headers: getHeaders() },

        )
    );

    return result
}