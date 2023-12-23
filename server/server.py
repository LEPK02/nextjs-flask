from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2 import sql
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

def generateResponse(ls):
    response = jsonify(ls)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def generateErrorResponse(ls, error_code):
    response = generateResponse(ls)
    response.status_code = error_code
    return response

app = Flask(__name__)
CORS(app)
load_dotenv()
API = os.getenv('API')

def getConnectionAndCursor():
    conn = psycopg2.connect(
        database=os.getenv('POSTGRES_DB'),
        user=os.getenv('POSTGRES_USER'),
        password=os.getenv('POSTGRES_PASSWORD')
    )
    return conn, conn.cursor(cursor_factory=RealDictCursor)

# GET: Fetch all patient information
@app.route(os.getenv('PATIENTS'), methods=['GET'])
def get_patients():
    try:
        conn, cur = getConnectionAndCursor()
        queryStr = "SELECT * FROM patients"
        queryTuple = ()
        name = request.args.get('name').strip().lower()
        currentPage = request.args.get('currentPage')

        if (name and len(str(name)) > 0):
            queryStr += " WHERE LOWER(NAME) LIKE '%%' || %s || '%%'"
            queryTuple = (name,)
            
        cur.execute(sql.SQL(queryStr)) \
            if queryTuple == () \
            else cur.execute(sql.SQL(queryStr), queryTuple)
        conn.commit()
        return generateResponse(cur.fetchall())
    except Exception as e:
        conn.rollback()
        return e, 500
    finally:
        cur.close()
        conn.close()

# GET: Fetch all records
@app.route(os.getenv('RECORDS'), methods=['GET'])
def get_records():
    try:
        conn, cur = getConnectionAndCursor()
        queryStr = "SELECT records.id, patients.name, records.patient_id, records.date, records.indicator FROM patients, records \
            WHERE patients.id = records.patient_id"
        queryTuple = ()
        patientId = int(request.args.get('patientId'))
        name = request.args.get('name').strip().lower()
        currentPage = request.args.get('currentPage')

        if (name and len(name) > 0):
            if (name.isdigit()):
                queryStr += " AND (patient_id = %s OR LOWER(name) LIKE '%%' || %s || '%%')"
                queryTuple = (int(name), name,)
            else:
                queryStr += " AND LOWER(name) LIKE '%%' || %s || '%%'"
                queryTuple = (name,)
        elif (patientId and patientId > -1):
            queryStr += " AND records.patient_id = %s"
            queryTuple = (patientId,)
            
        cur.execute(sql.SQL(queryStr)) \
            if queryTuple == () \
            else cur.execute(sql.SQL(queryStr), queryTuple)
        conn.commit()
        return generateResponse(cur.fetchall())
    except Exception as e:
        conn.rollback()
        return e, 500
    finally:
        cur.close()
        conn.close()

# GET: Fetch all records for graph
@app.route(os.getenv('GRAPH'), methods=['GET'])
def get_graph_records():
    try:
        conn, cur = getConnectionAndCursor()
        queryStr = "SELECT records.id, patients.name, records.patient_id, records.date, records.indicator FROM patients, records \
            WHERE patients.id = records.patient_id AND records.patient_id = %s"
        patientId = int(request.args.get('patientId'))
        cur.execute(sql.SQL(queryStr), (patientId,))
        conn.commit()
        return generateResponse(cur.fetchall())
    except Exception as e:
        conn.rollback()
        return e, 500
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True, port=8080)
    # port = int(os.environ.get('PORT', 8080))
    # app.run(debug=True, host='0.0.0.0', port=port)
