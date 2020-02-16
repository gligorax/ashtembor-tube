import React, { useState, useEffect } from 'react';

import { Paper, Typography, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';

import './VideoDetail.stylesheet.scss';

import { titleFormat } from '../../helpers/utilities';

import { selectVideo } from '../../redux/actions/index';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

const VideoDetail = ({videos, selectedVideo, selectVideo, history}) => {
    const { id:{videoId}, snippet:{channelTitle, description, title} } = selectedVideo;
    const indexOfSelectedVideo = videos.findIndex(video => video.etag === selectedVideo.etag);
    const [counter, setCounter] = useState(indexOfSelectedVideo);
    
    useEffect(() => {
        if(counter < videos.length && counter >= 0){
            selectVideo(videos[counter]);
        };
      }, )

    const nextVideo = () => {
        setCounter(counter + 1);
    }

    const prevVideo = () => {
        if(counter !== 0 ) { 
            setCounter(counter -1);
        }
    }

    const videoSrc = `https://www.youtube.com/embed/${videoId}`;
    return (
        <Grid className="videoDetail"> 
            <Grid container xs={10} className="videoDetail__btns">
                <div className="videoDetail__goToSearchBtn">
                    <Button
                        item xs={11}
                        className="videoPage__btn"
                        color="secondary"
                        onClick={ () => history.push('/search')}
                        variant="contained"
                        startIcon={<ArrowBackIosIcon />}
                    >
                        Go back to search results
                    </Button>
                </div>
                <Button
                    onClick={prevVideo}
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIosIcon />}
                    disabled={counter === 0}
                >
                    Previous
                </Button>
                <Button  
                    onClick={nextVideo}
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForwardIosSharpIcon />}
                    disabled={counter === videos.length -1}
                    >
                        Next
                </Button>
            </Grid>
        <Grid justify="center" container>
            <Grid>
                <Grid container justify="center">
                    <Grid  
                        className="videoDetail__video" 
                         xs={11}
                    >
                    <Paper elevation={6} style={{height: '400px'}}>
                    <iframe frameBorder="0" height="100%" width="100%" title="Video Player" src={videoSrc} />
                </Paper>
                <Paper elevation={6} style={{padding: '15px'}}>
                    <Typography className="videoDetail__title" variant="h4">
                        {titleFormat(title)} - {titleFormat(channelTitle)}
                    </Typography>
                    <Typography variant="subtitle2">
                        {titleFormat(channelTitle)}
                    </Typography>
                    <Typography 
                        variant="subtitle2"
                    >  
                        {titleFormat(description)}
                    </Typography>
                </Paper> 
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        videos: state.videos,
        selectedVideo: state.selectedVideo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectVideo: video => dispatch(selectVideo(video))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoDetail));





