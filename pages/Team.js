import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import PokemonItem from '../components/PokemonItem';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TeamScreen() {
    const navigation = useNavigation();
    const [pokemons, setPokemons] = useState([]);
    const [storageData, setStorageData] = useState([]); // Nouvel état pour stocker les données de l'AsyncStorage

    const fetchData = async () => {
        try {
            const teamData = await AsyncStorage.getItem('team');
            const team = teamData ? JSON.parse(teamData) : [];
            const pokemonDetails = await Promise.all(team.map(async (pokemonId) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const pokemonData = await response.json();
                return {
                    id: pokemonId,
                    name: pokemonData.name, // Ajoutez cette ligne pour récupérer le nom du Pokémon
                    image: pokemonData.sprites.front_default,
                };
            }));
            setPokemons(pokemonDetails);
            const keys = await AsyncStorage.getAllKeys();
            const values = await AsyncStorage.multiGet(keys);
            setStorageData(values);
        } catch (error) {
            alert(`Une erreur est survenue lors de la récupération de votre équipe : ${error.message}`);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const clearTeam = async () => {
        try {
            await AsyncStorage.removeItem('team');
            setPokemons([]);
            alert('Tous les pokémons ont été supprimés de l\'équipe');
        } catch (error) {
            alert(`Une erreur est survenue lors de la suppression de votre équipe : ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Page Équipe</Text>
            </View>
            <Button title="Vider mon équipe" onPress={clearTeam} />
            <FlatList
                data={pokemons}
                renderItem={({ item: pokemon }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Pokemon', { pokemonIndex: pokemon.id })}>
                        <View style={styles.item}>
                            <Text style={styles.pokemonName}>{pokemon.name}</Text>
                            <Image style={styles.image} source={{uri: pokemon.image}} />
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(pokemon) => pokemon.id.toString()}
                numColumns={2}
            />
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
    item: {
        padding: 30,
        margin: 10,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 50,
        height: 50,
    },
    pokemonName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});