from flask import Flask, request, jsonify
from pydub import AudioSegment
import os
from flask_cors import CORS, cross_origin
import redis
import json
client = redis.Redis(host='localhost', port=6379, db=0)
import whisper
import requests

def transcribe_audio_whisper(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    return result["text"]

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/convert', methods=['POST'])
@cross_origin()
def convert_audio_to_text():

    if('userId' not in request.form.keys()):
        return jsonify({"error": "No userId provided"}), 400

    userId = request.form['userId']

    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    audio_file_path = "temp_audio." + audio_file.filename.split('.')[-1]
    audio_file.save(audio_file_path)

    wav_file_path = "temp_audio.wav"

    try:
        audio = AudioSegment.from_file(audio_file_path)
        audio.export(wav_file_path, format="wav")

        text = transcribe_audio_whisper(wav_file_path)

        client.rpush('summarize', json.dumps({"userId": userId,"text": text}))

        return jsonify({"message": "Your notes are being prepared, hang tight!"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(audio_file_path):
            os.remove(audio_file_path)
        if os.path.exists(wav_file_path):
            os.remove(wav_file_path)

if __name__ == '__main__':
    app.run(debug=True)