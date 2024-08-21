import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Modal, Easing } from 'react-native';

const LoadingOverlay = ({
  visible,
  message = 'Loading...',
}: {
  visible: boolean;
  message: string;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const ball1Anim = useRef(new Animated.Value(0)).current;
  const ball2Anim = useRef(new Animated.Value(0)).current;
  const ball3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const createBounceAnimation = (anim: any) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: -30,
              duration: 500,
              easing: Easing.bounce,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 500,
              easing: Easing.bounce,
              useNativeDriver: true,
            }),
          ])
        );
      };

      createBounceAnimation(ball1Anim).start();
      setTimeout(() => createBounceAnimation(ball2Anim).start(), 200);
      setTimeout(() => createBounceAnimation(ball3Anim).start(), 400);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim, ball1Anim, ball2Anim, ball3Anim]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <View style={styles.ballRow}>
            <Animated.View
              style={[styles.ball, { transform: [{ translateY: ball1Anim }] }]}
            />
            <Animated.View
              style={[styles.ball, { transform: [{ translateY: ball2Anim }] }]}
            />
            <Animated.View
              style={[styles.ball, { transform: [{ translateY: ball3Anim }] }]}
            />
          </View>
          <Text style={styles.text}>{message}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  ballRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    marginBottom: 20,
  },
  ball: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8beffc',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default LoadingOverlay;
