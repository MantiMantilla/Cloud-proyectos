from datetime import date 
from flask import Flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow  
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Inicilizacion de base de datos

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://admin:123456@localhost:5432/project01"
# base de datos
db = SQLAlchemy(app)
ma = Marshmallow(app)


# Crear Clases y esquemas
class Administradores(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    nombres = db.Column(db.String(50) )
    apellidos = db.Column(db.String(50) )
    correo = db.Column(db.String(50) )
    password = db.Column(db.String(255) )

class Administrador_Schema(ma.Schema):
    class Meta:
        fields = ("id", "nombres", "apellidos", "correo", "password")

administrador_schema = Administrador_Schema()
administradores_schema = Administrador_Schema(many = True)

# API
# creacion de Api Flask
api = Api(app)

# Acciones GET/POST/PUT/DELETE
class RegistrarAdministrador(Resource):
    # Insertar Administrador
    def post(self):
        nuevo_administrador = Administradores(
            nombres = request.json['nombres'],
            apellidos = request.json['apellidos'],
            correo = request.json['correo'],
            password = request.json['password']
        )
        db.session.add(nuevo_administrador)
        db.session.commit()
        return {'message':'Administrador creado exitosamente.'}

class ValidarAdministrador(Resource):
    def post(self):
        if 'correo' in request.json:
            if 'password' in request.json:
                admins = Administradores.query.filter_by(correo=request.json['correo']).all()
                for admin in admins:
                    if admin.password == request.json['password']:
                        return {'success':'true','id':admin.id}
        return {'success':'false'}
# Endpoints
api.add_resource(RegistrarAdministrador, '/administrador')
api.add_resource(ValidarAdministrador, '/validar_administrador')


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0", port=8080)
