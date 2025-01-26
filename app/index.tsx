import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

type ActivityImage = {
  source: any; // Image source type (require statement)
  caption: string;
};

const images: ActivityImage[] = [
  { source: require('./images/gardeningjpeg.jpg'), caption: 'Gardening: A relaxing way to connect with nature.' },
  { source: require('./images/musicjpeg.jpg'), caption: 'Music: Engage your creativity with tunes.' },
  { source: require('./images/paintingjpeg.jpg'), caption: 'Painting: Express yourself with colors.' },
  { source: require('./images/tennisjpeg.jpg'), caption: 'Tennis: Boost your energy with a fun match.' },
];

const ActivitySuggestionsScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const translateX = useSharedValue(0);

  const onSwipe = (direction: 'left' | 'right') => {
    translateX.value = withTiming(direction === 'left' ? -500 : 500, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }, () => {
      runOnJS(setCurrentImageIndex)((prevIndex) => (prevIndex + 1) % images.length);
      translateX.value = 0;
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Activity Suggestions</Text>
        </View>

        <View style={styles.swipeContainer}>
          <Animated.Image
            source={images[currentImageIndex].source}
            style={[styles.activityImage, animatedStyle]}
          />
          <Text style={styles.caption}>{images[currentImageIndex].caption}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => onSwipe('left')} style={styles.thumbsButton}>
            <Text style={styles.thumbsText}>👎</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSwipe('right')} style={styles.thumbsButton}>
            <Text style={styles.thumbsText}>👍</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#512663',
    borderRadius: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Fuzzy Bubbles',
    color: '#342758',
  },
  swipeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  activityImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  caption: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555555',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  thumbsButton: {
    backgroundColor: '#342758',
    padding: 15,
    borderRadius: 50,
  },
  thumbsText: {
    fontSize: 30,
    color: '#ffffff',
  },
});

export default ActivitySuggestionsScreen;
