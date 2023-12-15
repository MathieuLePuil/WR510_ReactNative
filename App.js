import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, SafeAreaView, SectionList} from 'react-native';
import {useState} from 'react';
import CustomButton from "./components/CustomButton";
import Home from './pages/Home';

export default function App() {
    const [text, setText] = useState('rien');

    const changeText = (newText) => {
        setText(newText);
    }

    return (
        <View style={styles.container}>
            <Home />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#909090',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'lightblue',
        padding: 10,
        marginVertical: 5,
    },
    header: {
        fontSize: 16,
        backgroundColor: 'lightgreen',
    },
    title: {
        fontSize: 24,
    },
});