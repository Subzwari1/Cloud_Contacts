from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from dtos.user_base import UserBase, UserRegister
from data.models import UserModel                   # importing Base class model (DB table) 
from data.database import SessionLocal
from validation import validate_user_registration



router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", tags=['User Sign up'])
async def register(user_data: UserRegister, db: Session = Depends(get_db)):   # UserRegister is the pydantic BaseModel 
    try:
        print("hi")
        print(user_data)
        validate_user_registration(user_data.username)
        validate_user_registration(user_data.email)

        #Creating an instance of the SQLAlchemy model (user object) to add it into db session
        db_user = UserModel(
            username   = user_data.username,
            email      = user_data.email,
            passphrase = user_data.password)                   

        # Adding user 
        db.add(db_user)
        # committing the changes into the Database
        db.commit(db_user)

        return {"message": "User registered successfully"}  
      
    except ValueError as ve:
        return {"error": str(ve)}
    

@router.post("/login" ,tags=['Users'])
async def login(user:UserBase,db: Session = Depends(get_db)):
   result= db.query(UserModel).filter(UserModel.username==user.username,UserModel.password==user.password).first()
   if result:
        return result.id
   else:
        raise HTTPException(status_code=401, detail="Username or password incorrect")
   

    
