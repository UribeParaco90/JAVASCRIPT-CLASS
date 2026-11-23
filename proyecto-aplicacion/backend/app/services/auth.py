import os, re
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import Usuario

load_dotenv()
SECRET = os.getenv("SECRET_KEY")
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer = HTTPBearer()

def hash_password(p): return pwd.hash(p)
def verify_password(p, h): return pwd.verify(p, h)

def check_password(p, nombre="", apellido=""):
    low = p.lower()
    ok = (len(p) >= 10 and re.search(r"[A-Z]", p) and re.search(r"[a-z]", p) and re.search(r"\d", p)
          and re.search(r"[^A-Za-z0-9]", p) and not (nombre and nombre.lower() in low)
          and not (apellido and apellido.lower() in low))
    if not ok:
        raise HTTPException(422, "La contraseña no cumple los requisitos de seguridad")

def create_token(user):
    exp = datetime.now(timezone.utc) + timedelta(hours=8)
    return jwt.encode({"sub": str(user.id), "rol": user.rol.nombre, "exp": exp}, SECRET, algorithm="HS256")

def current_user(cred: HTTPAuthorizationCredentials = Depends(bearer), db: Session = Depends(get_db)):
    try:
        uid = int(jwt.decode(cred.credentials, SECRET, algorithms=["HS256"])["sub"])
    except (JWTError, ValueError, KeyError):
        raise HTTPException(401, "Token inválido o expirado")
    user = db.get(Usuario, uid)
    if not user or not user.estado:
        raise HTTPException(401, "Usuario inactivo o inexistente")
    return user

def require_roles(*roles):
    def dep(user=Depends(current_user)):
        if user.rol.nombre not in roles:
            raise HTTPException(403, "No tienes permiso para esta operación")
        return user
    return dep
