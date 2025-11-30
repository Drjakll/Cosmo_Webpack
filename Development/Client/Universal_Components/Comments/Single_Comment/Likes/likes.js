import React, {Component} from 'react';
import './likes.less';

class Likes extends Component {

    constructor(props){

        super(props);

        let {likes} = props;

        this.state = {
            likes
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps === this.props){
            return;
        }

        this.setState(this.props);
    }

    render(){

        let {likes} = this.state;

        likes = typeof likes === "string" ? JSON.parse(likes) : likes;

        return (<div id="likes">

            <div id="likes-icon-wrapper">

                <img src="./static/thumbs_up.png"/>

            </div>

            <div id="likes-value-wrapper">

                <label>{Object.keys(likes).length}</label>

            </div>

        </div>);
    }
}

export default Likes;