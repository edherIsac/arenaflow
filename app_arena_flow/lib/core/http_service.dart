import 'package:http/http.dart' as http;

class HttpService {
  final String baseUrl;
  String? _authToken;

  HttpService({required this.baseUrl});

  void setAuthToken(String token) {
    _authToken = token;
  }

  Future<http.Response> get(String endpoint) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final headers =
        _authToken != null ? {'Authorization': 'Bearer $_authToken'} : null;
    return await http.get(uri, headers: headers);
  }

  Future<http.Response> post(String endpoint,
      {Map<String, String>? headers, Object? body}) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final combinedHeaders = {
      if (_authToken != null) 'Authorization': 'Bearer $_authToken',
      if (headers != null) ...headers,
    };
    return await http.post(uri, headers: combinedHeaders, body: body);
  }

  Future<http.Response> put(String endpoint,
      {Map<String, String>? headers, Object? body}) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final combinedHeaders = {
      if (_authToken != null) 'Authorization': 'Bearer $_authToken',
      if (headers != null) ...headers,
    };
    return await http.put(uri, headers: combinedHeaders, body: body);
  }

  Future<http.Response> delete(String endpoint,
      {Map<String, String>? headers}) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final combinedHeaders = {
      if (_authToken != null) 'Authorization': 'Bearer $_authToken',
      if (headers != null) ...headers,
    };
    return await http.delete(uri, headers: combinedHeaders);
  }

  Future<http.Response> patch(String endpoint,
      {Map<String, String>? headers, Object? body}) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final combinedHeaders = {
      if (_authToken != null) 'Authorization': 'Bearer $_authToken',
      if (headers != null) ...headers,
    };
    return await http.patch(uri, headers: combinedHeaders, body: body);
  }

  Future<http.Response> head(String endpoint,
      {Map<String, String>? headers}) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final combinedHeaders = {
      if (_authToken != null) 'Authorization': 'Bearer $_authToken',
      if (headers != null) ...headers,
    };
    return await http.head(uri, headers: combinedHeaders);
  }

  Future<http.Response> multipart(String endpoint, Map<String, String> fields,
      List<http.MultipartFile> files) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final request = http.MultipartRequest('POST', uri);

    if (_authToken != null) {
      request.headers['Authorization'] = 'Bearer $_authToken';
    }

    request.fields.addAll(fields);
    request.files.addAll(files);

    final streamedResponse = await request.send();
    return await http.Response.fromStream(streamedResponse);
  }

  Future<http.Response> query(String endpoint, Map<String, dynamic> parameters,
      {Map<String, String>? headers}) async {
    final uri = Uri.parse('$baseUrl$endpoint').replace(
        queryParameters:
            parameters.map((key, value) => MapEntry(key, value.toString())));
    final combinedHeaders = {
      if (_authToken != null) 'Authorization': 'Bearer $_authToken',
      if (headers != null) ...headers,
    };
    return await http.get(uri, headers: combinedHeaders);
  }
}
