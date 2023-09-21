import * as React from 'react';
import { ImageSourcePropType } from 'react-native';
import type { ThemeProp } from '../types';
declare type IconSourceBase = string | ImageSourcePropType;
export declare type IconSource = IconSourceBase | Readonly<{
    source: IconSourceBase;
    direction: 'rtl' | 'ltr' | 'auto';
}> | ((props: IconProps & {
    color: string;
}) => React.ReactNode);
declare type IconProps = {
    size: number;
    allowFontScaling?: boolean;
};
declare type Props = IconProps & {
    color?: string;
    source: any;
    /**
     * @optional
     */
    theme?: ThemeProp;
};
export declare const isValidIcon: (source: any) => boolean;
export declare const isEqualIcon: (a: any, b: any) => boolean;
declare const Icon: ({ source, color, size, theme: themeOverrides, ...rest }: Props) => any;
export default Icon;
//# sourceMappingURL=Icon.d.ts.map