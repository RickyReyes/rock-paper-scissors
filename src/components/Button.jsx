import React, { useContext } from "react";
import { GameContext } from "../gameContext";

const Button = ({ choiceObj, handleMove }) => {
	const { houseLoading } = useContext(GameContext);
	return (
		<div className={`choice-grid-item ${houseLoading ? "loading" : ""}`}>
			<div
				onClick={() => handleMove(choiceObj)}
				className={`choice-border ${choiceObj.name}`}
			>
				<div className="choice-white-circle">{choiceObj.svg}</div>
			</div>
		</div>
	);
};

export default Button;
