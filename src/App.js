import React from 'react';

import './App.scss';

import { Navigation, SearchBar } from './components/index';

class App extends React.Component {
    render() {
        return (
            <>
                <Navigation/>
                <SearchBar/>
            </>
        )
    }
}

export default App;