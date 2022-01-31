const githubReducer = (state, action) => {
    switch (action.type) {
        case "GET_USERS":
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case "GET_USER":
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case "GET_REPOS":
            return {
                ...state,
                repos: action.payload,
                loading: false,
            };
        case "CLEAR_USERS":
            return {
                ...state,
                users: [],
            };
        case "CLEAR_USER":
            return {
                ...state,
                user: [],
            };
        case "CLEAR_REPOS":
            return {
                ...state,
                repos: [],
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "CLEAR_LOADING":
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default githubReducer;
