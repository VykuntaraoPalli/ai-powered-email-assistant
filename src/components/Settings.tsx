import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Brain, Shield, Bell, Database, Save, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

export default function Settings() {
  const [settings, setSettings] = useState({
    emailProvider: 'gmail',
    apiKey: 'sk-...hidden',
    autoResponse: true,
    urgentKeywords: 'urgent, critical, asap, immediately, emergency',
    sentimentThreshold: '0.7',
    responseTemplate: 'professional',
    notificationsEnabled: true,
    batchSize: '10',
    processingInterval: '30',
    knowledgeBase: true,
    dataRetention: '90'
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Simulate saving settings
    setSaved(true);
    toast.success('Settings saved successfully!');
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="mt-1 text-gray-600">Configure AI assistant and email processing preferences</p>
              </div>
            </div>
            <Button onClick={handleSave} className="flex items-center space-x-2">
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              <span>{saved ? 'Saved' : 'Save Changes'}</span>
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Email Integration */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>Email Integration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emailProvider">Email Provider</Label>
                  <Select value={settings.emailProvider} onValueChange={(value) => updateSetting('emailProvider', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmail">Gmail</SelectItem>
                      <SelectItem value="outlook">Outlook</SelectItem>
                      <SelectItem value="imap">Custom IMAP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={settings.apiKey}
                    onChange={(e) => updateSetting('apiKey', e.target.value)}
                    placeholder="Enter your API key"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Auto-Response Enabled</Label>
                  <p className="text-sm text-gray-500">Automatically send AI-generated responses</p>
                </div>
                <Switch
                  checked={settings.autoResponse}
                  onCheckedChange={(checked) => updateSetting('autoResponse', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Configuration */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="urgentKeywords">Urgent Keywords</Label>
                <Input
                  id="urgentKeywords"
                  value={settings.urgentKeywords}
                  onChange={(e) => updateSetting('urgentKeywords', e.target.value)}
                  placeholder="Keywords that trigger urgent priority"
                />
                <p className="text-sm text-gray-500">Comma-separated list of keywords that mark emails as urgent</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sentimentThreshold">Sentiment Threshold</Label>
                  <Select value={settings.sentimentThreshold} onValueChange={(value) => updateSetting('sentimentThreshold', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">Low (0.5)</SelectItem>
                      <SelectItem value="0.7">Medium (0.7)</SelectItem>
                      <SelectItem value="0.9">High (0.9)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Confidence threshold for sentiment analysis</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responseTemplate">Response Template</Label>
                  <Select value={settings.responseTemplate} onValueChange={(value) => updateSetting('responseTemplate', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Knowledge Base Integration</Label>
                  <p className="text-sm text-gray-500">Use RAG for context-aware responses</p>
                </div>
                <Switch
                  checked={settings.knowledgeBase}
                  onCheckedChange={(checked) => updateSetting('knowledgeBase', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Processing Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-green-600" />
                <span>Processing Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batchSize">Batch Size</Label>
                  <Select value={settings.batchSize} onValueChange={(value) => updateSetting('batchSize', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 emails</SelectItem>
                      <SelectItem value="10">10 emails</SelectItem>
                      <SelectItem value="25">25 emails</SelectItem>
                      <SelectItem value="50">50 emails</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Number of emails to process simultaneously</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="processingInterval">Processing Interval</Label>
                  <Select value={settings.processingInterval} onValueChange={(value) => updateSetting('processingInterval', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">How often to check for new emails</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention (days)</Label>
                <Input
                  id="dataRetention"
                  type="number"
                  value={settings.dataRetention}
                  onChange={(e) => updateSetting('dataRetention', e.target.value)}
                  placeholder="90"
                />
                <p className="text-sm text-gray-500">How long to keep processed email data</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-yellow-600" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-500">Get notified about urgent emails and processing status</p>
                </div>
                <Switch
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(checked) => updateSetting('notificationsEnabled', checked)}
                />
              </div>

              <div className="space-y-3">
                <Label>Notification Preferences</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Urgent emails received</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Processing queue errors</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Daily summary reports</span>
                    <Badge variant="secondary">Disabled</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>Security & Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Data Privacy Notice</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      All email data is encrypted and processed securely. Personal information is automatically redacted 
                      from AI training data. Email content is retained only as long as specified in retention settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">End-to-end encryption</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">PII redaction</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Audit logging</span>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}