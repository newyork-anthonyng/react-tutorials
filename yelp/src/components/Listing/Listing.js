import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Item from './Item';
import styles from './styles.module.css';

class Listing extends React.Component {
	render() {
		return (
			<div className={classnames(styles.container)}>
				{this.props.places.map(place => {
					return (
						<Item place={place}
							onClick={this.props.onClick}
							key={place.id} />
					);
				})}
			</div>
		);
	}
};

export default Listing;
