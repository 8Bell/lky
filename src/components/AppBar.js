import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
	palette: {
		primary: {
			main: '#2c362a',
		},
		secondary: {
			main: '#faf9f6',
		},
	},
});

export default function ButtonAppBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			{/* <ThemeProvider theme={theme}> */}
			<AppBar position='static'>
				<Toolbar variant='dense'>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Leegyuyeon
					</Typography>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			{/* </ThemeProvider> */}
		</Box>
	);
}
