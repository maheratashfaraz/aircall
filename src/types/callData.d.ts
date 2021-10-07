type Call = {
    id: string,
    duration: number,
    is_archived: boolean,
    from: string,
    to: string,
    direction: string,
    call_type: string,
    via: string,
    created_at: string,
    notes: [
        {
            id: string,
            content: string
        }
    ]
}
type ServerContributionData = {
    nodes: Array<Call>,
    totalCount: number,
    hasNextPage: boolean
}