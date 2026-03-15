export interface Member {
  id: string;
  name: string;
  email: string;
  role: "member" | "coordinator" | "admin";
  district: string;
  area: string;
  avatar: string;
  joinDate: string;
  bio: string;
  phone?: string;
  skills?: string[];
  online?: boolean;
}

export interface DiscussionTopic {
  id: string;
  title: string;
  category: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  replies: Reply[];
  views: number;
  isPinned?: boolean;
  tags: string[];
}

export interface Reply {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Opportunity {
  id: string;
  title: string;
  postedById: string;
  postedByName: string;
  postedByAvatar: string;
  district: string;
  category: string;
  description: string;
  requirements: string[];
  deadline: string;
  createdAt: string;
  type: "job" | "partnership" | "grant" | "mentorship" | "event";
  location?: string;
  salary?: string;
}

export interface DirectMessage {
  id: string;
  fromId: string;
  toId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: DirectMessage[];
}

// ─── Members ────────────────────────────────────────────────────────────────
export const MEMBERS: Member[] = [
  {
    id: "1",
    name: "James Okoye",
    email: "member@example.com",
    role: "member",
    district: "District 3",
    area: "Westlands",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    joinDate: "2024-01-15",
    bio: "Technology entrepreneur and community enthusiast.",
    phone: "+1 555-0101",
    skills: ["Technology", "Entrepreneurship", "Leadership"],
    online: true,
  },
  {
    id: "2",
    name: "Sarah Kimani",
    email: "coordinator@example.com",
    role: "coordinator",
    district: "District 1",
    area: "Nairobi Central",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    joinDate: "2023-06-10",
    bio: "District Coordinator for District 1. Community development advocate.",
    phone: "+1 555-0102",
    skills: ["Community Development", "Project Management", "Public Speaking"],
    online: true,
  },
  {
    id: "3",
    name: "Michael Otieno",
    email: "michael@example.com",
    role: "member",
    district: "District 2",
    area: "Eastlands",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    joinDate: "2024-02-20",
    bio: "Finance professional. Loves basketball and giving back.",
    phone: "+1 555-0103",
    skills: ["Finance", "Investment", "Coaching"],
    online: false,
  },
  {
    id: "4",
    name: "Amina Hassan",
    email: "amina@example.com",
    role: "member",
    district: "District 4",
    area: "Kilimani",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop",
    joinDate: "2023-11-05",
    bio: "Healthcare professional focused on rural outreach programs.",
    skills: ["Healthcare", "Community Outreach", "Research"],
    online: true,
  },
  {
    id: "5",
    name: "David Mwangi",
    email: "david@example.com",
    role: "member",
    district: "District 1",
    area: "Karen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    joinDate: "2024-03-01",
    bio: "Agricultural engineer working on sustainable farming solutions.",
    skills: ["Agriculture", "Engineering", "Sustainability"],
    online: false,
  },
  {
    id: "6",
    name: "Grace Wanjiku",
    email: "grace@example.com",
    role: "coordinator",
    district: "District 2",
    area: "Parklands",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop",
    joinDate: "2023-04-12",
    bio: "District 2 Coordinator. Education advocate and mentor.",
    skills: ["Education", "Mentorship", "Administration"],
    online: true,
  },
  {
    id: "7",
    name: "Peter Njoroge",
    email: "peter@example.com",
    role: "member",
    district: "District 5",
    area: "Lavington",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop",
    joinDate: "2024-01-28",
    bio: "Real estate developer and urban planning consultant.",
    skills: ["Real Estate", "Urban Planning", "Investment"],
    online: false,
  },
  {
    id: "8",
    name: "Fatuma Ali",
    email: "fatuma@example.com",
    role: "member",
    district: "District 3",
    area: "Upperhill",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
    joinDate: "2023-09-18",
    bio: "Legal professional specializing in business and corporate law.",
    skills: ["Law", "Business Consulting", "Compliance"],
    online: true,
  },
  {
    id: "9",
    name: "Robert Kamau",
    email: "robert@example.com",
    role: "member",
    district: "District 6",
    area: "Runda",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&fit=crop",
    joinDate: "2024-04-10",
    bio: "Media and communications expert. Documentary filmmaker.",
    skills: ["Media", "Communications", "Filmmaking"],
    online: false,
  },
  {
    id: "10",
    name: "Joyce Achieng",
    email: "joyce@example.com",
    role: "member",
    district: "District 4",
    area: "Hurlingham",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop",
    joinDate: "2023-12-22",
    bio: "Social entrepreneur running youth empowerment programs.",
    skills: ["Social Enterprise", "Youth Development", "Fundraising"],
    online: true,
  },
];

// ─── Districts ────────────────────────────────────────────────────────────────
export const DISTRICTS = [
  "All Districts",
  "District 1",
  "District 2",
  "District 3",
  "District 4",
  "District 5",
  "District 6",
];

export const AREAS_BY_DISTRICT: Record<string, string[]> = {
  "District 1": ["Nairobi Central", "Karen", "Langata"],
  "District 2": ["Eastlands", "Parklands", "Kasarani"],
  "District 3": ["Westlands", "Upperhill", "Kilimani"],
  "District 4": ["Kilimani", "Hurlingham", "Kileleshwa"],
  "District 5": ["Lavington", "Gigiri", "Muthaiga"],
  "District 6": ["Runda", "Spring Valley", "Loresho"],
};

// ─── Discussion Topics ────────────────────────────────────────────────────────
export const TOPICS: DiscussionTopic[] = [
  {
    id: "1",
    title: "Best practices for sustainable community development in our districts",
    category: "Community Development",
    authorId: "2",
    authorName: "Sarah Kimani",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    content:
      "I've been thinking about how we can create more sustainable development models in our districts. One approach that has worked well in District 1 is involving local youth groups in infrastructure projects. This not only solves immediate needs but builds capacity for future work. What strategies have worked in your districts? I'd love to hear from coordinators and members across all 6 districts.",
    createdAt: "2025-03-10T09:00:00Z",
    views: 142,
    isPinned: true,
    tags: ["Sustainability", "Development", "Community"],
    replies: [
      {
        id: "r1",
        authorId: "4",
        authorName: "Amina Hassan",
        authorAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop",
        content:
          "Great topic Sarah! In District 4, we've been partnering with healthcare NGOs to run monthly free clinics. This builds trust with residents and also helps identify other social needs early. The key is consistency — people need to see we're reliable.",
        createdAt: "2025-03-10T10:30:00Z",
        likes: 14,
      },
      {
        id: "r2",
        authorId: "5",
        authorName: "David Mwangi",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
        content:
          "From the agriculture side, I've seen great results when we introduce kitchen garden programs alongside community meetings. Families get immediate value (food security) while we build longer term relationships. Plus it's a great way to get everyone talking!",
        createdAt: "2025-03-10T14:15:00Z",
        likes: 9,
      },
      {
        id: "r3",
        authorId: "1",
        authorName: "James Okoye",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
        content:
          "Tech can be a huge enabler here. I've been piloting a community notice board app that helps residents communicate maintenance needs directly to coordinators. Reduces friction and improves response times. Happy to share the prototype with any district that wants to try it.",
        createdAt: "2025-03-11T08:00:00Z",
        likes: 21,
      },
    ],
  },
  {
    id: "2",
    title: "Upcoming Annual General Meeting — Agenda items & speaker nominations",
    category: "Events & Announcements",
    authorId: "6",
    authorName: "Grace Wanjiku",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop",
    content:
      "The AGM is scheduled for April 20th, 2025. We need to finalize the agenda and invite keynote speakers. Please suggest agenda items and potential speakers from within our membership. Remember, this is a members-only event so please RSVP through the portal.",
    createdAt: "2025-03-08T08:00:00Z",
    views: 89,
    isPinned: true,
    tags: ["AGM", "Events", "Announcements"],
    replies: [
      {
        id: "r4",
        authorId: "7",
        authorName: "Peter Njoroge",
        authorAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop",
        content:
          "I'd suggest we include a session on housing and urban development trends. This is relevant to many of our members and I know several experts who could present.",
        createdAt: "2025-03-09T11:00:00Z",
        likes: 7,
      },
      {
        id: "r5",
        authorId: "8",
        authorName: "Fatuma Ali",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
        content:
          "Legal updates session would be very valuable — there are significant policy changes coming in Q2 that will affect all districts. I can present if needed.",
        createdAt: "2025-03-09T14:30:00Z",
        likes: 11,
      },
    ],
  },
  {
    id: "3",
    title: "Technology adoption in our work: Tools members are using",
    category: "Technology",
    authorId: "1",
    authorName: "James Okoye",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    content:
      "Let's create a shared resource of digital tools that members are using effectively. I'll start: Notion for project management, Canva for community comms, WhatsApp Business for member outreach. What tools are you using? Any AI tools that have made a difference?",
    createdAt: "2025-03-07T16:00:00Z",
    views: 203,
    tags: ["Technology", "Tools", "Productivity"],
    replies: [
      {
        id: "r6",
        authorId: "10",
        authorName: "Joyce Achieng",
        authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop",
        content:
          "We've been using Typeform for community surveys and it's been brilliant. Also Google Workspace has improved our document collaboration massively. For AI, I use ChatGPT to help draft grant proposals — saves hours!",
        createdAt: "2025-03-08T09:00:00Z",
        likes: 15,
      },
      {
        id: "r7",
        authorId: "3",
        authorName: "Michael Otieno",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
        content:
          "Excel and Power BI for financial reporting. Tableau for visualizing district-level data when presenting to sponsors. Basic but very effective.",
        createdAt: "2025-03-08T11:45:00Z",
        likes: 8,
      },
    ],
  },
  {
    id: "4",
    title: "Youth mentorship program — looking for experienced mentors",
    category: "Mentorship",
    authorId: "10",
    authorName: "Joyce Achieng",
    authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop",
    content:
      "We are launching a new youth mentorship initiative in Districts 3, 4 and 5 targeting university students. We need 20 experienced mentors who can commit 4 hours per month for 6 months. This is a fantastic opportunity to give back and also grow your network. Who's interested?",
    createdAt: "2025-03-05T10:00:00Z",
    views: 78,
    tags: ["Mentorship", "Youth", "Education"],
    replies: [
      {
        id: "r8",
        authorId: "9",
        authorName: "Robert Kamau",
        authorAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&fit=crop",
        content:
          "Count me in! Media and communications mentorship is something I'm passionate about. I'll sign up for 2 mentees if needed.",
        createdAt: "2025-03-05T12:00:00Z",
        likes: 6,
      },
    ],
  },
  {
    id: "5",
    title: "Funding opportunities: Q2 2025 grant roundup for community projects",
    category: "Funding & Grants",
    authorId: "8",
    authorName: "Fatuma Ali",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
    content:
      "Sharing a curated list of grant opportunities relevant to our members' work. These are open for applications in Q2 2025. Full details and application guides available in the Opportunities section.",
    createdAt: "2025-03-03T08:00:00Z",
    views: 321,
    tags: ["Grants", "Funding", "Finance"],
    replies: [
      {
        id: "r9",
        authorId: "5",
        authorName: "David Mwangi",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
        content:
          "Thank you Fatuma! The USAID Agriculture grant is very relevant to my work. Has anyone applied to them before? Any tips on what they look for?",
        createdAt: "2025-03-03T10:00:00Z",
        likes: 4,
      },
      {
        id: "r10",
        authorId: "8",
        authorName: "Fatuma Ali",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
        content:
          "David, happy to share our application from last year as a template. DM me and I'll send it over. Key is strong impact metrics and a clear sustainability plan.",
        createdAt: "2025-03-03T11:30:00Z",
        likes: 9,
      },
    ],
  },
  {
    id: "6",
    title: "Health & Wellness: Let's talk about member wellbeing",
    category: "Health & Wellness",
    authorId: "4",
    authorName: "Amina Hassan",
    authorAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop",
    content:
      "Community work is rewarding but can be draining. I want to open a discussion about member wellbeing — what we do to recharge, manage stress, and stay motivated. Mental health is just as important as our projects. Share your tips!",
    createdAt: "2025-03-01T09:00:00Z",
    views: 55,
    tags: ["Wellness", "Mental Health", "Self-Care"],
    replies: [],
  },
];

export const TOPIC_CATEGORIES = [
  "All Categories",
  "Community Development",
  "Events & Announcements",
  "Technology",
  "Mentorship",
  "Funding & Grants",
  "Health & Wellness",
  "Business & Finance",
  "Education",
];

// ─── Opportunities ──────────────────────────────────────────────────────────
export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "1",
    title: "Partnership: Co-funding Community Health Clinic — District 4",
    postedById: "4",
    postedByName: "Amina Hassan",
    postedByAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop",
    district: "District 4",
    category: "Healthcare",
    description:
      "Seeking co-funding partners for a permanent community health clinic in Kilimani. Target budget: $150,000. Already secured $60,000 from two NGOs. Looking for corporate sponsors and individual investors who will receive naming rights and board representation.",
    requirements: ["Min. $10,000 contribution", "Commitment for 3-year operations", "Attendance at quarterly board meetings"],
    deadline: "2025-04-30",
    createdAt: "2025-03-10T08:00:00Z",
    type: "partnership",
    location: "Kilimani, District 4",
  },
  {
    id: "2",
    title: "Job Opening: Operations Manager — Tech Startup (Members Only Referral)",
    postedById: "1",
    postedByName: "James Okoye",
    postedByAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    district: "District 3",
    category: "Technology",
    description:
      "My company is hiring an experienced Operations Manager. This role is being offered first to our community members before going to the open market. 5+ years experience required. Competitive package including equity options. Must be based in Nairobi.",
    requirements: ["5+ years ops experience", "Tech industry background preferred", "Strong leadership skills", "MBA is a plus"],
    deadline: "2025-03-31",
    createdAt: "2025-03-08T10:00:00Z",
    type: "job",
    location: "Westlands, Nairobi",
    salary: "$4,000–$6,000/month + equity",
  },
  {
    id: "3",
    title: "Grant Opportunity: UNDP Youth Innovation Fund 2025",
    postedById: "8",
    postedByName: "Fatuma Ali",
    postedByAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
    district: "All Districts",
    category: "Grants & Funding",
    description:
      "UNDP is offering grants up to $50,000 for youth-focused innovation projects. This is open to all districts. The fund prioritizes agriculture, health, education and climate resilience. I have the application guide and can assist members with their applications.",
    requirements: [
      "Project must benefit 500+ youth",
      "Registered organization (NGO/CBO/Company)",
      "Budget narrative required",
      "2-year project timeline",
    ],
    deadline: "2025-05-15",
    createdAt: "2025-03-05T09:00:00Z",
    type: "grant",
    location: "All Districts",
  },
  {
    id: "4",
    title: "Mentorship: Business Growth Program — 6 Spots Available",
    postedById: "3",
    postedByName: "Michael Otieno",
    postedByAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    district: "District 2",
    category: "Mentorship",
    description:
      "Offering mentorship to 6 small business owners looking to scale. I have 12 years in corporate finance and have helped 3 businesses go from startup to Series A. Sessions are bi-weekly for 4 months. No cost — this is my giving back contribution.",
    requirements: ["Active business for at least 1 year", "Revenue stage (not pre-revenue)", "Commitment to all 8 sessions", "Open mindset"],
    deadline: "2025-04-01",
    createdAt: "2025-03-04T11:00:00Z",
    type: "mentorship",
    location: "Online + Eastlands District Office",
  },
  {
    id: "5",
    title: "Event: Annual Real Estate Investment Summit — Early Bird Tickets",
    postedById: "7",
    postedByName: "Peter Njoroge",
    postedByAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop",
    district: "District 5",
    category: "Real Estate",
    description:
      "Organizing our annual real estate summit featuring 8 expert speakers on market trends, land law updates and investment strategies. Members get 40% early bird discount. Networking dinner included. Limited to 200 attendees.",
    requirements: ["Member in good standing", "Early bird deadline: March 25th", "Limited to 2 tickets per member"],
    deadline: "2025-05-10",
    createdAt: "2025-03-02T08:00:00Z",
    type: "event",
    location: "Lavington, District 5",
    salary: "Member Price: $120 (Early Bird)",
  },
  {
    id: "6",
    title: "Media Production Partnership — Documentary on Community Impact",
    postedById: "9",
    postedByName: "Robert Kamau",
    postedByAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&fit=crop",
    district: "All Districts",
    category: "Media & Communications",
    description:
      "Producing a documentary series on the impact of our community across all districts. Looking for members willing to be featured and organizations willing to co-produce. This will be pitched to national TV and streaming platforms.",
    requirements: ["Compelling community story to share", "Available for 2 filming days", "Sign media release form"],
    deadline: "2025-04-20",
    createdAt: "2025-03-01T10:00:00Z",
    type: "partnership",
    location: "All Districts",
  },
];

