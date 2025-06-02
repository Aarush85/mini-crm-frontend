import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, ShoppingBag, Phone, Mail, MapPin, Tag, Plus, Calendar } from 'lucide-react';
import axios from 'axios';

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      setLoading(true);
      // In a real implementation, we'd call the actual API endpoint
      // const response = await axios.get(`/customers/${id}`);
      
      // Mock data for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCustomer = {
        _id: id,
        name: 'Jane Cooper',
        email: 'jane@example.com',
        phone: '(123) 456-7890',
        location: 'New York',
        tags: ['Premium', 'Active'],
        notes: 'Key client with multiple large orders. Prefers email contact.',
        totalSpendings: 1240,
      };
      
      const mockOrders = [
        { _id: '1', orderId: 'ORD-001', price: 350, createdAt: '2023-01-15T10:30:00Z', items: ['Product A', 'Product B'] },
        { _id: '2', orderId: 'ORD-002', price: 720, createdAt: '2023-01-14T14:45:00Z', items: ['Product C'] },
        { _id: '3', orderId: 'ORD-003', price: 170, createdAt: '2022-12-20T09:15:00Z', items: ['Product A'] },
      ];
      
      setCustomer(mockCustomer);
      setOrders(mockOrders);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching customer details:', err);
      setError('Failed to load customer details');
      setLoading(false);
    }
  };

  const handleEdit = () => {
    // In a real implementation, navigate to edit page or open modal
    alert('Edit functionality would open here');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      try {
        // In a real implementation, we'd call the actual API endpoint
        // await axios.delete(`/customers/${id}`);
        
        navigate('/customers');
      } catch (err) {
        console.error('Error deleting customer:', err);
        alert('Failed to delete customer');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
        <Link to="/customers" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
      </div>

      {/* Customer Overview Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{customer.name}</h2>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-1.5" />
                {customer.email}
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-1.5" />
                {customer.phone}
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1.5" />
                {customer.location}
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
          
          {/* Total Spending */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Spending</h3>
            <p className="text-3xl font-bold text-blue-600">${customer.totalSpendings.toLocaleString()}</p>
          </div>
          
          {/* Tags */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
              <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                <Plus className="h-4 w-4 mr-1" />
                Add Tag
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {customer.tags && customer.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
              {(!customer.tags || customer.tags.length === 0) && (
                <span className="text-sm text-gray-500">No tags added yet</span>
              )}
            </div>
          </div>
          
          {/* Notes */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
            <p className="mt-2 text-sm text-gray-500">
              {customer.notes || 'No notes added yet.'}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link
              to={`/orders?customerId=${customer._id}`}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No orders found for this customer.
            </div>
          ) : (
            orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block hover:bg-gray-50"
              >
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                        <div className="text-sm text-gray-500">{order.items.join(', ')}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm text-right">
                        <div className="font-medium text-gray-900">${order.price.toLocaleString()}</div>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;