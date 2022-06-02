import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Landscape from './pages/Landscape';
import Sorok from './pages/Sorok';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/landscape' element={<Landscape />} />
			<Route path='/sorok' element={<Sorok />} />
			<Route path='*' element={<Home />} />
		</Routes>
	);
};

export default App;
