import React, { Component } from 'react';
import './enlarged_profile_photo.less';

class Enlarged_Profile_Photo extends Component {

	constructor(props){

		super(props);

		let { full_url } = this.props;

		this.state = {
			full_url: full_url
		};
	}

	componentDidUpdate(prevProps, prevState) {

		if (this.props === prevProps) {
			return;
		}

		this.setState(this.props);

	}

	render(){

		let { full_url } = this.state;

		return <div id="enlarged-profile-photo">

			<div id="the-exit-button" onClick={(e) => { this.props.turn_off_enlarge(); }}>

			</div>

			<div id="the-profile-photo"
				style={{
					backgroundImage: `url('${full_url}')`
				}}
			>

			</div>

		</div>;
	}
}

export default Enlarged_Profile_Photo;