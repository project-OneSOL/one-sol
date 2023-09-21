import * as React from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';
declare type OutlineProps = {
    isV3: boolean;
    activeColor: string;
    backgroundColor: ColorValue;
    hasActiveOutline?: boolean;
    focused?: boolean;
    outlineColor?: string;
    roundness?: number;
    style?: StyleProp<ViewStyle>;
};
export declare const Outline: ({ isV3, activeColor, backgroundColor, hasActiveOutline, focused, outlineColor, roundness, style, }: OutlineProps) => React.JSX.Element;
export {};
//# sourceMappingURL=Outline.d.ts.map