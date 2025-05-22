import 'package:flutter/material.dart';

class MatchCard extends StatelessWidget {
  final String date;
  final String team1;
  final String team2;
  final String score;
  final String team1Logo;
  final String team2Logo;
  final String team1Position;
  final String team2Position;
  final String team1Number;
  final String team2Number;
  final String team1Goals;
  final String team2Goals;
  final String team1Assists;
  final String team2Assists;

  const MatchCard({
    super.key,
    required this.date,
    required this.team1,
    required this.team2,
    required this.score,
    required this.team1Logo,
    required this.team2Logo,
    required this.team1Position,
    required this.team2Position,
    required this.team1Number,
    required this.team2Number,
    required this.team1Goals,
    required this.team2Goals,
    required this.team1Assists,
    required this.team2Assists,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16.0),
      ),
      elevation: 4.0,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(
              date,
              style: const TextStyle(
                fontSize: 14.0,
                fontWeight: FontWeight.w500,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  children: [
                    Image.asset(team1Logo, height: 50, width: 50),
                    const SizedBox(height: 8.0),
                    Text(
                      team1,
                      style: const TextStyle(
                        fontSize: 16.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                Text(
                  score,
                  style: const TextStyle(
                    fontSize: 24.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Column(
                  children: [
                    Image.asset(team2Logo, height: 50, width: 50),
                    const SizedBox(height: 8.0),
                    Text(
                      team2,
                      style: const TextStyle(
                        fontSize: 16.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text('TEAM'),
                Text('TEAM'),
              ],
            ),
            const SizedBox(height: 8.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(team1Position),
                Text(team2Position),
              ],
            ),
            const SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text('NUMBERS'),
                Text('NUMBERS'),
              ],
            ),
            const SizedBox(height: 8.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(team1Number),
                Text(team2Number),
              ],
            ),
            const SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text('GOALS'),
                Text('GOALS'),
              ],
            ),
            const SizedBox(height: 8.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(team1Goals),
                Text(team2Goals),
              ],
            ),
            const SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text('ASSISTS'),
                Text('ASSISTS'),
              ],
            ),
            const SizedBox(height: 8.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(team1Assists),
                Text(team2Assists),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
