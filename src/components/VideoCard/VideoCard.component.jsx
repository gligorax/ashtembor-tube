import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import YouTubeIcon from '@material-ui/icons/YouTube';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import './VideoCard.stylesheet.scss';

import { selectVideo, addToFavorite, removeFromFavourite } from '../../redux/actions/index';

import { titleFormat } from '../../helpers/utilities';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  btnActive: {
    color: 'red'
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const VideoCard = ({ 
  video,
  history, 
  selectVideo, 
  addToFavorite, 
  favourities, 
  removeFromFavourite, 
  favouritesVideos 
}) => {
  const classes = useStyles();
  const [added, favoriteHandler] = useState(false);
  const onSelectVideo = (video) => {
    localStorage.setItem('storagedSelectedVideo', JSON.stringify(video));
    selectVideo(video);
    history.push(`/details/video=${video.id.videoId}`);
  }

  const addToFavourite = (video) => {
    favoriteHandler(!added);
    addToFavorite(video);
    localStorage.setItem('storagedFavouritiesVideos', JSON.stringify(favouritesVideos.concat(video)));
  }

  const removeFromFavouriteList = async (removedVideo) => {
    removeFromFavourite(video);
    const arrAfterRemoving =  favouritesVideos.filter( video => { 

      return video.id.videoId !== removedVideo.id.videoId
    });

    localStorage.setItem('storagedFavouritiesVideos', JSON.stringify(arrAfterRemoving));
  }

  return (
    <Grid 
      item
      xs={12}
      sm={6}
      md={4}
      className="videoCard"
    >
      <Card className="videoCard__card">
        <CardHeader
          className="videoCard__header"
          avatar={
            <Avatar aria-label="app-icon" className={classes.avatar}>
              <YouTubeIcon />
            </Avatar>
          }
          title={titleFormat(video.snippet.title)}
          subheader={titleFormat(video.snippet.channelTitle)}
          onClick={() => onSelectVideo(video)}
        />
      <CardMedia
        className={classes.media}
        onClick={() => onSelectVideo(video)}
        image={video.snippet.thumbnails.high.url}
        title={`${video.snippet.title}`}
      />
      <CardContent>
        <Typography className='videoCard__desc' variant="body2" color="textSecondary" component="p">
          {video.snippet.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {!favourities?
          <IconButton 
            color={added ? "secondary" : "default"} 
            onClick={() => addToFavourite(video)} 
            aria-label="add to favorites"
        >
          <FavoriteIcon className={classes.color} />
        </IconButton>
        :
        <IconButton 
          color={added ? "secondary" : "default"} 
          onClick={() => removeFromFavouriteList(video)} 
          aria-label="add to favorites"
        >
        <DeleteForeverIcon className={classes.color} />
    </IconButton>
        }
      </CardActions>
    </Card>
  </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      selectVideo: video => dispatch(selectVideo(video)),
      addToFavorite: video => dispatch(addToFavorite(video)),
      removeFromFavourite: video => dispatch(removeFromFavourite(video))
  }
}

const mapStateToProps = state => {
  return {
    favouritesVideos: state.favouritesVideos,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoCard));