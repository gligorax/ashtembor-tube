import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Paper, TextField, Button, Grid } from '@material-ui/core';

import './SearchBar.stylesheet.scss';

import styled from 'styled-components';
import youtube from '../../api/youtube';

import { setPageToken , search, setCurrentQuery, resetResults, addQueryToHistory } from '../../redux/actions/index';


const DropDownList = styled.ul`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 10px 10px #D3D3D3;
    padding: 10px 25px;
    left: 90px;
    left: 159px;
    top: 158px;
    z-index: 100;
`;

const DropDownItem = styled.li`
    cursor: pointer;
    transition: all .3s;
    line-height: 32px;
    list-style: none;
    &:hover {
        opacity: .3;
    }
`;


    const  SearchBar = ({search, setPageToken, history, setCurrentQuery, resetResults, lastSearches, addQueryToHistory }) => {
    
    const [query, setQuery] = React.useState('');
    const [historyDropDown, setHistoryDropDown] = React.useState(false);

    const searchPhraseHandler = (event) =>  {
        const { target: {value}} = event;
        if(value.length <= 3) {
            setHistoryDropDown(true);
        } else {
            setHistoryDropDown(false);
        }
        setQuery(value);
    }

    const getSearchResults = async (query) => {
        const response = await youtube.get('search', {
            params: {
            part: 'snippet',
            maxResults: 6,
            key: 'YOUR_API_KEY',
            q: query
        }});
        setCurrentQuery(query);
        search(response.data.items);
        setPageToken(response.data.nextPageToken)
        localStorage.setItem('storagedCurrentQuery', JSON.stringify(query));
        history.push(`/search/query=${query}`);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addQueryToHistory(query);
        getSearchResults(query);
    }

    const resetSearchResults = () => {
        localStorage.removeItem('storagedVideosData');
        localStorage.removeItem('storagedLastSearches');
        resetResults();
    }

    const clickHistoryTerm = (historyTerm) => {
        setCurrentQuery(historyTerm);
        getSearchResults(historyTerm);
        setHistoryDropDown(false);
    }

    const handleClickAway = () => {
        setHistoryDropDown(false);
      };

        return (
            <Grid
                className="searchBar"
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item justify="center" container xs={11} sm={10}>
                    <Paper elevation={6} style={{width: '100%', padding: '25px'}}>
                        <ClickAwayListener
                            onClickAway={handleClickAway}
                        > 
                            <form
                                onFocus={() => setHistoryDropDown(true)}
                                onSubmit={handleSubmit} 
                            >
                            <TextField  fullWidth label="Search..." onChange={event => searchPhraseHandler(event)}/>
                            { lastSearches.length && historyDropDown ? 
                                <DropDownList>
                                    { 
                                    lastSearches.slice(0).reverse().map((el) => 
                                        <DropDownItem  onClick={() => clickHistoryTerm(el)}  key={el}>
                                            {el}
                                        </DropDownItem>
                                    )}
                                </DropDownList>
                                : null }
                            </form>
                        </ClickAwayListener>
                    </Paper>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                    >
                    <Button 
                        onClick={resetSearchResults}
                        style={{margin: '25px 0 0 0'}} 
                        className="searchBar__btn" variant="outlined" color="secondary"
                    >
                        Reset results
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        style={{margin: '25px 0 0 15px'}} 
                        className="searchBar__btn" 
                        variant="outlined" 
                        color="primary"
                    >
                        Search results
                    </Button>
                </Grid>
                </Grid>
            </Grid>
        )
    }
                            
const mapDispatchToProps = (dispatch) => {
    return {
        setPageToken: token => dispatch(setPageToken(token)),
        search: videoList => dispatch(search(videoList)),
        setCurrentQuery: query => dispatch(setCurrentQuery(query)),
        resetResults: () => dispatch(resetResults()),
        addQueryToHistory: query => dispatch(addQueryToHistory(query))
    }
}

const mapStateToProps = state => {
    return {
        lastSearches: state.lastSearches
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));