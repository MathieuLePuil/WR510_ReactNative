import { StyleSheet, View, Text, FlatList } from 'react-native';
import React, {useEffect, useState} from 'react';
import PokemonItem from '../components/PokemonItem';

export default function HomeScreen() {
    const [pokemons, setPokemons] = useState([]);

    const fetchData = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPokemons(data.results);
            });
    }

    useEffect(() => {
        fetchData('https://pokeapi.co/api/v2/pokemon?limit=1302');
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Tous les Pokémons</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    style={styles.list}
                    data={pokemons}
                    renderItem={({ item, index }) => <PokemonItem item={item} index={index} />}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-around',
        width: '100%',
        height: '100%',
        paddingTop: 50,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'red',
        width: '100%',
    },
    text: {
        fontSize: 24,
        padding: 10,
        color: 'white',
    },
    list: {
        flex: 1,
        width: '90%',
        marginLeft: '5%',
    },
    listContainer: {
        flex: 1,
        width: '90%',
        marginLeft: '5%',
    },
});