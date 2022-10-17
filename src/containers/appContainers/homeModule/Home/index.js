import React from 'react';
import {View} from 'react-native';
import R from '@components/utils/R';
import DropOffLocationCard from '@components/view/screen/Home/DropOff/DropOffLocationCard';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import DropOffMap from '@components/view/screen/Home/DropOff/DropOffMap';
import HomeHeader from '@components/view/screen/Home/HomeHeader';

function HomeScreen(props) {
  const {navigation} = props;

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={R.styles.mainLayout}>
        <HomeHeader onPress={onPress} iconName={'arrow-back'} />
        <DropOffMap />
        <DropOffLocationCard navigation={props.navigation} />
      </View>
    </ScreenBoiler>
  );
}

export default HomeScreen;
