"""
Initialize empty database
"""
from app import db

db.create_all()
print('new db created')
