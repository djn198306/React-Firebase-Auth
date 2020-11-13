import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// project/core utils
import { auth } from 'utils/firebase/firebase';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const history = useHistory();

	const [currentUser, setCurrentUser] = useState();
	const [error, setError] = useState(true);
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		setError('');

		return auth
			.createUserWithEmailAndPassword(email, password)
			.then(() => {})
			.catch((err) => {
				setError(err.message);
			});
	}

	function login(email, password) {
		setError('');

		return auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {})
			.catch((err) => {
				setError(err.message);
			});
	}

	function logout() {
		setError('');

		return auth
			.signOut()
			.then(() => {})
			.catch((err) => {
				setError(err.message);
			});
	}

	function resetPassword(email) {
		setError('');

		return auth
			.sendPasswordResetEmail(email)
			.then(() => {})
			.catch((err) => {
				setError(err.message);
			});
	}

	function updateEmail(email) {
		setError('');

		return currentUser
			.updateEmail(email)
			.then(() => {})
			.catch((err) => {
				setError(err.message);
			});
	}

	function updateProfileDisplayName(displayName) {
		setError('');

		return currentUser
			.updateProfile({
				displayName: displayName,
			})
			.then(() => {})
			.catch((err) => {
				setError(err.message);
			});
	}

	function updateProfilePhotoURL(photoURL) {
		setError('');

		return currentUser
			.updateProfile({
				photoURL: photoURL,
			})
			.then(() => {})
			.catch((err) => {
				setError(err.message);
			});
	}

	function updatePassword(password) {
		setError('');

		return currentUser
			.updatePassword(password)
			.then(() => {})
			.catch((err) => {
				setError(err.message);
			});
	}

	useEffect(() => {
		const subscriber = auth.onAuthStateChanged((user) => {
			setError('');
			setLoading(false);
			setCurrentUser(user);
		});

		return subscriber;
	}, []);

	useEffect(() => {
		setError('');
	}, [history]);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
		updateProfileDisplayName,
		updateProfilePhotoURL,
		error,
		setError,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
