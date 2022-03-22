import { PropsWithChildren, ReactElement } from 'react';
declare type TabsProps = PropsWithChildren<{
    title: string;
}>;
export declare const Tabs: ({ children, title }: TabsProps) => ReactElement;
declare type TabProps = PropsWithChildren<{
    label: string;
    status?: string;
}>;
export declare const Tab: ({ children }: TabProps) => ReactElement;
export {};
//# sourceMappingURL=Tabs.d.ts.map