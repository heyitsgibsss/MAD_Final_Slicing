/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Account from './src/pages/Account';
import ChangePassword from './src/pages/changePassword';
import recipeDetails from './src/pages/Details';
import Others from './src/pages/Others';
import Details from './src/pages/Details';
import MoodRegister from './src/pages/MoodRegister';
import AllRecipes from './src/pages/AllRecipes';
import AllFood from './src/pages/AllFood';
import Favorite from './src/pages/Favorite';
import Dashboard from './src/pages/Dashboard';

AppRegistry.registerComponent(appName, () => App);
