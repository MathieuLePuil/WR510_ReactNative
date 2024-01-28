import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './pages/Home';
import Search from './pages/Search';
import Team from './pages/Team';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pokemon from './pages/Pokemon';
import Settings from './pages/Settings';
import * as ScreenOrientation from 'expo-screen-orientation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Pokemon"
                component={Pokemon}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Tab.Navigator>
                <Tab.Screen name="Accueil" component={HomeStack} options={{ headerShown: false }} />
                <Tab.Screen name="Recherche" component={Search} options={{ headerShown: false }} />
                <Tab.Screen name="Mon équipe" component={Team} options={{ headerShown: false }} key={Math.random()} />
                <Tab.Screen name="Paramètres" component={Settings} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
});