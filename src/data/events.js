// Static event data for Practical 1.
// Practical 2 will fetch this via a custom hook; Practical 4 replaces it
// with a real MongoDB-backed REST API. The shape stays the same.
export const events = [
  {
    id: 1,
    title: 'HackCampus 2026',
    club: 'Coding Club',
    date: '2026-09-12',
    time: '09:00 AM',
    venue: 'Main Auditorium',
    category: 'Technical',
    seats: 200,
    registered: 147,
    poster: 'https://picsum.photos/seed/hack/600/400',
    description:
      'A 24-hour hackathon where teams build working prototypes around a surprise theme. Mentors, free food and prizes worth ₹50,000.',
  },
  {
    id: 2,
    title: 'Rhythm — Cultural Night',
    club: 'Cultural Committee',
    date: '2026-09-20',
    time: '06:00 PM',
    venue: 'Open Air Theatre',
    category: 'Cultural',
    seats: 500,
    registered: 431,
    poster: 'https://picsum.photos/seed/rhythm/600/400',
    description:
      'An evening of music, dance and drama performances from every department, closing with a live band.',
  },
  {
    id: 3,
    title: 'AI/ML Workshop Series',
    club: 'Data Science Club',
    date: '2026-09-25',
    time: '02:00 PM',
    venue: 'Lab 304',
    category: 'Workshop',
    seats: 60,
    registered: 58,
    poster: 'https://picsum.photos/seed/aiml/600/400',
    description:
      'Three hands-on sessions covering model training, evaluation and deployment. Bring your own laptop.',
  },
  {
    id: 4,
    title: 'Inter-College Football Cup',
    club: 'Sports Committee',
    date: '2026-10-02',
    time: '08:00 AM',
    venue: 'College Ground',
    category: 'Sports',
    seats: 300,
    registered: 89,
    poster: 'https://picsum.photos/seed/football/600/400',
    description:
      'Eight colleges, one trophy. Knockout format across two days with the final under floodlights.',
  },
  {
    id: 5,
    title: 'Startup Pitch Day',
    club: 'E-Cell',
    date: '2026-10-08',
    time: '11:00 AM',
    venue: 'Seminar Hall B',
    category: 'Technical',
    seats: 120,
    registered: 64,
    poster: 'https://picsum.photos/seed/pitch/600/400',
    description:
      'Pitch your idea to a panel of investors and alumni founders. Top three teams get incubation support.',
  },
  {
    id: 6,
    title: 'Photography Walk',
    club: 'Photography Club',
    date: '2026-10-15',
    time: '06:30 AM',
    venue: 'Marine Drive',
    category: 'Cultural',
    seats: 40,
    registered: 12,
    poster: 'https://picsum.photos/seed/photo/600/400',
    description:
      'A sunrise walk along the coast with a focus on street and long-exposure photography.',
  },
]
