import React from 'react';
import Item from './Item';

class TitleList extends React.Component {
	constructor() {
		super();

		this.apiKey = '1f476d0833262d65f5783c195c918464';
		this.state = {
			data: [],
			mounted: false
		};

		this.loadContent = this.loadContent.bind(this);
		this._createTitles = this._createTitles.bind(this);
	}

	loadContent() {
		const requestUrl = `https://api.themoviedb.org/3/${this.props.url}/&api_key=${this.apiKey}`;

		fetch(requestUrl).then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({ data: data });
		}).catch((err) => {
			console.error('There has been an error');
		});
	}

	componentWillReceiveProps(nextProps) {
		const updateUrl = (nextProps.url !== this.props.url && nextProps.url !== '');
		if(updateUrl) {
			this.setState({ mounted: true, url: nextProps.url }, () => {
				this.loadContent();
			});
		}
	}

	componentDidMount() {
		if(this.props.url !== '') {
			this.loadContent();
			this.setState({ mounted: true });
		}
	}

	_createTitles() {
		if(this.state.data.results) {
			return this.state.data.results.map((title, i) => {
				if(i < 5) {
					let name = '';
					let backDrop = `http://image.tmdb.org/t/p/original${title.backdrop_path}`;
					if(!title.name) {
						name = title.original_title;
					} else {
						name = title.name;
					}

					return (
						<Item key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
					);
				} else {
					return (<div key={title.id}></div>);
				}
			});
		} else {
			return '';
		}
	}

	render() {
		const titles = this._createTitles();

		return (
			<div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
				<div className="Title">
					<h1>{this.props.title}</h1>
					<div className="titles-wrapper">
						{titles}
					</div>
				</div>
			</div>
		);
	}
}

export default TitleList;
