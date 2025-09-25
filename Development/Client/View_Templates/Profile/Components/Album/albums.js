import React, {Component, createRef} from 'react';
import Album_Cover from './Album_Cover/album_cover.js';
import Photos_Container from './Photos_Container/photos_container.js';
import './albums.less';

class Albums extends Component {
    
    state = {
        account_data: null,
        albums: [],
        photos: [],
        selected_album: {},
        open_album: false
    }
    
    constructor(props){
        
        super(props);
        
        Albums.contextType = window.Context;
    }
    
    componentDidMount(){
        
        this.Get_Albums();
    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        let properties = this.props.properties;
        
        for(let i in properties){
            
            this.state[i] = properties[i];
        }
        
        await this.setState(this.state);
        
        if(properties.account_data){
        
            this.Get_Albums();
            
        }
    }
    
    Get_Albums = async () => {

        let {account_data} = this.state;

        if(!account_data){
            return;
        }
        
        const {Request_URLs} = this.context;
        
        let res = await fetch(Request_URLs.get_photo_albums, {
            method: "POST",
            body: JSON.stringify(account_data),
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
        
        this.setState({
            photos: resJson.photos, 
            selected_album: album_info, 
            open_album: true
        });
        
    }
    
    Close_Photo_Album = () => {
        
        this.setState({open_album: false});
    }
    
    render(){
        
        const { Drag_Scroll } = this.context;
        
        let drag_scroll = new Drag_Scroll();
        
        let albumsWrapperRef = createRef();
        
        const Album_Editor = this.state.album_editor;
        
        const Photos_Container_Editor  = Album_Editor?.Photos_Container_Editor;  
        
        return (
             <div id="albums">
        
                {this.state.open_album ?

                <Photos_Container 
                        photos_container_editor={Photos_Container_Editor}
                        photos={this.state.photos}
                        album_info={this.state.selected_album}
                        Close_Photo_Album={this.Close_Photo_Album}
                        account_data={this.state.account_data}
                        Get_Albums={this.Get_Albums}
                        Get_Photo_Links={this.Get_Photo_Links}
                /> : <></>}
                
                <div id="albums-top">
                    
                    <div id="editor-wrapper">
                        {Album_Editor ? 
                            <Album_Editor 
                                get_albums={this.Get_Albums}
                                account_data={this.state.account_data}
                            /> : <></>}
                    </div>

                    <div id="albums-label">

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
                                        Get_Photo_Links={this.Get_Photo_Links}
                            />
            
                        </div>;
                            
                    })}
                        
                </div>
                    
            </div>
        );
    }
}

export default Albums;