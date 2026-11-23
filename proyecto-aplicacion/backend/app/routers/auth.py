from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import Usuario, Rol
from app.schemas.schemas import UsuarioIn, LoginIn, RecoverIn
from app.services.auth import hash_password, verify_password, create_token, check_password

r = APIRouter(prefix="/auth", tags=["auth"])

def user_dict(u):
    return {"id": u.id, "nombre": u.nombre, "apellido": u.apellido, "email": u.email, "rol": u.rol.nombre}

@r.post("/register", status_code=201)
def register(d: UsuarioIn, db: Session = Depends(get_db)):
    check_password(d.password, d.nombre, d.apellido)
    if db.query(Usuario).filter((Usuario.email == d.email) | (Usuario.numero_documento == d.numero_documento)).first():
        raise HTTPException(409, "El correo o el documento ya están registrados")
    cliente = db.query(Rol).filter_by(nombre="Cliente").one()
    data = d.model_dump(exclude={"password", "rol_id", "estado"})
    db.add(Usuario(**data, password_hash=hash_password(d.password), rol_id=cliente.id, estado=True))
    db.commit()
    return {"mensaje": "Cuenta creada correctamente"}

@r.post("/login")
def login(d: LoginIn, db: Session = Depends(get_db)):
    u = db.query(Usuario).filter_by(email=d.email).first()
    if not u or not verify_password(d.password, u.password_hash):
        raise HTTPException(401, "Correo o contraseña incorrectos")
    if not u.estado:
        raise HTTPException(403, "Tu cuenta está inactiva")
    return {"access_token": create_token(u), "token_type": "bearer", "user": user_dict(u)}

@r.post("/recover")
def recover(d: RecoverIn):
    # TODO: generar token de un solo uso y enviarlo por correo (SMTP).
    return {"mensaje": "Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña"}
