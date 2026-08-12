import React, {Component} from 'react';
import './choice.less';

class Choice extends Component {

    constructor(props){

        super(props);

        this.state = {
            value: "Select"
        };
    }

    Generate_Options = () => {

        let { options } = this.props;

        return <div id="search-option-selections-wrapper">

            <div id="search-option-selections">

                {options.map((option, index) => {


                    return <div className="option" onClick={(e) => { this.Save_To_Search(option); }} key={index}>

                        {option}

                    </div>;

                })}

            </div>

        </div>;

    }

    Save_To_Search = (value)=>{

        let {Save_To_Search, key_index} = this.props;

        this.setState({value});

        Save_To_Search(value, key_index);

    }

    Remove_Search_Parameter = (e)=>{

        let {Remove_Search_Parameter, key_index} = this.props;

        Remove_Search_Parameter(key_index);

    }

    render(){

        return <div id="search-choice-input-wrapper">

            <div id="label-wrapper">

                <label id="search-label">{this.props.label}</label>

            </div>

            <div id="value-wrapper">

                <div id="value">

                    <div>&#x25BC;</div>
                    <label>{this.state.value}</label>

                </div>

                {this.Generate_Options()}

            </div>

        </div>;
    }
}

export default Choice;