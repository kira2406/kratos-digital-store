from faker import Faker
from sqlalchemy import create_engine, Column, String, Boolean, Text, DateTime, ForeignKey, Integer, DOUBLE_PRECISION
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import sessionmaker, relationship
import bcrypt
from dotenv import load_dotenv
from datetime import datetime
import os
import random

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
Base = declarative_base()

# Define the User model
class User(Base):
    __tablename__ = 'Users'

    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    profile_picture_url = Column(Text)
    is_publisher = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)



Base.metadata.create_all(engine)


Session = sessionmaker(bind=engine)
session = Session()


faker = Faker()

# Function to create fake users
def create_fake_users(num_users=10):
    fake_users = []
    for _ in range(num_users):
        username = faker.user_name()
        email = faker.email()       
        password = faker.password() 
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()) 
        profile_picture_url = faker.image_url()
        is_publisher = faker.boolean()

        fake_user = User(
            username=username,
            email=email,
            password_hash=hashed_password.decode('utf-8'),
            profile_picture_url=profile_picture_url,
            is_publisher=False
        )
        fake_users.append(fake_user)

    # bulk insert users into the database
    session.bulk_save_objects(fake_users)
    session.commit()
    print(f"{num_users} fake users created successfully!")




# Generate and insert 10 fake users
create_fake_users(100)
create_fake_users(75)
# create_fake_users(100)
# create_fake_users(100)
# create_fake_users(100)