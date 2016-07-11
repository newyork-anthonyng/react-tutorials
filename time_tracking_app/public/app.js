const TimersDashboard = React.createClass({
	getInitialState: function() {
		return {
			timers: [],
			serverErrors: []
		};
	},

	componentDidMount: function() {
		this.loadTimersFromServer();
		setInterval(this.loadTimersFromServer, 5000);
	},

	loadTimersFromServer: function() {
		client.getTimers({
			success: (data) => {
				this.setState({ timers: data });
			},
			error: this.handleServerError
		});
	},

	handleCreateFormSubmit: function(timer) {
		this.createTimer(timer);
	},

	handleEditFormSubmit: function(attrs) {
		this.updateTimer(attrs);
	},

	handleTrashClick: function(timerId) {
		this.deleteTimer(timerId);
	},

	deleteTimer: function(timerId) {
		const newTimers = this.state.timers.filter((t) => {
			return timerId !== t.id;
		});

		this.setState({ timers: newTimers });

		client.deleteTimer({
			data: { id: timerId },
			error: this.handleServerError
		});
	},

	handleServerError: function(error) {
		const newErrors = this.state.serverErrors += error;

		this.setState({ serverErrors: newErrors });
	},

	createTimer: function(timer) {
		const t = helpers.newTimer(timer);
		this.setState({
			timers: this.state.timers.concat(t)
		});

		client.createTimer({
			data: t,
			error: this.handleServerError
		});
	},

	updateTimer: function(attrs) {
		const newTimers = this.state.timers.map((timer) => {
			if(timer.id === attrs.id) {
				return Object.assign({}, timer, {
					title: attrs.title,
					project: attrs.project
				});
			} else {
				return timer;
			}
		});

		this.setState({ timers: newTimers });

		client.updateTimer({
			data: attrs,
			error: this.handleServerError
		});
	},

	handleStartClick: function(timerId) {
		this.startTimer(timerId);
	},

	handleStopClick: function(timerId) {
		this.stopTimer(timerId);
	},

	startTimer: function(timerId) {
		const now = Date.now();

		const newTimers = this.state.timers.map((timer) => {
			if(timer.id === timerId) {
				return Object.assign({}, timer, {
					runningSince: now
				});
			} else {
				return timer;
			}
		});

		this.setState({ timers: newTimers });

		client.startTimer({
			data: { id: timerId, start: now },
			error: this.handleServerError
		});
	},

	stopTimer: function(timerId) {
		const now = Date.now();

		const newTimers = this.state.timers.map((timer) => {
			if(timer.id === timerId) {
				const lastElapsed = now - timer.runningSince;
				return Object.assign({}, timer, {
					elapsed: timer.elapsed + lastElapsed,
					runningSince: null
				});
			} else {
				return timer;
			}
		});

		this.setState({ timers: newTimers });

		client.stopTimer({
			data: { id: timerId, stop: now },
			error: this.handleServerError
		});
	},

	render: function() {
		const errorList = this.state.serverErrors.map((error) => {
			return (
				<p key={error}>{error}</p>
			);
		});
		const errorStyle = {
			display: this.state.serverErrors.length > 0 ? 'block' : 'none'
		};

		return (
			<div className='ui three column centered grid'>
				<div className='column'>
					<div className='ui segment' style={errorStyle}>
						{errorList}
					</div>
					<EditableTimerList
						timers={this.state.timers}
						onFormSubmit={this.handleEditFormSubmit}
						onTrashClick={this.handleTrashClick}
						onStartClick={this.handleStartClick}
						onStopClick={this.handleStopClick}
					/>
					<ToggleableTimerForm
						onFormSubmit={this.handleCreateFormSubmit}
					/>
				</div>
			</div>
		);
	}
});

const EditableTimerList = React.createClass({
	render: function() {
		const timers = this.props.timers.map((timer) => {
			return (
				<EditableTimer
					key={timer.id}
					id={timer.id}
					title={timer.title}
					project={timer.project}
					elapsed={timer.elapsed}
					runningSince={timer.runningSince}
					onFormSubmit={this.props.onFormSubmit}
					onTrashClick={this.props.onTrashClick}
					onStartClick={this.props.onStartClick}
					onStopClick={this.props.onStopClick}
				/>
			);
		});

		return (
			<div id='timers'>
				{timers}
			</div>
		);
	}
});

const EditableTimer = React.createClass({
	getInitialState: function() {
		return (
			{
				editFormOpen: false
			}
		);
	},

	handleEditClick: function() {
		this.openForm();
	},

	handleFormClose: function() {
		this.closeForm();
	},

	handleSubmit: function(timer) {
		this.props.onFormSubmit(timer);
		this.closeForm();
	},

	closeForm: function() {
		this.setState({ editFormOpen: false });
	},

	openForm: function() {
		this.setState({ editFormOpen: true });
	},

	render: function() {
		if(this.state.editFormOpen) {
			return (
				<TimerForm
					id={this.props.id}
					title={this.props.title}
					project={this.props.project}
					onFormSubmit={this.handleSubmit}
					onFormClose={this.handleFormClose}
				/>
			);
		} else {
			return (
				<Timer
					id={this.props.id}
					title={this.props.title}
					project={this.props.project}
					elapsed={this.props.elapsed}
					runningSince={this.props.runningSince}
					onEditClick={this.handleEditClick}
					onTrashClick={this.props.onTrashClick}
					onStartClick={this.props.onStartClick}
					onStopClick={this.props.onStopClick}
				/>
			);
		}
	}
});

