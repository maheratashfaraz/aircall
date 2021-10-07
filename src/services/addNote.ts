import axios, { AxiosResponse } from 'axios';

export const addNote = async (note: string, callID: string, token: string) => {

    const url = `${process.env.API_BASE_URL}/calls/${callID}/note`;
    const getHeaders = () => ({
        Authorization: `Bearer ${token}`,
    });
    const result = (
        await axios.post<any, AxiosResponse<Call>>(url,
            {
                content: note,
            },
            { headers: getHeaders() })
    )


    return result

}