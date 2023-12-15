import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PokemonDetails from '../components/PokemonDetails';


export default function Pokemon({ route }) {
    const { pokemonIndex } = route.params;
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
            .then(response => response.json())
            .then(data => setPokemonData(data));
    }, [pokemonIndex]);

    if (!pokemonData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>{pokemonData.name}</Text>
            </View>
            <PokemonDetails pokemonData={pokemonData} pokemonIndex={pokemonIndex} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        backgroundColor: 'red',
        width: '100%',
    },
    text: {
        color: 'white',
        fontSize: 24,
        padding: 10,
    },
});