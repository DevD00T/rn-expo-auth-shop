import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { useColorScheme } from 'nativewind';
import { Switch } from 'react-native';

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Request a password reset code by email
  const onRequestReset = async () => {
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password Reset Successfully');

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {/* Dark Mode Switch */}
      <View style={styles.darkModeSwitch}>
        <Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />
      </View>

      {!successfulCreation && (
        <>
          <TextInput autoCapitalize="none" placeholder="support@cheatswala.com" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />

          <Button onPress={onRequestReset} title="Send Reset Email" color={colorScheme === 'dark' ? '#ffebcd' : '#000000'} />
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <Text style={styles.boldText}>Code:</Text>
            <TextInput value={code} placeholder="Enter code..." style={styles.inputField} onChangeText={setCode} />
            <Text style={styles.boldText}>New Password:</Text>
            <TextInput placeholder="Enter new password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />
          </View>
          <Button onPress={onReset} title="Set New Password" color={colorScheme === 'dark' ? '#ffebcd' : '#000000'} />
        </>
      )}
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
  boldText: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 16,
  },
  darkModeSwitch: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default PwReset;
