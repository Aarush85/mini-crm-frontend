import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { user, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Mini CRM Platform
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your CRM dashboard
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <div className="flex justify-center">
            <a
              href="http://localhost:5000/api/auth/google"
              className="bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Sign in with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
