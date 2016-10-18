import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';

class Input extends React.Component {
	render() {
		return (
			<div className="Input">
				<input
					id={this.props.name}
					autoComplete="false"
					required
					type={this.props.type}
					placeholder={this.props.placeholder}
				/>
				<label htmlFor={this.props.name} />
			</div>
		);
	}
}

class Modal extends React.Component {
	render() {
		return (
			<div className="Modal">
				<form
					onSubmit={this.props.onSubmit}
					className="ModalForm">
					<Input
						id="name"
						type="text"
						placeholder="Jack-Edward Oliver" />
					<Input
						id="username"
						type="email"
						placeholder="mrjackolai@gmail.com" />
					<Input
						id="password"
						type="password"
						placeholder="password" />
					<button>
						Log in
					</button>
				</form>
			</div>
		);
	}
}

class App extends React.Component {
	constructor() {
		super();

		this.state = { mounted: false };

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}

	handleSubmit(e) {
		this.setState({ mounted: false });
		e.preventDefault();
	}

	render() {
		let child;

		if(this.state.mounted) {
			child = (<Modal onSubmit={this.handleSubmit} />);
		}

		return (
			<div className="App">
				<ReactCSSTransitionGroup
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
						{child}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

export default App;
