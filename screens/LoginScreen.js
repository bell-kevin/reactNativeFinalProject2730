import { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { screens } from '../constants/Style';
import { AuthContext } from '../context/authContext';
import { login } from '../util/auth';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emIsValid, setEmIsValid] = useState(false);
  const [pwIsValid, setPwIsValid] = useState(false);

  const authCtx = useContext(AuthContext);

  const navigation = useNavigation();

  function changeEmailHandler(enteredText) {
    setEmail(enteredText);

    if (enteredText.trim().length > 1 && enteredText.includes('@')) {
      setEmIsValid(true);
    } else {
      setEmIsValid(false);
    }
  }

  function changePasswordHandler(enteredText) {
    setPassword(enteredText.trim());

    if (enteredText.trim().length >= 7) {
      setPwIsValid(true);
    } else {
      setPwIsValid(false);
    }
  }

  async function loginButtonHandler() {
    if (emIsValid && pwIsValid) {
      try {
        const token = await login(email, password);
        authCtx.authenticate(token);
        authCtx.setProvidedData(true);
      } catch (error) {
        Alert.alert(
          'Authentication failed!',
          'Could not log you in. Please check your credentials or try again later!'
        );
      }
    }
  }

  return (
    <View style={[screens.container]}>
      <View style={screens.textContainer}>
        <Text style={[screens.header]}>Login</Text>
        <TextInput
          style={[screens.input]}
          placeholder='Email'
          value={email}
          keyboardType='email-address'
          onChangeText={changeEmailHandler}
        />
        <TextInput
          style={[screens.input]}
          placeholder='Password'
          value={password}
          onChangeText={changePasswordHandler}
          secureTextEntry={true}
        />
        <View style={[screens.nextButtonContainer]}>
          <Button
            title='Login'
            color='blue'
            onPress={loginButtonHandler}
          />
        </View>
        <View style={[screens.nextButtonContainer]}>
          <Button
            title='Go to Sign Up'
            color='goldenrod'
            onPress={() => { navigation.navigate('Signup') }}
          />
        </View>
        {(!emIsValid || !pwIsValid) && <Text style={screens.error}>Fix Errors</Text>}
      </View>
    </View>
  );
}

export default LoginScreen;
