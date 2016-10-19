import React from 'react';
import OrderSummary from './OrderSummary';
import { PaymentForm } from './PaymentFormComponents';

function Checkout(props) {
	const { duration, discount, tax, price, onSubmit } = props;

	return (
		<div className="Checkout">
			<OrderSummary
				duration={duration}
				discount={discount}
				tax={tax}
				price={price} />
			<PaymentForm onSubmit={onSubmit} />
		</div>
	);
}

export default Checkout;
