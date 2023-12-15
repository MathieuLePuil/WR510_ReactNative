import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import React, {useEffect, useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PokemonItem from '../components/PokemonItem';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(response => response.json())
            .then(data => setPokemons(data.results));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Page Home</Text>
            </View>
            <FlatList
                style={styles.list}
                data={pokemons}
                renderItem={({ item, index }) => <PokemonItem item={item} index={index} />}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
        width: '100%',
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