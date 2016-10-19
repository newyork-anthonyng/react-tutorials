import React from 'react';

class ListToggle extends React.Component {
	constructor() {
		super();

		this.state = { toggled: false };

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({ toggled: !this.state.toggled });
	}

	render() {
		return (
			<div
				onClick={this.handleClick}
				data-toggled={this.state.toggled}
				className="ListToggle">
				<div>
					<i className="fa fa-fw fa-plus"></i>
					<i className="fa fa-fw fa-check"></i>
				</div>
			</div>
		);
	}
}

export default ListToggle;
