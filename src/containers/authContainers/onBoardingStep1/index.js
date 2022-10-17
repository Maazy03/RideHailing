import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NextArrow, OnBoardStep1} from '@components/utils/Svg';
import R from '@components/utils/R';
import {useDispatch, useSelector} from 'react-redux';
import {onBoardPresent} from '@store/common/commonSlice';
import Text from '@components/common/Text';
import {firstTimePop} from '@store/auth/authSlice';

const originalWidth = 428;
const originalHeight = 407;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get('window').width;

function OnBoardingStep1(props) {
  const dispatch = useDispatch();
  const common = useSelector(state => state.common);
  const {navigation} = props;

  const onNext = () => {
    navigation.navigate('OnBoardStep2');
    dispatch(firstTimePop(true));
  };

  const onSkip = () => {
    navigation.navigate('Login');
    dispatch(firstTimePop(true));
  };

  useEffect(() => {
    dispatch(onBoardPresent('1'));
  }, []);

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

        <TouchableOpacity
          onPress={onNext}
          activeOpacity={0.7}
          style={{
            width: '20%',
          }}>
          <NextArrow />
        </TouchableOpacity>

        <TouchableOpacity onPress={onSkip} style={{width: '20%'}}>
          <Text
            variant={'body1'}
            font={'bold'}
            gutterTop={30}
            gutterBottom={20}
            color={R.color.mainColor}
            align={'left'}
            style={{
              paddingVertical: R.unit.scale(10),
              width: '100%',
            }}
            transform={'none'}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pictureView}>
        <OnBoardStep1
          width="100%"
          height="100%"
          viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        />
      </View>
    </View>
  );
}
export default OnBoardingStep1;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.black,
    paddingHorizontal: 0,
  },
  textView: {
    width: '100%',
    height: R.unit.height(0.5),
    paddingHorizontal: R.unit.scale(16),
  },
  pictureView: {
    height: R.unit.height(0.5),
    width: '100%',
    justifyContent: 'flex-end',
    aspectRatio,
    width: windowWidth,
  },
  imageStyles: {
    width: '100%',
  },
});
