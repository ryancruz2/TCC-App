import * as Location from 'expo-location';
import React, {useEffect, useState } from 'react';
import { Button, Text } from 'react-native';

function Settings(){
    const [location, setLocation] = useState<Location.LocationObject["coords"] | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [region, setRegion] = useState<Location.LocationGeocodedAddress | null>(null);
    
    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
    
        try {
          let locationData = await Location.getCurrentPositionAsync({});
          setLocation(locationData.coords);
          valuesLocation(errorMsg, locationData.coords);
        } catch (error) {
          setErrorMsg('Error getting location');
        }
      };

      const valuesLocation = async (
        errorMsg?: string | null,
        coords?: Location.LocationObject['coords']
      ) => {
        if (errorMsg) {
          return errorMsg;
        } else {
          try {
            const reverseGeocodeResult = await Location.reverseGeocodeAsync({
              latitude: coords?.latitude || 0,
              longitude: coords?.longitude || 0,
            });
    
            if (reverseGeocodeResult.length > 0) {
              const name = reverseGeocodeResult[0];
              setRegion(name);
            } else {
              console.log('Região não encontrada.');
              setRegion(null);
            }
          } catch (error) {
            console.log('Erro ao obter nome da região:', error);
            setRegion(null);
          }
        }
      };

    return <>
        <Button
        title="pegar localização"
        onPress={getLocation}
      />
        <Text>{ JSON.stringify(region) }</Text>
    </>;
}

export default Settings;

//#098277