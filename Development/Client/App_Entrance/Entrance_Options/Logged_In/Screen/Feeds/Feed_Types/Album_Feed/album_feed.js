import React, {Component, createRef} from 'react';
import Album_Cover from '@album_cover';
import Photos_Container from '@photos_container';
import Single_Photo_Thumbnail from '@single_photo_thumbnail';
import Request_URLs from '@request_urls';
import Drag_Scroll from '@drag_scroll';
import './album_feed.less';

class Album_Feed extends Component {

    constructor(props){

        super(props);

        let {visitor_user_account, from_account} = props;

        this.state = {
            from_account,
            visitor_user_account,
            all_photo_links: [], //These are all the available photos in this album
            new_photos_added: [], //These are the photos that are recently added
            album_info: {},
            from_account
        };
    }

    async componentDidMount(){

        let {feed_id} = this.props;

        this.Get_Album_Update_Info(feed_id);
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Get_Album_Update_Info = async (feed_id)=>{

        let {get_album_update_logs} = Request_URLs;

        let body = {id: feed_id};

        let data = await(await fetch(
            get_album_update_logs,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type':'application/json'
                }
            }
        )).json();

        if(!data){
            return;
        }

        let {photos, album_info} = data;

        this.setState({
            new_photos_added: photos,
            album_info
        });
    }

    //Get_Photo_Links will be called by Album_Cover
    Get_Photo_Links = async (album_info) => {
        
        const { get_photo_links } = Request_URLs;

        let {id} = album_info;

        let body = {
            target_id: id,
            target_id_type: "album_id"
        }
        
        let res = await fetch(get_photo_links, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json"
            }
        });
        
        let {results} = (await res.json()) ?? {results: {targets: [], reactions: []}};

        results = this.Aggregate_Photos_with_Reactions(results);

        //These need to stay in order for photo_links data to show up in the container
        this.state.selected_album = album_info;
        this.state.all_photo_links = results;

        await this.setState({ all_photo_links: results});

        return results;

    }

    Aggregate_Photos_with_Reactions = (data)=>{

        let {targets, reactions} = data;

        let dictionary = {};

        for(let i in targets){

            let {id} = targets[i];

            //Map each pointer of the photo_links to a key
            dictionary[id] = targets[i];

            dictionary[id].reactions = [];
    
        }

        for(let reaction of reactions){

            let {photo_id} = reaction;

            //Add each reaction according mapped to the target_id
            dictionary[photo_id].reactions.push(reaction);

        }

        return targets;

    }

    Create_Album_Cover = ()=>{

        let {album_info, visitor_user_account, from_account} = this.state;

        return <div id="album-feed-cover-wrapper">

            <div id="album-cover">

                <Album_Cover 
                    album_info={album_info}
                    change_display={this.Change_Display}
                    Get_Photo_Links={this.Get_Photo_Links}
                    owner_user_account={from_account}
                    visitor_user_account={visitor_user_account}
                />

            </div>

        </div>;
    }

    Open_Photo_Container = () =>{

        let {all_photo_links, album_info, visitor_user_account, from_account} = this.state;

        let {change_display} = this.props;

        let { Get_Photo_Links} = this;


        return (<Photos_Container 
            photo_links={all_photo_links}
            album_info={album_info}
            owner_user_account={from_account}
            visitor_user_account={visitor_user_account}
            Get_Albums={null} //This is only used for editor to retrieve the album in case of updating the album cover, which this doesn't need
            change_main_display={change_display}
            return_previous_display={null} //This is only used for editor in case of deleting the album, which this doesn't need
            refresh_photo_links={Get_Photo_Links}
        />);
        
    }

    Change_Display = ()=>{

        this.props.change_display(this.Open_Photo_Container);

    }

    Create_New_Photos_Added = ()=>{

        let {new_photos_added, from_account, album_info, visitor_user_account} = this.state; 

        let {change_display} = this.props;

        let scrollRef = createRef();

        let drag_scroll = new Drag_Scroll();

        return <div id="list-of-photos-horiz-scroll"
            ref={scrollRef}
            onMouseDown={(e)=>{drag_scroll.init_drag(e, scrollRef.current);}}
            onMouseLeave={(e)=>{drag_scroll.disable_drag(e, scrollRef.current);}}
            onMouseUp={(e)=>{drag_scroll.disable_drag(e, scrollRef.current);}}
            onMouseMove={(e)=>{drag_scroll.move_drag(e, scrollRef.current);}}
        >

                {new_photos_added.map((data, index)=>{

                    return <div key={data.id} className="added-photo">

                        <Single_Photo_Thumbnail
                            photo_info={data}
                            owner_user_account={from_account}
                            visitor_user_account={visitor_user_account}
                            album_info={album_info}
                            Get_Albums={null}
                            change_main_display={change_display}
                        />

                    </div>
                })}

            </div>;
    }

    render(){

        let {header} = this.props;

        let {from_account, new_photos_added, album_info} = this.state;

        let {title} = album_info;

        let {first_name, last_name, gender} = from_account;

        //If no user deleted all new photos added, then display nothing
        return (!new_photos_added.length ? <></> : <div id="album-feed" className="general-feed">

                {header}

                <div id="album-feed-detail-description">

                    {this.Create_Album_Cover()} 

                    <label>{first_name} {last_name} has added {new_photos_added.length} new photos to {gender === "Male" ? "his" : (gender === "Unspecified" ? "its" : "her")} album "{title}" </label>

                </div>

                <div id="list-of-added-photos-wrapper">

                    {this.Create_New_Photos_Added()}

                </div>

            </div>
        )
    }
}

export default Album_Feed;