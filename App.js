/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import AppNavigator from './src/navigation/index';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/store/index';
import {persistStore} from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {enableLatestRenderer} from 'react-native-maps';
import {Appearance} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {
  LogBox,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  requestLocationPermission,
  requestLocationPermissionIOS,
  statusLocationPermission,
} from '@components/utils/Validators';
import CurrentLocation from '@components/utils/CurrentLocation';
import Toast from 'react-native-toast-message';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import {locationLoader} from '@store/user/userSlice';

// import {fcmSerice} from './src/store/notificationService/fcmService';
// import {localNotificationService} from './src/store/notificationService/localNotificationService';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const theme = Appearance.getColorScheme();

  let persistor = persistStore(store);
  useEffect(() => {
    SplashScreen.hide();
  });

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle(theme == 'Light' ? 'dark-content' : 'light-content');
    StatusBar.setBackgroundColor(theme == 'Light' ? '#fff' : '#000');
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestLocationIOS();
    } else {
      requestLocation();
    }
  }, []);

  const requestLocation = async () => {
    let granted = await requestLocationPermission();
  };

  const requestLocationIOS = async () => {
    let granted = await requestLocationPermissionIOS();
  };

  enableLatestRenderer();

  const toastConfig = {
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

  const AppWrapper = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [isAccess, setIsAccess] = useState(false);

    const getLiveLocation = async () => {
      try {
        let granted = await statusLocationPermission();
        if (granted) {
          dispatch(locationLoader(true));
          setIsAccess(true);
          if (!auth?.isAuth) {
            CurrentLocation({actionCall: dispatch});
          }
        }
      } catch (error) {}
    };

    useEffect(() => {
      getLiveLocation();
    }, [isAccess]);

    return (
      <>
        <AppNavigator />
        {auth?.firstTimePop ? <Toast config={toastConfig} /> : null}
      </>
    );
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={{flex: 1}}>
            <StatusBar />
            <AppWrapper />
          </SafeAreaView>
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
