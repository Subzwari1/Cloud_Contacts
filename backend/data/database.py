from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker 
from sqlalchemy.orm import declarative_base
import mysql.connector

URL_DATABASE='mysql+pymysql://root:helloworld@localhost:3306/cloudcontactsapp'

engine = create_engine(URL_DATABASE)
SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base=declarative_base()

