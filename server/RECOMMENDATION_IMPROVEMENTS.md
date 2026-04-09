# Advanced Recommendation Algorithm

Currently, recommendations are based on simple rule-based logic (average rating, visit count, and excluding already visited/rated restaurants). For more accurate personalization, consider:

- Implementing collaborative filtering or content-based filtering (machine learning)
- Factoring in time decay (recent feedback weighs more)
- Adding user preference profiles (e.g., favorite cuisines)
- Supporting cold start for new users/restaurants
- Exposing an endpoint for admin to retrain or tune the algorithm

This would require additional development and possibly new dependencies.
