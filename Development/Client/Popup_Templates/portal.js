import {createPortal} from 'react-dom';
import React, {Component} from 'react';

class Popup_Portal extends Component {

    constructor(props) {
        super(props);

        // Create a DOM node for the portal
        this.el = document.createElement('div');
        this.el.zIndex = 1;

        this.state = {

        }
    } 

    componentDidMount() {

        document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    } 

    render() {
        
        return createPortal(this.props.children, this.el);
        
    }
}

export default Popup_Portal;