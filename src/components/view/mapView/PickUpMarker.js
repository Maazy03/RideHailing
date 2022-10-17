import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import {Marker} from 'react-native-maps';
import {stringTrim} from '@components/utils/ReuseableFunctions';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';

function PickUpMarker(props) {
  const {pickUpLat, pickUpLong, addressRawPickup, initialLat, initialLong} =
    props;
  const pickUpAddr = stringTrim(addressRawPickup, 1);

  return (
    <Marker
      coordinate={{
        latitude: pickUpLat ? pickUpLat : initialLat,
        longitude: pickUpLong ? pickUpLong : initialLong,
      }}
      tracksViewChanges={false}
      title={'User'}>
      <View style={R.styles.columnView}>
        <Text
          variant={'body6'}
          font={'bold'}
          color={R.color.charcoalShade}
          style={{
            backgroundColor: R.color.mainColor,
            padding: R.unit.scale(6),
            borderRadius: R.unit.scale(2),
          }}
          align={'center'}
          transform={'none'}>
          {pickUpAddr ? pickUpAddr : 'PickUp'}
        </Text>
        <Icon
          name={'user'}
          type={'FontAwesome'}
          size={25}
          color={R.color.black}
        />
      </View>
    </Marker>
  );
}
export default PickUpMarker;

const styles = StyleSheet.create({
  mapView: {
    height: R.unit.height(1),
    width: R.unit.width(1),
    top: 0,
  },
});
