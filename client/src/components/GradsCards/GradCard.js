import React from "react";
import { Link } from "react-router-dom";
import "./GradCard.css";

const GradCard = ({ grad }) => {
	return (
		<Link to={`/profile/${grad.id}`} className="grad-card" key={grad.id}>
			<img
				src={`https://github.com/${grad.github_username}.png`}
				alt={`${grad.username}'s Avatar`}
			/>
			<h3>{grad.username}</h3>
			<p>Activity Score: </p>
		</Link>
	);
};

export default GradCard;
