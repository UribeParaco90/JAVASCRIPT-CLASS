from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.database.db import Base

roles_permisos = Table("roles_permisos", Base.metadata,
    Column("rol_id", ForeignKey("roles.id"), primary_key=True),
    Column("permiso_id", ForeignKey("permisos.id"), primary_key=True))

class Permiso(Base):
    __tablename__ = "permisos"
    id = Column(Integer, primary_key=True)
    nombre = Column(String(60), unique=True, nullable=False)

class Rol(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True)
    nombre = Column(String(40), unique=True, nullable=False)
    estado = Column(Boolean, default=True)
    permisos = relationship("Permiso", secondary=roles_permisos)

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True)
    nombre = Column(String(40)); apellido = Column(String(40))
    tipo_documento = Column(String(10))
    numero_documento = Column(String(12), unique=True)
    direccion = Column(String(120)); telefono = Column(String(10))
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    rol_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    estado = Column(Boolean, default=True)
    rol = relationship("Rol")
