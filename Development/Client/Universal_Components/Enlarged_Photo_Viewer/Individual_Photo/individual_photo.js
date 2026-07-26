import React, {Component} from 'react';
import './individual_photo.less';

class Individual_Photo extends Component {

    constructor(props){

        super(props);

        const {image_id, link} = props;

        this.state = {
            image_id,
            link
        };
    }

    render(){

        const {link} = this.state;

        return <div id="individual-photo-inner-wrapper">

            <img src={link} />
            
        </div>;
    }
}

export default Individual_Photo;