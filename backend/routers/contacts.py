import base64
from fastapi import APIRouter, Depends, Form, status, HTTPException, File, UploadFile
import secrets
from fastapi.staticfiles import StaticFiles
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
router.mount("/profile", StaticFiles(directory="profile"), name="profile")

@router.put("/uploadprofile/{contactId}")
async def create_upload_profile(contactId:int,file: UploadFile = File(...),db: Session = Depends(get_db)):
    contact= db.query(Contact).filter(Contact.id==contactId,Contact.active==True).first()

    filepath="./profile/images/"
    file_name=file.filename
    extension=file_name.split(".")[1]

    if extension not in  ["jpg", "png", "jpeg"]:
        return {"status": "error", "detail": "file extension not allowed"}
    global_token_name=secrets.token_hex(10)+"."+extension
    generated_name=filepath+global_token_name
    file_content = await file.read()
    with open(generated_name, "wb") as file:
        file.write(file_content)
    file.close()
    contact.image_path=generated_name
    db.commit()
    db.refresh(contact)
    db.close()
    return "successfuly uploaded"

@router.get("profile/{contactId}")
async def get_profile(contactId:int,db: Session = Depends(get_db)):
    contact= db.query(Contact).filter(Contact.id==contactId,Contact.active==True).first()
    file_path=contact.image_path
    with open(file_path, "rb") as file:
        binary_data=file.read()
        image=base64.b64encode(binary_data).decode('utf-8')
        return image



@router.post("" ,status_code=status.HTTP_201_CREATED,tags=['Contacts'])
async def post_contact(contact:ContactBase , db: Session = Depends(get_db)):
    try:
       
        # Database operations
        contact_data = Contact(
            first_name=contact.first_name,
            last_name=contact.last_name,
            phone_number=contact.phone_number,
            phone_number2=contact.phone_number2,
            phone_number3=contact.phone_number3,
            email=contact.email,
            user_id=contact.user_id
        )

        db.add(contact_data)
        db.commit()
        db.refresh(contact_data)

        return contact_data
    except HTTPException as e:
        raise e  # Reraise HTTPException to return the proper HTTP response


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
        raise HTTPException(status_code=400, detail="this Contact is already in your trash")
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
       raise HTTPException(status_code=400, detail="already recovered ")
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
        raise HTTPException(status_code=400, detail="Move it to trash first ")
   else:
       db.delete(contact)
       db.commit()
       db.close()
       return {"message": "Contact deleted permanently"}
   

@router.put("/edit/{id}" ,tags=['Contacts'])
def update_contact(id: int, contact_update: ContactBase,db: Session = Depends(get_db)):
    contact=db.query(Contact).filter(Contact.id==id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    contact.first_name=contact_update.first_name
    contact.last_name=contact_update.last_name
    contact.phone_number=contact_update.phone_number
    contact.phone_number2=contact_update.phone_number2
    contact.phone_number3=contact_update.phone_number3
    contact.email=contact_update.email
    
    db.commit()
    db.refresh(contact)
    db.close()
    return contact

@router.get("/{user_id}/{id}" ,tags=['Contacts'])
async def get_contacts_by_user_id_and_contact_id(user_id: int,id:int,db: Session = Depends(get_db)):
    contacts = db.query(Contact).filter(Contact.user_id == user_id,Contact.id==id,Contact.active==True).first()
    return contacts