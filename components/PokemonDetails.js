import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
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
        }, 100);

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
                {pokemonData.types.map((typeData, index) => (
                    <Text key={index}> {typeData.type.name}</Text>
                ))}
            </View>
            <View style={styles.flex}>
                <Text>Height : </Text><Text>{pokemonData.height}</Text>
            </View>
            <View style={styles.flex}>
                <Text>Weight : </Text><Text>{pokemonData.weight}</Text>
            </View>
            <Button title={buttonState} onPress={handleButtonClick} />
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 400,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
    },
    type: {
        marginBottom: 10,
    }
});