import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PokemonItem({ item, index }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Pokemon', { pokemonIndex: index + 1 })}>
            <View>
                <Text>{item.name}</Text>
                <Image style={styles.image} source={{uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + (index + 1) + '.png',}} />
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