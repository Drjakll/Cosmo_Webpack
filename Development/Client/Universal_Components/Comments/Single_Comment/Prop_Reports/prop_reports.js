import React, {Component} from 'react';
import Context from '@context/context.js';
import './prop_reports.less';

class Prop_Reports extends Component {

    static contextType = Context;

    constructor(props){

        super(props);

        let {prop_type, prop_obj, emojis} = props; 

        this.state = {
            prop_type,
            prop_obj,
            emojis
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps === this.props){
            return;
        }

        this.setState(this.props);
    }

    componentDidMount(){

    }

    Organize_Props = ()=>{

        let {prop_obj, emojis} = this.state;

        prop_obj = JSON.parse(prop_obj) || prop_obj;

        emojis = JSON.parse(emojis) || emojis;
        
        let organized_props = {};

        //Extract the email from the prop_obj
        for(let email in prop_obj){

            //Extract the profile_picture_link, first_name, last_name from the prop_obj[email]
            let {profile_picture_link, first_name, last_name} = prop_obj[email];

            //Attach the profile_picture_link, first_name, last_name to the organized_props[email] but with the added emojis object.
            organized_props[email] = {profile_picture_link, first_name, last_name, emojis: {}};

            //Extract the types of emojis
            for(let type in emojis){

                //Get emoji object (which has all the users email and information) from the emojis[type]
                let emo_type = emojis[type];

                //Each object in the emo_type has the key/label of the user's email
                for(let same_email in emo_type){

                    //If the user email exists in the organized_props object
                    if(organized_props[same_email]){

                        //Add the emoji to the organized_props[email]
                        organized_props[same_email].emojis[type] = type;

                    }

                }
            }
        }

        return organized_props;
    }

    render(){

        let {aws_s3_url} = this.context.Request_URLs;

        let props_with_users = this.Organize_Props();
        
        let {prop_type} = this.state;

        return (
            <div id="prop-reports-popup">

                <div id="prop-title">

                    <div id="prop-label">{prop_type === "likes" ? "Likes" : "Dislikes"}</div>

                    <div id="prop-icon">

                        <img src={`./static/${prop_type === "likes" ? "thumbs_up" : "thumbs_down"}.png`} />

                    </div>

                </div>

                <div id="user-given-prop-list">

                    {Object.keys(props_with_users).map((email, index)=>{

                        let {first_name, last_name, profile_picture_link, emojis} = props_with_users[email];

                        return <div className="given-prop-entry" key={email}>

                            <div id="user-information">

                                <div id="user-profile-picture-wrapper">

                                    <img src={`${aws_s3_url}${profile_picture_link}`} />

                                </div>

                            </div>

                            <div id="user-given-emojis">

                                <div id="user-real-name">

                                    {first_name} {last_name}

                                </div>

                                <div id="given-emojis-wrapper">

                                    {Object.keys(emojis).map((type, index)=>{

                                        return (<div className="given-emoji" key={index}>

                                            <div id="emoji-icon-wrapper">

                                                <img src={`./static/${type}.png`}/>

                                            </div>

                                        </div>);

                                    })}

                                </div>

                            </div>
                        
                        </div>;

                    })}

                </div>

            </div>
        )
    }
}

export default Prop_Reports;