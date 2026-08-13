import React, {Component} from 'react';
import Profile_Thumbnail from '@profile_thumbnail';
import init_websocket from '@init_websocket';
import Request_URLs from '@request_urls';
import './general_reactions_container.less';

class General_Reactions_Container extends Component {

    //A flag to confirm that joined the websocket's room, so that it only join the room once
    room_joined = false;

    constructor(props){

        super(props);

        let {reactions, visitor_user_account, owner_user_account, target_id_type, target_id} = props;

        let {like, dislike, users_that_given_reaction} = this.Separate_Reactions(reactions);

        this.state = {
            like,
            dislike,
            users_that_given_reaction,
            owner_user_account,
            visitor_user_account,
            target_id_type,
            target_id
        };
    }

    async componentWillUnmount(){

        console.log("unmounting reaction component");

        await this.socket?.disconnect();
        
    }

    componentDidMount(){

        this.Init_Socket();

    }

    Init_Socket = ()=>{

        if(!this.props.target_id || this.room_joined === true){
            return;
        }

        this.room_joined = true;

        this.socket = init_websocket('/reaction_room');

        this.socket?.on('connect', ()=>{

            let {target_id_type, target_id} = this.props;

            let room_name = `${target_id_type}_${target_id}`;

            this.socket?.emit('join_reaction_room', {room_name});

        });

        this.socket?.on('refresh_reactions', this.Refresh_Reactions);

        this.socket?.on('confirm_joined_room', this.Confirmed_Joined_Room);
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {target_id_type, target_id, reactions} = this.props;

        let {like, dislike, users_that_given_reaction} = this.Separate_Reactions(reactions);

        this.setState({
            like,
            dislike, 
            users_that_given_reaction, 
            target_id_type, 
            target_id
        });

        this.Init_Socket();
    }

    Confirmed_Joined_Room = () => {

        if(!this.state.target_id){
            return;
        }

        this.room_joined = true;
    }

    Refresh_Reactions = async ()=>{

        let {get_one_set_reactions} = Request_URLs;

        let {target_id, target_id_type} = this.state;

        let data = await( await fetch(
            `${get_one_set_reactions}/${target_id}/${target_id_type}`,
            {
                method: "GET"
            }
        )).json();

        let {results : reactions} = data;

        let {like, dislike, users_that_given_reaction} = this.Separate_Reactions(reactions);
        
        this.setState({
            like,
            dislike, 
            users_that_given_reaction
        });

    }

    Separate_Reactions = (reactions)=>{


        let obj = {like: [], dislike: [], users_that_given_reaction: {}};

        if(!reactions){
            return obj;
        }

        for(let r of reactions){

            obj[r.reaction]?.push(r);

            obj.users_that_given_reaction[r.user_id] = r;  

        }

        return obj;

    }

    Capture_Reaction = async (reaction = null, emoji = "")=>{

        let {submit_reaction} = Request_URLs;

        let {target_id, target_id_type, visitor_user_account} = this.state;

        let {id: user_id} = visitor_user_account;
        
        let body = {
            target_id,
            user_id,
            emoji,
            reaction,
            target_id_type
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

        this.socket?.emit('signal_all_refresh_reactions', {room_name: `${target_id_type}_${target_id}`});

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


        let {users_that_given_reaction, visitor_user_account, owner_user_account } = this.state;
        

        return <div id="general-reactions-container-wrapper">

            <div id="general-reactions-given">

                {Object.keys(this.Thumbnails).map((key, ind)=>{
                    
                    let items = this.state[key];
                    let thumbnail_name = this.Thumbnails[key];

                    return <div className="reactions-wrapper" key={ind}>

                            <div id="reaction-label">

                                <img src={`./static/${thumbnail_name}.webp`} onClick={(e)=>{

                                    this.Capture_Reaction(key, "");

                                }}/>{items.length}

                            </div>

                            <div id="given-reactions" className={`${items.length ? '' : 'no-reaction'}`}>

                                {items.map((value, index)=>{

                                    let {first_name, last_name, profile_picture_link, emojis, user_id} = value;

                                    let split_emojis = emojis === "" ? [] : emojis.split(',');

                                    return <div className="reaction-item" key={index}>

                                            <div id="profile-picture-wrapper">

                                                <Profile_Thumbnail
                                                    visitor_user_account={visitor_user_account}
                                                    owner_user_account={owner_user_account}
                                                    profile={{profile_picture_link, id: user_id}}
                                                    generate_options_disabled={true}
                                                />

                                                <label id="hidden-name">{first_name} {last_name}</label>

                                            </div>

                                            <div id="user-given-emojis">

                                                {split_emojis.map((v, i)=>{

                                                    return <div className="emoji-thumbnail" key={i}>

                                                            <img src={`./static/${v}.webp`} />

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

                                        <img src={`./static/${name}.webp`} 
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