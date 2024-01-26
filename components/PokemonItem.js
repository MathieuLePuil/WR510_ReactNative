import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PokemonItem({ item, index }) {
    const navigation = useNavigation();
    const pokemonId = item.url.split('/')[6];


    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Pokemon', { pokemonIndex: pokemonId })}>
            <View>
                <Text>{item.name}</Text>
                <Image style={styles.image} source={{uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + pokemonId + '.png',}} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        paddingTop: 10,
        flex: 1,
        margin: 3,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: '33.33%',
    },
    image: {
        width: 50,
        height: 50,
    },
});