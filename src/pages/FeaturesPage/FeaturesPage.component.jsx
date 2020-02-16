import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

import './FeaturesPage.stylesheet.scss';

const FeaturesPage = () => {
    return (
        <Grid container  justify="center">
            <Grid item xs={10}>
            <Typography variant="h4">
               App features
            </Typography>
            <Grid className="features__list" container>
                <Chip
                    className="features__listItem"
                    label="React"
                    clickable
                    color="primary"
                />
                <Chip
                    className="features__listItem"
                    label="Redux"
                    clickable
                    color="primary"
                />
                <Chip
                    className="features__listItem"
                    label="Local Storage integrated with Redux"
                    clickable
                    color="primary"
                />
                <Chip
                    className="features__listItem"
                    label="React Router"
                    clickable
                    color="primary"
                />
                <Chip
                    className="features__listItem"
                    label="Material UI"
                    clickable
                    color="primary"
                />
                <Chip
                    className="features__listItem"
                    label="Youtube API"
                    clickable
                    color="primary"
                />
                <Chip
                    className="features__listItem"
                    label="History search - last 5 phrases"
                    clickable
                    color="primary"
                />
                <Chip
                    className="features__listItem"
                    label="Prev/Next buttons on Video Page, using previous data query"
                    clickable
                    color="primary"
                />
                <Chip
                    className="features__listItem"
                    label="Load more button"
                    clickable
                    color="primary"
                />
                <Chip
                    className="features__listItem"
                    label="Add/remove favourite videos"
                    clickable
                    color="primary"
                />
            </Grid>
            </Grid>
        </Grid>
    );
};

export default FeaturesPage;