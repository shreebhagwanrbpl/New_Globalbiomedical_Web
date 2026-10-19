import { Recipe } from '@/types/recipe';

export const staticRecipes: Recipe[] = [
  {
    id: 'recipe-hyderabadi-dum-biryani',
    title: 'Royal Hyderabadi Dum Biryani',
    slug: 'royal-hyderabadi-dum-biryani',
    subtitle: 'Fragrant basmati rice layered with spiced marinated meat, slow-cooked in traditional dum',
    description: 'The undisputed jewel of Mughal-Nizami culinary heritage. Long-grain aged basmati rice infused with whole green cardamom, saffron, mace, and tender cuts slow-cooked sealed with dough.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 40,
    cookTimeMinutes: 50,
    totalTimeMinutes: 90,
    servings: 6,
    difficulty: 'Advanced',
    cuisine: 'Hyderabadi',
    spicinessLevel: 'Spicy',
    ingredients: [
      { name: 'Aged Basmati Rice', quantity: '500g' },
      { name: 'Chicken or Mutton pieces', quantity: '750g' },
      { name: 'Hyderabadi Biryani Masala', quantity: '2.5 tbsp', productId: 'prod-biryani-masala-hyderabadi', isKeySpice: true },
      { name: 'Idukki Green Cardamom', quantity: '6-8 pods', productId: 'prod-green-cardamom-idukki', isKeySpice: true },
      { name: 'Kashmiri Mongra Saffron', quantity: '15-20 strands', productId: 'prod-saffron-kashmiri-mongra', isKeySpice: true },
      { name: 'Ceylon Cinnamon Sticks', quantity: '2 inch stick', productId: 'prod-cinnamon-ceylon', isKeySpice: true },
      { name: 'Black Peppercorns', quantity: '1 tsp', productId: 'prod-black-pepper-malabar', isKeySpice: true },
      { name: 'Fresh Mint & Coriander leaves', quantity: '1 cup chopped' },
      { name: 'Pure Desi Ghee', quantity: '4 tbsp' },
      { name: 'Fried Onions (Birista)', quantity: '1.5 cups' },
      { name: 'Thick Whisked Curd (Dahi)', quantity: '1 cup' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Marinate the meat with curd, Hyderabadi Biryani Masala, ginger-garlic paste, mint, fried onions, and 1 tbsp ghee for minimum 2 hours.',
        tip: 'For deep flavour infusion, overnight marination in the refrigerator gives restaurant-level tenderness.',
        timeInMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Soak saffron strands in 4 tbsp warm milk. In a heavy bottom vessel, boil 3 litres water with cardamom, cinnamon, cloves, and salt until bubbling aromatically.',
        tip: 'The water should taste pleasantly salty like seawater so rice absorbs flavour evenly.',
        timeInMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: 'Boil soaked basmati rice until 70% cooked (grains should bend without snapping). Drain immediately.',
        timeInMinutes: 8
      },
      {
        stepNumber: 4,
        instruction: 'Layer marinated meat at the base of a heavy handi. Spread 70% cooked rice over it. Drizzle saffron milk, remaining ghee, fried onions, and chopped mint.',
        timeInMinutes: 7
      },
      {
        stepNumber: 5,
        instruction: 'Seal lid tightly with wheat flour dough or heavy foil. Cook on medium flame for 10 minutes, then place on a hot iron tawa on low flame for 30 minutes for gentle dum.',
        tip: 'Let rest unopened for 15 minutes before gently fluffing from the side with a flat ladle.',
        timeInMinutes: 40
      }
    ],
    featuredSpices: [
      'prod-biryani-masala-hyderabadi',
      'prod-green-cardamom-idukki',
      'prod-saffron-kashmiri-mongra',
      'prod-cinnamon-ceylon'
    ],
    featured: true,
    published: true,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'recipe-rajasthani-dal-baati',
    title: 'Authentic Rajasthani Dal Baati Churma',
    slug: 'rajasthani-dal-baati-churma',
    subtitle: 'Classic baked wheat baatis soaked in desi ghee, served with spicy panchmel dal and sweet churma',
    description: 'The quintessential culinary pride of Rajasthan. Golden baked baatis infused with ajwain and ghee, served with slow-simmered five-lentil dal spiced with Mathania mirch and hing.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 30,
    cookTimeMinutes: 45,
    totalTimeMinutes: 75,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Rajasthani',
    spicinessLevel: 'Medium',
    ingredients: [
      { name: 'Panchmel Dal (5 mixed lentils)', quantity: '1 cup' },
      { name: 'Rajasthani Dal Baati Masala', quantity: '2 tbsp', productId: 'prod-dal-baati-masala', isKeySpice: true },
      { name: 'Unjha Cumin Seeds (Jeera)', quantity: '1 tsp', productId: 'prod-cumin-seeds-unjha', isKeySpice: true },
      { name: 'Mathania Red Chilli Powder', quantity: '1 tsp', productId: 'prod-chilli-powder-red', isKeySpice: true },
      { name: 'Lakadong Turmeric Powder', quantity: '1/2 tsp', productId: 'prod-turmeric-powder-lakadong', isKeySpice: true },
      { name: 'Nagauri Kasuri Methi', quantity: '1 tbsp', productId: 'prod-kasuri-methi', isKeySpice: true },
      { name: 'Coarse Wheat Flour (Atta)', quantity: '2 cups' },
      { name: 'Pure Desi Cow Ghee', quantity: '1/2 cup' },
      { name: 'Fresh Ginger-Green Chilli paste', quantity: '1 tbsp' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Knead stiff dough with coarse wheat flour, semolina, ajwain, salt, and 4 tbsp melted ghee. Shape into smooth round balls (baatis).',
        timeInMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Bake in preheated oven or traditional tandoor gas oven at 190°C for 30 minutes, turning once until golden brown and cracked on top.',
        tip: 'Cracks on the top of the baati are the hallmark of perfect texture.',
        timeInMinutes: 30
      },
      {
        stepNumber: 3,
        instruction: 'Pressure cook soaked mixed lentils with turmeric and salt. In a separate kadai, prepare tadka with ghee, cumin seeds, hing, ginger, Mathania chilli powder, and Dal Baati Masala.',
        timeInMinutes: 15
      },
      {
        stepNumber: 4,
        instruction: 'Pour sizzling tadka into the cooked dal. Crush hot baatis lightly and immerse fully in warm desi ghee before serving.',
        tip: 'Crush 2 baatis and mix with powdered jaggery and ghee for instant rustic churma.',
        timeInMinutes: 10
      }
    ],
    featuredSpices: [
      'prod-dal-baati-masala',
      'prod-cumin-seeds-unjha',
      'prod-turmeric-powder-lakadong',
      'prod-kasuri-methi'
    ],
    featured: true,
    published: true,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'recipe-butter-chicken',
    title: 'Restaurant Style Murgh Makhani (Butter Chicken)',
    slug: 'restaurant-style-butter-chicken',
    subtitle: 'Silky, velvety tomato and cashew gravy with smoky charred tandoori chicken chunks',
    description: 'An iconic Delhi creation with velvety tomato-butter gravy, toasted kasuri methi, and fragrant shahi spices, balanced with honey and cream.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 25,
    cookTimeMinutes: 35,
    totalTimeMinutes: 60,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'North Indian',
    spicinessLevel: 'Mild',
    ingredients: [
      { name: 'Boneless Chicken Thighs', quantity: '600g' },
      { name: 'Kashmiri Chilli Powder', quantity: '2 tbsp', productId: 'prod-kashmiri-chilli-powder', isKeySpice: true },
      { name: 'Butter Chicken Masala Blend', quantity: '1.5 tbsp', productId: 'prod-chicken-curry-masala', isKeySpice: true },
      { name: 'Royal Shahi Garam Masala', quantity: '1 tsp', productId: 'prod-garam-masala-shahi', isKeySpice: true },
      { name: 'Nagauri Kasuri Methi', quantity: '1 tbsp', productId: 'prod-kasuri-methi', isKeySpice: true },
      { name: 'Ripe Red Hybrid Tomatoes', quantity: '600g' },
      { name: 'Whole Cashew Nuts', quantity: '15 pieces' },
      { name: 'Unsalted White Butter', quantity: '50g' },
      { name: 'Fresh Dairy Cream', quantity: '1/4 cup' },
      { name: 'Honey or Sugar', quantity: '1 tsp' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Marinate chicken with Kashmiri chilli powder, lemon juice, ginger-garlic paste, and curd. Pan-sear or grill until lightly charred.',
        timeInMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Boil tomatoes, cashews, cardamoms, and Kashmiri chilli powder in 1 cup water for 15 minutes. Cool and blend to a velvet smooth purée, then strain.',
        tip: 'Straining the purée through a fine mesh sieve is the secret to silkiness.',
        timeInMinutes: 15
      },
      {
        stepNumber: 3,
        instruction: 'Melt butter in a pan, add strained puree and simmer for 10 minutes until butter separates. Add cooked chicken chunks and Shahi Garam Masala.',
        timeInMinutes: 10
      },
      {
        stepNumber: 4,
        instruction: 'Rub Kasuri Methi between your palms and sprinkle over the gravy. Stir in fresh cream and honey. Simmer for 2 minutes and serve hot with garlic naan.',
        tip: 'Crushing Kasuri Methi releases volatile fragrance right before finishing.',
        timeInMinutes: 5
      }
    ],
    featuredSpices: [
      'prod-kashmiri-chilli-powder',
      'prod-garam-masala-shahi',
      'prod-kasuri-methi',
      'prod-chicken-curry-masala'
    ],
    featured: true,
    published: true,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'recipe-paneer-tikka-masala',
    title: 'Smoky Paneer Tikka Masala',
    slug: 'smoky-paneer-tikka-masala',
    subtitle: 'Marinated cottage cheese cubes grilled and tossed in an aromatic spiced onion-tomato gravy',
    description: 'Juicy chunks of fresh paneer infused with roasted tandoori spices and capsicum, simmered in a luscious masala gravy.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    totalTimeMinutes: 50,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'North Indian',
    spicinessLevel: 'Medium',
    ingredients: [
      { name: 'Fresh Malai Paneer', quantity: '400g cubed' },
      { name: 'Paneer Tikka Masala', quantity: '2 tbsp', productId: 'prod-paneer-tikka-masala', isKeySpice: true },
      { name: 'Kashmiri Chilli Powder', quantity: '1 tbsp', productId: 'prod-kashmiri-chilli-powder', isKeySpice: true },
      { name: 'Coriander Powder', quantity: '1 tbsp', productId: 'prod-coriander-powder', isKeySpice: true },
      { name: 'Kasuri Methi', quantity: '1 tsp', productId: 'prod-kasuri-methi', isKeySpice: true },
      { name: 'Amchur (Dry Mango Powder)', quantity: '1/2 tsp', productId: 'prod-amchur-powder', isKeySpice: true },
      { name: 'Diced Bell Peppers & Onions', quantity: '1 cup' },
      { name: 'Mustard Oil', quantity: '2 tbsp' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Mix roasted besan, mustard oil, Paneer Tikka Masala, and hung curd. Coat paneer cubes and vegetables. Grill on a hot pan or oven until edges char.',
        timeInMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'In a separate skillet, sauté finely chopped onions till golden brown. Add ginger-garlic paste, pureed tomatoes, coriander powder, and turmeric.',
        timeInMinutes: 15
      },
      {
        stepNumber: 3,
        instruction: 'Add grilled paneer and peppers into the rich gravy. Finish with amchur powder, crushed kasuri methi, and fresh cream.',
        timeInMinutes: 10
      }
    ],
    featuredSpices: [
      'prod-paneer-tikka-masala',
      'prod-kashmiri-chilli-powder',
      'prod-coriander-powder',
      'prod-amchur-powder'
    ],
    featured: true,
    published: true,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'recipe-amritsari-chole',
    title: 'Authentic Amritsari Pindi Chole',
    slug: 'authentic-amritsari-chole',
    subtitle: 'Dark, robust, and tangy chickpeas slow-cooked with whole spices and tea bag infusion',
    description: 'Direct from the dhabas of Amritsar. Chickpeas cooked with black tea bags for a deep ebony colour, spiced with roasted anardana, amchur, and special chole masala.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 15,
    cookTimeMinutes: 45,
    totalTimeMinutes: 60,
    servings: 5,
    difficulty: 'Medium',
    cuisine: 'Punjabi',
    spicinessLevel: 'Spicy',
    ingredients: [
      { name: 'Kabuli Chana (Chickpeas)', quantity: '2 cups soaked overnight' },
      { name: 'Punjabi Chole Masala', quantity: '2.5 tbsp', productId: 'prod-chole-masala', isKeySpice: true },
      { name: 'Dry Pomegranate Seed (Anardana) Powder', quantity: '1 tbsp', isKeySpice: true },
      { name: 'Dry Ginger (Sonth) Powder', quantity: '1/2 tsp', productId: 'prod-dry-ginger-powder', isKeySpice: true },
      { name: 'Black Cardamom', quantity: '2 pods', productId: 'prod-black-cardamom-badi-elaichi', isKeySpice: true },
      { name: 'Cumin Seeds', quantity: '1 tsp', productId: 'prod-cumin-seeds-unjha', isKeySpice: true },
      { name: 'Black Tea Bags (for rich colour)', quantity: '2 bags' },
      { name: 'Ginger Juliennes & Green Chillies', quantity: 'for garnish' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Pressure cook soaked chickpeas with black tea bags, black cardamom, cinnamon, salt, and water for 6-7 whistles until melt-in-mouth tender. Discard tea bags.',
        timeInMinutes: 25
      },
      {
        stepNumber: 2,
        instruction: 'In a cast iron kadai, roast Punjabi Chole Masala, anardana, and sonth in 3 tbsp hot ghee with cumin and green chillies.',
        timeInMinutes: 8
      },
      {
        stepNumber: 3,
        instruction: 'Add boiled chana along with cooking broth. Mash a few spoonfuls against the sides of the pan to thicken the gravy. Simmer on low heat for 15 minutes.',
        tip: 'Cooking in a seasoned cast iron pan imparts an authentic deep dark brown sheen.',
        timeInMinutes: 15
      },
      {
        stepNumber: 4,
        instruction: 'Finish with a sizzling ghee tadka of ginger juliennes and slit green chillies. Serve with piping hot bhature or kulche.',
        timeInMinutes: 5
      }
    ],
    featuredSpices: [
      'prod-chole-masala',
      'prod-black-cardamom-badi-elaichi',
      'prod-dry-ginger-powder',
      'prod-cumin-seeds-unjha'
    ],
    featured: true,
    published: true,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'recipe-kashmiri-rogan-josh',
    title: 'Royal Kashmiri Rogan Josh',
    slug: 'royal-kashmiri-rogan-josh',
    subtitle: 'Aromatic Kashmiri lamb stew infused with fennel, ginger, and ruby-red Kashmiri chillies',
    description: 'A masterpiece from the Kashmir Valley. Tender lamb slow-braised in mustard oil, whipped yoghurt, fennel powder, and vibrant Kashmiri mirch without onions or garlic in authentic Pandit style.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 20,
    cookTimeMinutes: 60,
    totalTimeMinutes: 80,
    servings: 4,
    difficulty: 'Advanced',
    cuisine: 'Kashmiri',
    spicinessLevel: 'Medium',
    ingredients: [
      { name: 'Mutton on Bone', quantity: '700g' },
      { name: 'Kashmiri Rogan Josh Masala', quantity: '2 tbsp', productId: 'prod-rogan-josh-masala', isKeySpice: true },
      { name: 'Kashmiri Lal Mirch Powder', quantity: '2 tbsp', productId: 'prod-kashmiri-chilli-powder', isKeySpice: true },
      { name: 'Fennel (Saunf) Powder', quantity: '1.5 tbsp', productId: 'prod-fennel-powder', isKeySpice: true },
      { name: 'Dry Ginger (Sonth) Powder', quantity: '1 tsp', productId: 'prod-dry-ginger-powder', isKeySpice: true },
      { name: 'Black Cardamom & Cloves', quantity: '3 each', productId: 'prod-cloves-laung', isKeySpice: true },
      { name: 'Pure Mustard Oil', quantity: '4 tbsp' },
      { name: 'Whisked Yoghurt', quantity: '3/4 cup' },
      { name: 'Asafoetida (Hing)', quantity: '1/4 tsp' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Heat mustard oil in a heavy handi until smoking point, cool slightly, then add hing, black cardamom, cloves, and mutton pieces. Sear on high heat.',
        timeInMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Whisk Kashmiri chilli powder with 2 tbsp water to form a smooth paste. Add to meat along with beaten yoghurt on low heat, stirring continuously so curd does not split.',
        timeInMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: 'Add fennel powder, dry ginger powder, and Rogan Josh Masala. Pour in 2 cups warm water. Cover and slow simmer for 45-50 minutes until meat is fork-tender.',
        tip: 'The iconic deep red layer of flavoured oil (Rogan) floating on top indicates completion.',
        timeInMinutes: 50
      }
    ],
    featuredSpices: [
      'prod-rogan-josh-masala',
      'prod-kashmiri-chilli-powder',
      'prod-fennel-powder',
      'prod-dry-ginger-powder'
    ],
    featured: true,
    published: true,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'recipe-south-indian-sambar',
    title: 'Authentic South Indian Udupi Sambar',
    slug: 'authentic-south-indian-sambar',
    subtitle: 'Tangy lentil and vegetable stew tempered with mustard seeds, curry leaves, and freshly roasted masala',
    description: 'Traditional temple-style sambar made with toor dal, shallots, drumsticks, tamarind pulp, and aromatic roasted South Indian Sambar Masala.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    totalTimeMinutes: 45,
    servings: 6,
    difficulty: 'Easy',
    cuisine: 'South Indian',
    spicinessLevel: 'Medium',
    ingredients: [
      { name: 'Toor Dal (Pigeon Pea Lentils)', quantity: '1 cup' },
      { name: 'South Indian Sambar Masala', quantity: '2 tbsp', productId: 'prod-sambar-masala-south', isKeySpice: true },
      { name: 'Mustard Seeds (Rai)', quantity: '1 tsp', productId: 'prod-mustard-seeds-brown', isKeySpice: true },
      { name: 'Fenugreek Seeds (Methi)', quantity: '1/4 tsp', productId: 'prod-fenugreek-seeds', isKeySpice: true },
      { name: 'Curry Leaves Powder or Fresh Leaves', quantity: '1 tbsp', productId: 'prod-curry-leaves-powder', isKeySpice: true },
      { name: 'Tamarind Paste', quantity: '2 tbsp' },
      { name: 'Shallots (Sambar Onions)', quantity: '15 peeled' },
      { name: 'Drumstick & Pumpkin pieces', quantity: '1.5 cups' },
      { name: 'Coconut Oil or Ghee', quantity: '2 tbsp' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Pressure cook toor dal with turmeric until mushy, then whisk smooth. In a pot, boil vegetables and shallots in tamarind water until tender.',
        timeInMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Add cooked dal, Sambar Masala, and salt to the pot. Simmer on medium flame for 10 minutes allowing the spice blend to infuse the vegetables.',
        timeInMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: 'In a small tadka pan, heat coconut oil, crackle mustard seeds, fenugreek seeds, dry red chillies, hing, and curry leaves. Pour over bubbling sambar.',
        tip: 'Using coconut oil for the final tempering gives quintessential coastal aroma.',
        timeInMinutes: 5
      }
    ],
    featuredSpices: [
      'prod-sambar-masala-south',
      'prod-mustard-seeds-brown',
      'prod-fenugreek-seeds',
      'prod-curry-leaves-powder'
    ],
    featured: true,
    published: true,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'recipe-punjabi-rajma-masala',
    title: 'Dhaba Style Punjabi Rajma Masala',
    slug: 'dhaba-style-punjabi-rajma-masala',
    subtitle: 'Creamy slow-simmered Kashmiri red kidney beans in a spiced onion, ginger, and tomato gravy',
    description: 'The ultimate comfort dish of North India. Red kidney beans slow-simmered till buttery soft in a caramelized onion and tomato masala, served over steamed basmati rice.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    totalTimeMinutes: 55,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Punjabi',
    spicinessLevel: 'Medium',
    ingredients: [
      { name: 'Kashmiri Rajma (Kidney Beans)', quantity: '2 cups soaked overnight' },
      { name: 'Punjabi Rajma Masala Blend', quantity: '2 tbsp', productId: 'prod-rajma-masala', isKeySpice: true },
      { name: 'Coriander Powder', quantity: '1 tbsp', productId: 'prod-coriander-powder', isKeySpice: true },
      { name: 'Cumin Powder', quantity: '1 tsp', productId: 'prod-cumin-powder', isKeySpice: true },
      { name: 'Kasuri Methi', quantity: '1 tsp', productId: 'prod-kasuri-methi', isKeySpice: true },
      { name: 'Finely Chopped Red Onions', quantity: '2 large' },
      { name: 'Fresh Tomato Purée', quantity: '1.5 cups' },
      { name: 'Desi Ghee or Butter', quantity: '3 tbsp' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Pressure cook soaked rajma with black cardamom, cinnamon, salt, and water for 6 whistles until completely soft when pressed between fingers.',
        timeInMinutes: 20
      },
      {
        stepNumber: 2,
        instruction: 'In a kadai, sauté onions in ghee until deep golden. Add ginger-garlic paste and cook till fragrant. Stir in tomato puree and spices.',
        timeInMinutes: 12
      },
      {
        stepNumber: 3,
        instruction: 'Add boiled rajma with cooking liquid. Simmer on low flame for 20 minutes. Lightly mash 20% of the beans to create a creamy gravy.',
        tip: 'Slow simmering allows the kidney beans to absorb the masala deep into their core.',
        timeInMinutes: 20
      }
    ],
    featuredSpices: [
      'prod-rajma-masala',
      'prod-coriander-powder',
      'prod-cumin-powder',
      'prod-kasuri-methi'
    ],
    featured: true,
    published: true,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'recipe-ayurvedic-golden-milk',
    title: 'Ayurvedic Golden Turmeric Latte (Haldi Doodh)',
    slug: 'ayurvedic-golden-turmeric-latte',
    subtitle: 'Nourishing healing elixir brewed with high-curcumin Lakadong turmeric, cardamom, and black pepper',
    description: 'An ancient Vedic restorative recipe for immunity and deep vitality. High-curcumin Lakadong turmeric activated with freshly crushed black pepper and green cardamom in warm milk.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    totalTimeMinutes: 15,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'Ayurvedic',
    spicinessLevel: 'Mild',
    ingredients: [
      { name: 'Full Cream Milk or Almond Milk', quantity: '2 cups' },
      { name: 'Lakadong Turmeric Powder (5.8% Curcumin)', quantity: '1 tsp', productId: 'prod-turmeric-powder-lakadong', isKeySpice: true },
      { name: 'Malabar Black Pepper (crushed)', quantity: '1/4 tsp', productId: 'prod-black-pepper-malabar', isKeySpice: true },
      { name: 'Green Cardamom Powder', quantity: '1/4 tsp', productId: 'prod-green-cardamom-idukki', isKeySpice: true },
      { name: 'Dry Ginger Powder', quantity: '1/4 tsp', productId: 'prod-dry-ginger-powder', isKeySpice: true },
      { name: 'Kashmiri Mongra Saffron', quantity: '4-5 strands', productId: 'prod-saffron-kashmiri-mongra', isKeySpice: true },
      { name: 'Pure Raw Honey or Jaggery', quantity: '1-2 tsp' },
      { name: 'Desi Cow Ghee', quantity: '1/2 tsp' }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'In a small saucepan, heat milk with ghee on medium heat. Whisk in Lakadong turmeric, crushed black pepper, cardamom, and ginger powder.',
        tip: 'Piperine in black pepper increases turmeric curcumin absorption by up to 2,000%. Ghee provides the necessary lipid carrier.',
        timeInMinutes: 5
      },
      {
        stepNumber: 2,
        instruction: 'Simmer gently on low heat for 5 minutes, stirring occasionally with a small whisk so spices infuse thoroughly.',
        timeInMinutes: 5
      },
      {
        stepNumber: 3,
        instruction: 'Turn off heat, let cool to warm drinking temperature, then stir in raw honey. Garnish with saffron strands and serve.',
        tip: 'Never boil raw honey; always add it when the drink is comfortably warm.',
        timeInMinutes: 2
      }
    ],
    featuredSpices: [
      'prod-turmeric-powder-lakadong',
      'prod-black-pepper-malabar',
      'prod-green-cardamom-idukki',
      'prod-saffron-kashmiri-mongra'
    ],
    featured: true,
    published: true,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  }
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return staticRecipes.find(r => r.slug === slug || r.id === slug);
}
