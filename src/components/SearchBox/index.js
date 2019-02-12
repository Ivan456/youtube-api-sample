import React, { Component } from 'react';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = { q: '', isLoading: false };
    }

    handleChange = (event) => {
        this.setState({ q: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (!this.state.q) return;

        let searchResult;
        this.setState({ isLoading: true });
        try {
            searchResult = await this.props.search({
                q: this.state.q
            });
            this.setState({ searchResult, isLoading: false });
            this.props.handleSearchResult(searchResult);
        } catch (error) {
            this.setState({ isLoading: false });
            this.props.handleError(error);
        }
    }

    render () {
        return (
            <form className="input-group mb-3" onSubmit={this.handleSubmit}>
                <input className="form-control" placeholder="Search by a keyword or a valid url:" type="text" value={this.state.value} onChange={this.handleChange} />
                <div className="input-group-append">
                    <input className="btn btn-outline-secondary" type="submit" value="Submit" />
                </div>
                {this.state.isLoading ? this.props.loader : null}
            </form>
        );
    }
}
