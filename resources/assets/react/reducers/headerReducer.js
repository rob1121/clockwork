const headerReducer = (state = {
    title: "header",
    sub: "sub"
}, action) => {
    switch(action.type)
    {
        case "SET_HEADER":
            state = {
                ...state,
                title: action.payload
            };
            break;

        case "SET_HEADER_SUBTITLE":
            state = {
                ...state,
                sub: action.payload
            };
            break;
    }

    return state;
};

export default headerReducer;