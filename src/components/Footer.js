import { Button, Grid, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
	const theme = useTheme();
	return (
		<Grid item xs={12}>
			<Button
				variant='contained'
				href='https://pf.kakao.com/_KDiHb/chat'
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
						padding: theme.spacing(1, 1.5, 1, 1.5),
						fontSize: '15px',
						backgroundColor: '#2c362a',
						fontFamily: 'LatoR',
						fontWeight: 400,
					},
				]}>
				Contact
			</Button>
			<Typography
				sx={{
					margin: theme.spacing(2, 0, 0, 0),
					color: '#555',
					fontSize: '15px',
					fontFamily: 'Lato',
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
						color: '#555',
						fontSize: '15px',
						fontFamily: 'Lato',
					},
				]}>
				<Link
					href='https://www.instagram.com/analogyuyeon'
					sx={{ color: '#555' }}
					underline='none'>
					@analogyuyeon
				</Link>
			</Typography>
			<Typography
				sx={{
					margin: theme.spacing(2, 0, 2, 0),
					color: '#555',
					fontSize: '15px',
					fontFamily: 'Lato',
				}}>
				{'© Leegyuyeon ' + new Date().getFullYear() + '. All rights reserved'}
			</Typography>
		</Grid>
	);
}
