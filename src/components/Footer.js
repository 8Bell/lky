import { Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
	const theme = useTheme();
	return (
		<Grid item xs={12}>
			<Button
				variant='contained'
				sx={[
					{
						'&:hover': {
							backgroundColor: '#2c362a',
							filter: 'brightness(1.8)',
						},
					},
					{
						margin: theme.spacing(10, 0, 7, 0),
						borderRadius: '30px',
						padding: theme.spacing(1.6, 2, 1.6, 2),
						fontSize: '17px',
						backgroundColor: '#2c362a',
					},
				]}>
				Contact
			</Button>
			<Typography
				sx={{
					margin: theme.spacing(2, 0, 0, 0),
					color: '#999',
				}}>
				Leegyuyeon
			</Typography>
			<Typography
				sx={[
					{
						'&:hover': {
							filter: 'brightness(0.5)',
						},
					},
					{
						margin: theme.spacing(2, 0, 0, 0),
						color: '#999',
					},
				]}>
				@analogyuyeon
			</Typography>
			<Typography
				sx={{
					margin: theme.spacing(2, 0, 2, 0),
					color: '#999',
				}}>
				{'© Leegyuyeon ' + new Date().getFullYear() + '. All rights reserved'}
			</Typography>
		</Grid>
	);
}
