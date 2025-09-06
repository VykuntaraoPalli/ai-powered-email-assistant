import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Mail, AlertTriangle, Clock, CheckCircle, BarChart3, Settings, Filter, Search, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockEmails, EmailType } from '../data/mockData';
import EmailCard from './EmailCard';
import StatsCard from './StatsCard';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterSentiment, setFilterSentiment] = useState('all');

  const filteredEmails = mockEmails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || email.priority === filterPriority;
    const matchesSentiment = filterSentiment === 'all' || email.sentiment === filterSentiment;
    
    return matchesSearch && matchesPriority && matchesSentiment;
  });

  const urgentEmails = filteredEmails.filter(email => email.priority === 'urgent');
  const totalEmails = mockEmails.length;
  const resolvedEmails = mockEmails.filter(email => email.status === 'resolved').length;
  const pendingEmails = mockEmails.filter(email => email.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <motion.div 
        className="bg-white shadow-sm border-b"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Communication Assistant</h1>
              <p className="mt-1 text-gray-600">Intelligent email management and automated responses</p>
            </div>
            <div className="flex space-x-3">
              <Link to="/priority-queue">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Priority Queue</span>
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatsCard
            title="Total Emails (24h)"
            value={totalEmails}
            icon={<Mail className="h-6 w-6" />}
            color="bg-blue-500"
            delay={0.1}
          />
          <StatsCard
            title="Urgent Emails"
            value={urgentEmails.length}
            icon={<AlertTriangle className="h-6 w-6" />}
            color="bg-red-500"
            delay={0.2}
          />
          <StatsCard
            title="Resolved"
            value={resolvedEmails}
            icon={<CheckCircle className="h-6 w-6" />}
            color="bg-green-500"
            delay={0.3}
          />
          <StatsCard
            title="Pending"
            value={pendingEmails}
            icon={<Clock className="h-6 w-6" />}
            color="bg-yellow-500"
            delay={0.4}
          />
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Filters</span>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterSentiment} onValueChange={setFilterSentiment}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiment</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Email List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Support Emails ({filteredEmails.length})</span>
                <Badge variant="secondary">
                  {urgentEmails.length} urgent
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredEmails.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No emails match your current filters</p>
                </div>
              ) : (
                filteredEmails.map((email, index) => (
                  <motion.div
                    key={email.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <EmailCard email={email} />
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}