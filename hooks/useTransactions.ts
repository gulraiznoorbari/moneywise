import { useCallback, useState } from "react";
import { API_URL } from "@/constants/API";
import Toast from "react-native-toast-message";

export const useTransactions = (userId: string | undefined) => {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expenses: 0
    });

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [userId]);

    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
            const data = await response.json();
            setSummary(data);
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }, [userId]);

    const loadData = useCallback(async () => {
        if (!userId) return;
        setIsLoading(true);
        try {
            // runs both functions in parallel
            await Promise.all([fetchTransactions(), fetchSummary()]);
            setIsLoading(false);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userId]);

    const deleteTransaction = useCallback(async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete transaction");

            loadData();
            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Transaction deleted successfully",
                visibilityTime: 3000,
            });
        } catch (error) {
            console.error("Error deleting transaction:", error);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Failed to delete transaction",
                visibilityTime: 3000,
            });
        }
    }, [loadData]);

    return { isLoading, transactions, summary, loadData, deleteTransaction };
};