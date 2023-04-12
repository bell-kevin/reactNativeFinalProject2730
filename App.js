import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IconButton from './components/UI/IconButton';
import Map from './screens/Map';
import PlaceDetails from './screens/PlaceDetails';

import AuthContextProvider from './context/authContext';
import UserContextProvider from './context/userContext';
import { AuthContext } from './context/authContext';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import NameScreen from './screens/NameScreen';
import PhoneScreen from './screens/PhoneScreen';
import ValidateScreen from './screens/ValidateScreen';
import FavoritePlacesNew from './screens/FavoritePlacesNew';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import DeletePlace from './screens/DeletePlace';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function DataStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="FavoritePlaces" component={FavoritePlacesNew} options={{ headerShown: false }} />
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
        name="AddPlace"
        component={AddPlace}
        options={{
          title: 'Add a new Place',
        }}
      />
      <Stack.Screen
            name="DeletePlace"
            component={DeletePlace}
            options={{
              title: 'Delete a Place',
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
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {(!authCtx.isAuthenticated) && <AuthStack />}
      {(authCtx.isAuthenticated && !authCtx.dataProvided) && <DataStack />}
      {(authCtx.isAuthenticated && authCtx.dataProvided) && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <UserContextProvider>
          <Root />
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
}
