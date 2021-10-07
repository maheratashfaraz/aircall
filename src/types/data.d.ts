interface Data {
    id: string;
    number: string
    direction: string;
    date: string;
    duration?: number,
    is_archived?: boolean,
    call_type?: string,
    via?: string,
    notes?: [
        {
            id: string,
            content: string
        }
    ]
}