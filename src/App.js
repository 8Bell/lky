import { Landscape } from '@mui/icons-material';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/landscape' element={<Landscape />} />
		</Routes>
	);
};

export default App;
