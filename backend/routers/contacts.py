import codecs
from fastapi import File
from fastapi import APIRouter, Depends, UploadFile, status, HTTPException
from sqlalchemy.orm import Session
from typing import List
from dtos.contact_base import ContactBase
from data.models import Contact
from data.database import SessionLocal

import csv
from io import BytesIO
from fastapi.responses import StreamingResponse
from fastapi import Request, Response               # importing Request and Response classes for getting request from and giving response to client 

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("" ,status_code=status.HTTP_201_CREATED,tags=['Contacts'])
async def post_contact(contact:ContactBase,db: Session = Depends(get_db)):
   contact=Contact(first_name=contact.first_name,
                   last_name=contact.last_name,
                   phone_number=contact.phone_number,
                   phone_number2=contact.phone_number2,
                   phone_number3=contact.phone_number3,
                   email=contact.email,
                   user_id=contact.user_id)
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


@router.get("/download-contacts", tags=['downlaod contacts'])
def download_contacts(db: Session = Depends(get_db), request = Request):

    cursor = db.execute("SELECT * from Contact")
    all_contactcs = cursor.fetchall()

    #converting contacts into csv format
    contacts_csv = BytesIO()                      # BytesIO object
    csv_writer  = csv.writer(contacts_csv)        # csv.writer class is used to insert the data into csv file. User’s data is converted into a delimited string by the writer object returned by csv.writer()

    for row in all_contactcs:
        csv_writer.writerow(row)                  # writerow() method is used to write single row of data to csv file. 
    
    response = StreamingResponse(contacts_csv, media_type="applicaton/octet-stream")    #applicaton/octet-stream 
    response.headers["Content disposition"] = "attachment; filename=contacts.csv"

    return response
    
@router.post("/upload/csv/{userId}")
def upload(userId:int,file: UploadFile = File(...),db: Session = Depends(get_db)):
    csvReader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))
    for row in csvReader:
        contact=Contact(first_name=row["first_name"],
                   last_name=row["last_name"],
                   phone_number=row["phone_number"],
                   phone_type=row["phone_type"],
                   phone_number2=row["phone_number2"],
                   phone_type2=row["phone_type2"],
                   phone_number3=row["phone_number3"],
                   phone_type3=row["phone_type3"],                 
                   email=row["email"],
                   relationship=row["relationship"],
                   user_id=userId)
        db.add(contact)
    file.file.close()
    db.commit()
    db.close
    return "contacts uploaded successfully"
    

