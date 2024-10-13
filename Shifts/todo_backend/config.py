import os

class Config:
     
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql+mysqlconnector://root:@localhost/todo')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', "Write here your secret key")
 
