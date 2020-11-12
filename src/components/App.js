import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// react-bootstrap/core components
import { Container } from 'react-bootstrap';

// project/core components
import PrivateRoute from 'components/PrivateRoute';

// project/core views
import Dashboard from 'views/Dashboard';
import Signup from 'views/Signup';
import Login from 'views/Login';
import ForgotPassword from 'views/ForgotPassword';
import UpdateProfile from 'views//UpdateProfile';
import UpdatePassword from 'views//UpdatePassword';

// project/core context
import { AuthProvider } from 'contexts/AuthContext';

export default function App() {
	/* Component State */

	/* Component Actions */

	/* Component View */
	return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '100vh' }}>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRoute exact path='/' component={Dashboard} />
							<PrivateRoute path='/update-profile' component={UpdateProfile} />
							<PrivateRoute
								path='/update-password'
								component={UpdatePassword}
							/>
							<Route path='/signup' component={Signup} />
							<Route path='/login' component={Login} />
							<Route path='/forgot-password' component={ForgotPassword} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}
