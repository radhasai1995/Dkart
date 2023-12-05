import { createTheme, responsiveFontSizes, Theme } from '@mui/material';
const DARK_MODE_THEME = 'dark';
const LIGHT_MODE_THEME = 'light';

export const getAppTheme = (mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME): Theme => {
	let theme = createTheme({
		palette: {
			mode,
		},
	});
	theme = responsiveFontSizes(theme);
	return theme;
};
