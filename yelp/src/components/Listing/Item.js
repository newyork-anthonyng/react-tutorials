import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Rating from 'components/Rating/Rating';
import styles from './styles.module.css';

class Item extends React.Component {
	render() {
		const { place } = this.props;
		return (
			<div className={styles.item}>
				<h1 className={classnames(styles.title)}>
					{place.name}
					<Rating percentage={place.rating/5} />
				</h1>
			</div>
		);
	}
};

export default Item;
