import React, {Component, createRef} from 'react';
import Request_URLs from '@request_urls';
import popup_message from '@popup_message';
import Enlarged_Photo_Viewer from '@enlarged_photo_viewer';
import Drag_Scroll from '@drag_scroll';
import './post_photo_viewer.less';

class Post_Photo_Viewer extends Component {

    constructor(props){

        super(props);

        let {id: target_id} = props.post ?? {};

        this.state = {
            target_id,
            photo_links: [],
            enlarged_display: false,
            initial_photo_index: 0
        };
    }

    async componentDidMount(){

        let {target_id} = this.state;

        let photo_links = await this.Get_Photo_Links({target_id});

        this.setState({
            photo_links 
        });

    }

    async componentDidUpdate(prevProps, prevState){

        let {id: target_id} = this.props.post ?? {};

        if(target_id === prevProps.post?.id){
            return;
        }

        let photo_links = await this.Get_Photo_Links({target_id});

        await this.setState({
            target_id,
            photo_links
        });
    }

    Get_Photo_Links = async ({target_id}) => {

        let {get_photo_links} = Request_URLs;

        if(!target_id){
            return [];
        }

        let body = {
            target_id,
            target_id_type: "post_id"
        };


        let data = await(await fetch(
            get_photo_links, 
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        if(!data){
            await popup_message('message', "Error while requesting for photo links");
            return [];
        }

        return data.results?.targets ?? [];
    }

    Exit_Enlarged_Display = ()=>{

        this.setState({
            enlarged_display: false
        });
    }

    Turn_On_Enlarged_Photo_Display = (initial_photo_index)=>{

        this.setState({
            enlarged_display: true,
            initial_photo_index
        })
    }



    render(){

        let {photo_links, enlarged_display, initial_photo_index} = this.state;
        const {aws_s3_url} = Request_URLs;

        let drag_scroll = new Drag_Scroll();

        let {init_drag, disable_drag, move_drag} = drag_scroll;

        return <div id="post-photo-viewer-wrapper">

            {enlarged_display ? <Enlarged_Photo_Viewer 
                                    exit={this.Exit_Enlarged_Display} 
                                    photo_info_array={photo_links}
                                    initial_photo_index={initial_photo_index}
                                /> : ""}

            <div id="post-photo-viewer-middle-wrapper"
                    onMouseDown={(e)=>{ init_drag(e, e.currentTarget); }}
                    onMouseMove={(e)=>{ move_drag(e, e.currentTarget); }} 
                    onMouseUp={(e)=>{ disable_drag(e, e.currentTarget); }} 
                    onMouseLeave={(e)=>{disable_drag(e, e.currentTarget); }}>

                <div id="post-photo-viewer-inner-wrapper">

                    {photo_links.map((image_info, index)=>{

                        const {link, id} = image_info;

                        const img_id = `${id}A`;

                        return <div className="post-image-wrapper" key={img_id}>

                                <img src={`${aws_s3_url}${link}`} 
                                        id={img_id} 
                                        onClick={async (e)=>{ this.Turn_On_Enlarged_Photo_Display(index); }}/>

                            </div>;
                    })}

                </div>
                
            </div>

        </div>;
    }
}

export default Post_Photo_Viewer;