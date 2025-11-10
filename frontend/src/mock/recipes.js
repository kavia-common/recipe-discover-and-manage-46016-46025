const recipes = [
  {
    id: 'r1',
    title: 'Seaside Lemon Herb Salmon',
    description: 'Buttery salmon baked with lemon, dill, and capers.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop',
    time: 25,
    difficulty: 'Easy',
    servings: 2,
    tags: ['Seafood', 'Dinner'],
    ingredients: [
      '2 salmon fillets',
      '1 lemon, sliced',
      '1 tbsp capers',
      '2 tbsp butter',
      'Fresh dill',
      'Salt & pepper'
    ],
    steps: [
      'Preheat oven to 400°F (200°C).',
      'Place salmon on sheet, top with butter, lemon, capers, and dill.',
      'Bake 12–15 minutes until flaky.',
    ],
  },
  {
    id: 'r2',
    title: 'Amber Spiced Sweet Potato Soup',
    description: 'Smooth, warming soup with ginger and coconut milk.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop',
    time: 40,
    difficulty: 'Medium',
    servings: 4,
    tags: ['Vegan', 'Soup'],
    ingredients: [
      '2 large sweet potatoes',
      '1 can coconut milk',
      '1 inch ginger, grated',
      '1 onion',
      '2 cloves garlic',
      'Vegetable stock'
    ],
    steps: [
      'Sauté onion, garlic, and ginger.',
      'Add sweet potatoes and stock, simmer until tender.',
      'Blend with coconut milk until smooth; season to taste.',
    ],
  },
  {
    id: 'r3',
    title: 'Retro Tuna Melt',
    description: 'Classic toasted sandwich with tuna, cheddar, and pickles.',
    image: 'https://images.unsplash.com/photo-1604909052743-88e8546c0898?q=80&w=1200&auto=format&fit=crop',
    time: 15,
    difficulty: 'Easy',
    servings: 1,
    tags: ['Sandwich', 'Lunch'],
    ingredients: [
      '2 slices sourdough',
      'Tuna, drained',
      '2 slices cheddar',
      'Pickles',
      '1 tbsp mayo',
      'Butter'
    ],
    steps: [
      'Mix tuna with mayo; layer on bread with cheddar and pickles.',
      'Butter outside and pan-grill until golden and cheese melts.',
    ],
  },
  {
    id: 'r4',
    title: 'Citrus Garden Salad',
    description: 'Crisp greens with orange segments and toasted almonds.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
    time: 10,
    difficulty: 'Easy',
    servings: 2,
    tags: ['Salad', 'Healthy'],
    ingredients: [
      'Mixed greens',
      '1 orange, segmented',
      'Toasted almonds',
      'Olive oil, vinegar',
      'Salt & pepper'
    ],
    steps: [
      'Toss greens with orange and almonds.',
      'Dress with olive oil and vinegar; season.',
    ],
  },
  {
    id: 'r5',
    title: 'Blue Ocean Pasta',
    description: 'Linguine tossed with garlic shrimp and parsley.',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1200&auto=format&fit=crop',
    time: 30,
    difficulty: 'Medium',
    servings: 3,
    tags: ['Pasta', 'Seafood'],
    ingredients: [
      'Linguine',
      'Shrimp',
      'Garlic, minced',
      'Parsley',
      'Olive oil',
      'Lemon'
    ],
    steps: [
      'Cook pasta until al dente.',
      'Sauté garlic in oil, add shrimp; toss with pasta, parsley, lemon.',
    ],
  }
];

export default recipes;
