import React from "react";
import { useContext } from "react";
import { GameContext } from "../gameContext";

const PlayAgain = ({ handlePlayAgain }) => {
	const { result } = useContext(GameContext);
	return (
		<div className="play-again-container">
			<h2 className="play-again-result">
				{result === "win"
					? "You win"
					: result === "You lose"
					? "lose"
					: "draw"}
			</h2>
			<button className="play-again-btn" onClick={handlePlayAgain}>
				Play again
			</button>
		</div>
	);
};

export default PlayAgain;
