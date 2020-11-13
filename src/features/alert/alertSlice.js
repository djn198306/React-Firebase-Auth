import { createSlice } from '@reduxjs/toolkit';
import extraAction from 'features/alert/extraActions';

export const alertSlice = createSlice({
	name: 'alert',
	initialState: {
		alerts: [],
	},
	reducers: {
		createAlert: (state, action) => {
			state.alerts.push({
				message: action.payload.message,
				type: action.payload.type,
			});
		},
	},
	extraReducers: {
		[extraAction]: (state, action) => {
			state.alerts.push({ message: action.error.message, type: 'error' });
		},
	},
});

export const { createAlert } = alertSlice.actions;

export const selectAlerts = (state) => state.alert.alerts;

export default alertSlice.reducer;
