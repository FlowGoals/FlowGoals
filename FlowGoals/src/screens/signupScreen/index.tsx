import React, { useContext, useState } from 'react';
import {
  View, TextInput, Image, StyleSheet,
} from 'react-native';
import { Button } from 'react-native-rapi-ui';
import { SignUpProp } from '../../navigation/types';
import AuthContext from '../../context/AuthContext';
import { signupUser } from '../../services/axiosService';

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
      <Button text="Sign Up" onPress={handleSignup} />
      <Button text="go to login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default SignupScreen;
