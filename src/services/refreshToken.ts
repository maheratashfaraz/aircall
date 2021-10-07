import axios, { AxiosResponse } from 'axios';

export const refreshToken = async (token: string) => {
    console.log('This is token ', token)
    type ServerData = {
        access_token: string,
        user: {
            id: string
            username: string
        }
    }
    const url = `${process.env.API_BASE_URL}/auth/refresh-token`;

    const getHeaders = () => ({
        Authorization: `Bearer ${token}`,
    });

    const result = (
        await axios.post<any, AxiosResponse<ServerData>>(url,
            { headers: getHeaders() }
        )
    )



    return result
}