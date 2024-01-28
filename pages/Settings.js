import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import PokemonItem from '../components/PokemonItem';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function TeamScreen() {
    const [isLocked, setIsLocked] = useState(false);

    const toggleScreenOrientation = () => {
        if (isLocked) {
            ScreenOrientation.getOrientationLockAsync().then((lock) => {
                if (lock !== ScreenOrientation.OrientationLock.DEFAULT) {
                    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT).then(r => console.log(r));
                }
            });
            setIsLocked(false);
        } else {
            ScreenOrientation.getOrientationLockAsync().then((lock) => {
                if (lock !== ScreenOrientation.OrientationLock.PORTRAIT_UP) {
                    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).then(r => console.log(r));
                }
            });
            setIsLocked(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Page paramètres</Text>
            </View>
            <Button title={isLocked ? "Activer l'orientation" : "Désactiver l'orientation de l'écran"} onPress={toggleScreenOrientation} />
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