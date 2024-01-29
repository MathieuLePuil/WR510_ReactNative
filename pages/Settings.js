import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function TeamScreen() {
    const [isLocked, setIsLocked] = useState(true);
    const navigation = useNavigation();

    const toggleScreenOrientation = (value) => {
        setIsLocked(value);
        if (!value) {
            ScreenOrientation.getOrientationLockAsync().then((lock) => {
                if (lock !== ScreenOrientation.OrientationLock.PORTRAIT_UP) {
                    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).then(r => console.log(r));
                }
            });
        } else {
            ScreenOrientation.getOrientationLockAsync().then((lock) => {
                if (lock !== ScreenOrientation.OrientationLock.DEFAULT) {
                    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT).then(r => console.log(r));
                }
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Page paramètres</Text>
            </View>
            <View style={styles.switchContainer}>
                <Text>{isLocked ? "Orientation de l'écran activée" : "Orientation de l'écran désactivée"}</Text>
                <Switch onValueChange={toggleScreenOrientation} value={isLocked} />
            </View>
            <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Photo')}>
                <Ionicons name="camera-outline" style={styles.cameraIcon} />
                <Text style={styles.cameraText}>Camera</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    cameraButton: {
        backgroundColor: 'red',
        MarginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 20,
    },
    cameraIcon: {
        color: 'white',
        fontSize: 20,
        marginRight: 10,
    },
    cameraText: {
        color: 'white',
        fontSize: 20,
    },
});