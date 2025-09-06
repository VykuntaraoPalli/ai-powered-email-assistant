export interface EmailType {
  id: string;
  sender: string;
  subject: string;
  body: string;
  receivedAt: Date;
  priority: 'urgent' | 'normal';
  sentiment: 'positive' | 'negative' | 'neutral';
  status: 'pending' | 'resolved' | 'processing';
  extractedInfo: {
    contactDetails?: string;
    requirements?: string[];
    keywords?: string[];
  };
  aiResponse?: string;
  category: string;
}

export const mockEmails: EmailType[] = [
  {
    id: '1',
    sender: 'alice@example.com',
    subject: 'Urgent request system access blocked',
    body: 'Do you support integration with third-party APIs? Specifically I\'m looking for CRM integration options. Hi team, I am unable to log into my account since yesterday. Could you please help me resolve this issue? Hello, I need assistance logging into my account since yesterday. Could you please help me resolve this issue? Despite multiple attempts, I cannot reset my password. The reset link doesn\'t seem to work.',
    receivedAt: new Date('2025-08-19T00:58:00'),
    priority: 'urgent',
    sentiment: 'negative',
    status: 'pending',
    category: 'Account Access',
    extractedInfo: {
      requirements: ['System access restoration', 'Account login resolution', 'Password reset fix'],
      keywords: ['urgent', 'blocked', 'cannot', 'reset', 'access']
    },
    aiResponse: 'Dear Alice,\n\nI understand your frustration with being unable to access your account. This is clearly urgent and I\'m prioritizing your case immediately.\n\nI\'ve identified the issue with your account and have:\n1. Unlocked your system access\n2. Reset your password manually\n3. Sent you a new secure login link\n\nRegarding CRM integration, yes we do support third-party API integrations. I\'ll have our technical team reach out to discuss your specific requirements.\n\nBest regards,\nAI Support Assistant'
  },
  {
    id: '2',
    sender: 'dean@clientco',
    subject: 'General query about subscription',
    body: 'Hi team, I am unable to log into my account since yesterday. Could you please help me resolve this issue? Hello, I need assistance logging into my account since yesterday. Could you please help me resolve this issue? There is a billing error where I was charged twice. This needs immediate correction.',
    receivedAt: new Date('2025-08-25T00:58:00'),
    priority: 'normal',
    sentiment: 'neutral',
    status: 'resolved',
    category: 'Subscription',
    extractedInfo: {
      requirements: ['Login assistance', 'Billing error correction', 'Account access'],
      keywords: ['subscription', 'login', 'billing', 'charged twice']
    },
    aiResponse: 'Dear Dean,\n\nThank you for contacting us about your subscription and login issues.\n\nI\'ve resolved both concerns:\n1. Your account access has been restored - please try logging in now\n2. I\'ve identified the duplicate billing charge and processed a full refund, which will appear in 3-5 business days\n\nI\'ve also added account monitoring to prevent similar issues. You should receive a confirmation email shortly.\n\nBest regards,\nAI Support Assistant'
  },
  {
    id: '3',
    sender: 'em@yturbojio',
    subject: 'Question integration with API',
    body: 'Do you support integration with third-party APIs? Specifically I\'m looking for CRM integration options. Our servers are down, and we need immediate support. This is highly critical. There is a billing error where I was charged twice. This needs immediate correction. I am having issues with verifying my account. The verification email never arrived. Can you assist?',
    receivedAt: new Date('2025-08-20T17:58:00'),
    priority: 'urgent',
    sentiment: 'negative',
    status: 'processing',
    category: 'Technical Issue',
    extractedInfo: {
      requirements: ['API integration info', 'Server support', 'Billing correction', 'Account verification'],
      keywords: ['integration', 'API', 'servers down', 'critical', 'billing error', 'verification']
    },
    aiResponse: 'Dear Team,\n\nI understand you have multiple critical issues that need immediate attention. Let me address each:\n\n1. **API Integration**: Yes, we support extensive third-party API integrations including CRM systems. I\'ll connect you with our integration specialist.\n\n2. **Server Issues**: I\'ve escalated your server downtime to our emergency response team - expect contact within 15 minutes.\n\n3. **Billing Error**: The duplicate charge has been identified and refunded immediately.\n\n4. **Account Verification**: I\'ve resent your verification email and manually verified your account.\n\nBest regards,\nAI Support Assistant'
  },
  {
    id: '4',
    sender: 'charlie@partner.org',
    subject: 'Critical help needed for downtime',
    body: 'Our servers are down, and we need immediate support. This is highly critical. Could you clarify the steps involved in requesting a refund? I submitted one last week, but have no update. Our servers are down, and we need immediate support. This is highly critical. Despite multiple attempts, I cannot reset my password. The reset link doesn\'t seem to work.',
    receivedAt: new Date('2025-08-21T21:58:00'),
    priority: 'urgent',
    sentiment: 'negative',
    status: 'pending',
    category: 'Critical Support',
    extractedInfo: {
      requirements: ['Server downtime resolution', 'Refund status update', 'Password reset fix'],
      keywords: ['servers down', 'critical', 'downtime', 'refund', 'reset']
    },
    aiResponse: 'Dear Charlie,\n\nI understand this is a critical situation with your servers down. I\'ve immediately escalated this to our emergency response team.\n\n**Immediate Actions Taken:**\n1. Emergency team contacted - response within 10 minutes\n2. Your refund from last week has been processed and approved\n3. Password reset system has been manually triggered for your account\n\nI\'m personally monitoring this situation and will provide updates every 15 minutes until resolved.\n\nBest regards,\nAI Support Assistant'
  },
  {
    id: '5',
    sender: 'bob@customer.com',
    subject: 'Immediate support needed for billing error',
    body: 'There is a billing error where I was charged twice. This needs immediate correction. I am having issues with verifying my account. The verification email never arrived. Can you assist? Our system is completely inaccessible, and this is affecting our operations. Could you clarify the steps involved in requesting a refund? I submitted one last week, but have no update.',
    receivedAt: new Date('2025-08-20T04:58:00'),
    priority: 'urgent',
    sentiment: 'negative',
    status: 'pending',
    category: 'Billing',
    extractedInfo: {
      requirements: ['Billing error correction', 'Account verification', 'System access', 'Refund clarification'],
      keywords: ['billing error', 'charged twice', 'verification', 'inaccessible', 'refund']
    },
    aiResponse: 'Dear Bob,\n\nI understand you\'re facing multiple urgent issues. Let me resolve these immediately:\n\n**Billing Error**: I\'ve identified the duplicate charge and processed an immediate refund. You\'ll see the credit within 24 hours.\n\n**Account Verification**: I\'ve manually verified your account and resent the confirmation email.\n\n**System Access**: I\'ve restored your system access - please try logging in now.\n\n**Refund Status**: Your previous refund request has been approved and processed.\n\nBest regards,\nAI Support Assistant'
  },
  {
    id: '6',
    sender: 'alice@example.com',
    subject: 'Help required with account verification',
    body: 'I am having issues with verifying my account. The verification email never arrived. Can you assist? Despite multiple attempts, I cannot reset my password. The reset link doesn\'t seem to work. This is urgent - our system is completely inaccessible, and this is affecting our operations.',
    receivedAt: new Date('2025-08-18T08:58:00'),
    priority: 'urgent',
    sentiment: 'negative',
    status: 'resolved',
    category: 'Account Verification',
    extractedInfo: {
      requirements: ['Account verification assistance', 'Password reset fix', 'System access restoration'],
      keywords: ['verification', 'email', 'password', 'reset', 'urgent', 'inaccessible']
    },
    aiResponse: 'Dear Alice,\n\nI understand the urgency of your situation with account verification and system access issues.\n\n**Immediate Actions Completed:**\n1. Manually verified your account - no email required\n2. Reset your password and sent secure login credentials\n3. Restored full system access\n4. Added priority support flag to prevent future delays\n\nYou should now be able to access your system immediately. I\'ve also scheduled a follow-up to ensure everything is working smoothly.\n\nBest regards,\nAI Support Assistant'
  },
  {
    id: '7',
    sender: 'dean@clientco',
    subject: 'Support needed for login issue',
    body: 'Hi team, I am unable to log into my account since yesterday. Could you please help me resolve this issue? Hello, I need assistance logging into my account since yesterday. Could you please help me resolve this issue?',
    receivedAt: new Date('2025-08-20T14:58:00'),
    priority: 'normal',
    sentiment: 'neutral',
    status: 'pending',
    category: 'Login Support',
    extractedInfo: {
      requirements: ['Login troubleshooting', 'Account access'],
      keywords: ['login', 'unable', 'account', 'yesterday']
    },
    aiResponse: 'Dear Dean,\n\nThank you for reaching out about your login difficulties. I can see you\'ve been unable to access your account since yesterday.\n\nI\'ve investigated your account and found the issue was related to a recent security update. I\'ve:\n1. Reset your login credentials\n2. Cleared any security blocks\n3. Sent you new login instructions\n\nYou should be able to log in immediately. Please let me know if you encounter any further issues.\n\nBest regards,\nAI Support Assistant'
  },
  {
    id: '8',
    sender: 'em@yturbojio',
    subject: 'Query about product pricing',
    body: 'Could you clarify the steps involved in requesting a refund? I submitted one last week, but have no update. Query about product pricing - do you have any enterprise discounts available?',
    receivedAt: new Date('2025-08-23T06:58:00'),
    priority: 'normal',
    sentiment: 'neutral',
    status: 'pending',
    category: 'Pricing Inquiry',
    extractedInfo: {
      requirements: ['Refund process clarification', 'Product pricing info', 'Enterprise discounts'],
      keywords: ['refund', 'pricing', 'enterprise', 'discounts']
    },
    aiResponse: 'Dear Team,\n\nThank you for your inquiry about refunds and pricing.\n\n**Refund Update**: I\'ve located your refund request from last week. It has been approved and will be processed within 24 hours.\n\n**Enterprise Pricing**: Yes, we offer significant enterprise discounts:\n- 15% off for annual plans\n- 25% off for multi-year commitments\n- Custom pricing for 500+ users\n\nI\'d be happy to schedule a call to discuss your specific needs and provide a customized quote.\n\nBest regards,\nAI Support Assistant'
  },
  {
    id: '9',
    sender: 'alice@example.com',
    subject: 'Request for refund process clarification',
    body: 'Could you clarify the steps involved in requesting a refund? I submitted one last week, but have no update. This is urgent - our system is completely inaccessible, and this is affecting our operations.',
    receivedAt: new Date('2025-08-24T02:58:00'),
    priority: 'urgent',
    sentiment: 'negative',
    status: 'processing',
    category: 'Refund Request',
    extractedInfo: {
      requirements: ['Refund process clarification', 'System access restoration'],
      keywords: ['refund', 'clarification', 'urgent', 'inaccessible', 'operations']
    },
    aiResponse: 'Dear Alice,\n\nI understand your frustration with both the refund delay and system access issues. These are both urgent matters.\n\n**Refund Status**: I\'ve expedited your refund from last week - it will be processed immediately and appear in your account within 2 business days.\n\n**System Access**: I\'ve identified and resolved the access issue. Your system should be fully operational now.\n\n**Refund Process**: For future reference, our standard process is:\n1. Submit request → 2. Review (24-48hrs) → 3. Approval → 4. Processing (3-5 days)\n\nBest regards,\nAI Support Assistant'
  }
];

export const analyticsData = {
  emailVolume: [
    { date: '2024-01-09', emails: 45, resolved: 42 },
    { date: '2024-01-10', emails: 52, resolved: 48 },
    { date: '2024-01-11', emails: 38, resolved: 35 },
    { date: '2024-01-12', emails: 61, resolved: 58 },
    { date: '2024-01-13', emails: 47, resolved: 44 },
    { date: '2024-01-14', emails: 55, resolved: 52 },
    { date: '2024-01-15', emails: 43, resolved: 38 }
  ],
  sentimentDistribution: [
    { name: 'Positive', value: 35, color: '#10b981' },
    { name: 'Neutral', value: 45, color: '#6b7280' },
    { name: 'Negative', value: 20, color: '#ef4444' }
  ],
  categoryDistribution: [
    { name: 'Account Access', value: 25 },
    { name: 'Product Inquiry', value: 20 },
    { name: 'Technical Issue', value: 18 },
    { name: 'Billing', value: 15 },
    { name: 'Customization', value: 12 },
    { name: 'Data Export', value: 10 }
  ]
};