import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from './src/pages/SplashScreen';
import './src/config/Firebase';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Dashboard from './src/pages/Dashboard';
import Account from './src/pages/Account';
import AllFood from './src/pages/AllFood';
import ChangePassword from './src/pages/ChangePassword';
import Favorite from './src/pages/Favorite';
import MoodRegister from './src/pages/MoodRegister';
import Others from './src/pages/Others';
import DeleteAccount from './src/pages/DeleteAccount';
import Details from './src/pages/Details';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="AllFood" component={AllFood} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="MoodRegister" component={MoodRegister} />
        <Stack.Screen name="Others" component={Others} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
