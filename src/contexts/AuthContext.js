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
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updateProfileDisplayName(displayName) {
		return currentUser.updateProfile({
			displayName: displayName,
		});
	}

	function updateProfilePhotoURL(photoURL) {
		return currentUser.updateProfile({
			photoURL: photoURL,
		});
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
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
