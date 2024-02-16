import numpy as np
from django.db import models
from keras.preprocessing.image import img_to_array, load_img
from tensorflow.keras.applications.inception_resnet_v2 import (
    InceptionResNetV2,
    decode_predictions,
    preprocess_input,
)


class Image(models.Model):
    picture = models.ImageField()
    classified = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'This image: {self.picture}'

    def save(self, *args, **kwargs):
        try:
            img = load_img(self.picture, target_size=(299, 299))
            img_array = img_to_array(img)
            to_predict = np.expand_dims(img_array, axis=0)
            preprocessed_img = preprocess_input(to_predict)
            model = InceptionResNetV2(weights='imagenet')
            prediction = model.predict(preprocessed_img)
            print(decode_predictions(prediction))
            decoded = decode_predictions(prediction)[0][0][1]
            self.classified = str(decoded)
        except Exception as e:
            print('something went wrong', e)
        super().save(*args, **kwargs)
