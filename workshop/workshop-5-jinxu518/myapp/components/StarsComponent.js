import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
function TouchableStar({ index, currentIndex, setCurrentRating }) {
  const pressed = () => {
    if (index <= currentIndex) {
      setCurrentRating(index - 1);
    } else {
      setCurrentRating(index)
    }
  }
  return (
    <TouchableHighlight onPress={pressed}>
      <AntDesign name='star' size={30} color={index <= currentIndex ? "orange" : "gray"} />
    </TouchableHighlight>
  )
}
const StarRating = ({ setRating }) => {
  let stars = [...Array(5)];
  const [currentIndex, setCurrentIndex] = useState(-1);
  const setCurrentRating = (rating) => {
    setCurrentIndex(rating);
    setRating(rating + 1);
  }
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      {
        stars.map((_, i) => {
          return <TouchableStar key={i} index={i} currentIndex={currentIndex} setCurrentRating={setCurrentRating} />;
        })
      }
    </View>
  )
};

export default StarRating;
