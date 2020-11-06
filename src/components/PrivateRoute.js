import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// project/core context
import { useAuth } from 'contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
	/* Component State */
	const { currentUser } = useAuth();

	/* Component Actions */

	/* Component View */
	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				);
			}}></Route>
	);
}
