import { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { screens } from '../constants/Style';
import { AuthContext } from '../context/authContext';
import { createUser } from '../util/auth';

function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  function changeConfirmEmailHandler(enteredText) {
    setConfirmEmail(enteredText);
  }

  function changePasswordHandler(enteredText) {
    setPassword(enteredText.trim());

    if (enteredText.trim().length >= 7) {
      setPwIsValid(true);
    } else {
      setPwIsValid(false);
    }
  }

  function changeConfirmPasswordHandler(enteredText) {
    setConfirmPassword(enteredText);
  }

  async function signupButtonHandler() {
    if (emIsValid && pwIsValid) {
      try {
        const token = await createUser(email, password);
        authCtx.authenticate(token);
        navigation.navigate('Name');
      } catch (error) {
        Alert.alert(
          'Authentication failed!',
          'Could not create user. Please check your input or try again later!'
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
          placeholder='Confirm Email'
          value={confirmEmail}
          keyboardType='email-address'
          onChangeText={changeConfirmEmailHandler}
        />
        <TextInput
          style={[screens.input]}
          placeholder='Password'
          value={password}
          onChangeText={changePasswordHandler}
          secureTextEntry={true}
        />
        <TextInput
          style={[screens.input]}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={changeConfirmPasswordHandler}
          secureTextEntry={true}
        />
        <View style={[screens.nextButtonContainer]}>
          <Button
            title='Sign Up'
            color='goldenrod'
            onPress={signupButtonHandler}
          />
        </View>
        <View style={[screens.nextButtonContainer]}>
          <Button
            title='Go to Login'
            color='blue'
            onPress={() => { navigation.navigate('Login') }}
          />
        </View>
        {(!emIsValid || !pwIsValid ||
          (email !== confirmEmail) || (password !== confirmPassword)) &&
          <Text style={screens.error}>Fix Errors</Text>}
      </View>
    </View>
  );
}

export default SignupScreen;
