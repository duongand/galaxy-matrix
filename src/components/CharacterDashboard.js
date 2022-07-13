import React from 'react';
import Table from 'react-bootstrap/Table';

function CharacterDashboard(props) {
    const characterTableElements = props.characters.map((character) => (
        <tr key={character.name}>
            <td>{character.name}</td>
            <td>{character.birth_year}</td>
            <td>{character.height}</td>
            <td>{character.mass}</td>
            <td>{props.homeworld[character.homeworld]}</td>
            <td>{props.species[character.species]}</td>
        </tr>
    ));

    return (
        <div className="table-wrap">
            <Table striped bordered hover className="character-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birth date</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Homeworld</th>
                        <th>Species</th>
                    </tr>
                </thead>
                <tbody>
                    {characterTableElements}
                </tbody>
            </Table>
        </div>
    );
};

export default CharacterDashboard;