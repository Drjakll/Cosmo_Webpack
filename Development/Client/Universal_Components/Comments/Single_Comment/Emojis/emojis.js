import React, {Component} from 'react';
import './emojis.less';

class Emojis extends Component {

    Emoji_Icon_Names = [
        "angry",
        "laugh",
        "sad",
        "surprised"
    ]

    constructor(props){

        super(props);

        let {emojis} = props;

        this.state = {
            emojis
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps === this.props){
            return;
        }

        this.setState(this.props);
    }

    Create_Emoji_Insertion = (emoji_label, emoji_obj, index)=>{

        let Apply_Emoji = (e)=>{

            this.props.apply_emoji && this.props.apply_emoji(emoji_label);

        };

        return <div className="emoji-insertion" key={index}>

            <div id="emoji-icon">

                <img src={`./static/${emoji_label}.png`} onClick={Apply_Emoji} />

            </div>

            <div id="emoji-value">

                {Object.keys(emoji_obj).length}

            </div>

        </div>;

    }

    render(){

        let {emojis} = this.state;

        emojis = typeof emojis === "string" ? JSON.parse(emojis) : emojis;

        return (<div id="emojis">

            <div id="emojis-label">

                Reactions

            </div>

            <div id="emoji-insertion-icons">

                {this.Emoji_Icon_Names.map((name, index)=>{

                    let emoji_obj = emojis[name] || {};

                    return this.Create_Emoji_Insertion(name, emoji_obj, index);

                })}

            </div>

        </div>);
    }
}

export default Emojis;