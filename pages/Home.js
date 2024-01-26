import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import PokemonItem from '../components/PokemonItem';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [pokemons, setPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);

    const fetchData = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPokemons(data.results);
                setNextUrl(data.next);
                setPrevUrl(data.previous);
            });
    }

    useEffect(() => {
        fetchData('https://pokeapi.co/api/v2/pokemon/');
    }, []);

    const handleNext = () => {
        if (nextUrl) {
            fetchData(nextUrl);
        }
    }

    const handlePrev = () => {
        if (prevUrl) {
            fetchData(prevUrl);
        }
    }

    const handleFirst = () => {
        fetchData('https://pokeapi.co/api/v2/pokemon/');
    }

    const handleLast = () => {
        fetchData(`https://pokeapi.co/api/v2/pokemon/?offset=1300&limit=20`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Page Home</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    style={styles.list}
                    data={pokemons}
                    renderItem={({ item, index }) => <PokemonItem item={item} index={index} />}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                />
                <View style={styles.buttonContainer}>
                    <Button title="<<" onPress={handleFirst} />
                    {prevUrl && <Button title="<" onPress={handlePrev} />}
                    {nextUrl && <Button title=">" onPress={handleNext} />}
                    <Button title=">>" onPress={handleLast} />
                </View>
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
});