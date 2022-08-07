import "./App.css";
import Header from "./components/Header";
import Button from "./components/Button";
import Rules from "./components/Rules";
import PlayAgain from "./components/PlayAgain";
import { useEffect, useContext } from "react";
import { GameContext } from "./gameContext";

function App() {
	const {
		move,
		houseMove,
		setMove,
		setHouseMove,
		setResult,
		showResult,
		setShowResult,
		setScore,
		choiceData,
		houseLoading,
		setHouseLoading,
		showRules,
		setShowRules,
		showPlayAgain,
		setShowPlayAgain,
	} = useContext(GameContext);

	/* set score after selecting */
	useEffect(() => {
		if (showResult === true) {
			if (move.name === houseMove.name) {
				setResult("draw");
			}
			if (
				(move.name === "rock" && houseMove.name === "scissors") ||
				(move.name === "scissors" && houseMove.name === "paper") ||
				(move.name === "paper" && houseMove.name === "rock")
			) {
				setScore((prevScore) => prevScore + 1);
				setResult("win");
			}
			if (
				(move.name === "rock" && houseMove.name === "paper") ||
				(move.name === "scissors" && houseMove.name === "rock") ||
				(move.name === "paper" && houseMove.name === "scissors")
			) {
				setScore((prevScore) => prevScore - 1);
				setResult("lose");
			}
		}
	}, [showResult]);

	function handleMove(moveObj) {
		setMove(moveObj);
		setHouseMove(choiceData[Math.floor(Math.random() * choiceData.length)]);
		setHouseLoading(true);
		let timer;
		timer = setTimeout(() => {
			setShowResult(true);
			setTimeout(() => {
				setShowPlayAgain(true);
			}, 1000);
		}, 1000);
		return () => clearTimeout(timer);
	}

	function handlePlayAgain() {
		setShowPlayAgain(false);
		setShowResult(false);
		setHouseLoading(false);
	}

	return (
		<div className="App">
			{showRules && <Rules />}
			<Header />
			<div
				className={`choice-grid-container ${
					showResult ? "show-result" : ""
				} ${houseLoading ? "loading" : ""}`}
			>
				{!showResult && !houseLoading ? (
					choiceData.map((choiceObj, idx) => {
						return (
							<div
								className={`choice-grid-item ${
									houseLoading ? "loading" : ""
								}`}
							>
								<Button
									handleMove={handleMove}
									key={choiceObj.name}
									choiceObj={choiceObj}
								/>
								{houseLoading && (
									<p>
										{idx === 0
											? "You picked"
											: idx === 1
											? "The house picked"
											: ""}
									</p>
								)}
							</div>
						);
					})
				) : !showResult && houseLoading ? (
					<>
						<div className="choice-grid-item loading">
							<Button handleMove={handleMove} choiceObj={move} />
							<p>You picked</p>
						</div>
						<div className="choice-grid-item loading">
							<Button
								handleMove={handleMove}
								choiceObj={houseMove}
							/>
							<p>The house picked</p>
						</div>
					</>
				) : (
					<>
						<div className="choice-grid-item loading">
							<Button handleMove={handleMove} choiceObj={move} />
							<p>You picked</p>
						</div>
						<div className="choice-grid-item show-result">
							<Button
								handleMove={handleMove}
								choiceObj={houseMove}
							/>
							<p>The house picked</p>
						</div>
					</>
				)}
			</div>
			{showPlayAgain && <PlayAgain handlePlayAgain={handlePlayAgain} />}
			<button className="rules-btn" onClick={() => setShowRules(true)}>
				rules
			</button>
		</div>
	);
}

export default App;
