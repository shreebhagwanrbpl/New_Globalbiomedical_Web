'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { staticRecipes } from '@/data/recipes';
import { Clock, ChefHat, Flame, ArrowRight, Sparkles, Filter, Search } from 'lucide-react';
import { LUXURY_EASE, ScrollReveal } from '@/components/animations/Motion';

export default function RecipesPage() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const cuisines = ['all', 'North Indian', 'South Indian', 'Rajasthani', 'Kashmiri', 'Hyderabadi', 'Punjabi', 'Ayurvedic'];

  const filteredRecipes = useMemo(() => {
    return staticRecipes.filter(recipe => {
      if (selectedCuisine !== 'all' && recipe.cuisine !== selectedCuisine) {
        return false;
      }
      if (selectedDifficulty !== 'all' && recipe.difficulty !== selectedDifficulty) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = recipe.title.toLowerCase().includes(q);
        const matchDesc = recipe.description.toLowerCase().includes(q);
        const matchIng = recipe.ingredients.some(i => i.name.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchIng) return false;
      }
      return true;
    });
  }, [selectedCuisine, selectedDifficulty, searchQuery]);

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-spice-sand/40 via-spice-sand/20 to-spice-ivory border-b border-spice-border py-10 sm:py-16">
        <Container size="2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-xs font-bold uppercase tracking-wider mb-4">
              <ChefHat className="w-3.5 h-3.5" />
              <span>AUTHENTIC CULINARY MASTERCLASSES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-3">
              Indian Heritage Spice Recipes
            </h1>
            <p className="text-sm sm:text-base text-spice-taupe leading-relaxed">
              Master iconic dishes from Awadh, Kashmir, Rajasthan, Punjab, and South India. Each recipe specifies exact whole spice tempering and hand-roasted masala measurements.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 max-w-xl relative">
            <Search className="w-4 h-4 text-spice-taupe absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes (e.g. Biryani, Butter Chicken, Dal Baati)..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-spice-border text-sm text-spice-espresso focus:outline-none focus:border-spice-terracotta shadow-warm-xs"
            />
          </div>
        </Container>
      </section>

      {/* Filters Strip */}
      <Container size="2xl" className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-spice-border">
          {/* Cuisine Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-spice-espresso shrink-0">Cuisine:</span>
            {cuisines.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCuisine === c
                    ? 'bg-spice-espresso text-white shadow-warm-xs'
                    : 'bg-white border border-spice-border text-spice-taupe hover:text-spice-espresso'
                }`}
              >
                {c === 'all' ? 'All Cuisines' : c}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-spice-taupe font-semibold">Difficulty:</span>
            <div className="flex gap-1">
              {['all', 'Easy', 'Medium', 'Advanced'].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    selectedDifficulty === d
                      ? 'bg-spice-terracotta text-white'
                      : 'bg-white border border-spice-border text-spice-taupe'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recipe Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
          <AnimatePresence>
            {filteredRecipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE }}
              >
                <Link
                  href={`/recipes/${recipe.slug}`}
                  className="group bg-white rounded-3xl border border-spice-border hover:border-spice-terracotta/40 overflow-hidden shadow-warm-xs hover:shadow-warm-xl transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Hero Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-spice-sand/40">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-spice-espresso/90 text-white text-xs font-bold backdrop-blur-xs">
                        {recipe.cuisine}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-spice-espresso text-[11px] font-bold flex items-center gap-1 shadow-warm-xs">
                        <Clock className="w-3.5 h-3.5 text-spice-terracotta" />
                        {recipe.totalTimeMinutes} Mins
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-spice-cardamom mb-1.5">
                        <span>Serves {recipe.servings}</span>
                        <span>•</span>
                        <span>{recipe.difficulty}</span>
                        <span>•</span>
                        <span className="text-spice-terracotta font-bold">{recipe.spicinessLevel}</span>
                      </div>

                      <h3 className="font-serif font-bold text-lg sm:text-xl text-spice-espresso group-hover:text-spice-terracotta transition-colors mb-2">
                        {recipe.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-spice-taupe line-clamp-2 leading-relaxed mb-4">
                        {recipe.subtitle || recipe.description}
                      </p>

                      {/* Key Spices Used */}
                      <div className="bg-spice-sand/30 rounded-xl p-3 text-xs text-spice-taupe">
                        <span className="font-bold text-spice-espresso block mb-1">
                          Key Spices:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.filter(i => i.isKeySpice).slice(0, 3).map((item, i) => (
                            <span key={i} className="text-[11px] bg-white px-2 py-0.5 rounded border border-spice-border text-spice-espresso font-medium truncate">
                              {item.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0">
                    <div className="pt-3 border-t border-spice-border/60 flex items-center justify-between text-xs font-bold text-spice-terracotta">
                      <span>View Full Step-by-Step Guide</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
