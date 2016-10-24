import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';

class MapComponent extends React.Component {
	render() {
		return (
			<div className={styles.map}>
				<Map google={this.props.google} className={styles.map} />
			</div>
		);
	}
}

export default MapComponent;
