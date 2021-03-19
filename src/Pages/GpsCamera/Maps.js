import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';

const Maps = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    _getCurrentLocation();
  }, []);

  const _getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      const {latitude, longitude} = info.coords;
      setLat(latitude);
      setLng(longitude);
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{latitude: lat, longitude: lng}}
          title={'My Location'}
        />
      </MapView>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
