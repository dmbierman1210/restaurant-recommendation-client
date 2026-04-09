from fastapi import APIRouter, HTTPException
from typing import List, Optional
from init_db import get_db_connection

router = APIRouter()

@router.get("/recommendations")
def get_recommendations(user_id: int, limit: int = 5):
    conn = get_db_connection()
    cursor = conn.cursor()
    # Get restaurants the user has visited or rated
    cursor.execute('''
        SELECT restaurant_id FROM ratings WHERE user_id = ?
        UNION
        SELECT restaurant_id FROM visits WHERE user_id = ?
    ''', (user_id, user_id))
    seen_restaurant_ids = set(row[0] for row in cursor.fetchall())

    # Recommend restaurants the user hasn't visited/rated, sorted by average rating and visit count
    cursor.execute('''
        SELECT r.id, r.name, r.cuisine, r.address,
               IFNULL(AVG(rt.rating), 0) as avg_rating,
               COUNT(v.id) as visit_count
        FROM restaurants r
        LEFT JOIN ratings rt ON r.id = rt.restaurant_id
        LEFT JOIN visits v ON r.id = v.restaurant_id
        WHERE r.id NOT IN ({seq})
        GROUP BY r.id
        ORDER BY avg_rating DESC, visit_count DESC
        LIMIT ?
    '''.format(seq=','.join(['?']*len(seen_restaurant_ids)) if seen_restaurant_ids else '0'),
        tuple(seen_restaurant_ids) + (limit,) if seen_restaurant_ids else (limit,))
    recommendations = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return {"recommendations": recommendations}

@router.post("/feedback")
def submit_feedback(user_id: int, restaurant_id: int, rating: int, comment: Optional[str] = None, visit_date: Optional[str] = None):
    conn = get_db_connection()
    cursor = conn.cursor()
    if visit_date:
        cursor.execute('''
            INSERT INTO visits (user_id, restaurant_id, visit_date) VALUES (?, ?, ?)
        ''', (user_id, restaurant_id, visit_date))
    if rating:
        cursor.execute('''
            INSERT INTO ratings (user_id, restaurant_id, rating, comment) VALUES (?, ?, ?, ?)
        ''', (user_id, restaurant_id, rating, comment))
    conn.commit()
    conn.close()
    return {"message": "Feedback submitted and recommendations updated."}
