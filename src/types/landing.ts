/**
 * Shared types derived from Payload's generated Landing type
 * These provide proper typing for landing page section components
 */

import type { Landing, Media } from '@/payload-types'

// Extract types from Landing for each section
export type LandingFamilyMember = NonNullable<Landing['familyMembers']>[number]
export type LandingTraining = NonNullable<Landing['trainings']>[number]
export type LandingLivingPlaceImage = NonNullable<NonNullable<Landing['livingPlace']>['images']>[number]
export type LandingEquipment = NonNullable<Landing['equipment']>[number]
export type LandingObjective = NonNullable<Landing['objectives']>[number]
export type LandingOrganizationItem = NonNullable<NonNullable<Landing['organization']>['bagItems']>[number]
export type LandingDailyScheduleItem = NonNullable<Landing['dailySchedule']>[number]
export type LandingCharterRule = NonNullable<Landing['charter']>[number]
export type LandingSettings = NonNullable<Landing['settings']>

// Rich text content type
export type RichTextContent = NonNullable<NonNullable<Landing['introduction']>['content']>

// Re-export Media for convenience
export type { Media }
