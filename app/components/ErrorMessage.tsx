import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/Colors';
import { styles } from '@/assets/styles/auth.styles';

type ErrorMessageProps = {
    message: string;
    onClear: () => void;
};

const ErrorMessage = ({ message, onClear }: ErrorMessageProps) => {
    return (
        <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{message}</Text>
            <TouchableOpacity onPress={onClear}>
                <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
        </View>
    );
};

export default ErrorMessage;