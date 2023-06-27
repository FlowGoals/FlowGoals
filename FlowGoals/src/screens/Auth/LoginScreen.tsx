import React, { useContext, useState } from 'react';
import {
  View, TextInput, Button, StyleSheet,
} from 'react-native';
import AuthContext from '../../context/AuthContext';
import { LoginProp } from '../../navigation/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

function LoginScreen({ navigation }: LoginProp) {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('login');
    // hard coded for now
    login({
      id: 1,
      username: 'test',
      createdDate: new Date(),
      extraData: {},
      password: '',
    });
  };

  return (
    <View style={styles.container}>
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="go to sign up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

export default LoginScreen;