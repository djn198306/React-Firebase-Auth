import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// react-bootstrap/core components
import { Form, Button, Card, Alert, Image } from 'react-bootstrap';

// project/core context
import { useAuth } from 'contexts/AuthContext';

// project/core utils
import {
	getFirstNameFromFullName,
	getLastNameFromFullName,
} from 'utils/functions/functions';

// project/core assets
import defaultImage from 'assets/img/default-avatar.png';

import './styles.css';

export default function UpdateProfile() {
	/* Component State */
	const history = useHistory();
	const emailRef = useRef();
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const photoRef = useRef();

	const {
		currentUser,
		updateEmail,
		updateProfileDisplayName,
		error,
		setError,
	} = useAuth();

	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	/* Component Actions */
	function handleSubmit(e) {
		e.preventDefault();

		const promises = [];
		setLoading(true);

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}

		if (firstNameRef.current.value && lastNameRef.current.value) {
			promises.push(
				updateProfileDisplayName(
					`${firstNameRef.current.value} ${lastNameRef.current.value}`
				)
			);
		}

		Promise.all(promises)
			.then(() => {
				return history.push('/');
			})
			.catch(() => {
				setError('Failed to update account');
			});

		setLoading(false);
	}

	function handleChange(e) {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	}

	/* Component View */
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Update Profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group id='photo' className='picture-container'>
							<div className='picture'>
								<Image
									src={
										currentUser.photoURL ? currentUser.photoURL : defaultImage
									}
									className='picture-src'
								/>
								<Form.File ref={photoRef} onChange={handleChange} />
							</div>
							<Form.Label>Choose Picture</Form.Label>
						</Form.Group>

						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
								defaultValue={currentUser.email}
							/>
						</Form.Group>

						<Form.Group id='first-name'>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='text'
								ref={firstNameRef}
								required
								defaultValue={getFirstNameFromFullName(currentUser.displayName)}
							/>
						</Form.Group>

						<Form.Group id='last-name'>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='text'
								ref={lastNameRef}
								required
								defaultValue={getLastNameFromFullName(currentUser.displayName)}
							/>
						</Form.Group>

						<Button disabled={loading} className='w-100' type='submit'>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<Link to='/update-password'>Change password</Link>
			</div>
			<div className='w-100 text-center mt-2'>
				<Link to='/'>Cancel</Link>
			</div>
		</>
	);
}
