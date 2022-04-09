import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NewPostScreen from './NewPostScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import GalleryCameraContainer from '../components/media/GalleryCameraContainer';
import UpdateProfile from './UpdateProfile';
import BottomTabs from '../shared/BottomTabs';
const Stack = createStackNavigator();
import { Provider } from 'react-redux';
import Store from '../redux/store';

const screenOptions = {
  headerShown: false,
};

export const SignedInStack = ({ currentUser, setCurrentUser }) => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={screenOptions}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="NewPostScreen" component={NewPostScreen} />

          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen
            name="GalleryCameraContainer"
            component={GalleryCameraContainer}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export const SignedOutStack = () => (
  <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);