const TimerForm = React.createClass({
	getInitialState: function() {
		return { hasErrors: false };
	},

	handleSubmit: function() {
		const blankFields = this.refs.title.value === '' || this.refs.project.value === '';
		if(blankFields) {
			this.setState({ hasErrors: true });
			return;
		}

		this.setState({ hasErrors: false });
		this.props.onFormSubmit({
			id: this.props.id,
			title: this.refs.title.value,
			project: this.refs.project.value
		});
	},

	render: function() {
		const submitText = this.props.id ? 'Update' : 'Create';
		const errorStyles = {
			display: this.state.hasErrors ? 'block' : 'none'
		};

		return (
			<div className='ui centered card'>
				<div className='content'>
					<div className='ui error message' style={errorStyles}>
						<div className='header'>Missing Information</div>
						<p>Title and Project fields can not be blank.</p>
					</div>
					<div className='ui form'>
						<div className='field'>
							<label>Title</label>
							<input type='text' ref='title' defaultValue={this.props.title} />
						</div>
						<div className='field'>
							<label>Project</label>
							<input type='text' ref='project' defaultValue={this.props.project} />
						</div>
						<div className='ui two bottom attached buttons'>
							<button
								className='ui basic blue button'
								onClick={this.handleSubmit}
							>
								{submitText}
							</button>
							<button
								className='ui basic red button'
								onClick={this.props.onFormClose}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

const ToggleableTimerForm = React.createClass({
	getInitialState: function() {
		return {
			isOpen: false
		};
	},

	handleFormOpen: function() {
		this.setState({ isOpen: true });
	},

	handleFormClose: function() {
		this.setState({ isOpen: false });
	},

	handleFormSubmit: function(timer) {
		this.props.onFormSubmit(timer);
		this.setState({ isOpen: false });
	},

	render: function() {
		if(this.state.isOpen) {
			return (
				<TimerForm
					onFormSubmit={this.handleFormSubmit}
					onFormClose={this.handleFormClose}
				/>
			);
		} else {
			return (
				<div className='ui basic content center aligned segment'>
					<button
						className='ui basic button icon'
						onClick={this.handleFormOpen}
					>
						<i className='plus icon'></i>
					</button>
				</div>
			);
		}
	}
});

const Timer = React.createClass({
	getInitialState: function() {
		return { hover: false };
	},

	componentDidMount: function() {
		this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
	},

	componentWillUnmount: function() {
		clearInterval(this.forceUpdateInterval);
	},

	handleTrashClick: function() {
		this.props.onTrashClick(this.props.id);
	},

	handleStartClick: function() {
		this.props.onStartClick(this.props.id);
	},

	handleStopClick: function() {
		this.props.onStopClick(this.props.id);
	},

	handleMouseOver: function() {
		this.setState({ hover: true });
	},

	handleMouseLeave: function() {
		this.setState({ hover: false });
	},

	render: function() {
		const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);
		const buttonStyles = {
			visibility: this.state.hover ? 'visible' : 'hidden'
		};

		return (
			<div
				className='ui centered card'
				onMouseEnter={this.handleMouseOver}
				onMouseLeave={this.handleMouseLeave}
			>
				<div className='content'>
					<div className='header'>
						{this.props.title}
					</div>
					<div className='meta'>
						{this.props.project}
					</div>
					<div className='center aligned description'>
						<h2>
							{elapsedString}
						</h2>
					</div>
					<div className='extra content' style={buttonStyles}>
						<span
							className='right floated edit icon'
							onClick={this.props.onEditClick}
						>
							<i className='edit icon'></i>
						</span>
						<span
							className='right floated trash icon'
							onClick={this.handleTrashClick}
						>
							<i className='trash icon'></i>
						</span>
					</div>
				</div>
				<TimerActionButton
					timerIsRunning={!!this.props.runningSince}
					onStartClick={this.handleStartClick}
					onStopClick={this.handleStopClick}
				/>
			</div>
		);
	}
});

const TimerActionButton = React.createClass({
	render: function() {
		if(this.props.timerIsRunning) {
			return (
				<div
					className='ui bottom attached red basic button'
					onClick={this.props.onStopClick}
				>
					Stop
				</div>
			);
		} else {
			return (
				<div
					className='ui bottom attached green basic button'
					onClick={this.props.onStartClick}
				>
					Start
				</div>
			);
		}
	}
});

ReactDOM.render(
	<TimersDashboard />,
	document.getElementById('content')
);
