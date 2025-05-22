import 'package:flutter/material.dart';

class CardListScreen extends StatelessWidget {
  const CardListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Card List Screen'),
      ),
      body: ListView.builder(
        itemCount: 10, // Número de elementos en la lista
        itemBuilder: (context, index) {
          return Card(
            margin: const EdgeInsets.all(8.0),
            child: ListTile(
              leading: CircleAvatar(
                child: Text('${index + 1}'),
              ),
              title: Text('Card Title ${index + 1}'),
              subtitle: Text('This is the subtitle for card ${index + 1}.'),
              trailing: const Icon(Icons.arrow_forward),
              onTap: () {
                // Acción al tocar la tarjeta
              },
            ),
          );
        },
      ),
    );
  }
}