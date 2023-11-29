from fastapi import APIRouter, Depends, status, HTTPException
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


@router.get("/{user_id}" ,tags=['Contacts'])
async def get_contacts(user_id: int,db: Session = Depends(get_db)):
    contacts = db.query(Contact).filter(Contact.user_id == user_id,Contact.active==True).all()
    return contacts
@router.get("/trash/{user_id}" ,tags=['Contacts'])
async def get_contacts_intrash(user_id: int,db: Session = Depends(get_db)):
    contacts = db.query(Contact).filter(Contact.user_id == user_id, Contact.active==False).all()
    return contacts

@router.delete("/soft/{user_id}/{id}" ,tags=['Contacts'])
async def move_to_trash(user_id: int, id: int,db: Session = Depends(get_db)):
   contact= db.query(Contact).filter(Contact.user_id==user_id,Contact.id==id).first()
   if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
   if contact.active == False:
        raise HTTPException(status_code=201, detail="this Contact is already in your trash")
   else:
       contact.active = False
       db.commit()
       db.close()
       return {"message": "Contact moved to trash"}

@router.put("/recover/{user_id}/{id}" ,tags=['Contacts'])
async def Recover_from_trash(user_id: int, id: int,db: Session = Depends(get_db)):
   contact= db.query(Contact).filter(Contact.user_id==user_id,Contact.id==id).first()
   if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
   if contact.active==True:
       raise HTTPException(status_code=201, detail="already recovered ")
   else:
       contact.active = True
       db.commit()
       db.close()
       return {"message": "Recovery successfull"}

@router.delete("/hard/{user_id}/{id}" ,tags=['Contacts'])
async def permanent_delete(user_id: int, id: int,db: Session = Depends(get_db)):
   contact= db.query(Contact).filter(Contact.user_id==user_id,Contact.id==id).first()
   if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
   if contact.active == True:
        raise HTTPException(status_code=201, detail="Move it to trash first ")
   else:
       db.delete(contact)
       db.commit()
       db.close()
       return {"message": "Contact deleted permanently"}
