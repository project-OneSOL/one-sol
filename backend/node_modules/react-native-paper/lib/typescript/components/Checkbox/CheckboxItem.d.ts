import * as React from 'react';
import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ThemeProp, MD3TypescaleKey } from '../../types';
export declare type Props = {
    /**
     * Status of checkbox.
     */
    status: 'checked' | 'unchecked' | 'indeterminate';
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Label to be displayed on the item.
     */
    label: string;
    /**
     * Function to execute on press.
     */
    onPress?: (e: GestureResponderEvent) => void;
    /**
     * Accessibility label for the touchable. This is read by the screen reader when the user taps the touchable.
     */
    accessibilityLabel?: string;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string;
    /**
     * Custom color for checkbox.
     */
    color?: string;
    /**
     * Additional styles for container View.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Specifies the largest possible scale a title font can reach.
     */
    labelMaxFontSizeMultiplier?: number;
    /**
     * Style that is passed to Label element.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * @supported Available in v5.x with theme version 3
     *
     * Label text variant defines appropriate text styles for type role and its size.
     * Available variants:
     *
     *  Display: `displayLarge`, `displayMedium`, `displaySmall`
     *
     *  Headline: `headlineLarge`, `headlineMedium`, `headlineSmall`
     *
     *  Title: `titleLarge`, `titleMedium`, `titleSmall`
     *
     *  Label:  `labelLarge`, `labelMedium`, `labelSmall`
     *
     *  Body: `bodyLarge`, `bodyMedium`, `bodySmall`
     */
    labelVariant?: keyof typeof MD3TypescaleKey;
    /**
     * @optional
     */
    theme?: ThemeProp;
    /**
     * testID to be used on tests.
     */
    testID?: string;
    /**
     * Checkbox control position.
     */
    position?: 'leading' | 'trailing';
    /**
     * Whether `<Checkbox.Android />` or `<Checkbox.IOS />` should be used.
     * Left undefined `<Checkbox />` will be used.
     */
    mode?: 'android' | 'ios';
};
/**
 * Checkbox.Item allows you to press the whole row (item) instead of only the Checkbox.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Checkbox } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View>
 *     <Checkbox.Item label="Item" status="checked" />
 *   </View>
 * );
 *
 * export default MyComponent;
 *```
 */
declare const CheckboxItem: {
    ({ style, status, label, onPress, labelStyle, theme: themeOverrides, testID, mode, position, accessibilityLabel, disabled, labelVariant, labelMaxFontSizeMultiplier, ...props }: Props): React.JSX.Element;
    displayName: string;
};
export default CheckboxItem;
export { CheckboxItem };
//# sourceMappingURL=CheckboxItem.d.ts.map