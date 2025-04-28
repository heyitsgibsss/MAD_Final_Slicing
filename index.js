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

AppRegistry.registerComponent(appName, () => recipeDetails);
