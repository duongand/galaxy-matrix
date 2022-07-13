import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TableHeader from './components/TableHeader';
import CharacterDashboard from './components/CharacterDashboard';
import PageNavigation from './components/PageNavigation';

function App() {
	const [currentCharacters, setCurrentCharacters] = useState([]);
	const [species, setSpecies] = useState({});
	const [homeworld, setHomeworld] = useState({});
	const [page, setPage] = useState();
	const [maxPages, setMaxPages] = useState();
	const [searchBar, setSearchBar] = useState({
		name: ''
	});

	async function getPlanets(nextPage) {
		const response = await axios.get(nextPage);

		for (const planet of response.data.results) {
			setHomeworld((prevHomeworld) => ({
				...prevHomeworld,
				[planet.url]: planet.name
			}));
		};

		if (response.data.next !== null) {
			getPlanets(response.data.next);
		};
	};

	async function getSpecies(nextPage) {
		const response = await axios.get(nextPage);

		for (const specie of response.data.results) {
			setSpecies((prevSpecies) => ({
				...prevSpecies,
				[specie.url]: specie.name
			}));
		};

		if (response.data.next !== null) {
			getSpecies(response.data.next);
		};
	};

	useEffect(() => {
		Promise.all([
			getPlanets('https://swapi.dev/api/planets/'),
			getSpecies('https://swapi.dev/api/species/')
		]);
	}, [])

	useEffect(() => {
		axios.get('https://swapi.dev/api/people', {
			params: {
				page: page
			}
		}).then((res) => {
			setCurrentCharacters(res.data.results);
			setPage(page);
			setMaxPages(Math.ceil(res.data.count / 10));
		});
	}, [page]);

	function handleChange(event) {
		const { name, value } = event.target;
		setSearchBar((prevSearchBar) => ({
			...prevSearchBar,
			[name]: value
		}));
	};

	function changePage(event) {
		setPage(event.target.value);
	};

	function handleSubmit() {
		axios.get('https://swapi.dev/api/people', {
			params: {
				search: searchBar.name
			}
		}).then((response) => {
			const searchResults = response.data.results;
			const newCharacters = [];

			if (searchResults.length > 0) {
				for (const result of searchResults) {
					newCharacters.push(result);
				};
			};

			setCurrentCharacters(newCharacters);
		});

	};

	return (
		<div className="App">
			<div className="content-wrap">
				<TableHeader
					searchBar={searchBar}
					onChange={handleChange}
					onSubmit={handleSubmit}
				/>
				<CharacterDashboard
					characters={currentCharacters}
					homeworld={homeworld}
					species={species}
				/>
				<PageNavigation
					maxPages={maxPages}
					onClick={changePage}
				/>
			</div>
		</div>
	);
}

export default App;
