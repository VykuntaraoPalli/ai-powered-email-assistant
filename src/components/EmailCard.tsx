import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, AlertTriangle, User, ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { EmailType } from '../data/mockData';

interface EmailCardProps {
  email: EmailType;
}

export default function EmailCard({ email }: EmailCardProps) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing': return <Loader className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short'
    }).format(date);
  };

  return (
    <motion.div
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{email.sender}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">{formatTime(email.receivedAt)}</span>
            </div>
            {getStatusIcon(email.status)}
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 truncate">{email.subject}</h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {email.body}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className={getSentimentColor(email.sentiment)}>
              {email.sentiment}
            </Badge>
            <Badge className={getPriorityColor(email.priority)}>
              {email.priority}
              {email.priority === 'urgent' && <AlertTriangle className="h-3 w-3 ml-1" />}
            </Badge>
            <Badge variant="outline">{email.category}</Badge>
          </div>

          {email.extractedInfo.keywords && email.extractedInfo.keywords.length > 0 && (
            <div className="mb-3">
              <span className="text-xs text-gray-500">Keywords: </span>
              {email.extractedInfo.keywords.slice(0, 3).map((keyword, index) => (
                <Badge key={index} variant="secondary" className="mr-1 text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-2 ml-4">
          <Link to={`/email/${email.id}`}>
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <span>View Details</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
          {email.aiResponse && (
            <Badge variant="default" className="text-xs">
              AI Response Ready
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}