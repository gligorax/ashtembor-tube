import React from 'react';

import { Grid, Paper, Typography } from '@material-ui/core';

const VideoItem = ({id, video, onSelectVideo}) => {
    return (
        <Grid item xs={12} md={4}>
            <Paper style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => onSelectVideo(video)}>
            <img style={{marginRight: '20px'}} alt="thumbnail" src={video.snippet.thumbnails.medium.url} />
                <Typography variant="subtitle1">{video.snippet.title}</Typography>
            </Paper>
        </Grid>
    )
}

export default VideoItem;