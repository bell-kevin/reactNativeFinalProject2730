import { useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { screens } from '../constants/Style';
import { UserContext } from '../context/userContext';

function NameScreen() {
  const navigation = useNavigation();

  // Set universal colors
  const colors = {
    backgroundColor: 'burlywood',
    color: 'saddlebrown',
  };

  const userCtx = useContext(UserContext);

  // Change values within the context
  function changeFirstNameHandler(text) {
    userCtx.changeFirstName(text);
  }
  function changeLastNameHandler(text) {
    userCtx.changeLastName(text);
  }

  // Navigate to next screen (after checking for validity)
  function nextButtonHandler() {
    if (userCtx.user.fnValid && userCtx.user.lnValid) {
      navigation.navigate('Phone');
    }
  }

  return (
    <View style={[screens.container, colors]}>
      <View style={screens.textContainer}>
        <Text style={[screens.header, colors]}>Enter your name</Text>
        <TextInput
          style={[screens.input]}
          placeholder='First Name'
          value={userCtx.user.firstName}
          onChangeText={changeFirstNameHandler}
        />
        <TextInput
          style={[screens.input]}
          placeholder='Last Name'
          value={userCtx.user.lastName}
          onChangeText={changeLastNameHandler}
        />
        <View style={[screens.nextButtonContainer]}>
          <Button
            title='Next'
            color={colors.color}
            onPress={nextButtonHandler}
          />
        </View>
        {(!userCtx.user.fnValid || !userCtx.user.lnValid) && <Text style={screens.error}>Fix Errors</Text>}
      </View>
    </View>
  );
}

export default NameScreen;
