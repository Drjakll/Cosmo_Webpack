import React, {Component} from 'react';
import Context from '@context/context.js';
import './search_streams.less';

class Search_Streams extends Component {

    
    constructor(props){
        
        super(props);

        Search_Streams.contextType = Context;

        this.search_requirements = {};
        
        this.state = {
            search_parameters: {}, //Search requirements setup by the user
            search_parameter_options: {} //Available search requirements
        };

    }

    componentDidMount(){

        this.Init();

    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.setState(this.props);
        
    }

    Init = ()=>{

        let { Account_Info_Data_Template} = this.context.Account_Data_Templates;
        let { Search_Parameters} = this.context;

        let { search_parameter_options} = this.state;

        this.search_data_templates = Account_Info_Data_Template(null);

        for(let i in Search_Parameters){

            //If it's not part of the search Account_Info_Data_Template, we don't want it
            if(!this.search_data_templates[i]){
                continue;
            }

            //Attaching the editors to the data template
            this.search_data_templates[i].editor = Search_Parameters[i];

            search_parameter_options[i] = this.search_data_templates[i];

        }

        this.setState({
            search_parameter_options
        });

    }

    Add_Search_Parameter_Option = (param_label)=>{

        let {search_parameter_options, search_parameters} = this.state;

        search_parameters[param_label] = this.search_data_templates[param_label];

        delete search_parameter_options[param_label];

        this.setState({
            search_parameter_options,
            search_parameters
        });

    }

    Remove_Search_Parameter_Option = (param_label)=>{

        let {search_parameter_options, search_parameters} = this.state;

        delete search_parameters[param_label];

        search_parameter_options[param_label] = this.search_data_templates[param_label];

        this.setState({
            search_parameter_options,
            search_parameters
        });

        delete this.search_requirements[param_label];
    }

    Add_To_Search_Parameter = (value, key_index, type, conjunc)=>{

        this.search_requirements[key_index] = value;

    }

    Remove_From_Search_Parameter = (key_index)=>{

        this.Remove_Search_Parameter_Option(key_index);
    }

    Apply_Search = ()=>{
        this.props.properties.search_streams(this.search_requirements);
    }
    
    render(){

        let { search_parameter_options, search_parameters} = this.state;

        let search_param_keys = Object.keys(search_parameters);
        
        return (
            <div id="search-streams">
                
                <div id="stream-search-options-wrapper">

                    <div id="stream-search-option-selections-wrapper">

                        <div id="label">Search Requirements</div>

                        <div id="search-parameters">

                            {Object.keys(search_parameter_options).map((key, index)=>{

                                let {label} = search_parameter_options[key];

                                return <div className="search-parameter-option" key={index} onClick={(e)=>{this.Add_Search_Parameter_Option(key);}}>

                                        {label}

                                    </div>;

                            })}

                        </div>

                    </div>

                    <div id="stream-search-selected-options-wrapper">

                        {search_param_keys.length === 0 ? <label id="no-requirement-note">No search requirements</label> : search_param_keys.map((key, index)=>{

                            let {editor, options, label} = search_parameters[key];

                            const Com = editor.component;

                            return <div className="parameter-wrapper" key={key}>

                                    <div id="the-component">

                                        <Com label={label}
                                            options={options}
                                            key_index={key}
                                            Save_To_Search={this.Add_To_Search_Parameter}
                                            Remove_Search_Parameter={this.Remove_From_Search_Parameter}

                                        />

                                    </div>

                                    <div id="the-buttons">

                                        <button onClick={(e)=>{this.Remove_Search_Parameter_Option(key); }}>Remove</button>

                                    </div>

                                </div>;

                        })}

                    </div>

                </div>
                
                <div id="stream-search-buttons-wrapper">

                    <button id="apply-search" onClick={this.Apply_Search}>Apply Search</button>

                </div>
                
            </div>
        );
    }
}

export default Search_Streams;