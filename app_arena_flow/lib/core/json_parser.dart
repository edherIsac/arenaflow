import 'dart:convert';

class JsonParser {
  // Parses a JSON string and returns a Map representation
  Map<String, dynamic> parseJson(String jsonString) {
    try {
      return json.decode(jsonString) as Map<String, dynamic>;
    } catch (e) {
      throw FormatException('Invalid JSON format: $e');
    }
  }

  // Encodes a Map into a JSON string
  String encodeToJson(Map<String, dynamic> data) {
    try {
      return json.encode(data);
    } catch (e) {
      throw FormatException('Error encoding to JSON: $e');
    }
  }
}
