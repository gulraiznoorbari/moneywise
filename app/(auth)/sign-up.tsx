import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

import { COLORS } from '@/constants/Colors';
import { styles } from "@/assets/styles/auth.styles";
import ErrorMessage from '@/app/components/ErrorMessage';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const onSignUpPress = async () => {
        setError('');
        if (!isLoaded) return;
        try {
            await signUp.create({
                username: username,
                emailAddress: emailAddress,
                password: password,
            });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (error: any) {
            if (error.errors?.[0]?.code === "form_identifier_exists") {
                setError("Email already in use. Please try another.");
            } else if (error.errors?.[0]?.code === "form_username_invalid_length") {
                setError("Username must be at least 3 characters long. Please try again.");
            } else if (error.errors?.[0]?.code === "form_param_format_invalid") {
                setError("Invalid email address format. Please try again.");
            } else if (error.errors?.[0]?.code === "form_password_length_too_short") {
                setError("Password must be at least 8 characters long. Please try again.");
            } else {
                setError(error.errors?.[0]?.shortMessage || "An error occurred. Please try again.");
                console.error(JSON.stringify(error, null, 2));
            }
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return;
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/');
            }
        } catch (error: any) {
            if (error.errors?.[0]?.code === "form_code_incorrect") {
                setError("Invalid verification code. Please try again.");
            } else if (error.errors?.[0]?.code === "verification_already_verified") {
                router.replace('/');
            } else {
                console.error(JSON.stringify(error, null, 2));
                setError("An error occurred. Please try again.");
            }
        }
    };

    if (pendingVerification) {
        return (
            <View style={styles.verificationContainer}>
                <Text style={styles.verificationTitle}>Verify your email</Text>

                {error ? <ErrorMessage message={error} onClear={() => setError('')} /> : null}

                <TextInput
                    style={[styles.verificationInput, error && styles.errorInput]}
                    selectionColor={COLORS.primary}
                    value={code}
                    keyboardType="numeric"
                    maxLength={6}
                    autoFocus={true}
                    placeholder="Enter your verification code"
                    placeholderTextColor="#9A8478"
                    onChangeText={(code) => setCode(code)}
                />
                <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
                    <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraScrollHeight={100}
        >
            <View style={styles.container}>
                <Image source={require("@/assets/images/revenue-i2.png")} style={styles.illustration} />
                <Text style={styles.title}>Sign up</Text>

                {error ? <ErrorMessage message={error} onClear={() => setError('')} /> : null}

                <TextInput
                    style={[styles.input, error && styles.errorInput]}
                    selectionColor={COLORS.primary}
                    autoCapitalize="none"
                    value={username}
                    placeholder="Enter username"
                    placeholderTextColor="#9A8478"
                    onChangeText={(username) => setUsername(username)}
                />
                <TextInput
                    style={[styles.input, error && styles.errorInput]}
                    selectionColor={COLORS.primary}
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    placeholderTextColor="#9A8478"
                    onChangeText={(email) => setEmailAddress(email)}
                />
                <TextInput
                    style={[styles.input, error && styles.errorInput]}
                    selectionColor={COLORS.primary}
                    value={password}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    placeholderTextColor="#9A8478"
                    onChangeText={(password) => setPassword(password)}
                />

                <TouchableOpacity
                    onPress={onSignUpPress}
                    style={styles.button}
                    disabled={!username || !emailAddress || !password}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.linkText}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}