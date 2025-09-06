import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Edit3, Copy, CheckCircle, AlertTriangle, User, Clock, Phone, Mail, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { mockEmails } from '../data/mockData';

export default function EmailDetails() {
  const { id } = useParams<{ id: string }>();
  const email = mockEmails.find(e => e.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [aiResponse, setAiResponse] = useState(email?.aiResponse || '');

  if (!email) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Not Found</h2>
          <Link to="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleSendResponse = () => {
    toast.success('Email response sent successfully!');
    // In a real app, this would send the email
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(aiResponse);
    toast.success('Response copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <motion.div 
        className="bg-white shadow-sm border-b"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Email Details</h1>
                <p className="text-sm text-gray-600">AI-powered analysis and response generation</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getPriorityColor(email.priority)}>
                {email.priority}
                {email.priority === 'urgent' && <AlertTriangle className="h-3 w-3 ml-1" />}
              </Badge>
              <Badge className={getSentimentColor(email.sentiment)}>
                {email.sentiment}
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Original Email */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Original Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{email.sender}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{formatDateTime(email.receivedAt)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">{email.subject}</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-gray-700">{email.body}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Extracted Information</h4>
                  <div className="space-y-3">
                    {email.extractedInfo.contactDetails && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{email.extractedInfo.contactDetails}</span>
                      </div>
                    )}
                    
                    {email.extractedInfo.requirements && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Requirements:</span>
                        <ul className="mt-1 ml-4 text-sm text-gray-700">
                          {email.extractedInfo.requirements.map((req, index) => (
                            <li key={index} className="list-disc">{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {email.extractedInfo.keywords && (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Tag className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-600">Keywords:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {email.extractedInfo.keywords.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Response */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>AI-Generated Response</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? 'Preview' : 'Edit'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <Textarea
                    value={aiResponse}
                    onChange={(e) => setAiResponse(e.target.value)}
                    rows={15}
                    className="resize-none"
                  />
                ) : (
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                    <p className="whitespace-pre-wrap text-gray-700">{aiResponse}</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button onClick={handleSendResponse} className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Send Response
                  </Button>
                  <Button variant="outline" onClick={handleCopyResponse}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                  <p><strong>AI Analysis:</strong> This response was generated based on sentiment analysis ({email.sentiment}), 
                  priority level ({email.priority}), and extracted requirements. The tone is 
                  {email.sentiment === 'negative' ? ' empathetic and solution-focused' : 
                   email.sentiment === 'positive' ? ' enthusiastic and helpful' : 
                   ' professional and informative'}.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}