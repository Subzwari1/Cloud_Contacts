
from sqlalchemy import Column, Integer, String, ForeignKey
from data.database import Base

class UserModel(Base):                   # changing user table's class name as UserModel
   __tablename__='Users'

   id       =  Column(Integer,primary_key=True,index=True)
   username =  Column(String(50),unique=True, index=True)
   email    =  Column(String(50),unique=True, index=True)
   password =  Column(String(50))
   

class Contact(Base):
   __tablename__='contacts'

   id=Column(Integer,primary_key=True,index=True)
   user_id=Column("user_id", Integer, ForeignKey("users.id"), nullable=False)
   first_name=Column(String(50))
   last_name=Column(String(50))
   email=Column(String(50))
   phone_number=Column(String(50))
   active=Column(Boolean, default=True)

   
  
