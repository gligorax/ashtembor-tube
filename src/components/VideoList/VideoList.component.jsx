import React from 'react';

import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import './VideoList.stylesheet.scss'

import { VideoCard } from '../index';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { loadMoreResults, setPageToken } from '../../redux/actions/index';
import  youtube from '../../api/youtube';


const VideoList = ({videos, loadMoreResults, setPageToken, currentPageToken, currentQuery, favourities}) => {
    const loadMore = async () => {
        const response = await youtube.get('search', {
            params: {
            part: 'snippet',
            maxResults: 6,
            key: 'AIzaSyA8ZWQCV1uYwUJKDvyLdfOOoCcRzWDBm2Y',
            pageToken: currentPageToken,
            q: currentQuery
        }});
        setPageToken(response.data.nextPageToken);
        loadMoreResults(response.data.items);
       }
       if(favourities) {
           videos = favourities;
       }
    if(videos && videos.length) {
        const listOfVideos = videos.map((video, id) => 
            <VideoCard favourities={favourities} key={id} video={video} /> )
        return (
            <Grid   
                container
                direction="row"
                justify="flex-start"
                alignItems="stretch"
                item xs={12}
            >
                {listOfVideos}
                <Grid
                    container
                    direction="row"
                    justify="center"
                >
                    {!favourities ?
                    <Button  
                        justify="flex-end"
                        variant="contained"
                        onClick={()=> loadMore()}  
                        color="primary"
                    >
                        Load more results
                    </Button>:
                    ''
                    }
                </Grid>
            </Grid>
        )
    } else {
        return (
        <>
            <Grid   
                container
                direction="row"
                justify="center"
                item xs={12}
            >
                <Alert variant="filled" severity="info">
                    Your list is empty. Use search bar to find something!
                </Alert>
            </Grid>

        </>
        )
    }
}

const mapStateToProps = state => {
    return {
        videos: state.videos,
        currentPageToken: state.currentPageToken,
        currentQuery: state.currentQuery
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMoreResults: loadedvideo => dispatch(loadMoreResults(loadedvideo)),
        setPageToken: token => dispatch(setPageToken(token))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoList));