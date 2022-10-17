import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import R from '@components/utils/R';
import PickUpLocationCard from '@components/view/screen/Home/PickUp/PickUpLocationCard';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import PickUpMap from '@components/view/screen/Home/PickUp/PickUpMap';
import HomeHeader from '@components/view/screen/Home/HomeHeader';
import LiveLocation from '@components/view/screen/Home/PickUp/LiveLocation';
import CurrentLocation from '@components/utils/CurrentLocation';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';

function PickUpLocation(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const isFocused = useIsFocused();
  let coordinates = LocationCoordinates();

  const {pickUpLat} = coordinates;

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  const onPress = () => {
    navigation.toggleDrawer();
  };

  const fetchLiveLocation = () => {
    CurrentLocation({actionCall: dispatch, flag: 'home'});
  };

  // useFocusEffect(useCallback(() => {}, []));

  useEffect(() => {
    let locationTimer = setInterval(fetchLiveLocationGPS, 30000);
    return () => clearInterval(locationTimer);
  }, [user?.pinLoc]);

  const fetchLiveLocationGPS = () => {
    if (user?.pinLoc) {
      // console.log('USER PIN LOC TRYE');
    } else {
      fetchLiveLocation();
    }
  };

  useEffect(() => {
    if (!user?.pinLoc) {
      fetchLiveLocation();
    }
  }, [isFocused, pickUpLat]);

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={R.styles.mainLayout}>
        <HomeHeader onPress={onPress} iconName={'menu'} />
        <PickUpMap />
        <LiveLocation />
        {user?.locationLoader && (
          <View style={R.styles.loaderView}>
            <ActivityIndicator
              size="large"
              color={R.color.mainColor}
              style={{marginTop: R.unit.scale(280)}}
            />
          </View>
        )}
        <PickUpLocationCard navigation={props.navigation} />
      </View>
    </ScreenBoiler>
  );
}

export default PickUpLocation;
