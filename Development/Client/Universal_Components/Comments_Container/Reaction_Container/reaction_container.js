import React, {Component} from 'react';
import Context from '@context/context.js';
import Profile_Thumbnail from '@universal_components/Profile_Thumbnail/profile_thumbnail.js'
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


    constructor(props){
        
        super(props);

        let {owner_user_account, visitor_user_account, reactions, target_id, target_type} = props;

        let {like, dislike, existing_users} = this.Categorize_Reactions(reactions);

        this.state = {
            owner_user_account,
            visitor_user_account,
            like_dislike: {like, dislike},
            target_id,
            target_type,
            existing_users //This is to use to figure out whether the user had already given a reaction before to determine if the user is already in the data base,
                                //so that I would know whether to update or insert into database
        };
                                                                
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps.reactions !== this.props.reactions){

            let {reactions} = this.props;

            let {like, dislike, existing_users} = this.Categorize_Reactions(reactions);

            this.setState({
                like_dislike: {like, dislike},
                existing_users
            });
        }
    }

    Categorize_Reactions = (reactions)=>{

        let obj = {like: [], dislike: [], existing_users: {}};

        for(let r of reactions){

            let {user_id} = r;

            obj.existing_users[user_id] = r;

            obj[r.reaction]?.push(r);
        }

        return obj;
    }

    Capture_Reaction = async (reaction = null, emoji = "")=>{

        let {signal_refresh_this_section_comments} = this.props;

        let {submit_reaction} = this.context.Request_URLs;

        let {target_id, target_type, visitor_user_account} = this.state;

        let {id: user_id} = visitor_user_account;
        
        let body = {
            target_id,
            user_id,
            emoji,
            reaction,
            target_type
        };

        await fetch(submit_reaction,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        //Signal all the way to the upper heirchy to refresh the comments so that to see the updated reaction
        signal_refresh_this_section_comments();
    }

    render(){

        let {like_dislike, existing_users, visitor_user_account, owner_user_account} = this.state;

        let {id} = visitor_user_account;

        let {aws_s3_url} = this.context.Request_URLs;

        return <div id="reaction-container-wrapper">
            
            <div id="thumbs">

                {Object.keys(this.Like_Dislike).map((key, ind)=>{

                    return <div key={ind} id={key}>
                        
                        <div id="icon-wrapper" onClick={(e)=>{ this.Capture_Reaction(key); }}>

                            <img src={`./static/${this.Like_Dislike[key]}.png`} className={`${existing_users[id]?.reaction === key ? 'selected-reaction' : ''}`}/>
                            <label>{like_dislike[key].length}</label>

                        </div>

                        <div id="reaction-dropdown" className={like_dislike[key].length ? "" : "no-reaction"}>

                            {like_dislike[key].map((value, index)=>{
                                
                                let {profile_picture_link, first_name, last_name, emojis, user_id} = value;


                                let split_emojis = emojis === "" ? [] : emojis.split(",");

                                return <div className="entry" key={index}>

                                    <div id="profile-picture">

                                        <label id="hidden-name">{first_name} {last_name}</label>
                                        
                                        <Profile_Thumbnail 
                                            visitor_user_account={visitor_user_account}
                                            owner_user_account={owner_user_account}
                                            profile={{id: user_id, profile_picture_link}}
                                        />


                                    </div>

                                    <div id="given-emojis">

                                        {split_emojis.map((v,i)=>{

                                            return <div className="emoji-icon-wrapper" key={i}>

                                                <img src={`./static/${v}.png`} />

                                            </div>;

                                        })}

                                    </div>

                                </div>;

                            })}

                        </div>

                    </div>;

                })}

            </div>

            <div id="emojis-wrapper">

                {existing_users[id]?.reaction ? 
                    <div id="emoji-contents">

                        <label id="label">Emojis</label>

                        <div id="emojis-dropdown">

                            {Object.keys(this.Emoji_Icon_Names).map((key, index)=>{

                                let name = this.Emoji_Icon_Names[key];

                                return <div className={`emoji-icon ${existing_users[id].emojis.includes(name) && 'selected-emoji'}`} key={index}>

                                    <img src={`./static/${name}.png`} onClick={(e)=>{

                                        this.Capture_Reaction(null, name);

                                    }}/>

                                </div>;

                            })}

                        </div>

                    </div> 
                    : ""}

            </div>

        </div>;
    }
}

export default Reaction_Container;