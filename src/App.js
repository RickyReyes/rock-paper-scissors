import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Rules from "./components/Rules";

function App() {
	const choiceData = [
		{
			name: "spock",
			imgSrc: "../images/icon-spock.svg",
		},
		{
			name: "scissors",
			imgSrc: "../images/icon-scissors.svg",
		},
		{
			name: "paper",
			imgSrc: "../images/icon-paper.svg",
		},
		{
			name: "lizard",
			imgSrc: "../images/icon-lizard.svg",
		},
		{
			name: "rock",
			imgSrc: "../images/icon-rock.svg",
		},
	];

	const [score, setScore] = useState(0);
	const [myMove, setMyMove] = useState(null);
	const [oppMove, setOppMove] = useState(null);
	const [winner, setWinner] = useState(null);
	const [showOppMove, setShowOppMove] = useState(false);
	const [showRules, setShowRules] = useState(false);
	const [loading, setLoading] = useState(false);

	function handleMyMove(name) {
		setMyMove(...choiceData.filter((choice) => choice.name === name));
		setLoading(true);
	}

	function handlePlayAgain() {
		setShowOppMove(false);
	}

	function decideWinner(myMoveName, oppMoveName) {
		if (myMoveName === oppMoveName) {
			setWinner("draw");
		}
		if (myMoveName === "rock") {
			if (oppMoveName === "lizard" || oppMoveName === "scissors") {
				setWinner("me");
			}
			if (oppMoveName === "paper" || oppMoveName === "spock") {
				setWinner("house");
			}
		}
		if (myMoveName === "lizard") {
			if (oppMoveName === "spock" || oppMoveName === "paper") {
				setWinner("me");
			}
			if (oppMoveName === "rock" || oppMoveName === "scissors") {
				setWinner("house");
			}
		}
		if (myMoveName === "spock") {
			if (oppMoveName === "scissors" || oppMoveName === "rock") {
				setWinner("me");
			}
			if (oppMoveName === "lizard" || oppMoveName === "paper") {
				setWinner("house");
			}
		}
		if (myMoveName === "scissors") {
			if (oppMoveName === "paper" || oppMoveName === "lizard") {
				setWinner("me");
			}
			if (oppMoveName === "spock" || oppMoveName === "rock") {
				setWinner("house");
			}
		}
		if (myMoveName === "paper") {
			if (oppMoveName === "rock" || oppMoveName === "spock") {
				setWinner("me");
			}
			if (oppMoveName === "scissors" || oppMoveName === "lizard") {
				setWinner("house");
			}
		}
		console.log(winner);
	}

	useEffect(() => {
		let timer;
		let timer2;
		if (myMove) {
			timer = setTimeout(() => {
				setOppMove(
					choiceData[Math.floor(Math.random() * choiceData.length)]
				);
				timer2 = setTimeout(() => {
					setLoading(false);
					setShowOppMove(true);
				}, 750);
			}, 800);
		}
		return () => {
			clearTimeout(timer);
			clearTimeout(timer2);
		};
	}, [myMove]);

	useEffect(() => {
		if (showOppMove) {
			decideWinner(myMove.name, oppMove.name);
		}
	}, [showOppMove]);

	return (
		<div className="App">
			{showRules && <Rules setShowRules={setShowRules} />}
			<Header score={score} />
			{!loading && !showOppMove ? (
				<div className="buttons">
					<div className="buttons-top">
						{choiceData.slice(0, 3).map((choiceObj) => (
							<Button
								key={choiceObj.name}
								moveObj={choiceObj}
								handleMyMove={handleMyMove}
							/>
						))}
					</div>
					<div className="buttons-bottom">
						{choiceData.slice(3, 5).map((choiceObj) => (
							<Button
								key={choiceObj.name}
								moveObj={choiceObj}
								handleMyMove={handleMyMove}
							/>
						))}
					</div>
				</div>
			) : loading && !showOppMove ? (
				<div className="moves__buttons">
					<div className="moves__button-container">
						<Button moveObj={myMove} />
						<p>you picked</p>
					</div>
					<div className="moves__button-container">
						<div className="moves__loading-circle"></div>
						<p>the house picked</p>
					</div>
				</div>
			) : (
				<div className="moves__buttons">
					<div className={`moves__button-container ${winner}`}>
						<Button moveObj={myMove} />
						<p>you picked</p>
					</div>
					<div
						className={`moves__button-container opp-move ${winner}`}
					>
						<Button moveObj={oppMove} />
						<p>the house picked</p>
					</div>
				</div>
			)}
			{showOppMove && (
				<div className="result-and-play-again">
					<div className="result-message">
						{winner === "me"
							? "You win"
							: winner === "house"
							? "You lose"
							: "Draw"}
					</div>
					<button onClick={handlePlayAgain} className="play-again">
						Play Again
					</button>
				</div>
			)}
			<button onClick={() => setShowRules(true)} className="rules-btn">
				Rules
			</button>
		</div>
	);
}

export default App;
