import React from 'react';
import type { ColorValue, ViewStyle } from 'react-native';
import { Animated } from 'react-native';
import type { InternalTheme, ThemeProp } from '../../types';
export declare type AppbarModes = 'small' | 'medium' | 'large' | 'center-aligned';
export declare const getAppbarColor: (theme: InternalTheme, elevation: number, customBackground?: ColorValue, elevated?: boolean) => ColorValue;
export declare const getAppbarBorders: (style: Animated.Value | Animated.AnimatedInterpolation<string | number> | Animated.WithAnimatedObject<ViewStyle>) => Record<string, number>;
declare type RenderAppbarContentProps = {
    children: React.ReactNode;
    isDark: boolean;
    shouldCenterContent?: boolean;
    isV3: boolean;
    renderOnly?: (React.ComponentType<any> | false)[];
    renderExcept?: React.ComponentType<any>[];
    mode?: AppbarModes;
    theme?: ThemeProp;
};
export declare const DEFAULT_APPBAR_HEIGHT = 56;
export declare const modeAppbarHeight: {
    small: number;
    medium: number;
    large: number;
    'center-aligned': number;
};
export declare const modeTextVariant: {
    readonly small: "titleLarge";
    readonly medium: "headlineSmall";
    readonly large: "headlineMedium";
    readonly 'center-aligned': "titleLarge";
};
export declare const renderAppbarContent: ({ children, isDark, shouldCenterContent, isV3, renderOnly, renderExcept, mode, theme, }: RenderAppbarContentProps) => (string | number | Iterable<React.ReactNode> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>)[];
export {};
//# sourceMappingURL=utils.d.ts.map