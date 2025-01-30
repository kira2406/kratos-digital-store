import psycopg2
from faker import Faker
import random
import uuid
from datetime import datetime
from dotenv import load_dotenv
import os


load_dotenv()
# Initialize Faker to generate random data
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

# Function to get random users and games
def get_random_users(num_users):
    cursor.execute('SELECT user_id FROM "Users" ORDER BY RANDOM() LIMIT %s;', (num_users,))
    return cursor.fetchall()

# Function to get a random game
def get_random_game():
    cursor.execute('SELECT game_id FROM "Games" ORDER BY RANDOM() LIMIT 1;')
    return cursor.fetchone()[0]

# Function to insert random games to random users
def add_random_games_to_users(num_users, num_games_per_user):
    random_users = get_random_users(num_users)
    
    for user in random_users:
        user_id = user[0]
        for _ in range(num_games_per_user):
            game_id = get_random_game()
            # Generate the current timestamp
            purchased_at = datetime.utcnow()
            # Insert a new entry in UserGames
            cursor.execute("""
                INSERT INTO "UserGames" (user_id, game_id, purchased_at)
                VALUES (%s, %s, %s);
            """, (user_id, game_id, purchased_at))
    
    # Commit the transaction
    conn.commit()

# Add 5 random users, each with 3 random games
add_random_games_to_users(500, 1)

# Close the cursor and connection
cursor.close()
conn.close()

print("Random games added to users successfully.")