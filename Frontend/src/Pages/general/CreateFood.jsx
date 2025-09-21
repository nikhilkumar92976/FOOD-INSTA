import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('video', formData.video);

      // Get auth token from localStorage
      const authToken = localStorage.getItem('authToken');

      // Make API call to create food item
      const response = await fetch('http://localhost:3000/api/food', {
        method: 'POST',
        body: submitData,
        credentials: 'include', // Include cookies
        headers: {
          // Add Authorization header if token exists and is not just a flag
          ...(authToken && authToken !== 'true' && authToken !== 'foodpartner_authenticated'
            ? { 'Authorization': `Bearer ${authToken}` }
            : {})
        }
      });

      if (!response.ok) {
        throw new Error('Failed to create food item');
      }

      const result = await response.json();
      console.log('Food item created successfully:', result);

      // Navigate back to food partner profile
      navigate('/food-partner-profile');
    } catch (error) {
      console.error('Error creating food item:', error);
      alert('Failed to create food item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Create Food Item</h1>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Creating...' : 'Share'}
        </button>
      </div>

      {/* Form */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Food Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter food name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Describe your delicious food..."
            />
          </div>



          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Food Video *</label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
              <input
                type="file"
                name="video"
                onChange={handleFileChange}
                accept="video/*"
                required
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 mb-2">Click to upload video</p>
                <p className="text-xs text-gray-500">MP4, MOV up to 100MB</p>
              </label>
              {formData.video && (
                <p className="text-green-400 text-sm mt-2">✓ {formData.video.name}</p>
              )}
            </div>
          </div>



          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Creating Food Item...' : 'Create Food Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
