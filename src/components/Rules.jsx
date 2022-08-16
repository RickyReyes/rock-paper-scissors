import React from "react";

const Rules = ({ setShowRules }) => {
	return (
		<div className="rules">
			<div className="rules__header">
				<h2>Rules</h2>
				<img
					className="rules__close"
					src="../images/icon-close.svg"
					onClick={() => setShowRules(false)}
					alt="close"
				/>
			</div>
			<img
				className="rules__img"
				src="../images/image-rules-bonus.svg"
				alt="rules"
			/>
		</div>
	);
};

export default Rules;
