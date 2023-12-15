import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

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
        <View>
            <Text>Pokemon Page</Text>
            <Text>{pokemonData.name}</Text>
            {pokemonData.types.map((typeData, index) => (
                <Text key={index}>{typeData.type.name}</Text>
            ))}
            <Text>{pokemonData.height}</Text>
            <Text>{pokemonData.weight}</Text>
            <Image style={styles.image} source={{uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + pokemonIndex + '.png',}} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
});