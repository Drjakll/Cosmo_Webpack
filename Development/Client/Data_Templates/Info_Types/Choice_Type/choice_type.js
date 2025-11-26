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
        
        this.setState(this.props);
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

        let {Editor, variable_name, owner_user_account, refresh_account_data} = this.props;
        
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
                        owner_user_account={owner_user_account}
                        current_value={this.state.value}
                        refresh_account_data={refresh_account_data}
                    /> : <></>}

                </div>

            </div>
        );
    }
}

export default Choice_Type;