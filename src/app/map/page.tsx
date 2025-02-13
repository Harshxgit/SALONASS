"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin } from 'lucide-react';

const AddressForm = ({ city = 'New York' }) => {
  const [formData, setFormData] = useState({
    streetAddress: '',
    zipCode: '',
    neighborhood: '',
    latitude: '',
    longitude: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const getLocation = () => {
    setIsLocating(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding using OpenStreetMap Nominatim API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          // Extract address components
          const address = {
            streetAddress: [data.address.road, data.address.house_number]
              .filter(Boolean)
              .join(' '),
            zipCode: data.address.postcode || '',
            neighborhood: data.address.suburb || data.address.neighbourhood || '',
            latitude: latitude.toString(),
            longitude: longitude.toString()
          };

          setFormData(address);
          setIsLocating(false);
        } catch (err) {
          setError('Failed to fetch address details');
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Please allow location access to use this feature');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information unavailable');
            break;
          case error.TIMEOUT:
            setError('Location request timed out');
            break;
          default:
            setError('An unknown error occurred');
        }
      }
    );
  };

  console.log(formData)
  // Function to validate ZIP code format
  const isValidZipCode = (zipCode: string) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.streetAddress || !formData.zipCode) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isValidZipCode(formData.zipCode)) {
      setError('Please enter a valid ZIP code');
      return;
    }

    try {
      // Here you would typically make an API call to save the address
      // await fetch('/api/addresses', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, city }),
      // });

      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        streetAddress: '',
        zipCode: '',
        neighborhood: '',
        latitude: '',
        longitude: ''
      });
    } catch (err) {
      setError('Failed to save address. Please try again.');
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Add Address in {city}</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Button 
            type="button" 
            onClick={getLocation}
            disabled={isLocating}
            className="w-full mb-4"
          >
            <MapPin className="mr-2 h-4 w-4" />
            {isLocating ? 'Getting Location...' : 'Use My Current Location'}
          </Button>

          {formData.latitude && formData.longitude && (
            <div className="mb-4 aspect-video relative">
              <img 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${formData.longitude},${formData.latitude}&layer=mapnik&marker=${formData.latitude},${formData.longitude}`}
                alt="Location Map"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          )}

          <div>
            <label htmlFor="streetAddress" className="block text-sm font-medium mb-1">
              Street Address *
            </label>
            <Input
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="Enter street address"
              required
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
              ZIP Code *
            </label>
            <Input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Enter ZIP code"
              required
            />
          </div>

          <div>
            <label htmlFor="neighborhood" className="block text-sm font-medium mb-1">
              Neighborhood
            </label>
            <Input
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              placeholder="Enter neighborhood (optional)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="hidden"
              name="latitude"
              value={formData.latitude}
            />
            <Input
              type="hidden"
              name="longitude"
              value={formData.longitude}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>Address saved successfully!</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full">
            Save Address
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddressForm;