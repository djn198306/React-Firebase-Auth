import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'features/auth/authSlice';
import alertSlice from 'features/alert/alertSlice';

export default configureStore({
	reducer: {
		auth: authSlice,
		alert: alertSlice,
	},
});
