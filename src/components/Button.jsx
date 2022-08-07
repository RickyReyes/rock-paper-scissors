import React from "react";

const Button = ({ choiceObj, handleMove, showResult }) => {
	return (
		<button
			onClick={() => handleMove(choiceObj)}
			className={`choice-border ${choiceObj.name}`}
		>
			<div className="choice-white-circle">{choiceObj.svg}</div>
		</button>
	);
};

export default Button;
