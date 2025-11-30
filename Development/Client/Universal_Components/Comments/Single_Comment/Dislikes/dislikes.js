import React, {Component} from 'react';
import './dislikes.less';

class Dislikes extends Component {

    constructor(props){

        super(props);

        let {dislikes} = props;

        this.state = {
            dislikes
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps === this.props){
            return;
        }

        this.setState(this.props);
    }

    Apply_Props = (e)=>{

        this.props.apply_props && this.props.apply_props("dislikes");
    }

    render(){

        let {dislikes} = this.state;

        dislikes = typeof dislikes === "string" ? JSON.parse(dislikes) : dislikes;

        return (<div id="dislikes">
            
            <div id="dislikes-icon-wrapper">

                <img src="./static/thumbs_down.png" onClick={this.Apply_Props} />

            </div>

            <div id="dislikes-value-wrapper">

                <label>{Object.keys(dislikes).length}</label>

            </div>

        </div>);
    }
}

export default Dislikes;