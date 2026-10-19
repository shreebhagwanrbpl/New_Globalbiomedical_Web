import * as offerRepo from '../firestore/offers';
import type { Offer } from '@/types';

/**
 * High-level service for promotional offers and campaigns
 */
export async function getActiveCampaigns(): Promise<Offer[]> {
  return offerRepo.getActiveOffers();
}

export async function getCampaignDetails(slug: string): Promise<Offer | null> {
  return offerRepo.getOfferBySlug(slug);
}
