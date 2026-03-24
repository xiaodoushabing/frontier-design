import { Brain, Shield, LineChart, Users, Database, Zap, Cpu, Fingerprint, Globe, Lock, MessageSquare, Terminal } from 'lucide-react';

export const AGENTS = [
  { 
    id: 'proj-1', 
    name: 'Alpha', 
    description: 'General purpose LLM for text analysis, summarization, and generation.', 
    access: 'All', 
    icon: Brain, 
    color: 'bg-indigo-600', 
    createdAt: '2024-01-15', 
    yieldLabel: 'Processing Power',
    yieldValue: '98.2 PFLOPS', 
    activeUsers: 124,
    interactions: '12.4k',
    prompts: [
      "Summarize the latest market trends",
      "Analyze the Q4 performance report",
      "Draft a proposal for the new project",
      "Explain the current risk factors",
      "Draft a client email regarding Q4 results"
    ]
  },
  { 
    id: 'proj-2', 
    name: 'Sentinel Guard', 
    description: 'Anomaly detection model for real-time financial transactions.', 
    access: 'Admin', 
    icon: Shield, 
    color: 'bg-rose-600', 
    createdAt: '2024-02-10', 
    yieldLabel: 'Security Depth',
    yieldValue: '1.2k Alerts/Day', 
    activeUsers: 12,
    interactions: '45.2k',
    prompts: [
      "Show recent anomaly reports",
      "Verify transaction integrity",
      "Analyze potential breach patterns",
      "Generate security audit log"
    ]
  },
  { 
    id: 'proj-3', 
    name: 'Insight Engine', 
    description: 'Sentiment analysis and clustering for customer feedback and surveys.', 
    access: 'All', 
    icon: Users, 
    color: 'bg-emerald-600', 
    createdAt: '2024-01-05', 
    yieldLabel: 'Sentiment Yield',
    yieldValue: '85% Positivity', 
    activeUsers: 89,
    interactions: '8.1k',
    prompts: [
      "Cluster recent feedback themes",
      "Identify top customer pain points",
      "Analyze NPS score trends",
      "Summarize survey responses"
    ]
  },
  { 
    id: 'proj-4', 
    name: 'Predictive Sales', 
    description: 'Time-series prediction for Q3/Q4 revenue and pipeline analysis.', 
    access: 'All', 
    icon: LineChart, 
    color: 'bg-blue-600', 
    createdAt: '2024-03-01', 
    yieldLabel: 'Forecast Accuracy',
    yieldValue: '±2% Variance', 
    activeUsers: 45,
    interactions: '3.2k',
    prompts: [
      "Forecast Q4 revenue targets",
      "Analyze pipeline conversion rates",
      "Identify high-risk accounts",
      "Compare regional sales data"
    ]
  },
  { 
    id: 'proj-5', 
    name: 'Data Architect', 
    description: 'ETL assistant for database schema migrations and data cleaning.', 
    access: 'Admin', 
    icon: Database, 
    color: 'bg-amber-600', 
    createdAt: '2023-12-20', 
    yieldLabel: 'Knowledge Depth',
    yieldValue: '4.5TB Processed', 
    activeUsers: 8,
    interactions: '1.5k',
    prompts: [
      "Generate migration script",
      "Cleanse the staging dataset",
      "Analyze schema bottlenecks",
      "Map data relationships"
    ]
  },
  { 
    id: 'proj-6', 
    name: 'Velocity', 
    description: 'Fast, lightweight model for simple Q&A and internal documentation.', 
    access: 'All', 
    icon: Zap, 
    color: 'bg-violet-600', 
    createdAt: '2024-03-15', 
    yieldLabel: 'Response Velocity',
    yieldValue: '<100ms Latency', 
    activeUsers: 210,
    interactions: '24.8k',
    prompts: [
      "Find HR policy on remote work",
      "Explain the onboarding process",
      "Search internal documentation",
      "Summarize meeting notes"
    ]
  },
  { 
    id: 'proj-7', 
    name: 'Neural Core', 
    description: 'Advanced deep learning model for complex pattern recognition.', 
    access: 'Admin', 
    icon: Cpu, 
    color: 'bg-cyan-600', 
    createdAt: '2024-03-20', 
    yieldLabel: 'Neural Density',
    yieldValue: '1.2B Parameters', 
    activeUsers: 5,
    interactions: '0.5k',
    prompts: [
      "Analyze neural weights",
      "Optimize model architecture",
      "Run inference test"
    ]
  },
  { 
    id: 'proj-8', 
    name: 'Global Connect', 
    description: 'Real-time translation and cultural context assistant.', 
    access: 'All', 
    icon: Globe, 
    color: 'bg-orange-600', 
    createdAt: '2024-03-22', 
    yieldLabel: 'Language Coverage',
    yieldValue: '120+ Languages', 
    activeUsers: 340,
    interactions: '56k',
    prompts: [
      "Translate to Mandarin",
      "Cultural context for Japan",
      "Draft global announcement"
    ]
  },
];

export const ALL_CHATS = [
  { id: 1, projectId: 'proj-1', title: 'Model performance analysis', time: '2h ago' },
  { id: 2, projectId: 'proj-1', title: 'Text summarization test', time: 'Yesterday' },
  { id: 3, projectId: 'proj-2', title: 'Q1 Transaction anomalies', time: 'Mar 20' },
  { id: 4, projectId: 'proj-3', title: 'NPS score sentiment', time: 'Mar 19' },
  { id: 5, projectId: 'proj-4', title: 'EMEA region forecast', time: 'Mar 18' },
  { id: 6, projectId: 'proj-5', title: 'Postgres schema migration', time: 'Mar 15' },
  { id: 7, projectId: 'proj-6', title: 'HR policy query', time: 'Mar 14' },
];
