import React, {Component} from 'react';
import './text_type.less';

class Text_Type extends Component {
    
    state = {
        label: "",
        value: null
    };
    
    constructor(props){
        
        super(props);

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

        let Editor = this.props.editor;
        
        return (
            <div id="text-type" className="info">

                <div id="value-wrapper">

                    <div id="value" contentEditable={false}>

                        {this.state.value}

                    </div>

                </div>

                <div id="editor">

                    {Editor ? <Editor /> : <></>}

                </div>

            </div>
        );
    }
}

export default Text_Type;