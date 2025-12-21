
# Project Blueprint

## Overview

This document outlines the plan for creating a Flutter application with a focus on a robust and visually appealing user interface. The application will feature a theme toggle for light and dark modes, custom fonts using `google_fonts`, and a well-structured project architecture using the `provider` package for state management. The current focus is on adding a new feature: text generation using a generative AI model.

## Current Plan

1.  **Add Generative AI Feature**:
    *   **Firebase and AI Dependencies:** Add `firebase_core` and `firebase_ai` to the `pubspec.yaml` file.
    *   **Firebase Initialization:** Initialize Firebase in the application.
    *   **UI for AI:** Add a text field for user input, a button to trigger text generation, and a widget to display the generated text.
    *   **Implement AI Logic:** Create a function to call the Gemini API with the user's prompt and display the result.
2.  **Enhance Visual Design**:
    *   **Layout and Styling:** Improve the layout and styling for a more modern and polished look.
    *   **Background:** Add a background image to enhance the visual appeal.
    *   **Animation:** Add a subtle animation to the flashlight button for better user interaction.
3.  **Theming**:
    *   Create a `ThemeProvider` class to manage the theme state (light, dark, system).
    *   Define light and dark `ThemeData` using `ColorScheme.fromSeed` for a Material 3 look.
    *   Integrate custom fonts from `google_fonts` into the `TextTheme`.
4.  **UI Implementation**:
    *   Create a home page with a theme toggle button in the `AppBar`.
    *   Display sample text and a button to showcase the custom theme and fonts.
5.  **Build and Deploy**:
    *   Build the APK for manual installation.
