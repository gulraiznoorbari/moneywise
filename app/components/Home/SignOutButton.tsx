import { Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useClerk } from '@clerk/clerk-expo';

import { styles } from '@/assets/styles/home.styles';
import { COLORS } from '@/constants/Colors';

const SignOutButton = () => {
    const { signOut } = useClerk();

    const handleSignOut = () => {
        Alert.alert("Sign out", "Are you sure you want to sign out?", [
            { text: "Cancel", style: "cancel" },
            { text: "Sign out", style: "destructive", onPress: () => signOut() }
        ]);
    };

    return (
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
        </TouchableOpacity>
    );
};

export default SignOutButton;