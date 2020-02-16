import { 
    ADD_FAVOURITE, 
    SELECT_VIDEO, 
    LOAD_MORE, 
    SET_PAGE_TOKEN, 
    SEARCH, 
    CURRENT_QUERY, 
    RESET_RESULTS, 
    REMOVE_FAVOURITE, 
    ADD_QUERY_TO_HISTORY
} from '../constants/action-types';

export const addToFavorite = (payload) => {
    return {
        type: ADD_FAVOURITE, payload
    }
};

export const removeFromFavourite = (payload) => {
    return {
        type: REMOVE_FAVOURITE, payload
    }
};

export const selectVideo = (payload) => {
    return {
        type: SELECT_VIDEO, payload
    }
}

export const loadMoreResults = (payload) => {
    return {
        type: LOAD_MORE, payload
    }
}

export const search = (payload) => {
    return {
        type: SEARCH, payload
    }
}

export const setPageToken = (payload) => {
    return {
        type: SET_PAGE_TOKEN, payload
    }
}

export const setCurrentQuery = (payload) => {
    return {
        type: CURRENT_QUERY, payload
    }
}

export const addQueryToHistory = (payload) => {
    return {
        type: ADD_QUERY_TO_HISTORY, payload
    }
}

export const resetResults = () => {
    return {
        type: RESET_RESULTS
    }
}