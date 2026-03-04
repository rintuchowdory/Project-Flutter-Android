# AI TextForge

Welcome to your AI-powered writing assistant! This application is built with Next.js, Genkit (for Gemini AI), and Firebase.

## 🚀 How to Run Locally

To see your app in action, run the following command in your terminal:

```bash
npm run dev
```

The application will be available at `http://localhost:9003`.

## 🌐 Keeping Your App Live (Free Subdomain)

By default, Firebase will give you a professional subdomain like:
`https://studio-8057266048-ca3e4.web.app`

### How to Stay Live "Forever"
1. **Push to GitHub**: Every time you run `git push`, Firebase detects the change.
2. **Auto-Deploy**: Firebase automatically builds the new version and swaps it with the old one.
3. **Zero Downtime**: Your app stays online while the new version is being prepared.

## ☁️ Publishing (Step-by-Step for Free Users)

If you get an error saying your push was **rejected**, use the **Force Push** command below to sync your repository.

### Step A: Push to GitHub (The "Force" Method)
Run these commands in your terminal to overwrite the old repository with your new AI app:

```bash
git add .
git commit -m "Complete AI TextForge build with Firebase and Gemini"
git remote remove origin
git remote add origin https://github.com/rintuchowdory/Project-Flutter-Android.git
git push -f origin main
```
*Note: When prompted for your password, use your GitHub Personal Access Token (`ghp_...`). The `-f` flag tells Git to force the update.*

### Step B: Connect to Firebase
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select your project: **studio-8057266048-ca3e4**.
3. **Enable Services**:
   - Go to **Authentication** and enable **Anonymous**.
   - Go to **Firestore Database** and click **Create Database**.
4. **Deploy**:
   - Click **App Hosting** in the left sidebar.
   - Click **Get Started**.
   - Select your GitHub account and the repository `Project-Flutter-Android`.
   - Firebase will now host your app for free at your `.web.app` subdomain!

## 🛠 Features

- **AI Text Generation**: Powered by Google Gemini via Genkit.
- **Anonymous Auth**: Users are automatically signed in anonymously to save their work.
- **Firestore Integration**: Generation history is saved in real-time to your Firebase database.
- **Responsive Design**: Built with Tailwind CSS and ShadCN UI.
