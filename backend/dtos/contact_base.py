from pydantic import BaseModel

class ContactBase(BaseModel):
   first_name:str
   last_name:str
   email:str
   phone_number:str
   user_id:int