import React, {Component} from 'react';
import './text.less';

class Text extends Component {

    constructor(props){

        super(props);

    }

    Save_To_Search = (e)=>{

        let {Save_To_Search, key_index} = this.props;

        let value = e.target.value;

        Save_To_Search(value, key_index);

    }

    Remove_Search_Parameter = (e)=>{

        let {Remove_Search_Parameter, key_index} = this.props;

        Remove_Search_Parameter(key_index);

    }

    render(){

        return <div id="search-text-input-wrapper">

            <div id="label-wrapper">

                <label id="search-label">{this.props.label}</label>

            </div>

            <div id="value-input-wrapper">

                <input type="text" onBlur={this.Save_To_Search} placeholder={this.props.label}/>

            </div>

            <div id="search-button-wrapper">

                <button onClick={this.Remove_Search_Parameter}>Remove</button>

            </div>

        </div>;
    }
}

export default Text;