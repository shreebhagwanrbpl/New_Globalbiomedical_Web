'use client';

import { useState, useEffect } from 'react';
import { getActiveOffers, calculateProductOffer } from '@/lib/firestore/offers';
import type { Offer, Product } from '@/types';

export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const activeOffers = await getActiveOffers();
        setOffers(activeOffers);
      } catch (error) {
        console.error('Error in useOffers hook:', error);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  const getProductOfferDetails = (product: Product) => {
    return calculateProductOffer(product, offers);
  };

  return {
    offers,
    loading,
    getProductOfferDetails,
  };
}
