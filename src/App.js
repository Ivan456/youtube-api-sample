import React, { Component } from 'react';
import SearchBox from './components/SearchBox';
import List from './components/List';
import Spinner from './components/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import search from './service/search';
import ErrorHandler from './components/ErrorHandler';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = { searchResult: { list: [] }, error: null };
    }

    handleSearchResult = (searchResult) => {
        this.setState({ searchResult });
    }

    handleError = (error) => {
        this.setState({ error });
    }

    render () {
        return (
            <div className="container">
                <h1 className="text-center display-4">Video Search App</h1>
                <SearchBox
                    search={search}
                    handleSearchResult={this.handleSearchResult}
                    loader={<Spinner/>}
                    handleError={this.handleError}
                />
                <List
                    search={search}
                    searchResult={this.state.searchResult}
                    loader={<Spinner/>}
                    handleError={this.handleError}
                />
                <ErrorHandler error={this.state.error}/>
            </div>
        );
    }
}

export default App;
