import "./App.css";
import Header from "./components/Header";
import Button from "./components/Button";
// import Result from "./components/Result";
import { useEffect, useContext } from "react";
import { GameContext } from "./gameContext";

function App() {
	const {
		move,
		houseMove,
		setMove,
		setHouseMove,
		showResult,
		setShowResult,
		setScore,
		choiceData,
		houseLoading,
		setHouseLoading,
	} = useContext(GameContext);

	/* set score after selecting, then wait to set pickedMode to false */
	useEffect(() => {
		if (showResult === true) {
			if (
				(move.name === "rock" && houseMove.name === "scissors") ||
				(move.name === "scissors" && houseMove.name === "paper") ||
				(move.name === "paper" && houseMove.name === "rock")
			) {
				setScore((prevScore) => prevScore + 1);
			}
			if (
				(move.name === "rock" && houseMove.name === "paper") ||
				(move.name === "scissors" && houseMove.name === "rock") ||
				(move.name === "paper" && houseMove.name === "scissors")
			) {
				setScore((prevScore) => prevScore - 1);
			}
		}
	}, [showResult]);

	function handleMove(moveObj) {
		setMove(moveObj);
		setHouseMove(choiceData[Math.floor(Math.random() * choiceData.length)]);
		let timer;
		setHouseLoading(true);
		timer = setTimeout(() => {
			setShowResult(true);
			setTimeout(() => {
				setShowResult(false);
				setHouseLoading(false);
			}, 1000);
		}, 1000);
		return () => clearTimeout(timer);
	}

	return (
		<div className="App">
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
			<div className="rules-btn-container">
				<button className="rules-btn">rules</button>
			</div>
		</div>
	);
}

export default App;
