import React, {Component, createRef} from 'react';
import './text_type.less';

class Text_Type extends Component {

    valueRef = createRef();

    constructor(props){
        
        super(props);

        this.state = {
            value: this.props.value
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
    
    render() {

        let {Editor, variable_name, owner_user_account, refresh_account_data} = this.props;

        return (
            <div id="text-type" className="info">

                <div id="value-wrapper">

                    <input id="value" onChange={(e) => { this.setState({ value: e.target.value }); }} value={this.state.value} disabled={Editor ? false : true} />

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

export default Text_Type;