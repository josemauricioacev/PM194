from sqlalchemy import Column, Integer, String
from database import Base

class Fruta(Base):
    __tablename__ = "frutas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True, index=True)

class Verdura(Base):
    __tablename__ = "verduras"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True, index=True)
