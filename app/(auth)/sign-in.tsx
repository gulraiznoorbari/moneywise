import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image } from 'expo-image';
import { useRouter, Link } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

import { COLORS } from '@/constants/Colors';
import { styles } from "@/assets/styles/auth.styles";
import ErrorMessage from '@/app/components/ErrorMessage';

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSignInPress = async () => {
        if (!isLoaded) return;
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/');
            }
        } catch (error: any) {
            if (error.errors?.[0]?.code === "form_password_incorrect") {
                setError("Password is incorrect. Please try again.");
            } else if (error.errors?.[0]?.code === "form_identifier_not_found") {
                setError("Email address not found. Please try again.");
            } else if (error.errors?.[0]?.code === "form_param_format_invalid") {
                setError("Invalid email address format. Please try again.");
            } else {
                setError(error.errors?.[0]?.shortMessage || "An error occurred. Please try again.");
            }
        }
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraScrollHeight={30}
        >
            <View style={styles.container}>
                <Image source={require("@/assets/images/revenue-i4.png")} style={styles.illustration} />
                <Text style={styles.title}>Welcome Back</Text>

                {error ? <ErrorMessage message={error} onClear={() => setError('')} /> : null}

                <TextInput
                    style={[styles.input, error && styles.errorInput]}
                    selectionColor={COLORS.primary}
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    placeholderTextColor="#9A8478"
                    onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                />

                <TextInput
                    style={[styles.input, error && styles.errorInput]}
                    selectionColor={COLORS.primary}
                    value={password}
                    placeholder="Enter password"
                    placeholderTextColor="#9A8478"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />

                <TouchableOpacity style={styles.button} onPress={onSignInPress}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Don&apos;t have an account?</Text>
                    <Link href={"./sign-up"} asChild>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Sign up</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}