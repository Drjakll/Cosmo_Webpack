import React, {Component, createRef} from 'react';
import Album_Cover from './Album_Cover/album_cover.js';
import Context from '@context/context.js';
import Photos_Container from './Photos_Container/photos_container.js';
import './albums.less';

class Albums extends Component {

    Container = Photos_Container.Photos_Container
    
    constructor(props){
        
        super(props);
        
        Albums.contextType = Context;

        let {visitor_user_account, owner_user_account} = props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            albums: [],
            photo_links: [],
            selected_album: {}
        };
    }
    
    componentDidMount(){
        
        this.Get_Albums();
    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);

    }
    
    Get_Albums = async () => {

        let {owner_user_account} = this.state;

        if(!owner_user_account?.id){
            return;
        }

        let {id} = owner_user_account;
        
        const {get_albums} = this.context.Request_URLs;
        
        let res = await fetch(`${get_albums}/${id}`, {
            method: "GET"
        });
        
        let resJson = await res.json();

        if(!resJson){
            return;
        }

        this.setState({albums: resJson.results});
    }
    
    //Get_Photo_Links will be called by Album_Cover
    Get_Photo_Links = async (album_info) => {
        
        const { get_photo_links } = this.context.Request_URLs;

        let {id} = album_info;

        let body = {
            target_id: id,
            target_type: "album"
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
        this.state.photo_links = results;

        await this.setState({ photo_links: results, selected_album: album_info});

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

            let {target_id} = reaction;

            //Add each reaction according mapped to the target_id
            dictionary[target_id].reactions.push(reaction);

        }

        return targets;

    }

    Open_Photo_Container = () =>{

        let {photo_links, selected_album, owner_user_account, visitor_user_account} = this.state;

        let {change_display, return_previous_display} = this.props;

        let { Container, Get_Albums, Get_Photo_Links} = this;

        return (<Container 
            photo_links={photo_links}
            album_info={selected_album}
            owner_user_account={owner_user_account}
            visitor_user_account={visitor_user_account}
            Get_Albums={Get_Albums}
            change_main_display={change_display}
            return_previous_display={return_previous_display}
            refresh_photo_links={Get_Photo_Links}
        />);
        
    }

    Change_Display = ()=>{

        this.props.change_display(this.Open_Photo_Container);

    }
    
    render(){
        
        const { Drag_Scroll } = this.context;
        
        let drag_scroll = new Drag_Scroll();
        
        let albumsWrapperRef = createRef();

        
        return (
             <div id="albums">
                
                <div id="albums-top"> 

                    <div id="albums-label">

                        <img src="./static/album_icon.png"/>
                        
                        <label>Albums</label>

                    </div>
                        
                </div>    
                    
                <div id="albums-wrapper"
                    ref={albumsWrapperRef}
                    onMouseDown={(e)=>{drag_scroll.init_drag(e, albumsWrapperRef.current);}}
                    onMouseLeave={(e)=>{drag_scroll.disable_drag(e, albumsWrapperRef.current);}}
                    onMouseUp={(e)=>{drag_scroll.disable_drag(e, albumsWrapperRef.current);}}
                    onMouseMove={(e)=>{drag_scroll.move_drag(e, albumsWrapperRef.current);}}
                >
                        
                    {this.state.albums.map((data, index)=>{
                            
                        return <div className="album-cover-wrapper" key={index}>
                                
                            <Album_Cover album_info={data} 
                                        change_display={this.Change_Display}
                                        Get_Photo_Links={this.Get_Photo_Links}
                                        owner_user_account={this.state.owner_user_account}
                                        visitor_user_account={this.state.visitor_user_account}
                            />
            
                        </div>;
                            
                    })}
                        
                </div>
                    
            </div>
        );
    }
}

export default {Albums, Photos_Container};