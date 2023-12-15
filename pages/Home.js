import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import React, {useEffect, useState} from 'react';

export default function App() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(response => response.json())
            .then(data => setPokemons(data.results));
    }, []);

    const index = index +1;
    const renderItem = ({ item, index }) => (
        <View style={styles.item}>
            <Text>{item.name}</Text>
            <Image style={styles.image} source={{uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + (index + 1) + '.png',}} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Page Home</Text>
            <FlatList
                data={pokemons}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        margin: 3,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100, // Vous pouvez ajuster cela en fonction de vos besoins
    },
    marginBottom: {
        marginBottom: 20,
        width: '100%',
        display: 'flex',
    },
    image: {
        width: 50,
        height: 50,
    },
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
    header: {
        fontSize: 16,
        backgroundColor: 'lightgreen',
    },
    title: {
        fontSize: 24,
    },
});