import React, {Component} from 'react';
import Photo_Comments from './Photo_Comments/photo_comments.js';
import './enlarged_single_photo.less';

class Enlarged_Single_Photo extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            photo_info: this.props.photo_info,
            aws_s3_url: this.props.aws_s3_url,
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
    
    render(){
        
        return <div id="enlarged-single-photo-wrapper">
            
            <div id="enlarged-single-photo-exit-button" onClick={(e)=>{this.props.exit_enlarge_mode(); }}>
        
            </div>
            
            <div id="enlarged-single-photo">
            
                <div id="enlarged-photo"
                    style={{
                        backgroundImage: `url('${this.state.aws_s3_url}${this.state.photo_info.link}')`
                    }}
                >
        
                </div>
                
                <div id="comments-area-wrapper">   
                
                    <Photo_Comments photo_info={this.state.photo_info} account_data={this.state.account_data}/>
                
                </div>
        
            </div>
            
        </div>;
    }
}

export default Enlarged_Single_Photo;