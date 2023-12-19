export const userRegistrationList: UserRegistrationInfo[] = [
  {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Jane Smith',
    email: 'janesmith@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Michael Johnson',
    email: 'michaeljohnson@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Emily Brown',
    email: 'emilybrown@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Daniel Miller',
    email: 'danielmiller@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Olivia Wilson',
    email: 'oliviawilson@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'William Taylor',
    email: 'williamtaylor@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Sophia Anderson',
    email: 'sophiaanderson@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'James Thomas',
    email: 'jamesthomas@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Emma Clark',
    email: 'emmaclark@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Noah White',
    email: 'noahwhite@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Ava Turner',
    email: 'avaturner@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Liam Hall',
    email: 'liamhall@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Isabella Young',
    email: 'isabellayoung@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Mason Scott',
    email: 'masonscott@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Sophia Lee',
    email: 'sophialee@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Oliver Martin',
    email: 'olivermartin@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Sofia Garcia',
    email: 'sofiagarcia@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Ethan Lopez',
    email: 'ethanlopez@example.com',
    password: 'Password1!',
  },
  {
    fullName: 'Mia Taylor',
    email: 'miataylor@example.com',
    password: 'Password1!',
  },
]

const NUM_ACCOUNTS = 20
export const accountCreationList: AccountCreationDetails[] = (() => {
  const details: AccountCreationDetails[] = []
  for (let i = 1; i <= NUM_ACCOUNTS; i++) {
    details.push({
      name: `Account ${i}`,
      description: `Description of Account ${i}`,
      yearStartCount: Math.random() * 20,
      avgHourlyGM: Number((Math.random() * 80 + 20).toFixed(2)),
      projectedMonthlyEndingRate: Math.random() * 20,
      managers: [],
    })
  }
  return details
})()

// [
//   {
//     name: 'Project Phoenix',
//     description: 'Reviving an old project for new opportunities',
//     avgHourlyGM: 45.67,
//     managers: [
//       'johndoe@example.com',
//       'michaeljohnson@example.com',
//       'john.smith@example.com',
//     ],
//   },
//   {
//     name: 'Marketing Campaign 2023',
//     description: 'Planning and executing a new marketing campaign',
//     avgHourlyGM: 55.12,
//     managers: ['emmaclark@example.com', 'sophialee@example.com'],
//   },
//   {
//     name: 'Product Development',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in',
//     avgHourlyGM: 37.89,
//     managers: [
//       'johndoe@example.com',
//       'michaeljohnson@example.com',
//       'john.smith@example.com',
//     ],
//   },
//   {
//     name: 'Financial Analysis',
//     description: 'Analyzing financial data for insights',
//     avgHourlyGM: 48.21,
//     managers: ['olivermartin@example.com', 'williamtaylor@example.com'],
//   },
//   {
//     name: 'Mobile App Development',
//     description: 'Building a feature-rich mobile app',
//     avgHourlyGM: 60.45,
//     managers: [
//       'ethanlopez@example.com',
//       'miataylor@example.com',
//       'susan.jones@example.com',
//     ],
//   },
//   {
//     name: 'HR Process Optimization',
//     description: 'Streamlining human resources processes',
//     avgHourlyGM: 42.33,
//     managers: [],
//   },
//   {
//     name: 'E-commerce Expansion',
//     description: 'Expanding e-commerce operations globally',
//     avgHourlyGM: 53.78,
//     managers: ['oliviawilson@example.com', 'mary.johnson@example.com'],
//   },
//   {
//     name: 'Market Research',
//     description: 'Conducting in-depth market research',
//     avgHourlyGM: 49.94,
//     managers: ['isabellayoung@example.com', 'noahwhite@example.com'],
//   },
//   {
//     name: 'Supply Chain Optimization',
//     description: 'Optimizing supply chain processes',
//     avgHourlyGM: 56.72,
//     managers: ['danielmiller@example.com', 'liamhall@example.com'],
//   },
//   {
//     name: 'Data Analytics Platform',
//     description: 'Building a platform for data analytics',
//     avgHourlyGM: 47.55,
//     managers: ['johndoe@example.com', 'olivermartin@example.com'],
//   },
//   {
//     name: 'Financial Planning',
//     description: 'Creating a financial plan for the year',
//     avgHourlyGM: 59.28,
//     managers: ['emilybrown@example.com'],
//   },
//   {
//     name: 'Content Marketing Strategy',
//     description: 'Developing a strategy for content marketing',
//     avgHourlyGM: 38.97,
//     managers: ['janesmith@example.com', 'mark.jones@example.com'],
//   },
//   {
//     name: 'Product Launch',
//     description: 'Planning and executing a product launch',
//     avgHourlyGM: 51.83,
//     managers: ['danielmiller@example.com', 'emmaclark@example.com'],
//   },
//   {
//     name: 'Supply Chain Enhancement',
//     description: 'Enhancing the efficiency of the supply chain',
//     avgHourlyGM: 44.12,
//     managers: [
//       'michaeljohnson@example.com',
//       'avaturner@example.com',
//       'linda.wilson@example.com',
//     ],
//   },
//   {
//     name: 'Website Redesign',
//     description: 'Redesigning the company website',
//     avgHourlyGM: 46.79,
//     managers: ['miataylor@example.com', 'peter.anderson@example.com'],
//   },
//   {
//     name: 'IT Infrastructure Upgrade',
//     description: "Upgrading the organization's IT infrastructure",
//     avgHourlyGM: 54.63,
//     managers: ['jamesthomas@example.com', 'susan.smith@example.com'],
//   },
//   {
//     name: 'Market Expansion',
//     description: 'Expanding into new markets',
//     avgHourlyGM: 39.28,
//     managers: ['oliviawilson@example.com', 'andrew.miller@example.com'],
//   },
//   {
//     name: 'Product Innovation',
//     description: 'Fostering innovation in product development',
//     avgHourlyGM: 57.42,
//     managers: ['noahwhite@example.com'],
//   },
//   {
//     name: 'Customer Engagement',
//     description: 'Improving customer engagement strategies',
//     avgHourlyGM: 41.56,
//     managers: [],
//   },
//   {
//     name: 'Strategic Partnerships',
//     description: 'Exploring strategic partnership opportunities',
//     avgHourlyGM: 50.93,
//     managers: [
//       'masonscott@example.com',
//       'susan.smith@example.com',
//       'david.smith@example.com',
//     ],
//   },
// ]
