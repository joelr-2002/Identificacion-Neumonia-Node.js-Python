from keras_preprocessing import image
from keras.models import load_model
from keras.applications.vgg16 import preprocess_input
import numpy as np
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, 'our_model.h5')

#Se le pedirá al usuario que ingrese la dirección de la imagen a predecir
img_path = input('Resultados: ')

model=load_model(model_path) #Loading our model
img=image.load_img(img_path,target_size=(224,224))
imagee=image.img_to_array(img) #Converting the X-Ray into pixels
imagee=np.expand_dims(imagee, axis=0)
img_data=preprocess_input(imagee)
prediction=model.predict(img_data)
if prediction[0][0]>prediction[0][1]: #Printing the prediction of model.
	print('La persona esta sana.')
else:
	print('La persona tiene Neumonia.')
print(f'Prediccion: {prediction}')