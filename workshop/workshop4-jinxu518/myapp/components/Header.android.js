import React from 'react';
import { Text, View, Image } from 'react-native';

import HeaderStyle from '../styles/HeaderStyle';
import CourseImage from '../images/course.png';


const Header = () => {
  return (
    <View>
      <Image source={CourseImage} style={HeaderStyle.android} />
      <Text>Course Title</Text>
    </View>
  );
};

export default Header;

