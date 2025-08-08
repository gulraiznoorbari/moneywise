# MoneyWise - Personal Finance Manager 💰

MoneyWise is a personal finance management app built with React Native and Expo. The app helps users track their income, expenses, and overall financial health with intuitive transaction management.

## 🚀 Features

- **Smart Transaction Management**: Add, edit, and delete financial transactions with ease
- **Category-Based Tracking**: Organize expenses by categories (Food, Shopping, Transportation, Entertainment, Bills, Income, Other)
- **Real-time Financial Insights**: View current balance, total income, and expenses with instant updates
- **User Authentication**: Secure sign-in and sign-up using Clerk authentication
- **Cross-Platform**: Available for iOS, Android, and Web
- **Responsive Design**: Optimized interface for all screen sizes
- **Pull-to-Refresh**: Refresh transaction data with a simple swipe
- **Smart Notifications**: Real-time feedback for user actions

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MoneyWise
```

### 2. Install Dependencies

**Frontend Dependencies:**
```bash
cd frontend
npm install
```

**Backend Dependencies:**
```bash
cd ../backend
npm install
```

### 3. Environment Setup

**Frontend (.env):**
```env
EXPO_PUBLIC_API_URL=your_backend_url_here
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

**Backend (.env):**
```env
PORT=3000
POSTGRESQL_URL=your_neon_database_url_here
UPSTASH_REDIS_REST_URL=your_upstash_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token_here
NODE_ENV=development
```

**Required Services:**
- **Neon PostgreSQL**: Get from [Neon](https://neon.tech/)
- **Upstash Redis**: Get from [Upstash](https://upstash.com/)
- **Clerk Authentication**: Get from [Clerk](https://clerk.com/)

### 4. Database Setup

Create the transactions table in your Neon PostgreSQL database:

```sql
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Start Development Servers

**Start Backend Server:**
```bash
cd backend
npm run dev
```

**Start Frontend App:**
```bash
cd frontend
npm start
# or
npx expo start
```

This will open the Expo development server. You can then:
- Press `a` to open in Android emulator
- Press `i` to open in iOS simulator
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your device

## 🏗️ Building for Production

### Development Build

For testing with development features:

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Build development version
eas build --profile development --platform android
eas build --profile development --platform ios
```

### Preview Build

For internal testing and distribution:

```bash
# Build preview version (APK for Android)
eas build --profile preview --platform android
eas build --profile preview --platform ios
```

### Production Build

For app store distribution:

```bash
# Build production version
eas build --profile production --platform android
eas build --profile production --platform ios
```

## 🔑 Key Features Implementation

### Transaction Management
- Add new transactions with category selection
- View transaction history with real-time updates
- Delete transactions with confirmation dialogs
- Pull-to-refresh functionality

### Financial Analytics
- Real-time balance calculation
- Income and expense tracking
- Category-based spending insights
- Transaction summary dashboard

### User Experience
- Intuitive navigation with tab-based structure
- Responsive design for all screen sizes
- Smooth animations and transitions
- Toast notifications for user feedback

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Transactions
- `GET /transactions/:user_id` - Get all transactions for a user
- `GET /transactions/summary/:user_id` - Get financial summary for a user
- `POST /transactions` - Create a new transaction
- `DELETE /transactions/:id` - Delete a transaction

#### Health Check
- `GET /health` - Server health status

### Request/Response Examples

**Create Transaction**
```json
POST /api/transactions
{
  "title": "Grocery Shopping",
  "amount": -50.00,
  "category": "food",
  "user_id": "user_123"
}
```

**Get Summary**
```json
GET /api/transactions/summary/user_123
Response:
{
  "balance": 1250.00,
  "income": 2000.00,
  "expenses": -750.00
}
```

## 🛠️ Development

### Key Technologies

**Frontend**
- React Native 0.79.5
- Expo SDK 53
- TypeScript 5.8.3
- Clerk Authentication
- React Navigation
- Expo Router

**Backend**
- Node.js
- Express.js 5.1.0
- Neon PostgreSQL
- Upstash Redis
- Cron jobs
- Deployed on Render 

## 🔗 Useful Links

- [Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [Clerk](https://clerk.com/)
- [Neon](https://neon.tech/)
- [Upstash](https://upstash.com/)
- [Render](https://render.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Gulraiz Noor Bari**
- Email: gulraiznoorbari@gmail.com
- GitHub: [@gulraiznoorbari](https://github.com/gulraiznoorbari)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Expo Documentation](https://docs.expo.dev/)
2. Search existing [GitHub Issues](https://github.com/gulraiznoorbari/MoneyWise/issues)
3. Create a new issue with detailed information

---

Made with ❤️ by [Gulraiz Noor Bari](https://github.com/gulraiznoorbari) 