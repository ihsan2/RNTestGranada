import React, {useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import User from './User';
import Post from './Post';
import Tag from './Tag';

const Home = ({navigation}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'post', title: 'Post'},
    {key: 'user', title: 'User'},
    {key: 'tag', title: 'Tag'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'post':
        return <Post navigation={navigation} />;
      case 'user':
        return <User navigation={navigation} />;
      case 'tag':
        return <Tag navigation={navigation} />;
    }
  };

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorContainerStyle={styles.tabBar}
        indicatorStyle={styles.tabBarIndicator}
        renderLabel={({route, focused, color}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.tabBarLabel,
                focused ? styles.tabBarLabelActive : {},
              ]}>
              {route.title}
            </Text>
          </View>
        )}
        style={styles.tabBar}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 0.5,
  },
  tabBarIndicator: {
    backgroundColor: '#F1582C',
  },
  tabBarLabel: {
    color: '#CACACA',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabBarLabelActive: {
    color: '#F1582C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;
