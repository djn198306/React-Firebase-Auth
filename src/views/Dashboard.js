import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// react-bootstrap/core components
import { Card, Button, Alert, Image } from 'react-bootstrap';

// project/core context
import { useAuth } from 'contexts/AuthContext';

// project/core assets
import defaultImage from 'assets/img/default-avatar.png';

export default function Dashboard() {
	/* Component State */
	const history = useHistory();

	const { currentUser, logout, error, setError } = useAuth();

	const [loading, setLoading] = useState(false);

	/* Component Actions */
	async function handleLogout(e) {
		e.preventDefault();
		setLoading(true);

		try {
			await logout();
			return history.push('/login');
		} catch {
			setError('Failed to log out');
		}

		setLoading(false);
	}

	/* Component View */
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}

					<Image
						className='mx-auto d-block'
						src={currentUser.photoURL ? currentUser.photoURL : defaultImage}
						roundedCircle
					/>

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
						Edit Profile
					</Link>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<Button disabled={loading} variant='link' onClick={handleLogout}>
					Log Out
				</Button>
			</div>
		</>
	);
}
