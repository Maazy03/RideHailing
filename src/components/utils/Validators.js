import Icon from '@components/common/Icon';
import Text from '@components/common/Text';
import {
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';
import R from './R';

const emailREX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,256}))$/;

export default {
  emailREX,
};

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cobber App Location Permission',
        message:
          'Cobber App needs access to your Location ' +
          'for better experience.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    // console.warn(err);
  }
};

export const requestLocationPermissionIOS = async () => {
  try {
    const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, {
      title: 'Cobber App Location Permission',
      message: 'Cobber would like access to your location ',
    });

    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    // console.warn(err);
  }
};

export const statusLocationPermission = async () => {
  if (Platform.OS == 'android') {
    const permissionAndroid = await PermissionsAndroid.check(
      'android.permission.ACCESS_FINE_LOCATION',
    );
    if (permissionAndroid) {
      return true;
    } else {
      return false;
    }
  } else {
    const perm = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (perm === 'granted') {
      return true;
    } else {
      return false;
    }
  }
};

export const toastConfig = {
  customToast: props => {
    const hideToast = () => {
      props.onPress();
    };
    return (
      <View
        style={{
          ...R.styles.popUpContainer,
          backgroundColor: props.props.bgColor,
        }}>
        <View
          style={{
            ...R.styles.twoItemsRow,
            flex: 1,
          }}>
          <View>{props.props.leftIcon}</View>
          <Text
            variant={'body2'}
            font={'bold'}
            color={props.props.textColor}
            align={'left'}
            numberOfLines={3}
            style={{marginLeft: R.unit.scale(8), width: '80%'}}
            transform={'none'}>
            {props.text1}
          </Text>
        </View>

        <TouchableOpacity
          onPress={hideToast}
          style={{padding: R.unit.scale(5)}}>
          {props.props.rightIcon ? (
            props.props.rightIcon
          ) : (
            <Icon
              type={'Ionicons'}
              name={'close'}
              color={R.color.mainColor}
              size={20}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  },
};
