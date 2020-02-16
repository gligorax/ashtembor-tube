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
} 
from '../constants/action-types';

import { addQueryToLastSearches, loadMore, getVideos } from './utils';
 

const storagedVideosData = JSON.parse(localStorage.getItem('storagedVideosData'));
const storagedLastSearches = JSON.parse(localStorage.getItem('storagedLastSearches'));
const storagedSelectedVideo = JSON.parse(localStorage.getItem('storagedSelectedVideo'));
const storagedCurrentQuery = JSON.parse(localStorage.getItem('storagedCurrentQuery'));
const storagedFavouritiesVideos = JSON.parse(localStorage.getItem('storagedFavouritiesVideos'));

const INITIAL_STATE = {
    videos: storagedVideosData ? storagedVideosData : [],
    lastSearches: storagedLastSearches ? storagedLastSearches : [],
    selectedVideo: storagedSelectedVideo,
    favouritesVideos: storagedFavouritiesVideos ? storagedFavouritiesVideos : [],
    historySearch: [],
    currentPageToken: '',
    currentQuery: storagedCurrentQuery,
};

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SEARCH:
        return {
          ...state,
          videos: getVideos(action.payload)
        };
        case CURRENT_QUERY:
          return {
            ...state,
            currentQuery: action.payload
          };
      case LOAD_MORE:
        return {
          ...state,
          videos: loadMore(state.videos, action.payload)
        };
      case SET_PAGE_TOKEN:
        return {
          ...state,
          currentPageToken: action.payload
        }
      case ADD_FAVOURITE:
        return {
          ...state,
          favouritesVideos: state.favouritesVideos.concat(action.payload)
        };
        case REMOVE_FAVOURITE: 
        return {
          ...state,
          favouritesVideos: state.favouritesVideos.filter((video)=> {
            return video.id.videoId !== action.payload.id.videoId
          })
        }
      case SELECT_VIDEO:
        return {
          ...state,
          selectedVideo: action.payload
        };
      case RESET_RESULTS:
        return {
          ...state,
          lastSearches: [],
          videos: []
        };
      case ADD_QUERY_TO_HISTORY:
        return {
          ...state,
          lastSearches: addQueryToLastSearches( action.payload, state.lastSearches)
        }
      default:
        return state;
    }
  };

export default rootReducer;