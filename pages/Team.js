import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import PokemonItem from '../components/PokemonItem';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TeamScreen() {
    const [pokemons, setPokemons] = useState([]);
    const [storageData, setStorageData] = useState([]);

    const fetchData = async () => {
        try {
            const teamData = await AsyncStorage.getItem('team');
            const team = teamData ? JSON.parse(teamData) : [];
            const pokemonDetails = await Promise.all(team.map(async (pokemonId) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const pokemonData = await response.json();
                return {
                    id: pokemonId,
                    name: pokemonData.name,
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
            <TouchableOpacity
                style={styles.button}
                onPress={clearTeam}
            >
                <Text style={styles.buttonText}>Vider mon équipe</Text>
            </TouchableOpacity>
            <FlatList
                data={pokemons}
                renderItem={({ item: pokemon }) => (
                    <PokemonItem item={{name: pokemon.name, url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`}} index={pokemon.id} />
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
    button: {
        backgroundColor: 'red',
        padding: 10,
        margin: 30,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
});