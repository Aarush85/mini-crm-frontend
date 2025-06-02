import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Send as SendIcon, 
  Calendar, 
  Users, 
  MessageSquare, 
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchCampaignDetails();
  }, [id]);

  const fetchCampaignDetails = async () => {
    try {
      setLoading(true);
      // In a real implementation, we'd call the actual API endpoint
      const response = await axios.get(`/campaigns/${id}`);
      
      // Mock data for demo
      // await new Promise(resolve => setTimeout(resolve, 1000));
      
      // const mockCampaign = {
      //   _id: id,
      //   name: 'Summer Promotion',
      //   description: 'Special discounts for summer season',
      //   status: 'draft',
      //   segmentRules: [
      //     { field: 'location', operator: 'equals', value: 'New York', logicOperator: 'AND' },
      //     { field: 'totalSpendings', operator: 'greaterThan', value: 1000 }
      //   ],
      //   message: 'Hello valued customer!\n\nWe\'re excited to announce our summer promotion with special discounts just for you. As one of our premium customers in New York who has shown continued support, we want to offer you 20% off your next purchase.\n\nSimply use code SUMMER20 at checkout to redeem your discount.\n\nThank you for your loyalty!\n\nBest regards,\nThe MiniCRM Team',
      //   targetAudience: 25,
      //   delivered: 0,
      //   failed: 0,
      //   createdAt: '2023-01-15T10:30:00Z',
      //   scheduledFor: null,
      //   sentAt: null,
      //   communicationLog: [],
      // };
      // console.log(response.data);
      setCampaign(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching campaign details:', err);
      setError('Failed to load campaign details');
      setLoading(false);
    }
  };

  const handleEdit = () => {
    // In a real implementation, navigate to edit page
    // This is simplified for the demo
    alert('Edit functionality would open here');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      try {
        // In a real implementation, we'd call the actual API endpoint
        // await axios.delete(`/campaigns/${id}`);
        
        navigate('/campaigns');
      } catch (err) {
        console.error('Error deleting campaign:', err);
        alert('Failed to delete campaign');
      }
    }
  };

  const handleSendCampaign = async () => {
    if (window.confirm('Are you sure you want to send this campaign now? This action cannot be undone.')) {
      try {
        setSending(true);
        // In a real implementation, we'd call the actual API endpoint
        // await axios.post(`/campaigns/${id}/send`);
        
        // Mock sending
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Update campaign status
        setCampaign({
          ...campaign,
          status: 'sent',
          sentAt: new Date().toISOString(),
          delivered: Math.round(campaign.targetAudience * 0.9),
          failed: Math.round(campaign.targetAudience * 0.1),
          communicationLog: Array.from({ length: campaign.targetAudience }, (_, i) => ({
            customerId: `customer${i+1}`,
            status: Math.random() < 0.9 ? 'delivered' : 'failed',
            deliveredAt: Math.random() < 0.9 ? new Date().toISOString() : null,
          })),
        });
        
        setSending(false);
      } catch (err) {
        console.error('Error sending campaign:', err);
        alert('Failed to send campaign');
        setSending(false);
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/campaigns" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Details</h1>
        </div>
        
        <div className="flex space-x-2">
          {campaign.status === 'draft' && (
            <>
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="h-4 w-4 mr-1.5" />
                Edit
              </button>
              <button
                onClick={handleSendCampaign}
                disabled={sending}
                className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <SendIcon className="h-4 w-4 mr-1.5" />
                {sending ? 'Sending...' : 'Send Now'}
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4 mr-1.5" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Campaign Overview Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{campaign.name}</h2>
              <p className="mt-1 text-sm text-gray-500">{campaign.description}</p>
            </div>
            
            <div>
              {campaign.status === 'draft' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <span className="h-2 w-2 mr-1 rounded-full bg-gray-400"></span>
                  Draft
                </span>
              )}
              {campaign.status === 'scheduled' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Clock className="h-3 w-3 mr-1" />
                  Scheduled
                </span>
              )}
              {campaign.status === 'sent' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Sent
                </span>
              )}
              {campaign.status === 'failed' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <XCircle className="h-3 w-3 mr-1" />
                  Failed
                </span>
              )}
            </div>
          </div>
          
          {/* Dates */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-md p-3">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Created</h3>
                  <p className="text-sm text-gray-500">{formatDate(campaign.createdAt)}</p>
                </div>
              </div>
            </div>
            
            {campaign.status === 'scheduled' && campaign.scheduledFor && (
              <div className="bg-blue-50 rounded-md p-3">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-900">Scheduled For</h3>
                    <p className="text-sm text-blue-500">{formatDate(campaign.scheduledFor)}</p>
                  </div>
                </div>
              </div>
            )}
            
            {campaign.status === 'sent' && campaign.sentAt && (
              <div className="bg-green-50 rounded-md p-3">
                <div className="flex items-start">
                  <SendIcon className="h-5 w-5 text-green-400 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-900">Sent At</h3>
                    <p className="text-sm text-green-500">{formatDate(campaign.sentAt)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Target Audience */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Target Audience</h3>
            <div className="mt-2 flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium">{campaign.targetAudience} customers</span>
            </div>
            <div className="mt-3 space-y-3">
              {campaign.segmentRules.map((rule, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded mr-2">
                      {rule.logicOperator}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-blue-50 text-blue-800 text-sm rounded-md">
                    {rule.field.charAt(0).toUpperCase() + rule.field.slice(1)} 
                    {' '}
                    <span className="text-blue-600">
                      {rule.operator === 'equals' ? 'is' : 
                       rule.operator === 'contains' ? 'contains' :
                       rule.operator === 'startsWith' ? 'starts with' :
                       rule.operator === 'endsWith' ? 'ends with' :
                       rule.operator === 'greaterThan' ? 'greater than' :
                       rule.operator === 'lessThan' ? 'less than' : rule.operator}
                    </span>
                    {' '}
                    <strong>"{rule.value}"</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Campaign Performance (only for sent campaigns) */}
          {campaign.status === 'sent' && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Delivery Rate</h4>
                  <div className="flex items-center mb-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${(campaign.delivered / campaign.targetAudience) * 100}%` }}
                      ></div>
                    </div>
                    <div className="ml-2 text-sm font-medium text-gray-900">
                      {Math.round((campaign.delivered / campaign.targetAudience) * 100)}%
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Delivered: {campaign.delivered}</span>
                    <span>Failed: {campaign.failed}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Message Preview */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Message Preview</h3>
            <div className="mt-2 border border-gray-200 rounded-md bg-white p-4 shadow-sm">
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <div className="flex-1">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                    {campaign.message}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;