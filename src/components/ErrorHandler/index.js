import React from 'react';
import './index.css';

const errMsg = 'Smth went wrong';

export default class extends React.Component {
    constructor (props) {
        super(props);
        this.state = { isHidden: true };
    }

    componentDidUpdate (oldProps) {
        if (oldProps.error === this.props.error) return;

        this.setState({ isHidden: false });
        setTimeout(this.setState.bind(this, { isHidden: true }, function () {
            console.log(this.state);
        }), 1000);
    }

    render () {
        if (!this.props.error) return null;
        return (<div className={this.state.isHidden ? 'centered hidden' : 'centered'}>
            <div className="alert alert-danger" role="alert">
                { this.props.error.message || this.props.error.error.message || errMsg }
            </div>
        </div>);
    }
};
