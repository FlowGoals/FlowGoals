import React, { useContext, useState } from 'react';
import {
  View, TextInput, Image, StyleSheet,
} from 'react-native';
import { Button } from 'react-native-rapi-ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../context/AuthContext';
import { LoginProp } from '../../navigation/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    rowGap: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

function LoginScreen({ navigation }: LoginProp) {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login({ username, password });
      AsyncStorage.setItem('username', username);
      AsyncStorage.setItem('password', password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        // eslint-disable-next-line global-require
        source={require('../../assets/icon.png')}
        style={{ width: 150, height: 150 }}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button text="Login" onPress={handleLogin} />
      <Button text="go to sign up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

export default LoginScreen;
