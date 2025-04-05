import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, PermissionsAndroid, Platform} from 'react-native';
import {Camera, useCameraPermission, useCameraDevice} from 'react-native-vision-camera';

function App(): React.JSX.Element {
  // Camera permission hook
  const {hasPermission, requestPermission} = useCameraPermission();

  // Request front camera device
  const device = useCameraDevice('front');

  // Handle permission request button press
  const handleRequestPermission = async () => {
    const result = await requestPermission();
    if (!result) {
      console.warn('Camera permission denied');
    }
  };

  // Show button if permission not granted
  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>We need camera access to continue</Text>
        <Button title="Allow Camera Access" onPress={handleRequestPermission} />
      </View>
    );
  }

  // Show error if device not found (shouldn't happen)
  if (device == null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>No front camera device found</Text>
      </View>
    );
  }

  // Show front camera view once permission is granted
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default App;
