import React, {Component} from 'react';
import './choice_type.less';

class Choice_Type extends Component {

    
    constructor(props){
        
        super(props);
        
        this.state = {
            value: this.props.value,
            label: this.props.label
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        for(let i in this.props){
            
            this.state[i] = this.props[i];
        }
        
        this.setState(this.state);
    }

    Generate_Options = () => {

        let { options } = this.props;

        return <div id="option-selections-wrapper">

            <div id="selections">

                {options.map((option, index) => {


                    return <div className="option" onClick={(e) => { this.setState({ value: option }); }} key={index}>

                        {option}

                    </div>;

                })}

            </div>

        </div>;

    }
    
    render() {

        let Editor = this.props.editor;
        let variable_name = this.props.variable_name;
        let account_data = this.props.account_data;
        const refresh_account_data = this.props.refresh_account_data;
        
        return (
            <div id="choice-type" className="info">

                <div id="value-wrapper">

                    <div id="value">

                        {this.state.value ? this.state.value : ""}

                    </div>

                    {Editor ? this.Generate_Options() : <></>}

                </div>

                <div id="editor">

                    {Editor ? <Editor variable_name={variable_name}
                        value={this.state.value}
                        account_data={account_data}
                        current_value={this.state.value}
                        refresh_account_data={refresh_account_data}
                    /> : <></>}

                </div>

            </div>
        );
    }
}

export default Choice_Type;