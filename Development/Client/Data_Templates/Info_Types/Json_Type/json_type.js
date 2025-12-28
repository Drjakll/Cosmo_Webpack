import React, {Component} from 'react';
import Json_Screen from './Json_Screen/json_screen.js';
import './json_type.less';

class Json_Type extends Component {

    Name_Map = {};
    
    constructor(props){
        
        super(props);

        let {label, value, owner_user_account, visitor_user_account, options, column_name: table_name} = props;

        this.state = {
            label,
            value,
            visitor_user_account,
            owner_user_account,
            options,
            table_name,
            popup: false
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps || this.props.value === prevProps.value){
            return;
        }
        
        this.setState(this.props);
    }

    Delete_Item = null

    Editor = null

    Input_Data_Types = {}

    Contents = ({owner_user_account}) => { 

        let {label, value, visitor_user_account, options, table_name} = this.state;

        //Because this function won't be call by this class, 
        //it will be called by mostly likely profile_template.js, 
        //value has to be pulled from owner_user_account else it won't display correctly
        value = owner_user_account[table_name];

        return <Json_Screen 
                    label={label} 
                    value={value}
                    owner_user_account={owner_user_account} 
                    visitor_user_account={visitor_user_account} 
                    options={options} 
                    Editor={this.Editor}
                    Input_Data_Types={this.Input_Data_Types}
                    Delete_Item={this.Delete_Item}
                    table_name={table_name}
                />
    }
    
    render(){
        
        return (
            <div id="json-type">
                    
                <div id="value-wrapper">
                    
                    <div id="show-button" onClick={(e)=>{ this.props.change_main_display(this.Contents); }}>
                            
                        Show
                            
                    </div>
                
                </div>
                    
            </div>
        );
    }
}

export default Json_Type;