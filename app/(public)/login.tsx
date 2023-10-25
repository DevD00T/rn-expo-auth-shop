import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useColorScheme } from 'nativewind';
import { Switch } from 'react-native';

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
      <Spinner visible={loading} />

      <Text style={[styles.boldText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Email:</Text>
      <TextInput autoCapitalize="none" placeholder="support@cheatswala.com" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
      <Text style={[styles.boldText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Password:</Text>
      <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

      <Button onPress={onSignInPress} title="Login" color={colorScheme === 'dark' ? '#ffebcd' : '#000000'} />

      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>Forgot Password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>Create Account</Text>
        </Pressable>
      </Link>

      {/* Dark Mode Switch */}
      <View style={styles.darkModeSwitch}>
        <Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#ffebcd',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  darkModeSwitch: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default Login;
