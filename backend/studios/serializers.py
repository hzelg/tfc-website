from rest_framework import serializers
from studios.models import Studio, Amenity, StudioImage

class AmenitySerializer(serializers.ModelSerializer):
  class Meta:
    model = Amenity
    fields = ['type']
class ImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = StudioImage
    fields = ['upload']

class StudioSerializer(serializers.ModelSerializer):
  amenity_set = AmenitySerializer(many=True, read_only=True)
  image_set = ImageSerializer(source="studioimage_set", many=True, read_only=True)

  class Meta:
    model = Studio
    fields = ['id', 'name', 'address', 'location', 'postal_code', 'phone', 'amenity_set', 'image_set']