import { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/Colors';

type SafeViewProps = {
    children: ReactNode;
};

const SafeView = ({ children }: SafeViewProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: COLORS.background }}>
            {children}
        </View>
    );
};

export default SafeView;