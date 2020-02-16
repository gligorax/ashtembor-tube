import React from 'react';

import { Grid } from '@material-ui/core';

import { VideoList } from  '../../components/index';

import './SearchPage.stylesheet.scss';

const SearchPage = () => {
    return (
        <>
            <Grid 
                container 
                className="searchPage" 
                justify="center"
            >
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid   
                            item xs={12}
                        >
                            <VideoList />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default SearchPage;