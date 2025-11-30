import React, {Component} from 'react';
import './emojis.less';

class Emojis extends Component {

    constructor(props){

        super(props);

        let {emojis} = props;

        this.state = {
            emojis
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps === this.props){
            return;
        }

        this.setState(this.props);
    }

    render(){

        let {emojis} = this.state;

        emojis = typeof emojis === "string" ? JSON.parse(emojis) : emojis;

        return (<div id="emojis">

            

        </div>);
    }
}

export default Emojis;