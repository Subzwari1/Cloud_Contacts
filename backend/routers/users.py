from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from dtos.user_base import UserBase
from data.models import User
from data.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@router.post("/login" ,tags=['Users'])
async def login(user:UserBase,db: Session = Depends(get_db)):
   result= db.query(User).filter(User.username==user.username,User.password==user.password).first()
   if result:
        return result.id
   else:
        raise HTTPException(status_code=401, detail="Username or password incorrect")

