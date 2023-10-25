import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Linking } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={'#ffebcd'} />
    </Pressable>
  );
};

const ShopHeader = () => {
  const openBrowser = () => {
    Linking.openURL('https://cheatswala.com');
  };

  return (
    <Pressable onPress={openBrowser} style={{ marginRight: 10 }}>
      <Ionicons name="link" size={24} color={'#ffebcd'} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#ffebcd',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarLabel: 'Home',
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'My Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          tabBarLabel: 'My Profile',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="shop"
        options={{
          headerTitle: 'LOGIN DISABLED 🔒 CLICK LINK =>',
          headerRight: () => <ShopHeader />,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />, // Cart icon
          tabBarLabel: 'Shop',
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
