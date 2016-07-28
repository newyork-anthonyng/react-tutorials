import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) => {
	let input;

	return (
		<div>
			<form onSubmit={e => {
				e.preventDefault();
				if(!input.value.trim()) return;

				dispatch(addTodo(input.value));
				input.value = '';
			}}>
			<input ref={noe => {
				input = node;
			}} />
			<button type="submit">
				Add Todo
			</button>
		</div>
	);
};

AppTodo = connect()(AddTodo);
export default AddTodo;
