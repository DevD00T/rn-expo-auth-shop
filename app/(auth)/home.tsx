import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

const Home = () => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.profilePictureUrl }}
        style={styles.avatar}
      />
      <Text style={styles.welcomeText}>
        Welcome to Litecheats- {user?.emailAddresses[0].emailAddress} 🎉
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default Home;
