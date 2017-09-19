 export function setHeaderTitle(header) {
    return {
        type: "SET_HEADER",
        payload: header
    };
};

export function setHeaderSubTitle(sub) {
    return {
        type: "SET_HEADER_SUBTITLE",
        payload: sub
    };
};
