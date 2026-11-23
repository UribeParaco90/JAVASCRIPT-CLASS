import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import Base, engine, SessionLocal
from app.models.models import Rol, Permiso, Usuario
from app.routers import auth, usuarios
from app.services.auth import hash_password

app = FastAPI(title="IncognitoTech API")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
                   allow_methods=["*"], allow_headers=["*"])
app.include_router(auth.r); app.include_router(usuarios.r); app.include_router(usuarios.roles_r)

@app.on_event("startup")
def seed():
    Base.metadata.create_all(engine)
    db = SessionLocal()
    if not db.query(Rol).count():
        perms = [Permiso(nombre=n) for n in ("usuarios.gestionar", "productos.gestionar", "tienda.comprar")]
        db.add_all(perms); db.flush()
        db.add_all([Rol(id=1, nombre="Administrador", permisos=perms), Rol(id=2, nombre="Empleado", permisos=[perms[1]]),
                    Rol(id=3, nombre="Cliente", permisos=[perms[2]])]); db.flush()
        db.add(Usuario(nombre="Admin", apellido="Sistema", tipo_documento="CC", numero_documento="100000",
                       direccion="Sede principal", telefono="3000000000", email=os.getenv("ADMIN_EMAIL"),
                       password_hash=hash_password(os.getenv("ADMIN_PASSWORD")), rol_id=1))
        db.commit()
    db.close()
