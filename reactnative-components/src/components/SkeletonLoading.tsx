import React from "react";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const SkeletonLoading = () => {
  // Create refs for each line's animation
  const lineAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    // Create sequential animations for each line
    const createLineAnimation = (anim: Animated.Value | Animated.ValueXY, delay: number) =>
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 800,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0.4,
          duration: 600,
          useNativeDriver: true,
        }),
      ]);

    // Combine all line animations into a staggered sequence
    const loadingAnimation = Animated.loop(
      Animated.stagger(
        200,
        lineAnims.map((anim, index) => createLineAnimation(anim, index * 100))
      )
    );

    loadingAnimation.start();

    return () => {
      lineAnims.forEach(anim => anim.stopAnimation());
    };
  }, []);

  // Generate style for each line with width and opacity animations
  const getLineStyle = (index: number) => ({
    opacity: lineAnims[index].interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.4, 1, 0.4],
    }),
    transform: [{
      scaleX: lineAnims[index].interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, 1],
      }),
    }],
  });

  return (
    <View style={styles.container}>
      {lineAnims.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.line,
            getLineStyle(index),
            // Vary line widths to make it look more natural
            { width: `${85 + (index % 2) * 10}%` },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  line: {
    height: 12,
    backgroundColor: "#7639DE",
    borderRadius: 6,
    opacity: 0.4,
  },
});

export default SkeletonLoading