
from pydantic import ValidationError, validator
from sqlalchemy.orm import validates
from dtos.user_base import UserRegister

#@validator('username')
def validate_user_registration(user_data : UserRegister):
    username = user_data.username
    email = user_data.email

    if ' ' not in username:
        raise ValueError('username must contain a space')
        return username.title()

    #Email logic defined here
    if not email.endswith('@example.com'):
        raise ValueError("Invalid email domain")
     
    return True

