# AI TextForge

Welcome to your AI-powered writing assistant! This application is built with Next.js, Genkit (for Gemini AI), and Firebase.

## 🚀 How to Run Locally

To see your app in action, run the following command in your terminal:

```bash
npm run dev
```

The application will be available at `http://localhost:9003`.

### Exploring the AI (Genkit UI)
If you want to debug the AI prompts and flows directly, run:
```bash
npm run genkit:dev
```
This opens the Genkit developer UI where you can test different inputs for your text generation logic.

## ⬆️ How to Push to GitHub

To save your code to GitHub and prepare for deployment:

1. Create a new repository on GitHub named `ai-textforge`.
2. Run these commands in your terminal:

```bash
git add .
git commit -m "Complete AI TextForge implementation"
git remote add origin https://github.com/rintuchowdory/ai-textforge.git
git push -u origin main
```
*Note: Use your GitHub Token as the password when prompted.*

## ☁️ Publishing (The Free Method)

To publish your app for free using the Firebase Spark plan:

1. **Enable Authentication**: Go to the [Firebase Console](https://console.firebase.google.com/), navigate to **Authentication**, and enable the **Anonymous** provider.
2. **Enable Firestore**: Go to **Cloud Firestore** in the console and click **Create Database**. Start in "Production Mode" but ensure your security rules allow the path `/users/{userId}/ai_interactions/{id}` (these rules are already in your `firestore.rules` file!).
3. **Deploy with App Hosting**:
   - Push your code to a GitHub repository using the commands above.
   - In the Firebase Console, go to **App Hosting**.
   - Click **Get Started** and connect your GitHub repo.
   - Firebase will handle the build and deployment automatically.

## 🛠 Features

- **AI Text Generation**: Powered by Google Gemini via Genkit.
- **Anonymous Auth**: Users are automatically signed in anonymously to save their work.
- **Firestore Integration**: Generation history is saved in real-time to your Firebase database.
- **Responsive Design**: Built with Tailwind CSS and ShadCN UI.
