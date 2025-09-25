import React, {Component} from 'react';
import './search.less';

class Search extends Component {
    
    constructor(props){
        
        super(props);

        Search.contextType = window.Context;

        let {account_data} = this.props;

        this.search_requirements = {};

        this.state = {
            account_data: account_data,
            search_parameters: {}, //Search parameters setup by the user
            search_parameter_options: {} //The available search options
        };

    }

    componentDidMount(){

        this.Setup_Search_Editors();

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Setup_Search_Editors = ()=>{

        let {Account_Info_Data_Template} = this.context.Account_Data_Templates;
        let {Search_Parameters} = this.context;

        let {search_parameter_options} = this.state;

        let search_data_editors = Search_Parameters;

        this.search_data_templates = Account_Info_Data_Template(null);

        for(let i in search_data_editors){

            //If it's not part of the search Account_Info_Data_Template, we don't want it
            if(!this.search_data_templates[i]){
                continue;
            }

            //Attaching the editors to the data template
            this.search_data_templates[i].editor = search_data_editors[i];

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

        let search_req = {
            key: key_index,
            type: type, 
            value: value,
            conjunc: conjunc
        };

        this.search_requirements[key_index] = search_req;

    }

    Remove_From_Search_Parameter = (key_index)=>{

        this.Remove_Search_Parameter_Option(key_index);
    }
    
    render(){

        let search_param_keys = Object.keys(this.state.search_parameters);
        
        return (
            <div id="connections-search-wrapper">

                <div id="search-parameters-wrapper">

                    {search_param_keys.length === 0 ? <label id="no-requirement-note">No Search Requirement</label> : search_param_keys.map((key, index)=>{

                        let {editor, options, label} = this.state.search_parameters[key];

                        const Com = editor;

                        return <div className="parameter-wrapper" key={key}>

                                <Com label={label}
                                    options={options}
                                    key_index={key}
                                    Save_To_Search={this.Add_To_Search_Parameter}
                                    Remove_Search_Parameter={this.Remove_From_Search_Parameter}

                                />

                            </div>;

                    })}

                </div>

                <div id="apply-search-button-wrapper">

                    <button onClick={(e)=>{this.props.Apply_Search(this.search_requirements); }}>Apply Search</button>

                </div>

                <div id="add-search-parameter-button-wrapper">

                    <div id="add-search-parameter-dropdown">

                        <div id="label">Add a Search Parameter</div>

                        <div id="search-parameters">

                            {Object.keys(this.state.search_parameter_options).sort().map((key, index)=>{

                                let {label} = this.state.search_parameter_options[key];

                                return <div className="search-parameter-option" key={index} onClick={(e)=>{this.Add_Search_Parameter_Option(key);}}>

                                        {label}

                                    </div>;

                            })}

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default Search;