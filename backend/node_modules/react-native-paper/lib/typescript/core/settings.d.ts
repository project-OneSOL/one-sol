import * as React from 'react';
import { IconProps } from '../components/MaterialCommunityIcon';
export declare type Settings = {
    icon?: ({ name, color, size, direction }: IconProps) => React.ReactNode;
    rippleEffectEnabled?: boolean;
};
export declare const SettingsContext: React.Context<Settings>;
export declare const Provider: React.Provider<Settings>, Consumer: React.Consumer<Settings>;
//# sourceMappingURL=settings.d.ts.map