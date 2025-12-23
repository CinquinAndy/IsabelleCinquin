/**
 * Shared types derived from Payload's generated Landing type
 * These provide proper typing for landing page section components
 */

import type { Landing, Media } from '@/payload-types'

// ==================== SECTION TYPES ====================

// Hero section
export type LandingHero = NonNullable<Landing['hero']>
export type LandingHeroButton = NonNullable<LandingHero['buttons']>[number]

// About section
export type LandingAbout = NonNullable<Landing['about']>
export type LandingAboutStat = NonNullable<LandingAbout['stats']>[number]

// Introduction section
export type LandingIntroduction = NonNullable<Landing['introduction']>

// Family members
export type LandingFamilyMember = NonNullable<Landing['familyMembers']>[number]

// Trainings section
export type LandingTrainingsSection = NonNullable<Landing['trainingsSection']>
export type LandingTraining = NonNullable<LandingTrainingsSection['items']>[number]

// Sleep section
export type LandingSleep = NonNullable<Landing['sleep']>
export type LandingSleepTag = NonNullable<LandingSleep['tags']>[number]

// Living place section
export type LandingLivingPlace = NonNullable<Landing['livingPlace']>
export type LandingLivingPlaceImage = NonNullable<LandingLivingPlace['images']>[number]

// Equipment section
export type LandingEquipmentSection = NonNullable<Landing['equipmentSection']>
export type LandingEquipment = NonNullable<LandingEquipmentSection['items']>[number]

// Objectives section
export type LandingObjectivesSection = NonNullable<Landing['objectivesSection']>
export type LandingObjective = NonNullable<LandingObjectivesSection['items']>[number]

// Adaptation section
export type LandingAdaptation = NonNullable<Landing['adaptation']>
export type LandingAdaptationBadge = NonNullable<LandingAdaptation['badges']>[number]

// Organization section
export type LandingOrganization = NonNullable<Landing['organization']>
export type LandingOrganizationItem = NonNullable<LandingOrganization['bagItems']>[number]

// Daily schedule section
export type LandingDailyScheduleSection = NonNullable<Landing['dailyScheduleSection']>
export type LandingDailyScheduleItem = NonNullable<LandingDailyScheduleSection['items']>[number]

// Charter section
export type LandingCharterSection = NonNullable<Landing['charterSection']>
export type LandingCharterRule = NonNullable<LandingCharterSection['items']>[number]

// Contact section
export type LandingContactSection = NonNullable<Landing['contactSection']>

// Settings
export type LandingSettings = NonNullable<Landing['settings']>

// Rich text content type
export type RichTextContent = NonNullable<NonNullable<Landing['introduction']>['content']>

// Re-export Media for convenience
export type { Media }
