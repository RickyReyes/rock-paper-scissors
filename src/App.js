import "./App.css";
import Header from "./components/Header";
import Button from "./components/Button";
import Result from "./components/Result";
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
		if (showResult === true && move.name === houseMove.name) {
			setScore((prevScore) => prevScore + 1);
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
				setShowResult(false);
				setHouseLoading(false);
			}, 1200);
		}, 1200);
		return () => clearTimeout(timer);
	}

	return (
		<div className="App">
			<Header />
			{!showResult ? (
				<div className="choice-grid-container">
					{choiceData.map((choiceObj) => {
						return (
							<Button
								handleMove={handleMove}
								key={choiceObj.name}
								choiceObj={choiceObj}
							/>
						);
					})}
				</div>
			) : (
				<div
					className={`choice-grid-container result ${
						houseLoading ? "loading" : ""
					}`}
				>
					<Result />
				</div>
			)}
			<div className="rules-btn-container">
				<button className="rules-btn">rules</button>
			</div>
		</div>
	);
}

export default App;
