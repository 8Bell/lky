import { Button, Grid, Link, Typography } from '@mui/material';
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
							filter: 'brightness(1.5)',
						},
					},
					{
						margin: theme.spacing(10, 0, 7, 0),
						borderRadius: '30px',
						padding: theme.spacing(1, 1.3, 1, 1.3),
						fontSize: '15px',
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
				<Link
					href='https://www.instagram.com/analogyuyeon'
					sx={{ color: '#999' }}
					underline='none'>
					@analogyuyeon
				</Link>
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
