import React, {Component} from 'react';
import Context from '@context/context.js';
import './reaction_container.less';

class Reaction_Container extends Component {

    static contextType = Context

    Emoji_Icon_Names = {
        "angry":"angry",
        "laugh":"laugh",
        "sad":"sad",
        "surprised":"surprised",
        "sympathetic":"sympathetic",
        "passionate":"passionate"
    }

    Like_Dislike = {
        like: "thumbs_up",
        dislike: "thumbs_down"
    }

    Existing_User = {} //This is to use to figure out whether the user had already given a reaction before to determine if the user is already in the data base,
                        //so that I would know whether to update or insert into database

    constructor(props){
        
        super(props);

        let {owner_user_account, visitor_user_account, reactions, target_id} = props;

        let {like, dislike} = this.Categorize_Reactions(reactions);

        this.state = {
            owner_user_account,
            visitor_user_account,
            like_dislike: {like, dislike},
            target_id
        };
                                                                
    }

    Categorize_Reactions = (reactions)=>{

        let obj = {like: [], dislike: []};

        for(let r of reactions){

            obj[r.reaction].push(r);
        }

        return obj;
    }

    Capture_Reaction = async (reaction = null, emoji = null)=>{

        let {submit_comment_reaction} = this.context.Request_URLs;

        let {target_id, visitor_user_account} = this.state;

        let {id} = visitor_user_account;
        
        
    }

    render(){

        let {like_dislike} = this.state;

        let {aws_s3_url} = this.context.Request_URLs;

        return <div id="reaction-container-wrapper">

            {Object.key(this.Like_Dislike).map((key, ind)=>{

                return <div key={ind} id={key}>

                        <div id="icon-wrapper" onDoubleClick={(e)=>{ this.Capture_Reaction(key); }}>

                            <img src={`./static/${this.Like_Dislike[key]}.png`} />

                        </div>;

                        <div id="dropdown">

                            {like_dislike[key].map((value, index)=>{

                                let {user_id, profile_picture_link, first_name, last_name, emojis} = value;

                                this.Existing_User[user_id] = value;

                                let split_emojis = emojis.split(",");

                                return <div className="entry" key={index}>

                                        <div id="user-info">

                                            <div id="profile-picture">

                                                <label id="hidden-name">${first_name} ${last_name}</label>

                                                <img src={`${aws_s3_url}${profile_picture_link}`} />

                                            </div>

                                            <div id="emojis">

                                                {split_emojis.map((v,i)=>{

                                                    return <div className="emoji-icon-wrapper" key={i}>

                                                            <img src={`./static/${v}.png`} />

                                                        </div>;

                                                })}

                                            </div>

                                        </div>

                                    </div>;

                            })}

                        </div>

                    </div>;

            })}

            

        </div>;
    }
}

export default Reaction_Container;