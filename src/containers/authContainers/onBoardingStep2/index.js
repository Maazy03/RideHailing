import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Text from '@components/common/Text';
import {NextArrow, OnBoardStep2} from '@components/utils/Svg';
import R from '@components/utils/R';

function OnBoardingStep2(props) {
  const {navigation} = props;

  const onNext = () => {
    navigation.navigate('Login');
  };

  const onSkip = () => {
    navigation.navigate('Login');
  };

  return (
    <View
      style={{
        ...R.styles.container,
        ...R.styles.columnView,
        ...styles.mainLayout,
      }}>
      <View style={styles.textView}>
        <Text
          variant={'h1'}
          font={'bold'}
          gutterTop={80}
          gutterBottom={50}
          color={R.color.white}
          align={'left'}
          transform={'none'}>
          Book a{' '}
          <Text color={R.color.mainColor} transform={'none'}>
            delivery{' '}
          </Text>
          anytime,{'\n'}anywhere
        </Text>

        <TouchableOpacity onPress={onNext} activeOpacity={0.7}>
          <NextArrow />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: R.unit.scale(10),
            width: '20%',
          }}
          onPress={onSkip}>
          <Text
            variant={'body1'}
            font={'bold'}
            gutterTop={30}
            gutterBottom={20}
            color={R.color.mainColor}
            align={'left'}
            transform={'none'}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pictureView}>
        <View style={styles.bigEllipse}>
          <View style={styles.smallEllipse}>
            <View style={styles.svgView}>
              <OnBoardStep2 />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
export default OnBoardingStep2;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.black,
    paddingHorizontal: 0,
  },
  textView: {
    width: R.unit.width(1),
    height: R.unit.height(0.5),
    paddingHorizontal: R.unit.scale(16),
  },
  pictureView: {
    height: R.unit.height(0.5),
  },
  svgView: {
    height: R.unit.height(0.5),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: R.unit.scale(30),
  },
  imageStyles: {
    width: '100%',
  },
  bigEllipse: {
    backgroundColor: 'rgba(70,70,70,0.3)',
    height: '100%',
    width: R.unit.width(1.5),
    overflow: 'hidden',
    borderTopRightRadius: R.unit.scale(380),
    borderTopLeftRadius: R.unit.scale(330),
  },
  smallEllipse: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(55,55,55,0.5)',
    borderTopRightRadius: R.unit.scale(380),
    borderTopLeftRadius: R.unit.scale(330),
    overflow: 'hidden',
    marginTop: R.unit.scale(20),
  },
});
