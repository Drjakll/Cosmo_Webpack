import React, {Component} from 'react';
import {createRoot} from 'react-dom/client';
import Portal from '@portal';
import './popup_message.less';

class Basic extends Component {

    constructor(props){

        super(props);

    }

    Message_Component = ()=>{

        let {message} = this.props;

        return <div id="the-msg-label">

            {message}

        </div>;
    }

    Destroy = ()=>{

        this.props.destroy();
    }

    Input_Type = ()=>{

        return <div id="input-wrapper">

            <div id="the-input-submit-wrapper">
            
                <button className="button ok" onClick={this.Destroy}>Ok</button>

            </div>

        </div>;

    }

    render(){

        return <div id="popup-base-wrapper">

            {this.Message_Component()}

            {this.Input_Type()}

        </div>;
    }
}





class Input_Basic extends Basic {

    input = "";

    constructor(props){

        super(props);

    }
    
    The_Input = ()=>{

        let {maxLength, input_obj} = this.props;

        return <div id="the-input-content-wrapper">

            <input type="text" defaultValue={input_obj.input} onChange={(e)=>{ this.input = e.target.value}} maxLength={maxLength ?? 20}/>

        </div>;
    }

    The_Submit = ()=>{

        return <div id="the-input-submit-wrapper">

            <button className="button ok" onClick={this.Submit_Input}>Ok</button>

            <button className="button cancel" onClick={this.Cancel_Input}>Cancel</button>

        </div>;

    }

    Submit_Input = ()=>{

        let {input_obj} = this.props;

        input_obj.input = this.input;

        this.Destroy();
    }

    Cancel_Input = ()=>{

        let {input_obj} = this.props;

        input_obj.input = null;

        this.Destroy();
    }

    Input_Type = ()=>{

        return <div id="input-wrapper">

            {this.The_Input()}

            {this.The_Submit()}

        </div>;

    }
}





class Confirm extends Basic {

    constructor(props){

        super(props);


    }

    Confirm = (answer)=>{

        let {input_obj} = this.props;

        input_obj.agree = answer;

        this.Destroy();
    }

    Input_Type = ()=>{

        return <div id="input-wrapper">

            <div id="the-input-submit-wrapper">

                <button className="button" onClick={(e)=>{ this.Confirm(true); }}>Confirm</button>

                <button className="button" onClick={(e)=>{ this.Confirm(false); }}>Cancel</button>

            </div>

        </div>;
    }
}





class Selections extends Input_Basic {

    constructor(props){

        super(props);

        let {options} = props;

        let selected = {};

        for(let o of options){

            let {value, selected: is_selected} = o;

            if(is_selected){
                selected[value] = true;
            }
        }

        this.state = {
            selected
        };
    }

    The_Input = ()=>{

        let Select = (value)=>{

            let {selected} = this.state;

            if(selected[value]){

                delete selected[value];

            } else {

                selected[value] = true;

            }

            this.setState({
                selected
            });

        }

        const {options} = this.props;
        let {selected} = this.state;

        let check = <div>
            &#10004;
        </div>

        return <div id="the-input-wrapper">

            <div id="the-input-content-wrapper">

                {options.map((option, index)=>{

                    const {label, value} = option;

                    return <pre className={`input-option-selection ${selected[value] ? "selected" : ""}`}
                                key={index}
                                onClick={(e)=>{Select(value); }}>

                            {label} {selected[value] ? check : ""}

                        </pre>;

                })}

            </div>

        </div>;
        
    }

    Submit_Input = ()=>{

        let {input_obj} = this.props;

        const keys = Object.keys(this.state.selected);

        input_obj.input = keys.join(',');

        this.Destroy();

    }
}





class Popup_Box_Wrapper extends Component {

    constructor(props){

        super(props);

        let {type} = props;

        this.state = {
            selected_input_type: this.Input_Types[type]
        };
    }

    Create_Basic = () =>{

        return <Basic {...this.props} />

    }

    Create_Input_Basic = ()=>{

        return <Input_Basic {...this.props} />
    }

    Create_Confirmation = ()=>{

        return <Confirm {...this.props}/>
    }

    Create_Selections = () =>{

        return <Selections {...this.props}/>
    }

    Input_Types = {
        "message": this.Create_Basic,
        "confirm": this.Create_Confirmation,
        "input": this.Create_Input_Basic,
        "selections": this.Create_Selections
    };

    render(){

        let {selected_input_type} = this.state;

        return <div id="popup-box-wrapper">

            {selected_input_type()}

        </div>;
    }
}





class Big_Cover extends Component {

    constructor(props){

        super(props)

    }

    render(){

        return <div id="big-msg-sheet-cover">

            <Popup_Box_Wrapper {...this.props} />

        </div>;
    }
}




let Create_Popup = async function(type = "message", msg= "", result = null, selections = []){

    let only_types = ["message", "confirm", "input", "selections"];

    if(!only_types.includes(type)){

        alert("Invalid input type");

        return;
    }

    
    let container = document.createElement("div");

    document.body.appendChild(container);

    let new_root = createRoot(container);

    return new Promise((resolve)=>{ 

        const Destroy = ()=>{

            document.body.removeChild(container);

            resolve(true);

        }
        
        new_root.render(<Big_Cover message={msg} type={type} input_obj={result} destroy={Destroy} options={selections}/>);

    })

}

export default Create_Popup;