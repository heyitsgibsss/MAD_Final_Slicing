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
import Details from './src/pages/Details';
import Favorite from './src/pages/Favorite';
import MoodRegister from './src/pages/MoodRegister';
import Others from './src/pages/Others';

// import details recipes from './src/pages/Recipes/Details1' dan seterusnya;

import Details1 from './src/pages/Recipes/Details1';
import Details2 from './src/pages/Recipes/Details2';
import Details3 from './src/pages/Recipes/Details3';
import Details4 from './src/pages/Recipes/Details4';
import Details5 from './src/pages/Recipes/Details5';
import Details6 from './src/pages/Recipes/Details6';
import Details7 from './src/pages/Recipes/Details7';
import Details8 from './src/pages/Recipes/Details8';
import Details9 from './src/pages/Recipes/Details9';
import Details10 from './src/pages/Recipes/Details10';
import Details11 from './src/pages/Recipes/Details11';
import Details12 from './src/pages/Recipes/Details12';
import Details13 from './src/pages/Recipes/Details13';
import Details14 from './src/pages/Recipes/Details14';
import Details15 from './src/pages/Recipes/Details15';
import Details16 from './src/pages/Recipes/Details16';
import Details17 from './src/pages/Recipes/Details17';
import Details18 from './src/pages/Recipes/Details18';
import Details19 from './src/pages/Recipes/Details19';
import Details20 from './src/pages/Recipes/Details20';

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
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="MoodRegister" component={MoodRegister} />
        <Stack.Screen name="Others" component={Others} />
        <Stack.Screen name="Details1" component={Details1} />
        <Stack.Screen name="Details2" component={Details2} />
        <Stack.Screen name="Details3" component={Details3} />
        <Stack.Screen name="Details4" component={Details4} />
        <Stack.Screen name="Details5" component={Details5} />
        <Stack.Screen name="Details6" component={Details6} />
        <Stack.Screen name="Details7" component={Details7} />
        <Stack.Screen name="Details8" component={Details8} />
        <Stack.Screen name="Details9" component={Details9} />
        <Stack.Screen name="Details10" component={Details10} />
        <Stack.Screen name="Details11" component={Details11} />
        <Stack.Screen name="Details12" component={Details12} />
        <Stack.Screen name="Details13" component={Details13} />
        <Stack.Screen name="Details14" component={Details14} />
        <Stack.Screen name="Details15" component={Details15} />
        <Stack.Screen name="Details16" component={Details16} />
        <Stack.Screen name="Details17" component={Details17} />
        <Stack.Screen name="Details18" component={Details18} />
        <Stack.Screen name="Details19" component={Details19} />
        <Stack.Screen name="Details20" component={Details20} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
