# AI TextForge

Welcome to your AI-powered writing assistant! This application is built with Next.js, Genkit (for Gemini AI), and Firebase.

## 🚀 How to Run Locally

To see your app in action, run the following command in your terminal:

```bash
npm run dev
```

The application will be available at `http://localhost:9003`.

## 🌐 Keeping Your App Live (Free Subdomain)

To keep your app live 24/7 and accessible to anyone in the world, we use **Firebase App Hosting**.

### 1. Your Free Subdomain
By default, Firebase will give you a professional subdomain like:
`https://studio-8057266048-ca3e4.web.app`

### 2. How to Stay Live "Forever"
1. **Push to GitHub**: Every time you run `git push`, Firebase detects the change.
2. **Auto-Deploy**: Firebase automatically builds the new version and swaps it with the old one.
3. **Zero Downtime**: Your app stays online while the new version is being prepared.

## ⬆️ How to Push to GitHub

To save your code to your GitHub repository:

1. Ensure you have created the repository `Project-Flutter-Android` on your GitHub account.
2. Run these commands in your terminal:

```bash
git add .
git commit -m "Update for permanent hosting"
git remote add origin https://github.com/rintuchowdory/Project-Flutter-Android.git
git push -u origin main
```
*Note: When prompted for your password, use your GitHub Personal Access Token (`ghp_...`).*

## ☁️ Publishing (Step-by-Step)

1. **Firebase Console**: Go to the [Firebase Console](https://console.firebase.google.com/).
2. **Enable Auth & Firestore**:
   - Enable **Anonymous** Auth.
   - Create a **Firestore** database in production mode.
3. **Connect App Hosting**:
   - In the sidebar, click **App Hosting**.
   - Click **Get Started** and connect your GitHub repo `Project-Flutter-Android`.
   - Firebase will handle the rest!

## 🛠 Features

- **AI Text Generation**: Powered by Google Gemini via Genkit.
- **Anonymous Auth**: Users are automatically signed in anonymously to save their work.
- **Firestore Integration**: Generation history is saved in real-time to your Firebase database.
- **Responsive Design**: Built with Tailwind CSS and ShadCN UI.
