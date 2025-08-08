import { useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';

import { useTransactions } from '@/hooks/useTransactions';
import { styles } from '@/assets/styles/home.styles';
import PageLoader from '@/app/components/Home/PageLoader';
import SignOutButton from '@/app/components/Home/SignOutButton';
import BalanceCard from '@/app/components/Home/BalanceCard';
import TransactionItem from '@/app/components/Home/TransactionItem';
import NoTransactionsFound from '@/app/components/Home/NoTransactionsFound';

export default function Home() {
    const router = useRouter();
    const { user } = useUser();
    const [refreshing, setRefreshing] = useState(false);
    const { isLoading, transactions, summary, loadData, deleteTransaction } = useTransactions(user?.id);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const handleDelete = (id: string) => {
        Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteTransaction(id) },
        ]);
    };

    if (isLoading && !refreshing) {
        return <PageLoader />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image
                            source={require("@/assets/images/logo.png")}
                            style={styles.headerLogo}
                            contentFit='contain'
                        />
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Welcome, </Text>
                            <Text style={styles.usernameText}>{user?.username}</Text>
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
                            <Ionicons name="add" size={20} color="#FFF" />
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                        <SignOutButton />
                    </View>
                </View>
                <BalanceCard summary={summary} />
                <View style={styles.transactionsHeaderContainer}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                </View>
            </View>
            <FlatList
                style={styles.transactionsList}
                contentContainerStyle={styles.transactionsListContent}
                data={transactions}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<NoTransactionsFound />}
                renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
        </View>
    );
}