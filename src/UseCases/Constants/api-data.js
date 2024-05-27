const CATEGORIES = [
  'General Knowledge',
  'Books',
  'Films',
  'Music',
  'Musicals & Theatres',
  'Television',
  'Video Games',
  'Board Games',
  'Science & Nature',
  'Computer',
  'Mathematics',
  'Mythology',
  'Sports',
  'Geography',
  'History',
  'Politics',
  'Arts',
  'Celebrities',
  'Animals',
  'Vehicles',
  'Comics',
  'Gadgets',
  'Japanese Anime & Manga',
  'Cartoon & Animations',
];

const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

export const CATEGORIES_DATASET = CATEGORIES.map((item, index) => ({
  value: index + 9,
  label: item,
}));

export const DIFFICULTY_DATASET = DIFFICULTY_LEVELS.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const TYPE_DATASET = [
  { value: 'multiple', label: 'Multiple Choice' },
  { value: 'boolean', label: 'True/False' },
];
