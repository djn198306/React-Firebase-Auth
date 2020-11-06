import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// react-bootstrap/core components
import { Form, Button, Card, Alert } from 'react-bootstrap';

// project/core context
import { useAuth } from '../contexts/AuthContext';

export default function UpdateProfile() {
	/* Component State */
	const history = useHistory();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { updatePassword } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	/* Component Actions */
	function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		const promises = [];
		setLoading(true);
		setError('');

		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				history.push('/');
			})
			.catch(() => {
				setError('Failed to update password');
			})
			.finally(() => {
				setLoading(false);
			});
	}

	/* Component View */
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Update Password</h2>
					{error && <Alert variant='danger'>{error}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								placeholder='New password'
							/>
						</Form.Group>
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type='password'
								ref={passwordConfirmRef}
								placeholder='Re-type new password'
							/>
						</Form.Group>
						<Button disabled={loading} className='w-100' type='submit'>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<Link to='/'>Cancel</Link>
			</div>
		</>
	);
}
