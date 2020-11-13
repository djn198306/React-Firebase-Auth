import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Icon from 'features/alert/styles/Icon';
import { Wrapper, Content, Message } from 'features/alert/styles/Wrappers';
import { successIcon, errorIcon, closeIcon } from 'assets/icons';

const Alert = () => {
	const { alerts } = useSelector((state) => state.notifications);
	const [alert, setAlert] = useState({ type: '', message: '' });
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (alerts.length > 0) {
			setAlert(alerts[alerts.length - 1]);
			setShow(true);
			setTimeout(() => {
				setShow(false);
			}, 3000);
		}
	}, [alerts]);

	const onClose = () => {
		setShow(false);
	};

	const color = alert.type === 'success' ? 'teal' : 'tomato';
	const iconUrl = alert.type === 'success' ? successIcon : errorIcon;

	return show ? (
		<Wrapper className={`${alert.type || 'error'}`}>
			<Content>
				<Icon icon={iconUrl} color={color} size='20px' />
				<Message>{alert.message || ''}</Message>
			</Content>
			<Icon
				icon={closeIcon}
				color={color}
				size='24px'
				onClick={onClose}
				style={{ cursor: 'pointer' }}
			/>
		</Wrapper>
	) : null;
};

export default Alert;
