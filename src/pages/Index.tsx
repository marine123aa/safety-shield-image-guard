
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the first tab
    navigate('/create-prompts');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Image Appropriateness Verification</h1>
        <p className="text-xl text-gray-600">Loading application...</p>
      </div>
    </div>
  );
};

export default Index;
