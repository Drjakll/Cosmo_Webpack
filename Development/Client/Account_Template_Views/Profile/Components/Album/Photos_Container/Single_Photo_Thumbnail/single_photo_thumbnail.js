import React, {Component} from 'react';
import Enlarged_Single_Photo from './Enlarged_Single_Photo/enlarged_single_photo.js';
import './single_photo_thumbnail.less';

class Single_Photo extends Component {
    
    constructor(props){
        
        super(props);
        
        Single_Photo.contextType = window.Context;
        
        this.state = {
            photo_info: this.props.photo_info,
            enlarge_photo: false,
            account_data: this.props.account_data
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        let properties = this.props;
        
        for(let i in properties){
            
            this.state[i] = properties[i];
        }
        
        this.setState(this.state);
    }
    
    Exit_Enlarge_Mode = () => {
        
        this.setState({enlarge_photo: false});
    }
    
    render(){
        
        const {Request_URLs} = this.context;
        
        let {aws_s3_url} = Request_URLs;
        
        const photo_link = this.state.photo_info?.link;
        
        //To avoid unecessary request to the aws s3 if there is no photo link available
        aws_s3_url = photo_link ? aws_s3_url : "";
        
        return (
                <div id="single-photo-thumbnail">
        
                    {this.state.enlarge_photo ? <Enlarged_Single_Photo 
                                                    photo_info={this.state.photo_info}
                                                    aws_s3_url={`${aws_s3_url}`} 
                                                    exit_enlarge_mode={this.Exit_Enlarge_Mode}
                                                    account_data={this.state.account_data}
                                                    /> : <></>}
                    
                    <div id="photo-thumbnail"
                        style={{
                            backgroundImage: `url('${aws_s3_url}${photo_link}')`
                        }}
                        onClick = {(e)=>{
                            
                            this.setState({enlarge_photo: true});
                        }}
                    >
                
                    </div>
                    
                </div>
            );
    }
}

export default Single_Photo;