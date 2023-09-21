import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import AnimatedText from '../../Typography/AnimatedText';
const InputLabel = props => {
  const {
    labeled,
    wiggle,
    error,
    focused,
    opacity,
    labelLayoutWidth,
    labelBackground,
    label,
    labelError,
    onLayoutAnimatedText,
    hasActiveOutline,
    activeColor,
    placeholderStyle,
    baseLabelTranslateX,
    baseLabelTranslateY,
    font,
    fontSize,
    lineHeight,
    fontWeight,
    placeholderOpacity,
    wiggleOffsetX,
    labelScale,
    topPosition,
    paddingLeft,
    paddingRight,
    backgroundColor,
    roundness,
    placeholderColor,
    errorColor,
    labelTranslationXOffset,
    maxFontSizeMultiplier,
    testID
  } = props;
  const paddingOffset = paddingLeft && paddingRight ? {
    paddingLeft,
    paddingRight
  } : {};
  const labelTranslationX = {
    transform: [{
      // Offset label scale since RN doesn't support transform origin
      translateX: labeled.interpolate({
        inputRange: [0, 1],
        outputRange: [baseLabelTranslateX, labelTranslationXOffset || 0]
      })
    }]
  };
  const labelStyle = {
    ...font,
    fontSize,
    lineHeight,
    fontWeight,
    opacity: labeled.interpolate({
      inputRange: [0, 1],
      outputRange: [hasActiveOutline ? 1 : 0, 0]
    }),
    transform: [{
      // Wiggle the label when there's an error
      translateX: wiggle ? error.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, wiggleOffsetX, 0]
      }) : 0
    }, {
      // Move label to top
      translateY: baseLabelTranslateY !== 0 ? labeled.interpolate({
        inputRange: [0, 1],
        outputRange: [baseLabelTranslateY, 0]
      }) : 0
    }, {
      // Make label smaller
      scale: labelScale !== 0 ? labeled.interpolate({
        inputRange: [0, 1],
        outputRange: [labelScale, 1]
      }) : labeled
    }]
  };
  const textColor = labelError && errorColor ? errorColor : placeholderColor;
  return (
    /*#__PURE__*/
    // Position colored placeholder and gray placeholder on top of each other and crossfade them
    // This gives the effect of animating the color, but allows us to use native driver
    React.createElement(Animated.View, {
      pointerEvents: "none",
      style: [StyleSheet.absoluteFill, styles.labelContainer, {
        opacity
      }, labelTranslationX]
    }, labelBackground === null || labelBackground === void 0 ? void 0 : labelBackground({
      labeled,
      labelLayoutWidth,
      labelStyle,
      placeholderStyle,
      baseLabelTranslateX,
      topPosition,
      label,
      backgroundColor,
      roundness,
      maxFontSizeMultiplier: maxFontSizeMultiplier,
      testID
    }), /*#__PURE__*/React.createElement(AnimatedText, {
      variant: "bodySmall",
      onLayout: onLayoutAnimatedText,
      style: [placeholderStyle, {
        top: topPosition
      }, labelStyle, paddingOffset || {}, {
        color: activeColor
      }],
      numberOfLines: 1,
      maxFontSizeMultiplier: maxFontSizeMultiplier,
      testID: `${testID}-label-active`
    }, label), /*#__PURE__*/React.createElement(AnimatedText, {
      variant: focused ? 'bodyLarge' : 'bodySmall',
      style: [placeholderStyle, {
        top: topPosition
      }, labelStyle, paddingOffset, {
        color: textColor,
        opacity: placeholderOpacity
      }],
      numberOfLines: 1,
      maxFontSizeMultiplier: maxFontSizeMultiplier,
      testID: `${testID}-label-inactive`
    }, label))
  );
};
const styles = StyleSheet.create({
  labelContainer: {
    zIndex: 3
  }
});
export default /*#__PURE__*/React.memo(InputLabel);
//# sourceMappingURL=InputLabel.js.map