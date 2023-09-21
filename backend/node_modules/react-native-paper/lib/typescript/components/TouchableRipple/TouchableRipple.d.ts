import * as React from 'react';
import { ColorValue, GestureResponderEvent, Pressable, StyleProp, ViewStyle } from 'react-native';
import type { ThemeProp } from '../../types';
export declare type Props = React.ComponentPropsWithRef<typeof Pressable> & {
    /**
     * Whether to render the ripple outside the view bounds.
     */
    borderless?: boolean;
    /**
     * Type of background drawabale to display the feedback (Android).
     * https://reactnative.dev/docs/pressable#rippleconfig
     */
    background?: Object;
    /**
     * Whether to start the ripple at the center (Web).
     */
    centered?: boolean;
    /**
     * Whether to prevent interaction with the touchable.
     */
    disabled?: boolean;
    /**
     * Function to execute on press. If not set, will cause the touchable to be disabled.
     */
    onPress?: (e: GestureResponderEvent) => void;
    /**
     * Function to execute on long press.
     */
    onLongPress?: (e: GestureResponderEvent) => void;
    /**
     * Function to execute immediately when a touch is engaged, before `onPressOut` and `onPress`.
     */
    onPressIn?: (e: GestureResponderEvent) => void;
    /**
     * Function to execute when a touch is released.
     */
    onPressOut?: (e: GestureResponderEvent) => void;
    /**
     * Color of the ripple effect (Android >= 5.0 and Web).
     */
    rippleColor?: ColorValue;
    /**
     * Color of the underlay for the highlight effect (Android < 5.0 and iOS).
     */
    underlayColor?: string;
    /**
     * Content of the `TouchableRipple`.
     */
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    /**
     * @optional
     */
    theme?: ThemeProp;
};
/**
 * A wrapper for views that should respond to touches.
 * Provides a material "ink ripple" interaction effect for supported platforms (>= Android Lollipop).
 * On unsupported platforms, it falls back to a highlight effect.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Text, TouchableRipple } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <TouchableRipple
 *     onPress={() => console.log('Pressed')}
 *     rippleColor="rgba(0, 0, 0, .32)"
 *   >
 *     <Text>Press anywhere</Text>
 *   </TouchableRipple>
 * );
 *
 * export default MyComponent;
 * ```
 *
 * @extends Pressable props https://reactnative.dev/docs/Pressable#props
 */
declare const TouchableRipple: {
    ({ style, background: _background, borderless, disabled: disabledProp, rippleColor, underlayColor: _underlayColor, children, theme: themeOverrides, ...rest }: Props): React.JSX.Element;
    /**
     * Whether ripple effect is supported.
     */
    supported: boolean;
};
export default TouchableRipple;
//# sourceMappingURL=TouchableRipple.d.ts.map