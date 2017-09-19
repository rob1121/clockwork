export function setFooterTitle(title) {
    return {
        type: "SET_FOOTER_TITLE",
        payload: title
    };
};

export function setFooterCreator(creator) {
    return {
        type: "SET_FOOTER_CREATOR",
        payload: creator
    };
};