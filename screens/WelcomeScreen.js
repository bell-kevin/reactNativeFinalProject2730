import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { screens } from '../constants/Style';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';

function WelcomeScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  function logoutHandler() {
    authCtx.logout();
    userCtx.changeFirstName("");
    userCtx.changeLastName("");
    userCtx.changePhone("");
  }

  return (
    <View style={screens.container}>
      <View style={screens.textContainer}>
        <Text style={screens.header}>You did it!</Text>
      </View>
      <View style={screens.nextButtonContainer}>
        <Button
          title='Sign Out'
          color='darkred'
          onPress={logoutHandler}
        />
      </View>
    </View>
  );
}

export default WelcomeScreen;
