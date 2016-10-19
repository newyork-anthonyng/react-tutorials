import React, { Component } from 'react';
import Logo from './Logo';
import UserProfile from './components/UserProfile';
import TitleList from './components/TitleList';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import './App.css';

class App extends Component {
	constructor() {
		super();

		this.apiKey = '1f476d0833262d65f5783c195c918464';
		this.state = {
			searchTerm: '',
			searchUrl: ''
		};

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleKeyUp(e) {
		if(e.key === 'Enter' && this.state.searchTerm !== '') {
			const searchUrl = `search/multi?query=${this.state.searchTerm}&api_key=${this.apiKey}`;
			this.setState({ searchUrl: searchUrl });
		}
	}

	handleChange(e) {
		this.setState({ searchTerm: e.target.value });
	}

	render() {
		return (
			<div>
				<header className="Header">
					<Logo />
					<Navigation />
					<div id="search" className="Search">
						<input
							onKeyUp={this.handleKeyUp}
							onChange={this.handleChange}
							type="search"
							placeholder="Search for a title..."
							value={this.state.searchTerm} />
					</div>
					<UserProfile />
				</header>
				<Hero />
				<TitleList title="Search Results" url={this.state.searchUrl} />

				<TitleList title="Top TV picks for Anthony" url='discover/tv?sort_by=popularity.desc&page=1' />
				<TitleList title="Trending now" url='discover/movie?sort_by=popularity.desc&page=1' />
				<TitleList title="Most watched in Horror" url='genre/27/movies?sort_by=popularity.desc&page=1' />
				<TitleList title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1' />
				<TitleList title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1' />
			</div>
		);
	}
}

export default App;
