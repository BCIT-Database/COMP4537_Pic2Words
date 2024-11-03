from flask import request, Flask
from transformers import pipeline
from PIL import Image
import io

app = Flask(__name__)

pipe = pipeline("image-to-text",
                model="Salesforce/blip-image-captioning-large")


@app.route("/")
def hello():
    return "blip python server is running!"


@app.route('/generate-caption', methods=['POST'])
def generate_caption():
    if 'image' not in request.files:
        return "No image file provided", 400

    image_file = request.files['image']
    image = Image.open(io.BytesIO(image_file.read()))

    try:
        result = pipe(image)
        return result
    except Exception as e:
        return str(e), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=False)
