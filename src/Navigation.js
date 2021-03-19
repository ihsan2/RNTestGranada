import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// pages
import HomePages from './Pages/Home';
import UserDetail from './Pages/UserDetail';
import Comments from './Pages/Comments';
import Postingan from './Pages/Postingan';
import Root from './Pages/Root';
import GpsCamera from './Pages/GpsCamera';
import Maps from './Pages/GpsCamera/Maps';
import Location from './Pages/Location';

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{title: 'Select Menu'}}
        />
        <Stack.Screen
          name="GpsCamera"
          component={GpsCamera}
          options={{title: 'GPS & Camera'}}
        />
        <Stack.Screen name="Maps" component={Maps} options={{title: 'Maps'}} />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{title: 'Location'}}
        />
        <Stack.Screen
          name="Home"
          component={HomePages}
          options={{title: 'DUMMYAPI.IO'}}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={({route}) => ({title: route.params.item.email})}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{title: 'Komentar'}}
        />
        <Stack.Screen
          name="Postingan"
          component={Postingan}
          options={{title: 'Postingan'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
