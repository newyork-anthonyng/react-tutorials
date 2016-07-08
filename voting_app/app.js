const ProductList = React.createClass({
	getInitialState: function() {
		return {
			products: []
		};
	},

	componentDidMount: function() {
		this.updateState();
	},

	updateState: function() {
		const products = Data.sort((a, b) => {
			return b.votes - a.votes;
		});

		this.setState({ products: products });
	},

	handleProductUpVote: function(productId, voteIncrement) {
		Data.forEach(el => {
			if(el.id === productId) {
				el.votes += voteIncrement;
			}
		});

		this.updateState();
	},

	handleToggleSort: function() {
		//const newSort = this.state.sortAscending;
		//this.setState({ sortAscending: !newSort });
		//this.updateState();
	},

	render: function() {
		const products = this.state.products.map(product => {
			return (
					<Product
						key={'product-' + product.id}
						id={product.id}
						title={product.title}
						description={product.description}
						url={product.url}
						votes={product.votes}
						submitter_avatar_url={product.submitter_avatar_url}
						product_image_url={product.product_image_url}
						onVote={this.handleProductUpVote}
					/>
			);
		});

		const buttonText = this.state.sortAscending ? 'Ascending' : 'Descending';
		return (
			<div className='ui items'>
				<button onClick={this.handleToggleSort}>{buttonText}</button>
				{products}
			</div>
		);
	}
});

const Product = React.createClass({
	handleUpVote: function() {
		this.props.onVote(this.props.id, 1);
	},

	handleDownVote: function() {
		this.props.onVote(this.props.id, -1);
	},

	render: function() {
		return (
			<div className='item'>
				<div className='image'>
					<img src={this.props.product_image_url} />
				</div>
				<div className='middle aligned content'>
					<div className='header'>
						<a onClick={this.handleUpVote}>
							<i className='large caret up icon'></i>
						</a>
						<a onClick={this.handleDownVote}>
							<i className='large caret down icon'></i>
						</a>
						{this.props.votes}
					</div>
					<div className='description'>
						<a href={this.props.url}>
							{this.props.title}
						</a>
					</div>
					<div className='extra'>
						<span>Submitted by:</span>
						<img
							className='ui avatar image'
							src={this.props.submitter_avatar_url}
						/>
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<ProductList />,
	document.getElementById('content')
);
