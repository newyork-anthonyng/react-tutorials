import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router'

const App = React.createClass({
	render: function() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={Container}>
					<IndexRoute component={Home} />
					<Route path='/address' component={Address}>
						<IndexRoute component={TwitterFeed} />
						<Route path='instagram' component={Instagram} />
						<Route path='query' component={Query} />
					</Route>
					<Route path='/about(/:name)' component={About} />
					<Route path='/namedComponent' component={NamedComponents}>
						<IndexRoute components={{ title: Title, subTitle: SubTitle }} />
					</Route>
					<Route path='*' component={NotFound} />
				</Route>
			</Router>
		);
	}
});

const Home = () => <h1>Hello from Home!</h1>
const Address = (props) => (
	<div>
		<br />
		<Link to='/address'>Twitter Feed</Link>&nbsp;
		<Link to='/address/instagram'>Instagram Feed</Link>
		<Link
			activeClassName='active'
			to={{
				pathname: '/address/query',
				query: { message: 'Hello from Route Query' }
			}}>RouteQuery
		</Link>
		<h3>We are located at 555 Jackson St.</h3>
		{props.children}
	</div>
);
const NotFound = () => <h1>404.. This page is not found!</h1>
const Instagram = () => <h3>Instagram Feed</h3>
const TwitterFeed = () => <h3>Twitter Feed</h3>
const Nav = () => (
	<div>
		<IndexLink activeClassName='active' to='/'>Home</IndexLink>&nbsp;
		<Link activeClassName='active' to='/address'>Address</Link>
		<Link activeClassName='active' to='/about'>About</Link>
		<Link activeClassName='active' to='/namedComponent'>Named Components</Link>
	</div>
);
const Container = (props) => (
	<div>
		<Nav />
		{props.children}
	</div>
);
const NamedComponents = (props) => (
	<div>
		<h1>Title</h1>
		{props.title}<br />
		<h2>SubTitle</h2>
		{props.subTitle}
	</div>
);
const Title = () => (
	<h1>Hello from Title Component</h1>
);
const SubTitle = () => (
	<h1>Hello from SubTitle Component</h1>
);
const About = (props) => (
	<div>
		<h3>Welcome to the About Page</h3>
		{props.params.name && <h2>{props.params.name}</h2>}
	</div>
);
const Query = (props) => (
	<h2>{props.location.query.message}</h2>
);

export default App
