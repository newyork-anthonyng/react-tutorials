import React from 'react';
import pluralize from 'pluralize';

class OrderSummary extends React.Component {
	constructor() {
		super();

		this.calculateInvoice = this.calculateInvoice.bind(this);
	}

	calculateInvoice() {
		const duration = this.props.duration + ' ' + pluralize('day', this.props.duration);

		const initialTotal = this.props.duration * this.props.price;
		const discount = Math.floor((initialTotal / 100) * this.props.discount);
		const subTotal = initialTotal - discount;
		const tax = Math.floor((subTotal / 100) * this.props.tax);
		const total = subTotal + tax;

		return {
			duration,
			initialTotal,
			discount,
			subTotal,
			tax,
			total
		};
	}

	render() {
		const { duration, initialTotal, discount, subTotal, tax, total } = this.calculateInvoice();

		return (
			<div className="OrderSummary">
				<div className="Title">Order Summary</div>
				<table>
					<tbody>
						<tr>
							<td>{this.props.price} x {duration}</td>
							<td>{initialTotal} USD</td>
						</tr>
						<tr>
							<td>Discount</td>
							<td>{discount} USD</td>
						</tr>
						<tr>
							<td>Subtotal</td>
							<td>{subTotal} USD</td>
						</tr>
						<tr>
							<td>Tax</td>
							<td>{tax} USD</td>
						</tr>
					</tbody>
				</table>
				<div className="Total">
					<div className="TotalLabel">Total</div>
					<div className="Amount">
						{total} <small>USD</small>
					</div>
				</div>
			</div>
		);
	}
}

export default OrderSummary;
