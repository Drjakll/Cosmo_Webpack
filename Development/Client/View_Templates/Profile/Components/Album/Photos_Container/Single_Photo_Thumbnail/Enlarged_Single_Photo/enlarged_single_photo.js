import React, {Component} from 'react';
import Comments_Container from '@comments_container/comments_container.js';
import Context from '@context/context.js';
import General_Reaction_Container from '@universal_components/General_Reactions_Container/general_reactions_container.js';
import './enlarged_single_photo.less';
import { io } from 'socket.io-client';

class Enlarged_Single_Photo extends Component {

    static contextType = Context;

    Comments = Comments_Container

    Render_Option_Buttons = null;
    
    constructor(props){
        
        super(props);

        let {owner_user_account, visitor_user_account, photo_info, aws_s3_url, album_info} = this.props;
        
        this.state = {
            photo_info,
            aws_s3_url,
            owner_user_account,
            visitor_user_account,
            album_info
        };
    }

    componentDidMount(){

        this.socket = io('/reaction_room');

        this.socket.on('connect', ()=>{

            let {id} = this.state.photo_info;

            let room_name = `photo_${id}`;

            this.socket.emit('join_reaction_room', {room_name});

        });

        this.socket.on('refresh_reactions', this.Refresh_Reactions);

    }    
    
    Signal_All_Refresh_Reactions = ()=>{

        let {id} = this.state.photo_info;

        this.socket.emit('signal_all_refresh_reactions', {room_name: `photo_${id}`});
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }

    Refresh_Reactions = async ()=>{

        let {get_photo_links} = this.context.Request_URLs;

        let {id} = this.state.photo_info;

        let data = await( await fetch(
            get_photo_links,
            {
                method: "POST",
                body: JSON.stringify({id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        if(data && data.results?.length){

            await this.setState({photo_info: data.results[0]});

        }

    }
    
    render() {

        let {photo_info, visitor_user_account, owner_user_account} = this.state;

        let {Comments, Signal_All_Refresh_Reactions} = this;
        
        return <div id="enlarged-single-photo-wrapper">

            <div id="enlarged-single-photo">

                <div id="enlarged-photo-wrapper">

                    <div id="photo-editor-wrapper">{this.Render_Option_Buttons && this.Render_Option_Buttons()}</div>

                    <div id="enlarged-photo"
                        style={{
                            backgroundImage: `url('${this.state.aws_s3_url}${photo_info.link}')`
                        }}
                    >

                    </div>

                    <div id="reactions-wrapper">

                        <General_Reaction_Container 
                            visitor_user_account={visitor_user_account} 
                            owner_user_account={owner_user_account} 
                            reactions={photo_info.reactions} 
                            target_id={photo_info.id}
                            target_type={"photo"}
                            refresh_parent={Signal_All_Refresh_Reactions}
                        />

                    </div>

                </div>

                <div id="comments-area-wrapper">

                    <Comments
                        reply_to_id={null}
                        target_id={photo_info.id}
                        target_type={"photo"}
                        visitor_user_account={this.state.visitor_user_account}
                        owner_user_account={this.state.owner_user_account}
                        parent_room_name={null}
                        comments_count={photo_info.comments_count}
                    />

                </div>

            </div>

        </div>;
    }
}

export default Enlarged_Single_Photo;