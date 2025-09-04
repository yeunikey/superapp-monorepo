import './global.css';
import "./src/shared/ui/nativewind-interop";

import AuthPage from '~/app/auth/page';
import AuthorsTab from '~/app/tabs/authors/tab';
import LoaderPage from '~/app/loader/page';
import MainPage from '~/app/page';
import MapService from '~/app/services/map/service';
import { NavigationContainer } from '@react-navigation/native';
import NotificationsTab from '~/app/tabs/notifications/tab';
import PolicyTab from '~/app/tabs/policy/tab';
import ProfilePage from '~/app/profile/page';
import { RootStackParamList } from '~/shared/types/root';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SettingsTab from '~/app/tabs/settings/tab';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewTab from '~/app/tabs/new/tab';
import ComplaintsService from '~/app/services/complaints/service';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loader" screenOptions={{ headerShown: false }}>

          <Stack.Screen
            name="Loader"
            component={LoaderPage}
            options={() => ({
              gestureEnabled: false,
            })}
          />

          <Stack.Screen
            name="Auth"
            component={AuthPage}
            options={({ route }) => ({
              gestureEnabled: false,
              animation: 'slide_from_right'
            })}
          />

          <Stack.Screen
            name="Main"
            component={MainPage}
            options={({ route }) => ({
              gestureEnabled: false,
              animation: route.params.animation
            })}
          />

          <Stack.Screen
            name="Profile"
            component={ProfilePage}
            options={({ route }) => ({
              gestureEnabled: false,
              animation: route.params.animation
            })}
          />

          {/* Tabs */}

          <Stack.Screen
            name="NotificationsTab"
            component={NotificationsTab}
            options={({ route }) => ({
              gestureEnabled: false,
              animation: route.params.animation
            })}
          />

          <Stack.Screen
            name="NewTab"
            component={NewTab}
            options={({ route }) => ({
              animation: route.params.animation
            })}
          />

          <Stack.Screen
            name="AuthorsTab"
            component={AuthorsTab}
            options={({ route }) => ({
              animation: route.params.animation
            })}
          />

          <Stack.Screen
            name="PolicyTab"
            component={PolicyTab}
            options={({ route }) => ({
              animation: route.params.animation
            })}
          />

          <Stack.Screen
            name="SettingsTab"
            component={SettingsTab}
            options={({ route }) => ({
              animation: route.params.animation
            })}
          />

          {/* Service */}

          <Stack.Screen
            name="MapService"
            component={MapService}
            options={({ route }) => ({
              animation: route.params.animation
            })}
          />

          <Stack.Screen
            name="ComplaintsService"
            component={ComplaintsService}
            options={({ route }) => ({
              animation: route.params.animation
            })}
          />

        </Stack.Navigator>

      </NavigationContainer>

      <StatusBar barStyle={'dark-content'}></StatusBar>

    </SafeAreaProvider>
  );
}
