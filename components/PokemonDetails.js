import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PokemonDetails({ pokemonData, pokemonIndex }) {
    const [buttonState, setButtonState] = useState('Ajouter à l\'équipe');

    const checkTeam = async () => {
        const team = JSON.parse(await AsyncStorage.getItem('team')) || [];
        if (team.includes(pokemonIndex)) {
            setButtonState('Supprimer de l\'équipe');
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            checkTeam();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleButtonClick = async () => {
        const team = JSON.parse(await AsyncStorage.getItem('team')) || [];
        if (buttonState === 'Ajouter à l\'équipe') {
            if (team.length < 6) {
                team.push(pokemonIndex);
                await AsyncStorage.setItem('team', JSON.stringify(team));
                setButtonState('Supprimer de l\'équipe');
            } else {
                alert('Votre équipe est déjà complète !');
            }
        } else {
            const newTeam = team.filter(pokemon => pokemon !== pokemonIndex);
            await AsyncStorage.setItem('team', JSON.stringify(newTeam));
            setButtonState('Ajouter à l\'équipe');
        }
    };

    return (
        <>
            <Image style={styles.image} source={{uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + pokemonIndex + '.png',}} />
            <View style={styles.type}>
                <Text>Type(s) :</Text>
                <View style={styles.typeContent}>
                    {pokemonData.types.map((typeData, index) => (
                        <Text key={index}> {typeData.type.name}</Text>
                    ))}
                </View>
            </View>
            <View style={styles.flex}>
                <Text>Height : </Text><Text>{pokemonData.height}</Text>
            </View>
            <View style={styles.flex}>
                <Text>Weight : </Text><Text>{pokemonData.weight}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
                <Text style={styles.buttonText}>{buttonState}</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
        borderRadius: 150,
        margin: 20,
        alignSelf: 'center',
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    type: {
        marginBottom: 10,
        margin: 20,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    typeContent: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});