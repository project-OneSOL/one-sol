import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const CustomProgressBar = ({ progress }) => {
  const animatedProgress = new Animated.Value(0);

  useEffect(() => {
    // ProgressBar가 로딩될 때 애니메이션 시작
    animateProgressBar();
  }, []);

  const animateProgressBar = () => {
    Animated.timing(animatedProgress, {
      toValue: progress, // 원하는 진행 상태 (0.0에서 1.0 사이)
      duration: 1000, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: false, // 네이티브 드라이버 사용 여부
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: animatedProgress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
