import React, { useContext, useState } from 'react';
import {
  View, TextInput, Image, Text,
} from 'react-native';
import { Button } from 'react-native-rapi-ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import AuthContext from '../../context/AuthContext';
import { LoginProp } from '../../navigation/types';
import { colors } from '../../components/utils/Colors';
import styles from '../../components/utils/styles';

function LoginScreen({ navigation }: LoginProp) {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const loginSuccess = await login({ username, password });
      if (loginSuccess !== undefined) {
        if (loginSuccess) {
          AsyncStorage.setItem('username', username);
          AsyncStorage.setItem('password', password);
        } else {
          setIsError(true);
        }
      }
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
      <View style={[styles.inputContainer, isError && styles.inputError]}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={[styles.inputContainer, isError && styles.inputError]}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#888"
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      {isError && <Text style={styles.errorText}>Incorrect username or password</Text>}
      <Button text="Login" onPress={handleLogin} color={colors.blue1dark} />
      <Text style={styles.navText} onPress={() => navigation.navigate('Signup')}>Go to sign up</Text>

    </View>
  );
}

export default LoginScreen;
