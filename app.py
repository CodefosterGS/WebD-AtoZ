from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)

#db = yaml.load(open('database.yaml'))

app.config['MYSQL_HOST'] = 'us-cdbr-east-02.cleardb.com'
app.config['MYSQL_USER'] = 'bf04dd86d27fef'
app.config['MYSQL_PASSWORD'] = '22494d04'
app.config['MYSQL_DB'] = 'heroku_b9505fd00ad0726'

mysql = MySQL(app)
CORS(app)

@app.route('/')
def index():
    return jsonify({
            'status': 'Welcome to BlogsBook!',
        })

@app.route('/blogs', methods=['POST', 'GET'])
def blogs():
    
    # POST a blog to database
    if request.method == 'POST':
        body = request.json
        #blog = body['blog']
        
        cursor = mysql.connection.cursor()
        print(body['title'])
        cursor.execute('INSERT INTO blogs (title,publisher,text) VALUES(%s,%s,%s)', (body['title'],body['publisher'],body['text']))
        mysql.connection.commit()
        cursor.close()
        return jsonify({
            'status': 'Blog is posted to MySQL!',
            'blog': 'done',
        })
    
    # GET all blog from database
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM blogs')
        blogs = cursor.fetchall()
        allBlog = []

        for i in range(len(blogs)):
            id = blogs[i][0]
            title = blogs[i][1]
            text = blogs[i][2]
            publisher = blogs[i][3]
            likes = blogs[i][4]
            dislikes = blogs[i][5]
            dataDict = {
                "id": id,
                "title": title,
                "text": text,
                "publisher": publisher,
                "likes": likes,
                "dislikes": dislikes
            }
            allBlog.append(dataDict)

        return jsonify(allBlog)

@app.route('/like/<string:id>', methods=['GET'])
def like(id):
      body = request.json
      cursor = mysql.connection.cursor()
      query = "UPDATE blogs SET likes=likes+1 WHERE id={id}".format(id=id)
      cursor.execute(query)
      mysql.connection.commit()
      cursor.close()
      return jsonify({'status': 'Blog is liked!'})

@app.route('/dislike/<string:id>', methods=['GET'])
def dislike(id):
      body = request.json
      cursor = mysql.connection.cursor()
      query = "UPDATE blogs SET dislikes=dislikes+1 WHERE id={id}".format(id=id)
      cursor.execute(query)
      mysql.connection.commit()
      cursor.close()
      return jsonify({'status': 'Blog is disliked!'})

@app.route('/stats/<string:id>', methods=['GET'])
def stats(id):
      body = request.json
      cursor = mysql.connection.cursor()
      query = "SELECT id, likes, dislikes FROM blogs WHERE id = {id}".format(id=id)
      cursor.execute(query)
      blogs = cursor.fetchall()
      print(blogs)
      id = blogs[0][0]
      like = blogs[0][1]
      dislike = blogs[0][2]
      dataDict = {
        "id": id,
        "like": like,
        "dislike": dislike,
      }

      cursor.close()
      return jsonify(dataDict)
      

if __name__ == '__main__':
    app.run(debug = True)
