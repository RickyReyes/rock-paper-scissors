import React from "react";

const Header = ({ score }) => {
	return (
		<header>
			<ul className="header__name-list">
				<li className="header__name-item">Rock</li>
				<li className="header__name-item">Paper</li>
				<li className="header__name-item">Scissors</li>
				<li className="header__name-item">Lizard</li>
				<li className="header__name-item">Spock</li>
			</ul>
			<div className="header__score-card">
				<small className="header__score-word">score</small>
				<div className="header__score">{score}</div>
			</div>
		</header>
	);
};

export default Header;
