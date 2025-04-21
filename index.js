/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';

AppRegistry.registerComponent(appName, () => SignUp);)
