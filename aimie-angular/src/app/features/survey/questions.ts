import { User } from '@progress/kendo-angular-conversational-ui';
import { CustomMessage, DefaultResponses } from './survey.interface';

export const bot: User = {
  id: 0,
};

export const defaultResponses: DefaultResponses = {
  START: {
    author: bot,
    text: 'Thank you for taking part in our survey! Your feedback is valuable to us!',
  },
  CONTACT: {
    author: bot,
    text: 'A representative from AI COE will reach out to you soon!',
    suggestedActions: [],
  },
  END: {
    author: bot,
    text: 'Your response has been saved. Thank you for taking part in this survey!',
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
    text: 'Would you be comfortable with sharing your responses and data with the AI COE team?',
    suggestedActions: [
      { title: 'Yes', value: 'Yes', type: 'customOption' },
      { title: 'No', value: 'No', type: 'customOption' },
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
  {
    questionId: 'Q4',
    author: bot,
    text: 'How would you rate your understanding of how AI can be applied in your organisation?',
    suggestedActions: [
      { title: 'New to AI', value: 'New to AI', type: 'customOption' },
      { title: 'Exploring', value: 'Exploring', type: 'customOption' },
      { title: 'Piloting', value: 'Piloting', type: 'customOption' },
      { title: 'Have Use Cases', value: 'Have Use Cases', type: 'customOption' },
      { title: 'Deployed AI on a regular basis', value: 'Deployed AI on a regular basis', type: 'customOption' },
    ],
  },
  {
    questionId: 'Q5',
    author: bot,
    text: 'What is your biggest concern regarding adopting AI solutions in your organisation?',
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
      { title: 'Lack of Data/Sensor-isation', value: 'Lack of Data/Sensor-isation', type: 'customOption' },
      { title: 'Others (please specify)', value: 'Others (please specify)', type: 'customOption' },
    ],
  },
  {
    questionId: 'Q6',
    author: bot,
    text: 'Has your company explored or implemented any AI solutions so far?',
    suggestedActions: [
      { title: 'Yes, we have', value: 'Yes, we have', type: 'customOption' },
      {
        title: 'Yes, we are currently exploring',
        value: 'Yes, we are currently exploring',
        type: 'customOption',
      },
      { title: 'No, but we are considering', value: 'No, but we are considering', type: 'customOption' },
      { title: 'No, we have not yet considered', value: 'No, we have not yet considered', type: 'customOption' },
    ],
  },
  {
    questionId: 'Q7',
    author: bot,
    text: 'How willing is your company to invest/invest more in AI technologies within the next few months?',
    suggestedActions: [
      { title: 'Very willing', value: 'Very willing', type: 'customOption' },
      { title: 'Somewhat willing', value: 'Somewhat willing', type: 'customOption' },
      { title: 'Neutral', value: 'Neutral', type: 'customOption' },
      { title: 'Somewhat unwilling', value: 'Somewhat unwilling', type: 'customOption' },
      { title: 'Very unwilling', value: 'Very unwilling', type: 'customOption' },
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
    text: 'Which of the following 5 pain points is most relevant to you?',
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
    text: 'Did you manage to take part in the AI Experience Centre Tour?',
    suggestedActions: [
      { title: 'Yes', value: 'Yes', type: 'customOption' },
      { title: 'No', value: 'No', type: 'customOption' },
    ],
  },
  {
    questionId: 'Q11',
    author: bot,
    text: 'Which of the AI solutions that were showcased during the AI Experience is most relevant to your needs?',
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
