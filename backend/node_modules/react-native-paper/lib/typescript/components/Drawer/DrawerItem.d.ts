import * as React from 'react';
import { ColorValue, GestureResponderEvent, StyleProp, View, ViewStyle } from 'react-native';
import type { ThemeProp } from '../../types';
import { IconSource } from '../Icon';
export declare type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     * The label text of the item.
     */
    label: string;
    /**
     * Icon to display for the `DrawerItem`.
     */
    icon?: IconSource;
    /**
     * Whether to highlight the drawer item as active.
     */
    active?: boolean;
    /**
     * Function to execute on press.
     */
    onPress?: (e: GestureResponderEvent) => void;
    /**
     * Accessibility label for the button. This is read by the screen reader when the user taps the button.
     */
    accessibilityLabel?: string;
    /**
     * Callback which returns a React element to display on the right side. For instance a Badge.
     */
    right?: (props: {
        color: string;
    }) => React.ReactNode;
    /**
     * Color of the ripple effect.
     */
    rippleColor?: ColorValue;
    style?: StyleProp<ViewStyle>;
    /**
     * @optional
     */
    theme?: ThemeProp;
};
/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *    <Drawer.Item
 *      style={{ backgroundColor: '#64ffda' }}
 *      icon="star"
 *      label="First Item"
 *    />
 * );
 *
 * export default MyComponent;
 * ```
 */
declare const DrawerItem: {
    ({ icon, label, active, theme: themeOverrides, rippleColor: customRippleColor, style, onPress, accessibilityLabel, right, ...rest }: Props): React.JSX.Element;
    displayName: string;
};
export default DrawerItem;
//# sourceMappingURL=DrawerItem.d.ts.map