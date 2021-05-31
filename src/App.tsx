import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import Home from './pages/home/home';
import Movies from './pages/movies/movies';
import NotFound from './components/not-found/not-found';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/movies/:title/:plot" exact component={Movies} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
}

export default App;
