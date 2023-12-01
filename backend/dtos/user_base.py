
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
   username:str
   password:str

class UserRegister(BaseModel):
   username: str
   email:    EmailStr
   password: str
