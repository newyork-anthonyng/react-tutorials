const ProductList = React.createClass({
	getInitialState: function() {
		return {
			products: [],
			sortAscending: false
		};
	},

	componentDidMount: function() {
		this.updateState();
	},

	updateState: function() {
		const products = Data.sort((a, b) => {
			return this.state.sortAscending ? (a.votes - b.votes) : (b.votes - a.votes);
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
		this.setState({ sortAscending: !this.state.sortAscending }, function() {
			this.updateState();
		});
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

		const labelText = this.state.sortAscending ? 'Shown Ascending' : 'Shown Descending';
		return (
			<div className='ui items'>
				<p>{labelText}</p>
				<button onClick={this.handleToggleSort}>Toggle Sort</button>
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
