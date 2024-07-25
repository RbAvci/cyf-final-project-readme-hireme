import React, { useState } from "react";
import "./FormStyles.css";
import { hashPassword } from "./Util.js";
const updatePassword = async (userId, passwordHash) => {
	try {
		const response = await fetch(`/api/users/${userId}/password`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ passwordHash }),
		});

		if (response.ok) {
			const result = await response.json();
			return { success: true, data: result.data };
		} else {
			const errorResult = await response.json();
			return {
				success: false,
				message: errorResult.message || "Password update failed",
			};
		}
	} catch (error) {
		return { success: false, message: "Network error" };
	}
};

const UpdatePasswordForm = ({ userId }) => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleUpdatePassword = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
			return;
		}

		const passwordHash = await hashPassword(password);

		const result = await updatePassword(userId, passwordHash);

		if (result.success) {
			setMessage("Password updated successfully!");
		} else {
			setMessage(`Error: ${result.message}`);
		}
	};

	return (
		<div className="updatePasswordForm-container">
			<h1>Update Password</h1>
			<form onSubmit={handleUpdatePassword}>
				<label htmlFor="password">New Password:</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<br />
				<br />

				<label htmlFor="confirmPassword">Confirm Password:</label>
				<input
					type="password"
					id="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<br />
				<br />

				<button type="submit">Update Password</button>
			</form>
			{message && <div className="message">{message}</div>}
		</div>
	);
};

export default UpdatePasswordForm;