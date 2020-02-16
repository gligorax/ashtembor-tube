import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import './FavouritesPage.stylesheet.scss'

import { VideoList } from  '../../components/index';

const FavouritesPage = ({favouritesVideos}) => {
    return (
        <>
            <Grid justify="center" container spacing={10}>
                <Grid className="favouritesPage__heading">
                    <h1>Your Favourites Videos </h1>
                    <Grid className="favouritesPage__icon">
                    <FavoriteBorderIcon />
                    </Grid>
                </Grid>
                <Grid 
                    item 
                    xs={11}
                >
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid   
                            item xs={12}
                        >
                            <VideoList favourities={favouritesVideos} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

const mapStateToProps = state => {
    return {
        favouritesVideos: state.favouritesVideos,
        currentPageToken: state.currentPageToken,
        currentQuery: state.currentQuery
    }
}

export default withRouter(connect(mapStateToProps, null)(FavouritesPage));