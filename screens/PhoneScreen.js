import { useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { screens } from '../constants/Style';
import { UserContext } from '../context/userContext';

function PhoneScreen() {
  const navigation = useNavigation();

  // Set universal colors
  const colors = {
    backgroundColor: 'lightyellow',
    color: 'darkgoldenrod',
  };

  const userCtx = useContext(UserContext);

  // Change values within the context
  function changePhoneHandler(text) {
    userCtx.changePhone(text);
  }

  // Navigate to next screen
  function nextButtonHandler() {
    if (userCtx.user.phValid) {
      navigation.navigate('Validate');
    }
  }

  return (
    <View style={[screens.container, colors]}>
      <View style={screens.textContainer}>
        <Text style={[screens.header, colors]}>Enter your phone number</Text>
        <TextInput
          style={[screens.input]}
          keyboardType='number-pad'
          placeholder='Ex: 123-456-7890'
          value={userCtx.user.phone}
          onChangeText={changePhoneHandler}
        />
        <View style={[screens.nextButtonContainer]}>
          <Button
            title='Next'
            color={colors.color}
            onPress={nextButtonHandler}
          />
        </View>
        {!userCtx.user.phValid && <Text style={screens.error}>Fix Errors</Text>}
      </View>
    </View>
  );
}

export default PhoneScreen;
