import { StyleSheet, View, Text, FlatList, Button, TextInput } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import PokemonItem from '../components/PokemonItem';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');

    const fetchData = () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1302')
            .then(response => response.json())
            .then(data => {
                setPokemons(data.results);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Page Recherche</Text>
            </View>
            <TextInput
                style={styles.input}
                value={search}
                onChangeText={setSearch}
                placeholder="Rechercher un pokémon..."
            />
            {filteredPokemons.length > 0 ? (
                <FlatList
                    style={styles.list}
                    data={filteredPokemons}
                    renderItem={({ item, index }) => <PokemonItem item={item} index={index} />}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                />
            ) : (
                <Text style={styles.error}>Aucun pokémon trouvé</Text>
            )}
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
        marginBottom: 20,
        width: '90%',
        marginLeft: '5%',
    },
    listContainer: {
        flex: 1,
        marginBottom: 30,
        width: '90%',
        marginLeft: '5%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        color: '#000000',
    },
    error: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 560,
        marginTop: 20,
    },
});