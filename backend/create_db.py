"""
Initialize empty database
"""
from app import DB 

DB.create_all()
print('new db created')
