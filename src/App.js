import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import './App.css';
import ButtonAppBar from './components/AppBar';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import SideMenu from './components/SIdeMenu';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

function App() {
	const arr = Array.from({ length: 20 }, (v, i) => i);
	return (
		<div className='App'>
			<ButtonAppBar />

			<Container maxWidth={false}>
				<Grid container>
					{arr.map((a, idx) => (
						<Grid xs={12} md={6} lg={3} key={idx}>
							<Paper
								variant='outlined'
								style={{
									height: '500px',
									backgroundColor: 'grey',
									margin: '2px',
								}}>
								{idx + 1}
							</Paper>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
}

export default App;
