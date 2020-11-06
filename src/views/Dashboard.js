import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// react-bootstrap/core components
import { Card, Button, Alert, Image } from 'react-bootstrap';

// project/core context
import { useAuth } from '../contexts/AuthContext';

// project/core assets
import defaultImage from 'assets/img/default-avatar.png';

export default function Dashboard() {
	/* Component State */
	const history = useHistory();

	const { currentUser, logout } = useAuth();

	const [error, setError] = useState('');

	/* Component Actions */
	async function handleLogout() {
		setError('');

		try {
			await logout();
			history.push('/login');
		} catch {
			setError('Failed to log out');
		}
	}

	/* Component View */
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}

					<Image className='' src={defaultImage} roundedCircle />

					<p>
						<strong>Email: </strong>
						{currentUser.email}
					</p>
					<p>
						<strong>Name: </strong>
						{currentUser.displayName ? (
							currentUser.displayName
						) : (
							<Link to='/update-profile'>Edit Name</Link>
						)}
					</p>

					<Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
						Update Profile
					</Link>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<Button variant='link' onClick={handleLogout}>
					Log Out
				</Button>
			</div>
		</>
	);
}
