const UNSPLASH = (id) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=700&fit=crop&q=80&auto=format`;

export const EVENTS = [
  {
    id: 'startup-bootcamp',
    title: "Startup Bootcamp",
    tagline: "From idea to MVP in 3 intensive days",
    date: null,
    time: null,
    image: UNSPLASH("1519681393784-d120267933ba"),
    attendees: 0,
    location: null,
    category: "Workshop",
    description:
      "The Startup Bootcamp is a 3-day intensive program designed to take your raw idea and transform it into a market-ready MVP. Led by experienced mentors from top startups and accelerators, you'll learn lean startup methodology, rapid prototyping, customer discovery, and pitching. Teams of 3–5 will compete for seed funding from E-Cell's incubation fund.",
    highlights: [
      "Lean startup methodology crash course",
      "1-on-1 mentor sessions with serial entrepreneurs",
      "Customer validation & market research workshop",
      "Rapid prototyping with no-code tools",
      "Demo day pitch to a panel of investors",
      "Top teams receive incubation support from E-Cell",
    ],
    speakers: [],
    tags: ["bootcamp", "mvp", "lean-startup", "mentorship", "ideation"],
  },
  {
    id: 'founders-meetup',
    title: "Founders Meetup",
    tagline: "Where founders talk, listen, and grow",
    date: null,
    time: null,
    image: UNSPLASH("1470071459604-3b5ec3a7fe05"),
    attendees: 0,
    location: null,
    category: "Networking",
    description:
      "A relaxed, candid evening for student founders, wannapreneurs, and anyone passionate about building something from scratch. There's no formal agenda — just great conversations, honest stories of failure and success, and the energy of a room full of people who refuse to settle. Grab a seat, introduce yourself, and find your co-founder.",
    highlights: [
      "Open mic: 90-second intros for anyone who wants to share their idea",
      "Speed networking rounds",
      "Live music & refreshments",
      "Resources table: templates, tools, and mentor contacts",
    ],
    speakers: [],
    tags: ["networking", "founders", "community", "meetup"],
  },
  {
    id: 'ideathon',
    title: "IDEATHON",
    tagline: "Pitch your ideas, build the future",
    date: new Date('2026-09-18T10:00:00'),
    time: "10:00 AM",
    image: UNSPLASH("1531482615713-2afd69097998"),
    attendees: 124,
    location: "Main Auditorium",
    category: "Competition",
    description:
      "Join us for our flagship IDEATHON! Bring your innovative ideas to life during this intensive brainstorming and pitching event. Work with mentors, refine your business models, and present to a panel of expert judges.",
    highlights: [
      "Mentorship from industry veterans",
      "Interactive pitch workshops",
      "Prizes and seed funding opportunities",
      "Networking with potential co-founders",
    ],
    speakers: [],
    tags: ["ideathon", "pitch", "competition", "innovation"],
  },
];
