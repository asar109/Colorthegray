import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from "@react-navigation/native";
import { primaryColor } from '../assets/Colors';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getIconStyle = (screenName) => {
    return route.name === screenName ? styles.activeIcon : styles.inactiveIcon;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('home')}>
        <Icon
          name='home'
          size={24}
          color='#fff'
          style={getIconStyle('home')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('filter')}>
        <Icon
          name='user'
          size={24}
          color='#fff'
          style={getIconStyle('profile')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: primaryColor,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 25,
    elevation: 5,
  },
  activeIcon: {
    fontWeight: 'bold',
  },
  inactiveIcon: {
    fontWeight: 'normal',
  },
};

export default Footer;
