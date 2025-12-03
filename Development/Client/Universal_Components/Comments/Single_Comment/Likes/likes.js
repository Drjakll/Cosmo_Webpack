import React, {Component} from 'react';
import './likes.less';

class Likes extends Component {

    constructor(props){

        super(props);

        let {likes, visitor_user_account} = props;

        this.state = {
            likes,
            visitor_user_account
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps === this.props){
            return;
        }

        this.setState(this.props);
    }

    Apply_Props = (e)=>{

        this.props.apply_props && this.props.apply_props("likes");
    }

    Open_Who_Gave_Props = (e)=>{

        this.props.open_who_gave_props && this.props.open_who_gave_props(true, "likes");
    }

    render(){

        let {likes, visitor_user_account} = this.state;

        likes = typeof likes === "string" ? JSON.parse(likes) : likes;

        return (<div id="likes">

            <div id="likes-icon-wrapper">

                <img src="./static/thumbs_up.png" onClick={this.Apply_Props} className={`${likes[visitor_user_account.email] ? "selected" : ""}`}/>

            </div>

            <div id="likes-value-wrapper">

                <label onClick={this.Open_Who_Gave_Props}>
                    {Object.keys(likes).length}
                </label>

            </div>

        </div>);
    }
}

export default Likes;