import React , {Component} from 'react';
import Search_Parameters from '@search_parameters';
import Search_Data from '@search_data';
import './search_criteria_box.less';

let {Search_Data_Template} = Search_Data;

class Criteria_Box extends Component {


    search_criteria = {}
    
    constructor(props){
        
        super(props);

        this.state = {
            available_search_parameters: Search_Data_Template(Search_Parameters),
            added_parameters: {}
        };

    }

    Save_To_Search = (value, key_index)=>{

        this.search_criteria[key_index] = value;

    }

    Available_Parameters = ()=>{

        let Add_To_Parameters = (key_label)=>{

            let {added_parameters} = this.state;

            added_parameters[key_label] = true;
            
            this.setState({added_parameters});
        }

        let {available_search_parameters, added_parameters} = this.state;

        return <div id="available-parameters-wrapper">

            <div id="available-parameters-header">

                <div>Search Requirements</div>

            </div>

            <div id="available-parameters-list">

                <div id="options-wrapper">

                    {Object.keys(available_search_parameters).map((key_label, index)=>{

                        let {label} = available_search_parameters[key_label];

                        if(added_parameters[key_label]){
                            return "";
                        }

                        return <div className="available-parameter-item" key={index} onClick={(e)=>{ Add_To_Parameters(key_label); }}>

                                {label}

                            </div>;
                    })}

                </div>

            </div>

        </div>;
    }

    Search_Parameters_Box = ()=>{

        let {available_search_parameters, added_parameters} = this.state;

        let keys = Object.keys(added_parameters);

        return <div id="search-parameters-box-wrapper" >



            <div id="search-parameters-box-list">

                {!keys.length ?  <div id="no-search-criteria">No search requirements</div>: keys.map((key_label, index)=>{

                    let parameter_data = available_search_parameters[key_label];

                    let {component: Search_Comp, options, label} = parameter_data;

                    return <div className="search-parameter-item-wrapper" key={index}>  

                        <div id="search-parameter-item">

                            <Search_Comp Save_To_Search={this.Save_To_Search} options={options} key_index={key_label} label={label} />

                        </div>

                        <div id="remove-parameter-button-wrapper">

                            <button onClick={(e)=>{

                                let {added_parameters} = this.state;

                                delete added_parameters[key_label];

                                delete this.search_criteria[key_label];
                                
                                this.setState({added_parameters});

                            }}>
                                Remove
                            </button>  

                        </div>

                    </div>;
                })}
                
            </div>  
        </div>;
    }
    
    render(){
        
        return (
            <div id="criteria-box-wrapper">

                <div id="criteria-box-columns-wrapper">

                    <div id="available-parameters-columns-wrapper">

                        {this.Available_Parameters()}
                        
                    </div>

                    <div id="search-parameters-columns-wrapper">

                        {this.Search_Parameters_Box()}

                    </div>

                </div>

                <div id="apply-search-button-wrapper">

                    <button onClick={(e)=>{

                        this.props.Execute_Search(this.search_criteria);

                    }}>
                        Apply Search
                    </button>

                </div>

            </div>
        );
    }
}

export default Criteria_Box;