import React, {Component} from 'react';
import Context from '@context/context.js';
import './general_reactions_container.less';

class General_Reactions_Container extends Component {

    static contextType = Context

    constructor(props){

        super(props);

        let {reactions, visitor_user_account, owner_user_account, target_type, target_id} = props;

        let {like, dislike, users_that_given_reaction} = this.Separate_Reactions(reactions);

        this.state = {
            like,
            dislike,
            users_that_given_reaction,
            owner_user_account,
            visitor_user_account,
            target_type,
            target_id
        };
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {target_type, target_id, reactions} = this.props;

        let {like, dislike, users_that_given_reaction} = this.Separate_Reactions(reactions);

        this.setState({
            like,
            dislike, 
            users_that_given_reaction, 
            target_type, 
            target_id
        });
    }

    Separate_Reactions = (reactions)=>{


        let obj = {like: [], dislike: [], users_that_given_reaction: {}};

        if(!reactions){
            return obj;
        }

        for(let r of reactions){

            obj[r.reaction].push(r);

            obj.users_that_given_reaction[r.user_id] = r;  

        }

        return obj;

    }

    Capture_Reaction = async (reaction = null, emoji = "")=>{

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

        this.props.refresh_parent();

    }

    Thumbnails = {
        like: "thumbs_up",
        dislike: "thumbs_down"
    }

    Emoji_Icon_Names = {
        "angry":"angry",
        "laugh":"laugh",
        "sad":"sad",
        "surprised":"surprised",
        "sympathetic":"sympathetic",
        "passionate":"passionate"
    }

    render(){

        let {aws_s3_url} = this.context.Request_URLs;

        let {users_that_given_reaction, visitor_user_account, target_id} = this.state;
        

        return <div id="general-reactions-container-wrapper">

            <div id="general-reactions-given">

                {Object.keys(this.Thumbnails).map((key, ind)=>{
                    
                    let items = this.state[key];
                    let thumbnail_name = this.Thumbnails[key];

                    return <div className="reactions-wrapper" key={ind}>

                            <div id="reaction-label">

                                <img src={`./static/${thumbnail_name}.png`} onClick={(e)=>{

                                    this.Capture_Reaction(key, "");

                                }}/>{items.length}

                            </div>

                            <div id="given-reactions" className={`${items.length ? '' : 'no-reaction'}`}>

                                {items.map((value, index)=>{

                                    let {first_name, last_name, profile_picture_link, emojis} = value;

                                    let split_emojis = emojis === "" ? [] : emojis.split(',');

                                    return <div className="reaction-item" key={index}>

                                            <div id="profile-picture-wrapper">

                                                <img src={`${aws_s3_url}${profile_picture_link}`}/>

                                                <label id="hidden-name">{first_name} {last_name}</label>

                                            </div>

                                            <div id="user-given-emojis">

                                                {split_emojis.map((v, i)=>{

                                                    return <div className="emoji-thumbnail" key={i}>

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

            <div id="general-emojis-given">

                {users_that_given_reaction[visitor_user_account.id] ? 

                    <div id="emoji-options">

                        <div id="emoji-options-label">

                            Emojis

                        </div>

                        <div id="emoji-options-dropdown">

                            {Object.keys(this.Emoji_Icon_Names).map((v, i)=>{

                                let name = this.Emoji_Icon_Names[v];

                                let {id} = visitor_user_account;

                                return <div className={`emoji-icon-wrapper`} key={i}>

                                        <img src={`./static/${name}.png`} 
                                            className={`${users_that_given_reaction[id]?.emojis?.includes(name) && "selected-emoji"}`} 
                                            onClick={(e)=>{ 
                                                this.Capture_Reaction(null, name);
                                            }}
                                        />

                                    </div>;

                            })}

                        </div>

                    </div> 

                    : ""
                }

            </div>

        </div>;
    }
}

export default General_Reactions_Container;