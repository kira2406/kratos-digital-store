import psycopg2
import random
from faker import Faker
from datetime import datetime
import uuid
import os
from dotenv import load_dotenv


load_dotenv()

fake = Faker()

# Connection to your PostgreSQL database
conn = psycopg2.connect(
    dbname=os.getenv("DB_DATABASE_NAME"),
    user=os.getenv("DB_USERNAME"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"), 
    port=os.getenv("DB_PORT")
)

cursor = conn.cursor()

# Function to fetch random user who has purchased a game
def get_users_with_games():
    cursor.execute("""
        SELECT u.user_id, g.game_id, g.title
        FROM "Users" u
        JOIN "UserGames" ug ON u.user_id = ug.user_id
        JOIN "Games" g ON ug.game_id = g.game_id
        WHERE u.is_publisher = false;
    """)
    return cursor.fetchall()

# Function to add fake reviews
def add_fake_review(user_id, game_id, game_title):
    rating = random.randint(1, 5)
    comment = fake.sentence(nb_words=10)
    will_recommend = random.choice([True, False])

    # Insert the review into the database
    cursor.execute("""
        INSERT INTO "Reviews" (user_id, game_id, rating, comment, will_recommend, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
    """, (user_id, game_id, rating, comment, will_recommend, datetime.utcnow(), datetime.utcnow()))

    print(f"Review added for game '{game_title}' by user {user_id} with rating {rating}.")


def main():
    try:
        
        users_with_games = get_users_with_games()

        if not users_with_games:
            print("No users found who have purchased games.")
            return

        
        for user_id, game_id, game_title in users_with_games:
            add_fake_review(user_id, game_id, game_title)

        
        conn.commit()

    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()

    finally:
        
        cursor.close()
        conn.close()

if __name__ == "__main__":
    main()