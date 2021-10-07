import dateFormat from "dateformat";

const formatDate = (d: Date) => dateFormat(d, "yyyy-mm-dd h:MM:ss TT");

export const createData = (call: Call): Data => {
    return {
        id: call.id,
        number: (call.direction === "inbound" ? call.from : call.to),
        direction: call.direction,
        date: formatDate(new Date(call.created_at)),
        duration: call.duration,
        is_archived: call.is_archived,
        call_type: call.call_type,
        via: call.via,
        notes: call.notes
    };
}