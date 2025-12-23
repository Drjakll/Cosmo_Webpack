import React, {Component, createRef} from 'react';
import Album_Cover from './Album_Cover/album_cover.js';
import Context from '@context/context.js';
import Photos_Container from './Photos_Container/photos_container.js';
import './albums.less';

class Albums extends Component {

    Photos_Container = Photos_Container
    
    constructor(props){
        
        super(props);
        
        Albums.contextType = Context;

        let {visitor_user_account, owner_user_account, album_editor} = this.props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            album_editor,
            albums: [],
            photos: [],
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
        
        let properties = this.props;
        
        this.setState(properties);
        
        if(properties.owner_user_account){
        
            this.Get_Albums();
            
        }
    }
    
    Get_Albums = async () => {

        let {owner_user_account} = this.state;

        if(!owner_user_account){
            return;
        }
        
        const {Request_URLs} = this.context;
        
        let res = await fetch(Request_URLs.get_photo_albums, {
            method: "POST",
            body: JSON.stringify(owner_user_account),
            headers: {
                'Content-Type': "application/json"
            }
        });
        
        let resJson = await res.json();
        
        if (resJson.albums === this.state.albums) {
            return;
        }

        this.setState({albums: resJson.albums});
    }
    
    Get_Photo_Links = async (album_info) => {
        
        const {Request_URLs} = this.context;
        
        let res = await fetch(Request_URLs.get_photo_links, {
            method: "POST",
            body: JSON.stringify(album_info),
            headers: {
                'Content-Type': "application/json"
            }
        });
        
        let resJson = await res.json();

        let { state} = this;

        state.photos = resJson.photos;
        state.selected_album = album_info;

        await this.setState(state);

        this.props.change_display(this.Open_Photo_Container);
    }

    Open_Photo_Container = () =>{

        let {photos, selected_album, owner_user_account, visitor_user_account} = this.state;

        let {Photos_Container : Container} = this;


        return (<Container 
            photos={photos}
            album_info={selected_album}
            owner_user_account={owner_user_account}
            visitor_user_account={visitor_user_account}
            Get_Albums={this.Get_Albums}
            Get_Photo_Links={this.Get_Photo_Links}
            change_main_display={this.props.change_display}
            return_previous_display={this.props.return_previous_display}
        />);
        
    }
    
    render(){
        
        const { Drag_Scroll } = this.context;
        
        let drag_scroll = new Drag_Scroll();
        
        let albumsWrapperRef = createRef();
        
        return (
             <div id="albums">
                
                <div id="albums-top">

                    <div id="albums-label">

                        <label><u>Albums</u></label>

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