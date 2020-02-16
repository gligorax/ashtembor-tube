import React from 'react';
import { Grid } from '@material-ui/core';

import { withRouter } from 'react-router-dom';

import { VideoDetail } from  '../../components/index';

import './VideoPage.stylesheet.scss';
const VideoPage = ({history}) => {
    return (
        <>
            <Grid className="videoPage" justify="center" container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid   
                            item xs={12}
                        >
                            <VideoDetail />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default withRouter(VideoPage);