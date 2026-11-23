from typing import Optional
from pydantic import BaseModel, EmailStr

class UsuarioIn(BaseModel):
    nombre: str; apellido: str; tipo_documento: str; numero_documento: str
    direccion: str; telefono: str; email: EmailStr; password: str
    rol_id: int = 3
    estado: bool = True

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None; apellido: Optional[str] = None
    tipo_documento: Optional[str] = None; numero_documento: Optional[str] = None
    direccion: Optional[str] = None; telefono: Optional[str] = None
    email: Optional[EmailStr] = None; password: Optional[str] = None
    rol_id: Optional[int] = None; estado: Optional[bool] = None

class UsuarioOut(BaseModel):
    id: int; nombre: str; apellido: str; tipo_documento: str; numero_documento: str
    direccion: str; telefono: str; email: str; rol: str; rol_id: int; estado: bool

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class RecoverIn(BaseModel):
    email: EmailStr
