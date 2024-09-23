import { TimelineEvent } from '@progress/kendo-angular-layout';

export const events: TimelineEvent[] = [
  {
    title: 'AI-enabled Demand Forecasting',
    subtitle: 'AI/ML algorithms deployed for accurate and dynamic LNG demand forecasting',
    description:
      'Supply Chain Planner ; Manual or traditional statistical methods result in inaccurate demand predictions ; Increased forecast accuracy resulting in more optimal inventory levels preventing stockouts/inventory surplus',
    date: new Date('2011-10-05T14:48:00.000Z'),
    images: [{ alt: 'image', src: '/assets/images/uc-demand-forecasting.png' }],
  },
  {
    title: 'Integrated Supply Chain Planning',
    subtitle: 'Advanced analytics tools deployed for precise demand forecasting of LNG',
    description:
      'Supply Chain Planner ; Inaccurate demand forecasts leading to overproduction or stockouts of LNG ; Shorten duration to investigate and compare optimal supply chain resolutions based on limiting constraint and business focus',
    date: new Date('2011-10-05T14:48:00.000Z'),
    images: [{ alt: 'image', src: '/assets/images/uc-sc-planning.png' }],
  },
  {
    title: 'Gen-AI Agent for Inbound Logistics',
    subtitle:
      'Logistics agent that can quickly answer logistics queries, gain insights to data and address external events and information updates',
    description:
      'Logistics Specialist, Project Manager ; Logistics team spends up to 50% of their time on reporting and information sharing, waiting on this impacts decision making with other groups ; Get up-to-date information to make faster decisions, reducing air freight and potential production downtime',
    date: new Date('2011-10-05T14:48:00.000Z'),
    images: [{ alt: 'image', src: '/assets/images/aws.png' }],
  },
  {
    title: 'AI-enabled Procurement',
    subtitle: 'Spend categorization, AI cleansheet',
    description:
      'Chief Procurement Officer, Category Manager/Buyer ; Spend data is usually fragmented and unstructured, which makes it difficult to properly and accurately categorise spend ; Converts large data sets into easy-to-read dashboards with actionable insights to drive data-driven decision making',
    date: new Date('2012-10-05T14:48:00.000Z'),
    images: [{ alt: 'image', src: '/assets/images/uc-procurement.png' }],
  },
  // {
  //   title: 'AI-enabled Production Capacity Planning',
  //   subtitle: 'Supports optimal resource allocation to fulfill forecasted demand',
  //   description:
  //     'Production Planner, Operator ; Varying business focus (e.g., target fulfilment rate, cost cutting, maximize profit) result in difficulty for planner to optimize resource allocation ; Actively optimize production planning based on change in demand and allocate the right capacity for each equipment',
  //   date: new Date('2013-10-05T14:48:00.000Z'),
  //   images: [{ alt: 'image', src: '/assets/images/uc-capacity-planning.png' }],
  // },
  {
    title: 'AI-driven Rapid Production Capacity Optimisation',
    subtitle:
      'AI-driven modelling & simulation to predict plant performance, optimise resource allocation, and provide decision support for making informed decisions',
    description:
      'Production Planner, Operator ; Varying business focus (e.g. target fulfilment rate, cost cutting, maximise profit) result in difficulty for planner to optimise resource allocation ; Actively optimise production planning based on change in demand and allocate the right capacity for each equipment',
    date: new Date('2013-10-05T14:48:00.000Z'),
    images: [{ alt: 'image', src: '/assets/images/uc-capacity-planning.png' }],
  },
  {
    title: 'AI-powered Predictive & Prescriptive Maintenance',
    subtitle:
      'AI-enhanced predictive maintenance system that is able to forecast equipment failures, continuously self-retrain and update ever growing data model',
    description:
      'Maintenance Technician ; Reactive maintenance often leads to unplanned downtime and repair cost ; Proactive maintenance reduces equipment downtime and repair cost, allowing planned maintenance ahead of time',
    date: new Date('2014-10-05T14:48:00.000Z'),
    images: [{ alt: 'image', src: '/assets/images/uc-ppm.png' }],
  },
  {
    title: 'Industrial Copilot',
    subtitle:
      'Interactive GenAI chatbot provide onsite troubleshooting assistance with database of all equipment operation manual',
    description:
      'Maintenance Technician ; Time-consuming checks of equipment manuals during equipment repairs and troubleshooting causes long equipment downtime ; Reduce technician workload from increased first-time fix rate, and minimise operational downtime from improved maintenance quality',
    date: new Date('2014-10-05T14:48:00.000Z'),
    images: [{ alt: 'image', src: '/assets/images/uc-copilot.jpg' }],
  },
  {
    title: 'Gen-AI Logistics for Customer Service',
    subtitle:
      'AI logistics chatbot assistant with advanced features to handle order-specific requests and enquiries from customers',
    description:
      'Warehouse, Logistics Planner ; Customer service in logistics departments often rely on time-consuming manual labour to process enquiries and requests ; Fully automated customer service for final product delivery related enquiry',
    date: new Date('2016-10-05T14:48:00.000Z'),
    images: [{ alt: 'image', src: '/assets/images/uc-logistics.png' }],
  },
];
