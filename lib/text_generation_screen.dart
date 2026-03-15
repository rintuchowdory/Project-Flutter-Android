import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

// API key is injected at build time via --dart-define=GEMINI_API_KEY=...
// It is never stored in any source file.
const _apiKey = String.fromEnvironment('GEMINI_API_KEY');

class TextGenerationScreen extends StatefulWidget {
  const TextGenerationScreen({super.key});

  @override
  State<TextGenerationScreen> createState() => _TextGenerationScreenState();
}

class _TextGenerationScreenState extends State<TextGenerationScreen> {
  final TextEditingController _textEditingController = TextEditingController();
  String _generatedText = '';
  bool _isLoading = false;

  @override
  void dispose() {
    _textEditingController.dispose();
    super.dispose();
  }

  Future<void> _generateText() async {
    final prompt = _textEditingController.text.trim();

    if (prompt.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a prompt first.')),
      );
      return;
    }

    if (_apiKey.isEmpty) {
      setState(() {
        _generatedText =
            'Error: No API key found. Run with --dart-define=GEMINI_API_KEY=your_key';
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _generatedText = '';
    });

    try {
      final url = Uri.parse(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$_apiKey',
      );

      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'contents': [
            {
              'parts': [
                {'text': prompt}
              ]
            }
          ]
        }),
      );

      if (!mounted) return;

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final text = data['candidates'][0]['content']['parts'][0]['text']
            as String? ??
            'No response from model.';
        setState(() {
          _generatedText = text;
        });
      } else {
        setState(() {
          _generatedText = 'Error ${response.statusCode}: ${response.body}';
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _generatedText = 'Error: $e';
      });
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Text Generation'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _textEditingController,
              maxLines: 3,
              decoration: const InputDecoration(
                hintText: 'Enter a prompt',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _isLoading ? null : _generateText,
              child: _isLoading
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Text('Generate Text'),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: SingleChildScrollView(
                child: Text(_generatedText),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
