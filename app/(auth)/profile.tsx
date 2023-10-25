import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';

const Profile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const onSaveUser = async () => {
    try {
      const result = await user.update({
        firstName: 'John',
        lastName: 'Doe',
      });
      console.log('🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:', result);
    } catch (e) {
      console.log('🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e', JSON.stringify(e));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Account Settings Change.
      </Text>

      <Text style={styles.boldText}>First Name:</Text>
      <TextInput placeholder="Enter first name" value={firstName} onChangeText={setFirstName} style={[styles.inputField, styles.boldText]} />

      <Text style={styles.boldText}>Last Name:</Text>
      <TextInput placeholder="Enter last name" value={lastName} onChangeText={setLastName} style={[styles.inputField, styles.boldText]} />

      <Button onPress={onSaveUser} title="Update Account Details" color={'#ff0000'}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
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
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Profile;
