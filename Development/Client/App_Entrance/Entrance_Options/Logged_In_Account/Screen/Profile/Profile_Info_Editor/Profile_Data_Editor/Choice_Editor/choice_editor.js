import React, { Component } from 'react';
import Choice from '@data_templates/Info_Types/Choice_Type/choice_type.js';
import Context from '@context/context.js';
import './choice_editor.less';

class Choice_Editor extends Choice {

    static contextType = Context;

    constructor(props) {

        super(props);

    }

    Change_Value = async (value)=>{

        await this.setState({value});

        let {column_name} = this.state;

        this.Update_Value && this.Update_Value({column_name, value});
    }

    Generate_Options = () => {

        let { options } = this.props;

        return <div id="option-selections-wrapper">

            <div id="selections">

                {options && options.map((option, index) => {

                    return <div className="option" onClick={(e) => { this.Change_Value(option); }} key={index}>

                        {option}

                    </div>;

                })}

            </div>

        </div>;

    }

    render() {

        return <div id="choice-type-editor">

            {super.render()}

        </div>;
    }
}

export default Choice_Editor;