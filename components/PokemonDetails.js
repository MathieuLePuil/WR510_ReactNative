import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PokemonDetails({ pokemonData, pokemonIndex }) {
    return (
        <>
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
        </>
    );
}

const styles = StyleSheet.create({
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