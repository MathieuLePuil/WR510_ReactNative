import { StyleSheet, View, Text } from 'react-native';
import React, {useEffect, useState} from 'react';

export default function App() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(response => response.json())
            .then(data => setPokemons(data.results));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Page Home</Text>
            {pokemons.map((pokemon, index) => (
                <Text key={index}>{pokemon.name}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: 'red',
        fontSize: 24,
        marginBottom: 20,
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#909090',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'lightblue',
        padding: 10,
        marginVertical: 5,
    },
    header: {
        fontSize: 16,
        backgroundColor: 'lightgreen',
    },
    title: {
        fontSize: 24,
    },
});
