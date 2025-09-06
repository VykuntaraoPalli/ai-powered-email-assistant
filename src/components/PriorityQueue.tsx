import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Zap, Clock, AlertTriangle, CheckCircle, Play, Pause, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { mockEmails, EmailType } from '../data/mockData';

export default function PriorityQueue() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [processedEmails, setProcessedEmails] = useState<string[]>([]);
  const [currentProcessing, setCurrentProcessing] = useState<string | null>(null);

  // Sort emails by priority (urgent first) and then by time
  const queuedEmails = mockEmails
    .filter(email => email.status === 'pending' || email.status === 'processing')
    .sort((a, b) => {
      if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
      if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
      return new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime();
    });

  const urgentEmails = queuedEmails.filter(email => email.priority === 'urgent');
  const normalEmails = queuedEmails.filter(email => email.priority === 'normal');

  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      const pendingEmails = queuedEmails.filter(email => !processedEmails.includes(email.id));
      if (pendingEmails.length === 0) {
        setIsProcessing(false);
        setCurrentProcessing(null);
        return;
      }

      const nextEmail = pendingEmails[0];
      setCurrentProcessing(nextEmail.id);

      setTimeout(() => {
        setProcessedEmails(prev => [...prev, nextEmail.id]);
        setCurrentProcessing(null);
      }, 3000);
    }, 4000);

    return () => clearInterval(interval);
  }, [isProcessing, processedEmails, queuedEmails]);

  const resetQueue = () => {
    setProcessedEmails([]);
    setCurrentProcessing(null);
    setIsProcessing(true);
  };

  const getEmailStatus = (email: EmailType) => {
    if (currentProcessing === email.id) return 'processing';
    if (processedEmails.includes(email.id)) return 'completed';
    return 'waiting';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'waiting': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'waiting': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = () => {
    const totalEmails = queuedEmails.length;
    const completed = processedEmails.length;
    return totalEmails > 0 ? (completed / totalEmails) * 100 : 0;
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
                <h1 className="text-3xl font-bold text-gray-900">Priority Queue</h1>
                <p className="mt-1 text-gray-600">Real-time email processing based on urgency</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsProcessing(!isProcessing)}
                disabled={processedEmails.length === queuedEmails.length}
              >
                {isProcessing ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isProcessing ? 'Pause' : 'Resume'}
              </Button>
              <Button variant="outline" onClick={resetQueue}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Queue
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span>Queue Processing Status</span>
                </div>
                <Badge variant={isProcessing ? "default" : "secondary"}>
                  {isProcessing ? 'Processing' : 'Paused'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress: {processedEmails.length} of {queuedEmails.length} emails processed</span>
                  <span>{calculateProgress().toFixed(1)}% complete</span>
                </div>
                <Progress value={calculateProgress()} className="h-3" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-600">{urgentEmails.length}</div>
                    <div className="text-sm text-gray-600">Urgent</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{normalEmails.length}</div>
                    <div className="text-sm text-gray-600">Normal</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{processedEmails.length}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{currentProcessing ? 1 : 0}</div>
                    <div className="text-sm text-gray-600">Processing</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Queue Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Urgent Queue */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Urgent Priority Queue ({urgentEmails.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AnimatePresence>
                  {urgentEmails.map((email, index) => {
                    const status = getEmailStatus(email);
                    return (
                      <motion.div
                        key={email.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                          status === 'processing' ? 'bg-yellow-50 border-yellow-200' :
                          status === 'completed' ? 'bg-green-50 border-green-200' :
                          'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              {getStatusIcon(status)}
                              <Badge className={getStatusColor(status)} size="sm">
                                {status}
                              </Badge>
                              <span className="text-xs text-gray-500">#{index + 1} in queue</span>
                            </div>
                            <h4 className="font-medium text-sm truncate">{email.subject}</h4>
                            <p className="text-xs text-gray-500">{email.sender} • {formatTime(email.receivedAt)}</p>
                          </div>
                          <Link to={`/email/${email.id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {urgentEmails.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No urgent emails in queue</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Normal Queue */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-600">
                  <Clock className="h-5 w-5" />
                  <span>Normal Priority Queue ({normalEmails.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AnimatePresence>
                  {normalEmails.map((email, index) => {
                    const status = getEmailStatus(email);
                    const queuePosition = urgentEmails.length + index + 1;
                    return (
                      <motion.div
                        key={email.id}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                          status === 'processing' ? 'bg-yellow-50 border-yellow-200' :
                          status === 'completed' ? 'bg-green-50 border-green-200' :
                          'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              {getStatusIcon(status)}
                              <Badge className={getStatusColor(status)} size="sm">
                                {status}
                              </Badge>
                              <span className="text-xs text-gray-500">#{queuePosition} in queue</span>
                            </div>
                            <h4 className="font-medium text-sm truncate">{email.subject}</h4>
                            <p className="text-xs text-gray-500">{email.sender} • {formatTime(email.receivedAt)}</p>
                          </div>
                          <Link to={`/email/${email.id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {normalEmails.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No normal priority emails in queue</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}