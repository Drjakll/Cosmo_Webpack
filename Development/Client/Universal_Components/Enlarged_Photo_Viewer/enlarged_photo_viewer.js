import React, {Component} from 'react';
import Individual_Photo from './Individual_Photo/individual_photo.js';
import Request_URLs from '@request_urls';
import Portal from '@portal';
import './enlarged_photo_viewer.less';

class Photo_Viewer extends Component {

    constructor(props){

        super(props);

        const {photo_info_array, initial_photo_index} = props;

        this.state = {
            photo_info_array,
            initial_photo_index,
            currently_at_index: initial_photo_index
        };
    }

    componentDidMount(){

        let {initial_photo_index} = this.state;

        this.Navigate(initial_photo_index);
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {initial_photo_index, photo_info_array} = this.props;

        this.setState({
            initial_photo_index,
            photo_info_array
        })
    }

    Navigate = (index)=>{

        let {photo_info_array} = this.state;

        let length = photo_info_array.length;

        index = index % length;

        index = index < 0 ? index + length : index;

        let {id} = photo_info_array[index];

        let img_id = `${id}`;

        window.location.assign(`#${img_id}`);

        this.setState({currently_at_index: index})
    }

    Exit = ()=>{

        let {exit} = this.props;

        exit && exit();
    }

    render(){

        const {photo_info_array, currently_at_index} = this.state;

        const {aws_s3_url} = Request_URLs;

        return <Portal> 

            <div id="enlarged-photo-viewer-wrapper">

                <div id="enlarged-photo-viewer-exit-button" onClick={this.Exit}></div>

                <div id="enlarged-photo-viewer-content-wrapper">

                    <div id="enlarged-photo-viewer-navigate-left" 
                            className="enlarged-photo-viewer-navigation-button"
                            onClick={(e)=>{
                                
                                this.Navigate(currently_at_index - 1);

                            }}> 

                        {"<"} 
                        
                    </div>

                    <div id="enlarged-photo-viewer-slide-show">

                        {photo_info_array.map((photo_info, index)=>{

                            let {link,id} = photo_info;

                            link = `${aws_s3_url}${link}`;

                            const image_id = `${id}`;

                            return <div className="individual-photo-outter-wrapper" id={image_id} key={index}>

                                    <Individual_Photo link={link} image_id={image_id} />

                                </div>

                        })}

                    </div>

                    <div id="enlarged-photo-viewer-navigate-right" 
                            className="enlarged-photo-viewer-navigation-button" 
                            onClick={(e)=>{

                                this.Navigate(currently_at_index + 1);

                            }}> 

                        {">"}

                    </div>

                </div>

                <div id="number-out-of">

                    {(currently_at_index+1) + "/" + photo_info_array.length}

                </div>

            </div>

        </Portal>;
    }
}

export default Photo_Viewer;