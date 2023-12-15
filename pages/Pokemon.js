import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';

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
            <Image style={styles.image} source={{uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + pokemonIndex + '.png',}} />
            <View style={styles.type}>
                <Text>Type(s) :</Text>
                {pokemonData.types.map((typeData, index) => (
                    <Text key={index}> {typeData.type.name}</Text>
                ))}
            </View>
            <View style={styles.flex}>
                <Text>Height : </Text><Text>{pokemonData.height}</Text>
            </View>
            <View style={styles.flex}>
                <Text>Weight : </Text><Text>{pokemonData.weight}</Text>
            </View>
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
    list: {
        flex: 1,
    },
    image: {
        width: 400,
        height: 400,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
    },
    type: {
        marginBottom: 10,
    }
});