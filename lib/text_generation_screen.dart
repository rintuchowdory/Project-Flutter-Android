
import 'package:flutter/material.dart';
import 'package:firebase_vertexai/firebase_vertexai.dart';

class TextGenerationScreen extends StatefulWidget {
  const TextGenerationScreen({super.key});

  @override
  State<TextGenerationScreen> createState() => _TextGenerationScreenState();
}

class _TextGenerationScreenState extends State<TextGenerationScreen> {
  final TextEditingController _textEditingController = TextEditingController();
  String _generatedText = '';
  bool _isLoading = false;

  Future<void> _generateText() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final model = FirebaseVertexAI.instance.generativeModel(model: 'gemini-pro');
      final response = await model.generateContent([Content.text(_textEditingController.text)]);

      setState(() {
        _generatedText = response.text ?? 'No response from model.';
      });
    } catch (e) {
      setState(() {
        _generatedText = 'Error generating text: $e';
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
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
              decoration: const InputDecoration(
                hintText: 'Enter a prompt',
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _isLoading ? null : _generateText,
              child: _isLoading
                  ? const CircularProgressIndicator()
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
