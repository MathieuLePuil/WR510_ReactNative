import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Colors} from "react-native/Libraries/NewAppScreen";

export default function PokemonItem({ item, index }) {
    if (!item || !item.url) {
        return null;
    }

    const navigation = useNavigation();
    const pokemonId = item.url.split('/')[6];

    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Pokemon', { pokemonIndex: pokemonId })}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.pokemonname}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
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
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: '30%',
        borderRadius: 10,
    },
    image: {
        width: 50,
        height: 50,
    },
    pokemonname: {
        color: '#fff',
        fontWeight: 'bold',
    },
});