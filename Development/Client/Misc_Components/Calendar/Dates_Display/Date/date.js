import React, { Component } from 'react';
import './date.less';

class Date extends Component {

    constructor(props) {

        super(props);

        this.state = {
            date: this.props.date,
            style: this.props.style,
            popup: this.props.popup
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

            }}
            >
                <div id="popup">
                    {this.state.popup}
                </div>
                
                <div id="the-date-value"
                    
                    style={this.state.style}
                >
                
                    {this.state.date}
                    
                </div>

            </div>
        );
    }
}

export default Date;