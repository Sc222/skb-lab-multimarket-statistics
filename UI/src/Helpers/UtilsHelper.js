import {format} from "date-fns";

export function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function formatDateDefault(date){
    return format(date,"dd/MM/yyyy HH:mm");
}

export function formatDateShort(date){
    return format(date,"dd/MM/yyyy");
}