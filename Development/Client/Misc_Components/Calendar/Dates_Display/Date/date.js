import React, { Component } from 'react';


class Date extends Component {

    constructor(props) {

        super(props);

        this.state = {
            date: this.props.date
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);

    }

    render() {

        return (
            <div id="date" onClick={(e) => {

                if (this.props.callback) {
                    this.props.callback();
                }

            }}>

                {this.state.date}

            </div>
        );
    }
}

export default Date;