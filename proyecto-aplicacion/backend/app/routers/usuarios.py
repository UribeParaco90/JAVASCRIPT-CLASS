from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import Usuario, Rol
from app.schemas.schemas import UsuarioIn, UsuarioUpdate, UsuarioOut
from app.services.auth import hash_password, check_password, require_roles

r = APIRouter(prefix="/usuarios", tags=["usuarios"], dependencies=[Depends(require_roles("Administrador"))])
roles_r = APIRouter(prefix="/roles", tags=["roles"], dependencies=[Depends(require_roles("Administrador", "Empleado"))])

def out(u):
    cols = ("id","nombre","apellido","tipo_documento","numero_documento","direccion","telefono","email","rol_id","estado")
    return {**{c: getattr(u, c) for c in cols}, "rol": u.rol.nombre}

def get_or_404(db, id):
    u = db.get(Usuario, id)
    if not u:
        raise HTTPException(404, "Usuario no encontrado")
    return u

@r.get("", response_model=list[UsuarioOut])
def listar(db: Session = Depends(get_db)):
    return [out(u) for u in db.query(Usuario).order_by(Usuario.id).all()]

@r.post("", response_model=UsuarioOut, status_code=201)
def crear(d: UsuarioIn, db: Session = Depends(get_db)):
    check_password(d.password, d.nombre, d.apellido)
    if db.query(Usuario).filter((Usuario.email == d.email) | (Usuario.numero_documento == d.numero_documento)).first():
        raise HTTPException(409, "El correo o el documento ya existen")
    u = Usuario(**d.model_dump(exclude={"password"}), password_hash=hash_password(d.password))
    db.add(u); db.commit(); db.refresh(u)
    return out(u)

@r.put("/{id}", response_model=UsuarioOut)
def actualizar(id: int, d: UsuarioUpdate, db: Session = Depends(get_db)):
    u = get_or_404(db, id)
    data = d.model_dump(exclude_unset=True)
    pwd = data.pop("password", None)
    if pwd:
        check_password(pwd, data.get("nombre", u.nombre), data.get("apellido", u.apellido))
        u.password_hash = hash_password(pwd)
    for k, v in data.items():
        setattr(u, k, v)
    db.commit(); db.refresh(u)
    return out(u)

@r.delete("/{id}")
def eliminar(id: int, db: Session = Depends(get_db)):
    db.delete(get_or_404(db, id)); db.commit()
    return {"mensaje": "Usuario eliminado"}

@roles_r.get("")
def roles(db: Session = Depends(get_db)):
    return [{"id": x.id, "nombre": x.nombre, "estado": x.estado, "permisos": [p.nombre for p in x.permisos]} for x in db.query(Rol).all()]
