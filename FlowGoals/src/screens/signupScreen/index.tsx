import React, { useContext, useState } from 'react';
import {
  View, TextInput, Image, Text, KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-rapi-ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SignUpProp } from '../../navigation/types';
import AuthContext from '../../context/AuthContext';
import { signupUser } from '../../services/axiosService';
import { colors } from '../../components/utils/Colors';
import styles from '../../components/utils/styles';

function SignupScreen({ navigation }: SignUpProp) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [passErrorMessage, setPassErrorMessage] = useState('');

  const handleSignup = async () => {
    let hasError = false;
    // password validation
    if (password.length < 8) {
      setPassErrorMessage('Password must be at least 8 characters');
      setIsPasswordError(true);
      setPassword('');
      hasError = true;
    } else if (password.length > 20) {
      setPassErrorMessage('Password must be less than 20 characters');
      setIsPasswordError(true);
      setPassword('');
      hasError = true;
    }
    // username validation
    if (username === '') {
      setUserErrorMessage('This field is required');
      setIsUserError(true);
      hasError = true;
    } else if (username.length < 4) {
      setUserErrorMessage('Username must be at least 4 characters');
      setIsUserError(true);
      setUsername('');
      hasError = true;
    } else if (username.length > 12) {
      setUserErrorMessage('Username must be less than 12 characters');
      setIsUserError(true);
      setUsername('');
      hasError = true;
    }
    // User sign up
    if (!hasError) {
      try {
        await signupUser({ username, password });
        await login({ username, password });
        AsyncStorage.setItem('username', username);
        AsyncStorage.setItem('password', password);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <Image
        // eslint-disable-next-line global-require
          source={require('../../assets/icon.png')}
          style={{ width: 150, height: 150 }}
        />
        <View style={[styles.inputContainer, isUserError && styles.inputError]}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        {isUserError && <Text style={styles.errorText}>{userErrorMessage}</Text>}
        <View style={[styles.inputContainer, isPasswordError && styles.inputError]}>
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
        {isPasswordError
      && <Text style={styles.errorText}>{passErrorMessage}</Text>}
        <Button text="Sign Up" onPress={handleSignup} color={colors.blue1dark} />
        <Text style={styles.navText} onPress={() => navigation.navigate('Login')}>Go to login</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignupScreen;
