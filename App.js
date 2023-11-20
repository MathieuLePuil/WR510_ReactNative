import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {useState} from 'react';
import CustomButton from "./components/CustomButton";

export default function App() {
  const [text, setText] = useState('rien');

  const changeText = (newText) => {
      setText(newText);
  }

    return (
        <View style={styles.container}>
            <Text>J'ai cliqué sur {text}</Text>
            <CustomButton
                text={'noir'}
                changeText={changeText}
                color={'black'}
            />
            <CustomButton
                text={'bleu'}
                changeText={changeText}
                color={'blue'}
            />
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
});
