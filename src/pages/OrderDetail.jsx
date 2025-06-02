import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Package, DollarSign as Dollar, Calendar, User } from 'lucide-react';
import axios from 'axios';

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // In a real implementation, we'd call the actual API endpoint
      // const response = await axios.get(`/orders/${id}`);
      
      // Mock data for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockOrder = {
        _id: id,
        orderId: 'ORD-001',
        customerId: {
          _id: '1',
          name: 'Jane Cooper',
          email: 'jane@example.com',
          phone: '(123) 456-7890',
          location: 'New York',
        },
        items: ['Product A', 'Product B'],
        price: 350,
        notes: 'Express delivery requested',
        createdAt: '2023-01-15T10:30:00Z',
      };
      
      setOrder(mockOrder);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Failed to load order details');
      setLoading(false);
    }
  };

  const handleEdit = () => {
    // In a real implementation, navigate to edit page or open modal
    alert('Edit functionality would open here');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      try {
        // In a real implementation, we'd call the actual API endpoint
        // await axios.delete(`/orders/${id}`);
        
        navigate('/orders');
      } catch (err) {
        console.error('Error deleting order:', err);
        alert('Failed to delete order');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <Link to="/orders" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
      </div>

      {/* Order Overview Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{order.orderId}</h2>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1.5" />
                {formatDate(order.createdAt)}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="h-4 w-4 mr-1.5" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4 mr-1.5" />
                Delete
              </button>
            </div>
          </div>
          
          {/* Order Price */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Order Total</h3>
            <div className="flex items-center">
              <Dollar className="h-6 w-6 text-green-500 mr-2" />
              <p className="text-3xl font-bold text-green-600">${order.price.toLocaleString()}</p>
            </div>
          </div>
          
          {/* Customer Info */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Customer</h3>
            <div className="mt-2 bg-gray-50 rounded-md p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3">
                  <Link to={`/customers/${order.customerId._id}`} className="text-md font-medium text-blue-600 hover:text-blue-800">
                    {order.customerId.name}
                  </Link>
                  <p className="text-sm text-gray-500">{order.customerId.email}</p>
                  <p className="text-sm text-gray-500">{order.customerId.phone}</p>
                  <p className="text-sm text-gray-500">{order.customerId.location}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Items */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Items</h3>
            <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
              {order.items.map((item, index) => (
                <li key={index} className="px-4 py-3 flex items-center">
                  <Package className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Notes */}
          {order.notes && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
              <p className="mt-2 text-sm text-gray-500">
                {order.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;