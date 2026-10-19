export interface RecipeIngredient {
  name: string;
  quantity: string;
  productId?: string; // Link to our spice product if applicable
  isKeySpice?: boolean;
}

export interface RecipeInstructionStep {
  stepNumber: number;
  instruction: string;
  tip?: string;
  timeInMinutes?: number;
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  cuisine: string; // e.g. "North Indian", "South Indian", "Hyderabadi", "Chettinad"
  spicinessLevel: 'Mild' | 'Medium' | 'Spicy' | 'Fiery';
  ingredients: RecipeIngredient[];
  instructions: RecipeInstructionStep[];
  featuredSpices: string[]; // Product IDs of key spices used
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
