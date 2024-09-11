import { User } from '@progress/kendo-angular-conversational-ui';
import { CustomMessage, DefaultResponses } from './survey.interface';

export const bot: User = {
  id: 0,
};

export const defaultResponses: DefaultResponses = {
  START: {
    author: bot,
    text: "Before reaching out to us, would you be willing to take a quick survey? We're looking to better understand your challenges with AI, and your feedback will be shared with our AI-COE team to help improve our services.",
    suggestedActions: [
      { title: 'Yes', value: 'Yes', type: 'customOption' },
      { title: 'No, I would just like to connect', value: 'No', type: 'customOption' },
    ],
  },
  CONTACT: {
    author: bot,
    text: 'A representative from AI COE will reach out to you soon!',
    suggestedActions: [],
  },
  END: {
    author: bot,
    text: 'Thank you for your time!',
    suggestedActions: [],
  },
  FAILED: {
    author: bot,
    text: "Sorry, I couldn't save your response. Please try again.",
    suggestedActions: [{ title: 'Retry', value: 'Retry', type: 'customOption' }],
  },
};

export const surveyQuestions: CustomMessage[] = [
  {
    questionId: 'Q1',
    author: bot,
    text: "Before reaching out to us, would you be willing to take a quick survey? We're looking to better understand your challenges with AI, and your feedback will be shared with our AI-COE team to help improve our services.",
    suggestedActions: [
      { title: 'Yes, I am interested', value: 'Yes, I am interested', type: 'customOption' },
      { title: 'No, I would just like to connect', value: 'No, I would just like to connect', type: 'customOption' },
    ],
  },
  { questionId: 'Q2', author: bot, text: 'Which organisation are you from?' },
  {
    questionId: 'Q3',
    author: bot,
    text: 'How would you describe your role in your organisation?',
    suggestedActions: [
      { title: 'Technical', value: 'Technical', type: 'customOption' },
      { title: 'Executive', value: 'Executive', type: 'customOption' },
      { title: 'Others (please specify)', value: 'Others (please specify)', type: 'customOption' },
    ],
  },
  // {
  //   questionId: 'Q4',
  //   author: bot,
  //   text: 'How would you rate your understanding of how AI can be applied in your organisation?',
  //   suggestedActions: [
  //     { title: 'New to AI', value: 'New to AI', type: 'customOption' },
  //     { title: 'Exploring', value: 'Exploring', type: 'customOption' },
  //     { title: 'Piloting', value: 'Piloting', type: 'customOption' },
  //     { title: 'Have Use Cases', value: 'Have Use Cases', type: 'customOption' },
  //     { title: 'Deployed AI on a regular basis', value: 'Deployed AI on a regular basis', type: 'customOption' },
  //   ],
  // },
  {
    questionId: 'Q5',
    author: bot,
    text: 'What are your biggest concerns regarding adopting AI solutions in your organisation? Choose top 3.',
    suggestedActions: [
      { title: 'High Implementation Costs', value: 'High Implementation Costs', type: 'customOption' },
      { title: 'Lack of Skilled Workforce', value: 'Lack of Skilled Workforce', type: 'customOption' },
      {
        title: 'Data Privacy and Security Issues',
        value: 'Data Privacy and Security Issues',
        type: 'customOption',
      },
      { title: 'Ethical Concerns', value: 'Ethical Concerns', type: 'customOption' },
      {
        title: 'Resistance to Change Within an Organisation',
        value: 'Resistance to Change Within an Organisation',
        type: 'customOption',
      },
      {
        title: 'Integration with Existing Systems',
        value: 'Integration with Existing Systems',
        type: 'customOption',
      },
      { title: 'Lack of Data/Sensor-isation', value: 'Lack of Data/Sensorisation', type: 'customOption' },
      // { title: 'Others (please specify)', value: 'Others (please specify)', type: 'customOption' },
    ],
  },
  {
    questionId: 'Q6',
    author: bot,
    text: 'Are there any plans for your company to explore or implement any AI solutions within the next few months?',
    suggestedActions: [
      { title: 'Not interested', value: 'Not interested', type: 'customOption' },
      {
        title: 'Considering',
        value: 'Considering',
        type: 'customOption',
      },
      { title: 'Looking into solutions', value: 'Looking into solutions', type: 'customOption' },
      { title: 'Already implemented', value: 'Already implemented', type: 'customOption' },
    ],
  },
  {
    questionId: 'Q8',
    author: bot,
    text: 'What resources or support would you need to feel confident in adopting AI?',
    suggestedActions: [
      {
        title: 'Training and education for employees',
        value: 'Training and education for employees',
        type: 'customOption',
      },
      { title: 'Clear ROI and business case', value: 'Clear ROI and business case', type: 'customOption' },
      {
        title: 'External expertise and consultancy',
        value: 'External expertise and consultancy',
        type: 'customOption',
      },
      {
        title: 'Tools and platforms for AI development',
        value: 'Tools and platforms for AI development',
        type: 'customOption',
      },
      {
        title: 'Integration support with existing systems',
        value: 'Integration support with existing systems',
        type: 'customOption',
      },
      { title: 'Others (please specify)', value: 'Others (please specify)', type: 'customOption' },
    ],
  },
  {
    questionId: 'Q9',
    author: bot,
    text: 'Which of the following pain points are most relevant to you? Choose top 3.',
    suggestedActions: [
      {
        title: 'Product/Component/Process design',
        value: 'Product/Component/Process design',
        type: 'customOption',
      },
      { title: 'Quality assurance', value: 'Quality assurance', type: 'customOption' },
      { title: 'Operations optimisation', value: 'Operations optimisation', type: 'customOption' },
      { title: 'Industrial automation', value: 'Industrial automation', type: 'customOption' },
      { title: 'Predictive maintenance', value: 'Predictive maintenance', type: 'customOption' },
    ],
  },
  {
    questionId: 'Q10',
    author: bot,
    text: 'Did you manage to take part in the AI Experience Nexus Tour?',
    suggestedActions: [
      { title: 'Yes', value: 'Yes', type: 'customOption' },
      { title: 'No', value: 'No', type: 'customOption' },
    ],
  },
  {
    questionId: 'Q11',
    author: bot,
    text: 'Which of the AI solutions that were showcased during the AI Experience Nexus is most relevant to your needs?',
    suggestedActions: [
      {
        title: 'Spend Categorisation through NLP',
        value: 'Spend Categorisation through NLP',
        type: 'customOption',
      },
      { title: 'AI Cleansheet', value: 'AI Cleansheet', type: 'customOption' },
      {
        title: 'Procurement Negotiation Scripting',
        value: 'Procurement Negotiation Scripting',
        type: 'customOption',
      },
      {
        title: 'AI-enabled Production Capacity Planning',
        value: 'AI-enabled Production Capacity Planning',
        type: 'customOption',
      },
      { title: 'GenAI Maintenance Chatbot', value: 'GenAI Maintenance Chatbot', type: 'customOption' },
      {
        title: 'Predictive and Prescriptive Maintenance',
        value: 'Predictive and Prescriptive Maintenance',
        type: 'customOption',
      },
      { title: 'AI/ML-based Demand Forecasting', value: 'AI/ML-based Demand Forecasting', type: 'customOption' },
      {
        title: 'AA-based Supply Chain Planning and S&OP',
        value: 'AA-based Supply Chain Planning and S&OP',
        type: 'customOption',
      },
      { title: 'Set Point Optimisation', value: 'Set Point Optimisation', type: 'customOption' },
      {
        title: 'Gen-AI Logistics for Customer Service',
        value: 'Gen-AI Logistics for Customer Service',
        type: 'customOption',
      },
    ],
  },
  {
    questionId: 'Q12',
    author: bot,
    text: 'Which of the following AI solutions would you like to start adopting in the next 12 months?',
    suggestedActions: [
      {
        title: 'Spend Categorisation through NLP',
        value: 'Spend Categorisation through NLP',
        type: 'customOption',
      },
      { title: 'AI Cleansheet', value: 'AI Cleansheet', type: 'customOption' },
      {
        title: 'Procurement Negotiation Scripting',
        value: 'Procurement Negotiation Scripting',
        type: 'customOption',
      },
      {
        title: 'AI-enabled Production Capacity Planning',
        value: 'AI-enabled Production Capacity Planning',
        type: 'customOption',
      },
      { title: 'GenAI Maintenance Chatbot', value: 'GenAI Maintenance Chatbot', type: 'customOption' },
      {
        title: 'Predictive and Prescriptive Maintenance',
        value: 'Predictive and Prescriptive Maintenance',
        type: 'customOption',
      },
      { title: 'AI/ML-based Demand Forecasting', value: 'AI/ML-based Demand Forecasting', type: 'customOption' },
      {
        title: 'AA-based Supply Chain Planning and S&OP',
        value: 'AA-based Supply Chain Planning and S&OP',
        type: 'customOption',
      },
      { title: 'Set Point Optimisation', value: 'Set Point Optimisation', type: 'customOption' },
      {
        title: 'Gen-AI Logistics for Customer Service',
        value: 'Gen-AI Logistics for Customer Service',
        type: 'customOption',
      },
    ],
  },
  {
    questionId: 'Q13',
    author: bot,
    text: 'Would you like to connect with us?',
    suggestedActions: [
      { title: 'Yes', value: 'Yes', type: 'customOption' },
      { title: 'No', value: 'No', type: 'customOption' },
    ],
  },
  { questionId: 'Q14', author: bot, text: 'What is your name?' },
  { questionId: 'Q15', author: bot, text: 'What is your email?' },
];
