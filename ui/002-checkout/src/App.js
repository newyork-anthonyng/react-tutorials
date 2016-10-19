import React, { Component } from 'react';
import ImagePreview from './ImagePreviewArea/ImagePreview';
import Checkout from './CheckoutArea/Checkout';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';

function Overlay({ image }) {
	return (
		<div className="Overlay" style={{backgroundImage: 'url(' + image + ')'}}>
			Something
		</div>
	);
}

function Container({ children }) {
	return (
		<div className="Container">
			{children}
		</div>
	);
}

function Header({ onChange }) {
	return (
		<header>
			<input onChange={onChange} type="range" max="100" min="1" step="1" />
		</header>
	);
}

class App extends Component {
	constructor() {
		super();

		this.state = {
			mounted: false,
			people: 1,
			price: 320,
			tax: 20,
			duration: 5,
			discount: 5
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.createOverlay = this.createOverlay.bind(this);
		this.createContainer = this.createContainer.bind(this);
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log('handle ajax submission here');
	}

	handleChange(e) {
		this.setState({ duration: e.target.value });
	}

	createOverlay() {
		return (
			<Overlay image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/jj-2.jpg" />
		);
	}

	createContainer() {
		return  (
			<Container>
				<ImagePreview
					price={this.state.price}
					duration={this.state.duration}
					people={this.state.people}
					image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/jj-2.jpg" />
				<Checkout
					duration={this.state.duration}
					discount={this.state.discount}
					tax={this.state.tax}
					price={this.state.price}
					onSubmit={this.handleSubmit} />
			</Container>
		);
	}

  render() {
		let overlay, container;

		if(this.state.mounted) {
			overlay = this.createOverlay();
			container = this.createContainer();
		}

    return (
			<div className="App">
				<ReactCSSTransitionGroup
					transitionName="overlay"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
					{overlay}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup
					transitionName="container"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
					{container}
				</ReactCSSTransitionGroup>
				<Header onChange={this.handleChange} />
			</div>
    );
  }
}

export default App;
