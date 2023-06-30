import React, { useContext, useState } from 'react';
import {
  View, TextInput, Button, StyleSheet,
} from 'react-native';
import { SignUpProp } from '../../navigation/types';
import AuthContext from '../../context/AuthContext';
import { signupUser } from '../../services/axiosService';

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

function SignupScreen({ navigation }: SignUpProp) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signupUser({ username, password });
      login({ username, password });
    } catch (err) {
      console.log(err);
    }
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
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="go to login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default SignupScreen;
