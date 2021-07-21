import './CalculatorButtons.css';

export const buttons = [
	{ value: 7, className: '', operator: false },
	{ value: 8, className: '', operator: false },
	{ value: 9, className: '', operator: false },
	{ value: 'DEL', className: 'delBtn', operator: false },
	{ value: 4, className: '', operator: false },
	{ value: 5, className: '', operator: false },
	{ value: 6, className: '', operator: false },
	{ value: '+', className: '', operator: true },
	{ value: 1, className: '', operator: false },
	{ value: 2, className: '', operator: false },
	{ value: 3, className: '', operator: false },
	{ value: '-', className: '', operator: true },
	{ value: '.', className: '', operator: true },
	{ value: 0, className: '', operator: false },
	{ value: '/', className: '', operator: true },
	{ value: '*', className: '', operator: true },
	{ value: 'RESET', className: 'resetBtn span', operator: false },
	{ value: '=', className: 'equalBtn span', operator: false },
];

function CalculatorButtons(props) {
	return (
		<div className='calculator_buttons'>
			{buttons.map(button => {
				return (
					<button
						className={`btn ${button.className}`}
						onClick={() => {
							props.onClick(button);
						}}
					>
						{button.value}
					</button>
				);
			})}
		</div>
	);
}

export default CalculatorButtons;
