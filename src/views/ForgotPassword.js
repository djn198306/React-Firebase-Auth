import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// react-bootstrap/core components
import { Form, Button, Card, Alert } from 'react-bootstrap';

// project/core context
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
	/* Component State */
	const emailRef = useRef();

	const { resetPassword, error, setError } = useAuth();

	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	/* Component Actions */
	async function handleSubmit(e) {
		e.preventDefault();
		setMessage('');
		setLoading(true);

		try {
			await resetPassword(emailRef.current.value);
			setMessage('Check your inbox for further instructions');
		} catch {
			setError('Failed to reset password');
		}

		setLoading(false);
	}

	/* Component View */
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Password Reset</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					{message && <Alert variant='success'>{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Button disabled={loading} className='w-100' type='submit'>
							Reset Password
						</Button>
					</Form>
					<div className='w-100 text-center mt-3'>
						<Link to='/login'>Login</Link>
					</div>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Need an account? <Link to='/signup'>Sign Up</Link>
			</div>
		</>
	);
}
