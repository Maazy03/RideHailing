import React, {useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Text from '@components/common/Text';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import R from '@components/utils/R';
import HistoryCard from '@components/view/cards/HistoryCard';

const width = Dimensions.get('window').width;

function History(props) {
  const {navigation} = props;
  const headerProps = {
    isSubHeader: true,
    mainHeading: 'History',
  };
  const [tab, setTab] = useState(0);
  const tabContent = [
    {id: 0, name: 'Completed'},
    {id: 1, name: 'Cancelled'},
    {id: 2, name: 'Upcoming'},
  ];

  const selectTab = index => {
    setTab(index);
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 50 : 100,
          alignItems: 'center',
        }}>
        <View style={[R.styles.rowView, styles.tabLayout]}>
          {tabContent?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => selectTab(item?.id)}
                style={[
                  styles.tab,
                  {
                    backgroundColor:
                      item?.id === tab ? R.color.mainColor : R.color.black,
                  },
                  {
                    borderColor:
                      item?.id === tab ? R.color.mainColor : R.color.black,
                  },
                ]}>
                <Text
                  variant={'body3'}
                  font={'semiBold'}
                  gutterTop={2}
                  color={item?.id === tab ? R.color.black : R.color.white}
                  align={'left'}
                  transform={'none'}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
      </ScrollView>
    </ScreenBoiler>
  );
}
export default History;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: R.unit.scale(16),
    backgroundColor: R.color.lightSilver,
  },
  tabLayout: {
    width: R.unit.width(1),
    padding: R.unit.scale(5),
    alignItems: 'center',
    marginTop: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(20),
  },
  tab: {
    padding: R.unit.scale(7),
    paddingHorizontal: R.unit.scale(20),
    borderRadius: R.unit.scale(30),
    borderWidth: 1,
    borderColor: R.color.black,
  },
  historyCard: {
    width: R.unit.width(0.85),
    marginTop: R.unit.scale(20),
    borderRadius: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(20),
    paddingVertical: R.unit.scale(10),
    backgroundColor: R.color.white,
    shadowColor: R.color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  header: {
    paddingHorizontal: 0,
    marginBottom: R.unit.scale(10),
  },
  content: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  image: {
    width: R.unit.scale(60),
    height: R.unit.scale(60),
    borderRadius: R.unit.scale(100),
    borderWidth: R.unit.scale(2),
    borderColor: R.color.mainColor,
  },
  iconsColumn: {
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    width: '87%',
  },
});
