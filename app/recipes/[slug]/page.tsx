'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { staticRecipes, getRecipeBySlug } from '@/data/recipes';
import { staticProducts, getProductById } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/currency';
import {
  ChevronRight,
  Clock,
  ChefHat,
  Users,
  Flame,
  CheckSquare,
  Square,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Share2,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { LUXURY_EASE } from '@/components/animations/Motion';

export default function RecipeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const recipe = getRecipeBySlug(slug) || staticRecipes[0];
  const { addToCart } = useStore();

  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [allSpicesAdded, setAllSpicesAdded] = useState(false);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Find linked spice products
  const keySpiceProducts = useMemo(() => {
    return recipe.ingredients
      .filter(ing => ing.productId)
      .map(ing => {
        const prod = getProductById(ing.productId!);
        return prod ? { ...prod, recipeAmount: ing.quantity } : null;
      })
      .filter(Boolean) as (typeof staticProducts[0] & { recipeAmount: string })[];
  }, [recipe]);

  const handleAddAllSpices = () => {
    keySpiceProducts.forEach(prod => {
      addToCart(prod, 1, prod.weight || '100g');
    });
    setAllSpicesAdded(true);
    setTimeout(() => setAllSpicesAdded(false), 3000);
  };

  // Other recipes from same cuisine or general
  const relatedRecipes = staticRecipes.filter(r => r.id !== recipe.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-spice-border py-3">
        <Container size="2xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe font-medium truncate">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong shrink-0" />
            <Link href="/recipes" className="hover:text-spice-espresso">Recipes</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong shrink-0" />
            <span className="text-spice-espresso font-bold truncate">{recipe.title}</span>
          </nav>
        </Container>
      </div>

      <Container size="2xl" className="mt-8">
        {/* Header Hero Title Section */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-spice-espresso text-white text-xs font-bold">
              {recipe.cuisine} Cuisine
            </span>
            <span className="px-3 py-1 rounded-full bg-spice-terracotta/10 text-spice-terracotta text-xs font-bold">
              {recipe.difficulty} Level
            </span>
            <span className="px-3 py-1 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-xs font-bold">
              {recipe.spicinessLevel} Heat
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-3">
            {recipe.title}
          </h1>

          <p className="text-base sm:text-lg text-spice-taupe leading-relaxed mb-6">
            {recipe.subtitle || recipe.description}
          </p>
        </div>

        {/* Hero Visual & Meta Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
          {/* Main Visual */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden aspect-[16/9] shadow-warm-md border border-spice-border bg-spice-sand/40">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick Recipe Info Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-spice-espresso pb-4 border-b border-spice-border">
                Recipe Overview
              </h3>

              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-spice-taupe flex items-center gap-2">
                    <Clock className="w-4 h-4 text-spice-terracotta" /> Prep Time
                  </span>
                  <span className="text-xs font-bold text-spice-espresso">{recipe.prepTimeMinutes} Mins</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-spice-taupe flex items-center gap-2">
                    <Flame className="w-4 h-4 text-spice-terracotta" /> Cook Time
                  </span>
                  <span className="text-xs font-bold text-spice-espresso">{recipe.cookTimeMinutes} Mins</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-spice-taupe flex items-center gap-2">
                    <Clock className="w-4 h-4 text-spice-cardamom" /> Total Time
                  </span>
                  <span className="text-xs font-bold text-spice-espresso">{recipe.totalTimeMinutes} Mins</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-spice-taupe flex items-center gap-2">
                    <Users className="w-4 h-4 text-spice-cardamom" /> Servings
                  </span>
                  <span className="text-xs font-bold text-spice-espresso">{recipe.servings} Persons</span>
                </div>
              </div>
            </div>

            {keySpiceProducts.length > 0 && (
              <div className="pt-4 border-t border-spice-border">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={handleAddAllSpices}
                >
                  {allSpicesAdded ? (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Spices Added to Cart!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4" /> Add All {keySpiceProducts.length} Spices to Cart
                    </span>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Ingredients & Method 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          {/* =========================================================================
              LEFT: INGREDIENTS CHECKLIST (Interactive Checkboxes)
          ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs">
              <h3 className="font-serif font-bold text-xl text-spice-espresso mb-1">
                Ingredients Checklist
              </h3>
              <p className="text-xs text-spice-taupe mb-5">
                Check off items as you prep your mis-en-place.
              </p>

              <div className="space-y-2.5">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-spice-sand/30 border-spice-border text-spice-taupe line-through'
                          : ing.isKeySpice
                          ? 'bg-spice-peach/20 border-spice-terracotta/30 text-spice-espresso font-semibold'
                          : 'bg-white border-spice-border text-spice-espresso'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-spice-cardamom shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-spice-taupe shrink-0" />
                        )}
                        <span className="text-xs">{ing.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-spice-taupe shrink-0 ml-2">
                        {ing.quantity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shop Spices Used in this Recipe */}
            {keySpiceProducts.length > 0 && (
              <div className="bg-spice-sand/20 rounded-3xl border border-spice-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif font-bold text-base text-spice-espresso">
                    Spices Required For This Dish
                  </h4>
                  <span className="text-xs font-bold text-spice-terracotta">
                    {keySpiceProducts.length} Items
                  </span>
                </div>

                <div className="space-y-3">
                  {keySpiceProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-white rounded-2xl border border-spice-border flex items-center justify-between gap-3 shadow-warm-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-spice-border"
                        />
                        <div className="min-w-0">
                          <Link href={`/product/${p.slug}`} className="hover:text-spice-terracotta font-serif font-bold text-xs text-spice-espresso block truncate">
                            {p.title}
                          </Link>
                          <span className="text-[11px] font-bold text-spice-espresso">
                            {formatCurrency(p.price)}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(p, 1, p.weight || '100g')}
                        className="shrink-0 text-xs py-1.5 px-3"
                      >
                        + Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* =========================================================================
              RIGHT: STEP-BY-STEP METHOD & CHEF TIPS
          ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-8 shadow-warm-xs">
              <h3 className="font-serif font-bold text-2xl text-spice-espresso mb-6">
                Step-by-Step Cooking Method
              </h3>

              <div className="space-y-6">
                {recipe.instructions.map((step) => (
                  <div key={step.stepNumber} className="relative pl-10 border-l-2 border-spice-sand pb-2">
                    {/* Number Badge */}
                    <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-spice-espresso text-white font-serif font-bold text-sm flex items-center justify-center shadow-warm-xs">
                      {step.stepNumber}
                    </div>

                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-sm text-spice-espresso">
                        Step {step.stepNumber}
                      </h4>
                      {step.timeInMinutes && (
                        <span className="text-[11px] font-semibold text-spice-terracotta flex items-center gap-1 bg-spice-peach/30 px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3" /> ~{step.timeInMinutes} mins
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-spice-taupe leading-relaxed">
                      {step.instruction}
                    </p>

                    {step.tip && (
                      <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>Chef Note:</strong> {step.tip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Master Chef Secret Card */}
            <div className="p-6 bg-spice-espresso text-white rounded-3xl shadow-warm-md">
              <div className="flex items-center gap-2 text-spice-sand text-xs font-bold uppercase tracking-wider mb-2">
                <ChefHat className="w-4 h-4" />
                <span>The AAXOL Spice Golden Rule</span>
              </div>
              <h4 className="font-serif font-bold text-lg text-white mb-2">
                Never Overheat Ground Aromatics
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Whole spices (like cumin, mustard, cardamom) thrive in sizzling oil to crackle their essential oil vesicles. Stone-ground powders should be added only after onions/tomatoes are softened, or mixed with a dash of water to avoid scorching the delicate volatile flavour compounds.
              </p>
            </div>
          </div>
        </div>

        {/* Related Recipes Carousel */}
        <div className="mt-16 pt-10 border-t border-spice-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-spice-espresso">
              More Regional Recipes You May Like
            </h3>
            <Link href="/recipes" className="text-xs font-bold text-spice-terracotta hover:underline">
              View All Recipes →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedRecipes.map((r) => (
              <Link
                key={r.id}
                href={`/recipes/${r.slug}`}
                className="group bg-white rounded-2xl border border-spice-border overflow-hidden shadow-warm-xs hover:shadow-warm-md transition-all flex flex-col justify-between"
              >
                <div className="aspect-[16/10] overflow-hidden bg-spice-sand/40">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <span className="text-[11px] text-spice-cardamom font-bold uppercase">{r.cuisine}</span>
                  <h4 className="font-serif font-bold text-base text-spice-espresso group-hover:text-spice-terracotta transition-colors line-clamp-1 mt-0.5 mb-1">
                    {r.title}
                  </h4>
                  <span className="text-xs text-spice-terracotta font-semibold flex items-center gap-1">
                    View Method <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
