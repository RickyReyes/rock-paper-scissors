import React from "react";

const Button = ({ moveObj, handleMyMove }) => {
	return (
		<div
			className={`button__border-container ${moveObj.name}`}
			onClick={handleMyMove ? () => handleMyMove(moveObj.name) : null}
		>
			<div className="button__white-circle">
				<img src={moveObj.imgSrc} alt="icon" />
			</div>
		</div>
	);
};

export default Button;
