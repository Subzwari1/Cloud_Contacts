from pydantic import BaseModel
from typing import Optional

class ContactBase(BaseModel):
   first_name:str
   last_name:str
   email:str
   phone_number:str
   phone_number2: Optional[str] = None  
   phone_number3: Optional[str] = None
   user_id:int