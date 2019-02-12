import React, { Component } from 'react';
import Item from './Item';

export default class extends Component {
    constructor (props) {
        super(props);

        this.listRef = React.createRef();
        this.state = { isLoading: false, scrollThreshold: 200, searchResult: props.searchResult };

        window.addEventListener('scroll', this.scrollHandler);
    }

    componentDidUpdate (oldProps) {
        if (this.props.searchResult === oldProps.searchResult) return;
        this.setState({ searchResult: this.props.searchResult });
    }

    scrollHandler = () => {
        if (this.state.isLoading) return;

        const { offsetHeight, offsetTop } = this.listRef.current;
        const scrollHeight = offsetHeight + offsetTop - window.innerHeight;

        if (scrollHeight - window.scrollY < this.state.scrollThreshold) {
            this.loadMore();
        }
    }

    loadMore = async () => {
        this.setState({ isLoading: true });
        let searchResult;

        try {
            searchResult = await this.props.search({ pageToken: this.state.searchResult.original.nextPageToken });
            this.setState({
                isLoading: false,
                searchResult: {
                    original: searchResult.original,
                    list: this.state.searchResult.list.concat(searchResult.list)
                }
            });
        } catch (error) {
            this.setState({ isLoading: false });
            this.props.handleError(error);
        }
    }

    render () {
        const list = this.state.searchResult.list.map((item) => (
            <Item key={item.publishedAt + item.title} value={item}/>
        ));

        return (
            <div className="d-flex justify-content-center" ref={this.listRef}>
                <ul className="card-columns">{ list }</ul>
                { this.state.isLoading ? this.props.loader : null }
            </div>
        );
    }
};
