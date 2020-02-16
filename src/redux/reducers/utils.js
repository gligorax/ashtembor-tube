export const addQueryToLastSearches = (query, arr) => {
    const arrWithoutDuplicates =  arr.includes(query) ? arr : arr.concat(query);
    const lastSearchesArr = arrWithoutDuplicates.length > 5 ?  arrWithoutDuplicates.slice(1,6) : arrWithoutDuplicates;
    localStorage.setItem('storagedLastSearches', JSON.stringify(lastSearchesArr));
    return lastSearchesArr;
};

export const loadMore = (arr, payload) => {
    return arr.concat(payload.filter((video) => {
        return video.id.videoId
    }))
}

export const getVideos = (payload) => {
    const videos = payload.filter((video)=> {;
        return video.id.videoId
      })
      localStorage.setItem('storagedVideosData', JSON.stringify(videos))
      return videos;

}