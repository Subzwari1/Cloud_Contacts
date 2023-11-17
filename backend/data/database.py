from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker 
from sqlalchemy.orm import declarative_base

URL_DATABASE='mysql+pymysql://root:getbrok1@localhost:3306/CloudContactsApp'
engine = create_engine(URL_DATABASE)
SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base=declarative_base()
