import { Button, TextInput, View, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Switch } from 'react-native';

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <TextInput autoCapitalize="none" placeholder="support@cheatswala.com" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
          <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

          <Button onPress={onSignUpPress} title="Sign Up" color={colorScheme === 'dark' ? '#ffebcd' : '#000000'} />
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput value={code} placeholder="Code..." style={styles.inputField} onChangeText={setCode} />
          </View>
          <Button onPress={onPressVerify} title="Verify Email" color={colorScheme === 'dark' ? '#ffebcd' : '#000000'} />
        </>
      )}

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
  darkModeSwitch: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default Register;
