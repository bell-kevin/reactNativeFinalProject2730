import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, Button } from 'react-native';

import AllPlaces from '../screens/AllPlaces';
import AddPlace from '../screens/AddPlace';
import IconButton from '../components/UI/IconButton';
import Map from '../screens/Map';
import { init, deleteFirstPlace } from '../util/database';
import PlaceDetails from '../screens/PlaceDetails';
import ValidateScreen from '../screens/ValidateScreen';
import NameScreen from '../screens/NameScreen';
import PhoneScreen from '../screens/PhoneScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    init()
      .then(() => {
        setDbInitialized(true);
        SplashScreen.hideAsync();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleDeleteFirstPlace = (onSuccess) => {
    deleteFirstPlace()
      .then(() => {
        console.log('First place deleted from database');
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // ...
  
  function DeletePlace({ navigation }) {
    const handleDelete = () => {
      handleDeleteFirstPlace(() => {
        navigation.goBack();
      });
    };
  
    return (
      <View>
        <Text>Do you want to delete the first favorite place?</Text>
        <Button title="Delete" onPress={handleDelete} />
      </View>
    );
  }

  if (!dbInitialized) {
    return null; // Return null instead of <AppLoading />
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Fav. Places',
              headerRight: ({ tintColor }) => (
                <>
                  <IconButton
                    icon="arrow-forward-outline"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate('Validate')}
                  />
                  <IconButton
                    icon="add"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate('AddPlace')}
                  />
                  <IconButton
                    icon="trash"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate('DeletePlace')}
                  />
                </>
              ),
            })}
          />
          <Stack.Screen
            name="DeletePlace"
            component={DeletePlace}
            options={{
              title: 'Delete a Place',
            }}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add a new Place',
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: 'Loading Place...',
            }}
          />
          <Stack.Screen name="Validate" component={ValidateScreen} />
          <Stack.Screen name="Name" component={NameScreen} />
          <Stack.Screen name="Phone" component={PhoneScreen} />
          <Stack.Screen name="FavoritePlaces" component={AllPlaces} options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <>
                  <IconButton
                    icon="arrow-forward-outline"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate('Validate')}
                  />
                  <IconButton
                    icon="add"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate('AddPlace')}
                  />
                  <IconButton
                    icon="trash"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate('DeletePlace')}
                  />
                </>
              ),
            })}
          />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}