from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import supabase

app = Flask(__name__)
#CORS (app)
cors = CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

# Replace the placeholders with your Supabase URL and API key
supabase_url = 'https://tdqczaqroakwmfewfsho.supabase.co'
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcWN6YXFyb2Frd21mZXdmc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwNzAwMDcsImV4cCI6MjAwNTY0NjAwN30.potXEUQXoWQ2BS1ctTbQtvxUWdukAnWlwrMlkTioDYs'

# Connect to the Supabase database
client = supabase.create_client(supabase_url, supabase_key)

@app.route("/read")
def read():
    # Query data from a table
    response = client.table("Cliente").select("*").execute()
    data = response.data
    if data:
        return jsonify(posts=data)

@app.route("/create", methods=["POST"])
def create():
    # Obtén los datos del cuerpo de la solicitud POST
    data = request.get_json()

    # Inserte los datos en la tabla
    client.table("Cliente").insert(data).execute()

    return "Los datos se insertaron correctamente"

@app.route("/delete", methods=["DELETE"])
@cross_origin()
def delete():
    # Obtén el ID del registro que desea eliminar del cuerpo de la solicitud POST
    id = request.get_json()["id"]

    # Elimine el registro de la tabla
    
    client.table("Cliente").delete().eq("id",id).execute()
    #client.table("Cliente").delete({"id": id}).excute()

    return "El registro se eliminó correctamente"

@app.route("/update", methods=["PUT"])
def update():
    id = request.get_json()["id"]
    data = request.get_json()
    client.table("Cliente").update(data).eq("id",id).execute()
    return "modificado exitosamente"


if __name__ == "__main__":
    # Inicia la aplicación Flask
    app.run(debug=True)
