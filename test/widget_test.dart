// Smoke tests for the app's home screen and theme provider.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';

import 'package:myapp/main.dart';

Widget _wrapApp() {
  return ChangeNotifierProvider(
    create: (context) => ThemeProvider(),
    child: const MyApp(),
  );
}

void main() {
  testWidgets('Home screen renders title and navigation',
      (WidgetTester tester) async {
    await tester.pumpWidget(_wrapApp());

    expect(find.text('Firebase App'), findsWidgets);
    expect(find.text('Text Generation'), findsOneWidget);
    expect(find.text('Restore Original App'), findsOneWidget);
  });

  testWidgets('Theme toggles between light and dark mode',
      (WidgetTester tester) async {
    final themeProvider = ThemeProvider();
    expect(themeProvider.themeMode, ThemeMode.light);

    themeProvider.toggleTheme();
    expect(themeProvider.themeMode, ThemeMode.dark);

    themeProvider.toggleTheme();
    expect(themeProvider.themeMode, ThemeMode.light);

    themeProvider.toggleTheme();
    themeProvider.resetTheme();
    expect(themeProvider.themeMode, ThemeMode.light);
  });

  testWidgets('Tapping Text Generation navigates to the generation screen',
      (WidgetTester tester) async {
    await tester.pumpWidget(_wrapApp());

    await tester.tap(find.text('Text Generation'));
    await tester.pumpAndSettle();

    expect(find.text('Generate Text'), findsOneWidget);
    expect(find.byType(TextField), findsOneWidget);
  });
}
