import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, BarChart3, PieChart, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { analyticsData } from '../data/mockData';

export default function Analytics() {
  const totalEmailsThisWeek = analyticsData.emailVolume.reduce((acc, day) => acc + day.emails, 0);
  const totalResolvedThisWeek = analyticsData.emailVolume.reduce((acc, day) => acc + day.resolved, 0);
  const resolutionRate = ((totalResolvedThisWeek / totalEmailsThisWeek) * 100).toFixed(1);
  const averageResponseTime = '2.4 hours';

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
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="mt-1 text-gray-600">Insights into email performance and AI efficiency</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Last 7 days</span>
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Emails</p>
                    <p className="text-2xl font-bold text-gray-900">{totalEmailsThisWeek}</p>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-full text-white">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                    <p className="text-2xl font-bold text-green-600">{resolutionRate}%</p>
                  </div>
                  <div className="bg-green-500 p-3 rounded-full text-white">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                    <p className="text-2xl font-bold text-blue-600">{averageResponseTime}</p>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-full text-white">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
                    <p className="text-2xl font-bold text-purple-600">94.2%</p>
                  </div>
                  <div className="bg-purple-500 p-3 rounded-full text-white">
                    <PieChart className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Volume Chart */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Email Volume Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.emailVolume}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="emails" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Total Emails"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="resolved" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Resolved"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sentiment Distribution */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={analyticsData.sentimentDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {analyticsData.sentimentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Email Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.categoryDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Insights */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">87%</div>
                  <div className="text-sm text-gray-600">Response Accuracy Rate</div>
                  <div className="text-xs text-gray-500 mt-1">Based on user feedback</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">1.8s</div>
                  <div className="text-sm text-gray-600">Avg AI Processing Time</div>
                  <div className="text-xs text-gray-500 mt-1">Per email analysis</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">76%</div>
                  <div className="text-sm text-gray-600">Auto-Response Success</div>
                  <div className="text-xs text-gray-500 mt-1">Sent without manual edit</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}