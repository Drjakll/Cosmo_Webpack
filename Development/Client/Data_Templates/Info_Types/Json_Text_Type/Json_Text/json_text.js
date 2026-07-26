import React, {Component} from 'react';
import './json_text.less';

class Json_Text_Screen extends Component {

    constructor(props){

        super(props);

        let {value, owner_user_account, column_name, label, background} = props;

        this.state = {
            value,
            owner_user_account,
            column_name,
            label, 
            background
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Key_Value_Box = (key, value)=>{

        let change_value = (e)=>{

            let {value} = this.state;

            value[key] = e.target.value;

            this.setState({value});

        }

        return <div className="key-value-box-wrapper" key={key}>

            <div id="button-wrapper">

                {this.Delete_Button && this.Delete_Button(key)}

            </div>

            <div id="key-item">

                {key}

            </div>

            <input id="value-item" defaultValue={value} type="text"  onBlur={change_value} maxLength={25} readOnly={this.Delete_Button ? false : true}/>

        </div>;

    }

    render(){

        let {value, label, background} = this.state;

        let value_keys = value && Object.keys(value).sort();

        return <div id="json-text-screen-wrapper">

            <div id="background-image" style={{backgroundImage: `url('./static/${background}')`}}></div>

            <div id="the-label-section">

                {label}

            </div>

            <div id="the-value-section">

                {value_keys?.length ? <div id="trait-values">

                    <div id="labels">

                        <div id="key-label">

                            Trait

                        </div>

                        <div id="value-label">

                            Value

                        </div>

                    </div>
                    
                    {value_keys.map((key)=>{

                        return this.Key_Value_Box(key, value[key]);

                    })}

                </div> : <div id="no-trait-values">
                        No Trait Information is Shared at the Moment
                    </div>}

            </div>

        </div>;
    }
}

export default Json_Text_Screen;