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


# Crear Clases y esquemas Administrador
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

# Crear Clases y esquemas Concursos
class Concursos(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    id_admin = db.Column(db.Integer)
    nombre = db.Column(db.String(50) )
    path_banner = db.Column(db.String(500) )
    fecha_inicio = db.Column(db.Date)
    fecha_fin = db.Column(db.Date)
    valor_premio = db.Column(db.String(20))
    guion = db.Column(db.String(500))   # Validar max 500 aracteres en el front
    recomendaciones = db.Column(db.String(500)) # Validar en el front
    url = db.Column(db.String(250))

class Concursos_Schema(ma.Schema):
    class Meta:
        fields = ("id","id_admin","nombre","path_banner","fecha_inicio","fecha_fin","valor_premio","guion","recomendaciones","url")

concurso_schema = Concursos_Schema()
concursos_schema = Concursos_Schema(many = True)

# API
# creacion de Api Flask
api = Api(app)

# Acciones GET/POST/PUT/DELETE Administrador
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

# Acciones GET/POST/PUT/DELETE Concursos

class TodosLosConcursos(Resource):
    def get(self):
        concursos = Concursos.query.all()        
        return concursos_schema.dump(concursos)
    def post(self):
        url_concurso = 'localhost:8080/'+request.json['nombre'].replace(" ","-")
        nuevo_concurso = Concursos(
                id_admin = request.json['id_admin'],
                nombre = request.json['nombre'],
                path_banner = request.json['path_banner'],
                fecha_inicio = request.json['fecha_inicio'],
                fecha_fin = request.json['fecha_fin'],
                valor_premio = request.json['valor_premio'],
                guion = request.json['guion'],
                recomendaciones = request.json['recomendaciones'],
                url = url_concurso
        )
        db.session.add(nuevo_concurso)
        db.commit()
        return {'message':'Concurso creado exitosamente.'}

#class UnConcurso(Resource):

# Endpoints Administrador
api.add_resource(RegistrarAdministrador, '/administrador')
api.add_resource(ValidarAdministrador, '/validar_administrador')

# Endpoints Concursos
api.add_resource(TodosLosConcursos, '/concursos')


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0", port=8080)