export const OPPORTUNITY_CATEGORIES = [
  "All Types",
  "job",
  "partnership",
  "grant",
  "mentorship",
  "event",
];

// ─── Conversations ──────────────────────────────────────────────────────────
export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    participantId: "2",
    participantName: "Sarah Kimani",
    participantAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    lastMessage: "Yes, let's schedule a call this week!",
    lastMessageTime: "2025-03-12T14:30:00Z",
    unreadCount: 2,
    messages: [
      {
        id: "m1",
        fromId: "2",
        toId: "1",
        content: "Hi James, great discussion in the tech thread!",
        timestamp: "2025-03-12T13:00:00Z",
        read: true,
      },
      {
        id: "m2",
        fromId: "1",
        toId: "2",
        content: "Thanks Sarah! I'd love to discuss the app prototype with you.",
        timestamp: "2025-03-12T13:15:00Z",
        read: true,
      },
      {
        id: "m3",
        fromId: "2",
        toId: "1",
        content: "That sounds great. I think District 1 would benefit a lot from it.",
        timestamp: "2025-03-12T14:00:00Z",
        read: true,
      },
      {
        id: "m4",
        fromId: "2",
        toId: "1",
        content: "Yes, let's schedule a call this week!",
        timestamp: "2025-03-12T14:30:00Z",
        read: false,
      },
    ],
  },
  {
    id: "c2",
    participantId: "8",
    participantName: "Fatuma Ali",
    participantAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
    lastMessage: "I'll send the grant template now.",
    lastMessageTime: "2025-03-11T10:00:00Z",
    unreadCount: 0,
    messages: [
      {
        id: "m5",
        fromId: "1",
        toId: "8",
        content: "Fatuma, can I get the USAID grant template you mentioned?",
        timestamp: "2025-03-11T09:30:00Z",
        read: true,
      },
      {
        id: "m6",
        fromId: "8",
        toId: "1",
        content: "I'll send the grant template now.",
        timestamp: "2025-03-11T10:00:00Z",
        read: true,
      },
    ],
  },
  {
    id: "c3",
    participantId: "4",
    participantName: "Amina Hassan",
    participantAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop",
    lastMessage: "We should connect at the AGM!",
    lastMessageTime: "2025-03-10T16:00:00Z",
    unreadCount: 1,
    messages: [
      {
        id: "m7",
        fromId: "4",
        toId: "1",
        content: "James, I saw your comment about the community app.",
        timestamp: "2025-03-10T15:30:00Z",
        read: true,
      },
      {
        id: "m8",
        fromId: "4",
        toId: "1",
        content: "We should connect at the AGM!",
        timestamp: "2025-03-10T16:00:00Z",
        read: false,
      },
    ],
  },
];

// ─── Stats for coordinator dashboard ─────────────────────────────────────────
export const COORDINATOR_STATS = {
  totalMembers: 10,
  activeThisMonth: 8,
  newThisMonth: 2,
  districtEngagement: [
    { district: "District 1", members: 2, active: 2 },
    { district: "District 2", members: 2, active: 1 },
    { district: "District 3", members: 2, active: 2 },
    { district: "District 4", members: 2, active: 2 },
    { district: "District 5", members: 1, active: 0 },
    { district: "District 6", members: 1, active: 0 },
  ],
};
