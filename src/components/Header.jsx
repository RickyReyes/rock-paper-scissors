import React, { useContext } from "react";
import { GameContext } from "../gameContext";

const Header = () => {
	const { score } = useContext(GameContext);
	return (
		<header>
			<h1 className="title">
				<span>Rock</span>
				<span>Paper</span>
				<span>Scissors</span>
			</h1>
			<div className="score-card">
				<p className="score-word">score</p>
				<div className="score-number">{score}</div>
			</div>
		</header>
	);
};

export default Header;
