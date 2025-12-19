import React, {Component, createRef} from 'react';
import Album_Cover from './Album_Cover/album_cover.js';
import Photos_Container from './Photos_Container/photos_container.js';
import './albums.less';

class Albums extends Component {
    
    constructor(props){
        
        super(props);
        
        Albums.contextType = window.Context;

        let {visitor_user_account, owner_user_account, album_editor} = this.props.properties;

        this.state = {
            owner_user_account,
            visitor_user_account,
            album_editor,
            albums: [],
            photos: [],
            selected_album: {}
        }
    }
    
    componentDidMount(){
        
        this.Get_Albums();
    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        let properties = this.props.properties;
        
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

        this.props.properties.change_display(this.Open_Photo_Container);
    }

    Open_Photo_Container = () =>{

        const Album_Editor = this.state.album_editor;
        
        const Photos_Container_Editor  = Album_Editor?.Photos_Container_Editor;  

        let {photos, selected_album, owner_user_account, visitor_user_account} = this.state;

        return (<Photos_Container 
                photos_container_editor={Photos_Container_Editor}
                photos={photos}
                album_info={selected_album}
                owner_user_account={owner_user_account}
                visitor_user_account={visitor_user_account}
                Get_Albums={this.Get_Albums}
                Get_Photo_Links={this.Get_Photo_Links}
        />);
        
    }
    
    render(){
        
        const { Drag_Scroll } = this.context;
        
        let drag_scroll = new Drag_Scroll();
        
        let albumsWrapperRef = createRef();

        const Album_Editor = this.state.album_editor;
        
        return (
             <div id="albums">
                
                <div id="albums-top">
                    
                    <div id="editor-wrapper">
                        {Album_Editor ? 
                            <Album_Editor 
                                get_albums={this.Get_Albums}
                                account_data={this.state.owner_user_account}
                            /> : <></>}
                    </div>

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

export default Albums;