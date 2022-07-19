import React, { useState, useEffect } from 'react';
import './App.css';
import TableForm from './components/TableForm';
import CharacterTable from './components/CharacterTable';
import Pagination from './components/Pagination';

function App() {
	const [characters, setCharacters] = useState([]);
	const [currentCharacters, setCurrentCharacters] = useState([]);
	const [page, setPage] = useState(1);
	const [searchBar, setSearchBar] = useState({
		name: ''
	});
	const [searchedCharacter, setSearchedCharacter] = useState('');

	useEffect(() => {
		async function getCharacters() {
			const BASE_URL = 'https://swapi.dev/api/';
			const characterURLS = createURLS(BASE_URL, 'people', 10);
			const planetURLS = createURLS(BASE_URL, 'planets', 7);
			const specieURLS = createURLS(BASE_URL, 'species', 5);
	
			const characterPromises = generatePromises(characterURLS);
			const planetPromises = generatePromises(planetURLS);
			const speciePromises = generatePromises(specieURLS);
	
			const tempCharacters = (await Promise.all(characterPromises)).flat();
			let planets = (await Promise.all(planetPromises)).flat();
			let species = (await Promise.all(speciePromises)).flat();

			planets = convertArrayToDict(planets, 'url', 'name');
			species = convertArrayToDict(species, 'url', 'name');

			console.log(planets);
			console.log(species);
	
			for (const character of tempCharacters) {
				character.homeworld = planets[character.homeworld];
				character.species = (character.species.length !== 0 ?
					species[character.species[0]] : 'Human');
			};
	
			setCharacters(tempCharacters);
			setCurrentCharacters(tempCharacters.slice(0, 10));
		}

		getCharacters();
	}, [setCharacters])

	useEffect(() => {
		if (searchBar.name === '') {
			setCurrentCharacters(characters);
			setPage('1');
		};

		const filteredCharacters = characters.filter(character => {
			return character.name.toUpperCase() === searchBar.name.toUpperCase()
		});

		if (filteredCharacters.length > 0) {
			setCurrentCharacters(filteredCharacters);
		};
	}, [searchedCharacter, characters, searchBar])

	useEffect(() => {
		const maxIndex = page * 10;
		setCurrentCharacters(characters.slice(maxIndex - 10, maxIndex));
	}, [page, characters])

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

	function handleSubmit(event) {
		event.preventDefault();
		setSearchedCharacter(searchBar);
	};

	return (
		<div className="App">
			<div className="content-wrap">
				<TableForm
					searchBar={searchBar}
					onChange={handleChange}
					onSubmit={handleSubmit}
				/>
				<CharacterTable
					characters={currentCharacters}
				/>
				<Pagination
					numberOfCharacters={characters.length}
					onClick={changePage}
				/>
			</div>
		</div>
	);
}

export default App;

function createURLS(BASE_URL, ENDPOINT, RANGE) {
	const urls = [];
	for (let i = 1; i < RANGE; i++) {
		urls.push(`${BASE_URL}${ENDPOINT}?page=${i}`);
	};

	return urls;
};

function generatePromises(urls) {
	return urls.map((url) => (
		fetch(url)
		.then((response) => {
			return response.json();
		}).then((response) => {
			return response.results;
		}).catch((error) => {
			console.log(error);
		})
	));
};

function convertArrayToDict(array, key, value) {
	const temp = {};
	for (const item of array) {
		temp[item[key]] = item[value];
	};

	return temp;
};