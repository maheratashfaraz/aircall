import axios, { AxiosResponse } from 'axios';

export const getToken = async () => {
    type ServerData = {
        access_token: string,
        user: {
            id: string
            username: string
        }


    }

    const url = `${process.env.API_BASE_URL}/auth/login`;

    const result = (
        await axios.post<any, AxiosResponse<ServerData>>(url,
            {
                username: "zahoor",
                password: "zahoor"
            })
    )

    return result
}