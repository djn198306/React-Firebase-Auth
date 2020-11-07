import React, { useContext, useState, useEffect } from 'react';

// project/core utils
import { auth } from 'utils/firebase/firebase';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});
	}

	function login(email, password) {
		return auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});
	}

	function logout() {
		return auth
			.signOut()
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});
	}

	function resetPassword(email) {
		return auth
			.sendPasswordResetEmail(email)
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});
	}

	function updateEmail(email) {
		return currentUser
			.updateEmail(email)
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});
	}

	function updateProfileDisplayName(displayName) {
		return currentUser
			.updateProfile({
				displayName: displayName,
			})
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});
	}

	function updateProfilePhotoURL(photoURL) {
		return currentUser
			.updateProfile({
				photoURL: photoURL,
			})
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});
	}

	function updatePassword(password) {
		return currentUser
			.updatePassword(password)
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

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
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
