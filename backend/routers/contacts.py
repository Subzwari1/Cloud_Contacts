from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from dtos.contact_base import ContactBase
from data.models import Contact
from data.database import SessionLocal
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("" ,status_code=status.HTTP_201_CREATED,tags=['Contacts'])
async def post_contact(contact:ContactBase,db: Session = Depends(get_db)):
   contact=Contact(first_name=contact.first_name,last_name=contact.last_name,phone_number=contact.phone_number,email=contact.email,user_id=contact.user_id)
   db.add(contact)
   db.commit()
   db.refresh(contact)
   return contact