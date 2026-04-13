"use client";

import { useEffect, useState, Suspense, lazy } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Gamepad2,
  MessageCircle,
  Settings,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";
import { buildLocalizedPath } from "@/lib/i18n-utils";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// Conditionally render text as a link or plain span
function LinkedTitle({
  linkData,
  children,
  className,
  locale,
  disableLink = false,
}: {
  linkData: { url: string; title: string } | null | undefined;
  children: React.ReactNode;
  className?: string;
  locale: string;
  disableLink?: boolean;
}) {
  if (!linkData || disableLink) {
    if (className) {
      return <span className={className}>{children}</span>;
    }

    return <>{children}</>;
  }

  return (
    <Link
      href={buildLocalizedPath(linkData.url, locale as "en" | "pt" | "es" | "fr")}
      title={linkData.title}
      className={
        className ??
        "transition-colors duration-200 hover:text-[hsl(var(--nav-theme-light))] hover:underline underline-offset-4"
      }
    >
      {children}
    </Link>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

const BROOM_CARD_ICONS = [ArrowRight, TrendingUp, Sparkles, Settings];
const QUEST_STEP_ICONS = [MessageCircle, TrendingUp, BookOpen, Clock, Sparkles];
const FARMING_STEP_ICONS = [
  Sparkles,
  ClipboardCheck,
  TrendingUp,
  Clock,
  Settings,
];
const BUILD_CARD_ICONS = [Star, TrendingUp, BookOpen, AlertTriangle];
const ANTI_MAGIC_HIGHLIGHT_ICONS = [Sparkles, ClipboardCheck, TrendingUp];
const ANTI_MAGIC_FAQ_ICONS = [
  Sparkles,
  BookOpen,
  ClipboardCheck,
  Clock,
  TrendingUp,
];
const PVP_CARD_ICONS = [Gamepad2, ClipboardCheck, TrendingUp, Shield];
const PATH_HIGHLIGHT_ICONS = [Users, Shield, MessageCircle];
const PATH_FAQ_ICONS = [Users, BookOpen, Sparkles, Shield, MessageCircle];
const FIRST_GRIMOIRE_STEP_ICONS = [
  MessageCircle,
  TrendingUp,
  ClipboardCheck,
  BookOpen,
  Star,
  ArrowRight,
];

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const grimoireGuide = t.modules.lucidBlocksQualiaAndBaseBuilding;
  const levelingGuide = t.modules.lucidBlocksWorldRegions;
  const statsGuide = t.modules.lucidBlocksCreaturesAndEnemies;
  const raceGuide = t.modules.lucidBlocksMobilityGear;
  const broomGuide = t.modules.lucidBlocksFarmingAndGrowth;
  const questGuide = t.modules.lucidBlocksBestEarlyUnlocks;
  const farmingGuide = t.modules.lucidBlocksAchievementTracker;
  const bestBuildGuide = t.modules.lucidBlocksSingleplayerAndPlatformFAQ;
  const antiMagicGuide = t.modules.lucidBlocksSteamDeckAndController;
  const pvpGuide = t.modules.lucidBlocksSettingsAndAccessibility;
  const pathGuide = t.modules.lucidBlocksUpdatesAndPatchNotes;
  const firstGrimoireGuide = t.modules.lucidBlocksCrashFixAndTroubleshooting;
  const sectionIds = [
    "codes",
    "beginner-guide",
    "grimoire-tier-list",
    "best-magic-guide",
    "grimoire-guide",
    "leveling-guide",
    "stats-guide",
    "race-guide",
    "broom-guide",
    "quest-guide",
    "farming-guide",
    "best-build-guide",
    "anti-magic-guide",
    "pvp-guide",
    "good-and-evil-path-guide",
    "first-grimoire-guide",
  ];

  // FAQ accordion states
  const [antiMagicExpanded, setAntiMagicExpanded] = useState(0);
  const [pathExpanded, setPathExpanded] = useState(0);
  const [grimoireExpanded, setGrimoireExpanded] = useState(0);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </aside>

      {/* 广告位 1: 移动端横幅 Sticky */}
      {/* <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://www.pcgamesn.com/clover-origins/codes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://www.roblox.com/games/134963296781989/Clover-Origins"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId="N1PI-GSphJM"
              title="Clover Origins (Grimoires Era Remake) - New Map"
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={30}
      />

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
      />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">{t.tools.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = sectionIds[index];

              return (
                <a
                  key={index}
                  href={`#${sectionId}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(sectionId);
                  }}
                  className="scroll-reveal group block rounded-xl border border-border
                             bg-card p-6 text-left transition-all duration-300
                             hover:border-[hsl(var(--nav-theme)/0.5)]
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="w-12 h-12 rounded-lg mb-4
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
      />

      {/* Module 1: Codes */}
      <section id="codes" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksBeginnerGuide"]}
                locale={locale}
              >
                {t.modules.lucidBlocksBeginnerGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksBeginnerGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {t.modules.lucidBlocksBeginnerGuide.items.map(
              (item: any, index: number) => (
                <article
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.08)]"
                >
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--nav-theme-light))] to-transparent opacity-70" />
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-2">
                        {item.status}
                      </p>
                      <h3 className="text-2xl font-bold leading-tight">
                        {item.code}
                      </h3>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.rewards.map((reward: string, rewardIndex: number) => (
                      <span
                        key={rewardIndex}
                        className="rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.06)] px-3 py-1 text-xs text-muted-foreground"
                      >
                        {reward}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.bestUse}
                  </p>
                </article>
              ),
            )}
          </div>

          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">
                Clover Origins Code Priorities
              </h3>
            </div>
            <ul className="space-y-2">
              {t.modules.lucidBlocksBeginnerGuide.highlights.map(
                (tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{tip}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
      />

      {/* Module 2: Beginner Guide */}
      <section
        id="beginner-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksApotheosisCrafting"]}
                locale={locale}
              >
                {t.modules.lucidBlocksApotheosisCrafting.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksApotheosisCrafting.intro}
            </p>
          </div>
          <div className="scroll-reveal space-y-4 mb-10">
            {t.modules.lucidBlocksApotheosisCrafting.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl border border-border bg-white/5 p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.label}</h3>
                    <p className="text-muted-foreground">{step.details}</p>
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">
                Clover Origins First-Hour Tips
              </h3>
            </div>
            <ul className="space-y-2">
              {t.modules.lucidBlocksApotheosisCrafting.quickTips.map(
                (tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{tip}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 3: Grimoire Tier List */}
      <section id="grimoire-tier-list" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksToolsAndWeapons"]}
                locale={locale}
              >
                {t.modules.lucidBlocksToolsAndWeapons.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksToolsAndWeapons.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {t.modules.lucidBlocksToolsAndWeapons.items.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1 text-xs font-semibold tracking-wide text-[hsl(var(--nav-theme-light))]">
                      Tier {item.tier}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
                      {item.keepOrReroll}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[hsl(var(--nav-theme-light))]">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium mb-3">{item.role}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.summary}
                  </p>
                </div>
              ),
            )}
          </div>
          <div className="scroll-reveal flex flex-wrap gap-3 justify-center">
            {t.modules.lucidBlocksToolsAndWeapons.notes.map(
              (note: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-sm"
                >
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  {note}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 4: Best Magic Guide */}
      <section
        id="best-magic-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksStorageAndInventory"]}
                locale={locale}
              >
                {t.modules.lucidBlocksStorageAndInventory.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksStorageAndInventory.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.lucidBlocksStorageAndInventory.items.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="font-bold text-lg text-[hsl(var(--nav-theme-light))]">
                      {item.name}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                      {item.tier}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-3">{item.bestFor}</p>
                  <p className="text-muted-foreground text-sm mb-3">
                    {item.whyPickIt}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {item.tradeoff}
                  </p>
                </div>
              ),
            )}
          </div>
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold">Clover Origins Magic Picking Rules</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.lucidBlocksStorageAndInventory.pickingTips.map(
                (tip: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{tip}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 5: Grimoire Guide */}
      <section
        id="grimoire-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-start">
            <div className="scroll-reveal lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                <BookOpen className="h-4 w-4" />
                {grimoireGuide.eyebrow}
              </div>
              <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                <LinkedTitle
                  linkData={moduleLinkMap["lucidBlocksQualiaAndBaseBuilding"]}
                  locale={locale}
                >
                  {grimoireGuide.title}
                </LinkedTitle>
              </h2>
              <p className="mt-4 text-lg text-foreground/90">
                {grimoireGuide.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-muted-foreground">
                {grimoireGuide.intro}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {grimoireGuide.items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.06)] p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Check className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                        Insight {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-reveal space-y-4">
              {grimoireGuide.items.map((item: any, index: number) => {
                const isExpanded = grimoireExpanded === index;

                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-border bg-card/80"
                  >
                    <button
                      onClick={() => setGrimoireExpanded(index)}
                      className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[hsl(var(--nav-theme)/0.05)]"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.1)] text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                          Clover Origins System
                        </p>
                        <h3 className="mt-2 text-xl font-bold leading-snug">
                          <LinkedTitle
                            linkData={
                              moduleLinkMap[
                                `lucidBlocksQualiaAndBaseBuilding::items::${index}`
                              ]
                            }
                            locale={locale}
                            disableLink
                          >
                            {item.label}
                          </LinkedTitle>
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform ${
                          isExpanded
                            ? "rotate-180 text-[hsl(var(--nav-theme-light))]"
                            : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-[hsl(var(--nav-theme)/0.15)] px-5 pb-5 pt-4 text-sm leading-7 text-muted-foreground">
                          {item.body}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Module 6: Leveling Guide */}
      <section id="leveling-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
              <TrendingUp className="h-4 w-4" />
              {levelingGuide.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksWorldRegions"]}
                locale={locale}
              >
                {levelingGuide.title}
              </LinkedTitle>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/90">
              {levelingGuide.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              {levelingGuide.intro}
            </p>
          </div>
          <div className="scroll-reveal relative mx-auto max-w-4xl">
            <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-[hsl(var(--nav-theme-light))] via-[hsl(var(--nav-theme)/0.4)] to-transparent md:block" />
            <div className="space-y-5">
              {levelingGuide.items.map((item: any, index: number) => (
                <div key={index} className="relative md:pl-20">
                  <div className="mb-4 flex items-center gap-3 md:absolute md:left-0 md:top-5 md:mb-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.14)] text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                      {item.step}
                    </div>
                    {index < levelingGuide.items.length - 1 && (
                      <ArrowRight className="hidden h-4 w-4 text-[hsl(var(--nav-theme-light))] md:block" />
                    )}
                  </div>
                  <div className="rounded-2xl border border-border bg-card/80 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.4)]">
                    <div className="mb-3 flex items-center gap-3">
                      <Clock className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">
                      <LinkedTitle
                        linkData={
                          moduleLinkMap[
                            `lucidBlocksWorldRegions::items::${index}`
                          ]
                        }
                        locale={locale}
                      >
                        {item.title}
                      </LinkedTitle>
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 7: Stats Guide */}
      <section
        id="stats-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
              <ClipboardCheck className="h-4 w-4" />
              {statsGuide.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksCreaturesAndEnemies"]}
                locale={locale}
              >
                {statsGuide.title}
              </LinkedTitle>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/90">
              {statsGuide.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              {statsGuide.intro}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
            <div className="scroll-reveal space-y-4">
              {statsGuide.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card/80 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.4)]"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.28)] bg-[hsl(var(--nav-theme)/0.12)] text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                        Stat Timing
                      </p>
                      <h3 className="mt-1 text-xl font-bold">
                        <LinkedTitle
                          linkData={
                            moduleLinkMap[
                              `lucidBlocksCreaturesAndEnemies::items::${index}`
                            ]
                          }
                          locale={locale}
                        >
                          {item.title}
                        </LinkedTitle>
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="scroll-reveal space-y-4">
              {statsGuide.callouts.map((callout: any, index: number) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.06)] p-5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Settings className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="text-lg font-bold">{callout.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {callout.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 8: Race Guide */}
      <section id="race-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
              <ArrowRight className="h-4 w-4" />
              {raceGuide.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksMobilityGear"]}
                locale={locale}
              >
                {raceGuide.title}
              </LinkedTitle>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/90">
              {raceGuide.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              {raceGuide.intro}
            </p>
          </div>
          <div className="scroll-reveal hidden overflow-hidden rounded-2xl border border-border lg:block">
            <table className="w-full border-collapse">
              <thead className="bg-[hsl(var(--nav-theme)/0.08)]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                    Clover Origins Topic
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                    Confirmed Data
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                    Player Takeaway
                  </th>
                </tr>
              </thead>
              <tbody>
                {raceGuide.items.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-t border-border align-top transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-5 font-semibold">
                      <LinkedTitle
                        linkData={
                          moduleLinkMap[
                            `lucidBlocksMobilityGear::items::${index}`
                          ]
                        }
                        locale={locale}
                      >
                        {item.topic}
                      </LinkedTitle>
                    </td>
                    <td className="px-6 py-5 text-sm leading-7 text-muted-foreground">
                      {item.confirmedData}
                    </td>
                    <td className="px-6 py-5 text-sm leading-7 text-muted-foreground">
                      {item.playerTakeaway}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="scroll-reveal space-y-4 lg:hidden">
            {raceGuide.items.map((item: any, index: number) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card/80 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.4)]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                    Clover Origins Race
                  </span>
                </div>
                <h3 className="text-lg font-bold">
                  <LinkedTitle
                    linkData={
                      moduleLinkMap[`lucidBlocksMobilityGear::items::${index}`]
                    }
                    locale={locale}
                  >
                    {item.topic}
                  </LinkedTitle>
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      Confirmed Data
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {item.confirmedData}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      Player Takeaway
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {item.playerTakeaway}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner
        type="banner-320x50"
        adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50}
      />

      {/* Module 9: Broom Guide */}
      <section id="broom-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
              <ArrowRight className="h-4 w-4" />
              {broomGuide.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksFarmingAndGrowth"]}
                locale={locale}
              >
                {broomGuide.title}
              </LinkedTitle>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/90">
              {broomGuide.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              {broomGuide.intro}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {broomGuide.items.map((item: any, index: number) => {
              const Icon = BROOM_CARD_ICONS[index % BROOM_CARD_ICONS.length];

              return (
                <article
                  key={index}
                  className="scroll-reveal group rounded-3xl border border-border bg-card/80 p-6 transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.45)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.08)]"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.28)] bg-[hsl(var(--nav-theme)/0.12)]">
                      <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <span className="inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.24)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      {item.rewards ? "Code rewards" : "Guide card"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug">
                    {item.heading}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                  {Array.isArray(item.bullets) && (
                    <ul className="mt-5 space-y-3">
                      {item.bullets.map(
                        (bullet: string, bulletIndex: number) => (
                          <li
                            key={bulletIndex}
                            className="flex items-start gap-3"
                          >
                            <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                            <span className="text-sm leading-7 text-muted-foreground">
                              {bullet}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  )}

                  {Array.isArray(item.rewards) && (
                    <div className="mt-5 space-y-3">
                      {item.rewards.map((reward: any, rewardIndex: number) => (
                        <div
                          key={rewardIndex}
                          className="rounded-2xl border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.06)] p-4"
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.28)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                              {reward.code}
                            </span>
                          </div>
                          <p className="text-sm leading-7 text-muted-foreground">
                            {reward.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 10: Quest Guide */}
      <section
        id="quest-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
              <BookOpen className="h-4 w-4" />
              {questGuide.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksBestEarlyUnlocks"]}
                locale={locale}
              >
                {questGuide.title}
              </LinkedTitle>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/90">
              {questGuide.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              {questGuide.intro}
            </p>
          </div>
          <div className="scroll-reveal relative mx-auto max-w-4xl">
            <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-[hsl(var(--nav-theme-light))] via-[hsl(var(--nav-theme)/0.35)] to-transparent md:block" />
            <div className="space-y-6">
              {questGuide.items.map((item: any, index: number) => {
                const Icon = QUEST_STEP_ICONS[index % QUEST_STEP_ICONS.length];

                return (
                  <article key={index} className="relative md:pl-24">
                    <div className="mb-4 flex items-center gap-3 md:absolute md:left-0 md:top-6 md:mb-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.14)]">
                        <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                    </div>
                    <div className="rounded-3xl border border-border bg-card/80 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.42)]">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.24)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                          Step {item.step}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          Clover Origins quest route
                        </span>
                      </div>
                      <h3 className="text-xl font-bold leading-snug">
                        {item.heading}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                      <ul className="mt-5 space-y-3">
                        {item.bullets.map(
                          (bullet: string, bulletIndex: number) => (
                            <li
                              key={bulletIndex}
                              className="flex items-start gap-3"
                            >
                              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                              <span className="text-sm leading-7 text-muted-foreground">
                                {bullet}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Module 11: Farming Guide */}
      <section id="farming-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
              <ClipboardCheck className="h-4 w-4" />
              {farmingGuide.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksAchievementTracker"]}
                locale={locale}
              >
                {farmingGuide.title}
              </LinkedTitle>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/90">
              {farmingGuide.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              {farmingGuide.intro}
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute bottom-0 left-7 top-0 hidden w-px bg-gradient-to-b from-[hsl(var(--nav-theme-light))] via-[hsl(var(--nav-theme)/0.35)] to-transparent lg:block" />
            <div className="space-y-6">
              {farmingGuide.items.map((item: any, index: number) => {
                const Icon =
                  FARMING_STEP_ICONS[index % FARMING_STEP_ICONS.length];

                return (
                  <div
                    key={index}
                    className="scroll-reveal relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px] lg:pl-24"
                  >
                    <div className="mb-2 flex items-center gap-3 lg:absolute lg:left-0 lg:top-6 lg:mb-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.14)]">
                        <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                    </div>

                    <article className="rounded-3xl border border-border bg-card/80 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.42)]">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.24)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                          Step {item.step}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          Clover Origins farming route
                        </span>
                      </div>
                      <h3 className="text-xl font-bold leading-snug">
                        {item.heading}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>

                      {Array.isArray(item.rewards) && (
                        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                          {item.rewards.map(
                            (reward: any, rewardIndex: number) => (
                              <div
                                key={rewardIndex}
                                className="rounded-2xl border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.06)] p-4"
                              >
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                                  {reward.code}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                  {reward.details}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      )}

                      {Array.isArray(item.bullets) && (
                        <ul className="mt-5 space-y-3">
                          {item.bullets.map(
                            (bullet: string, bulletIndex: number) => (
                              <li
                                key={bulletIndex}
                                className="flex items-start gap-3"
                              >
                                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                                <span className="text-sm leading-7 text-muted-foreground">
                                  {bullet}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    </article>

                    <aside className="rounded-3xl border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.06)] p-5 lg:self-start">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                        Side note
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.note}
                      </p>
                    </aside>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Module 12: Best Build Guide */}
      <section
        id="best-build-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
              <Star className="h-4 w-4" />
              {bestBuildGuide.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={
                  moduleLinkMap["lucidBlocksSingleplayerAndPlatformFAQ"]
                }
                locale={locale}
              >
                {bestBuildGuide.title}
              </LinkedTitle>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/90">
              {bestBuildGuide.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              {bestBuildGuide.intro}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {bestBuildGuide.items.map((item: any, index: number) => {
              const Icon = BUILD_CARD_ICONS[index % BUILD_CARD_ICONS.length];

              return (
                <article
                  key={index}
                  className="scroll-reveal group rounded-3xl border border-border bg-card/80 p-6 transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.45)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.08)]"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.28)] bg-[hsl(var(--nav-theme)/0.12)]">
                      <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <span className="inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.24)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      Build {index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight">
                    {item.heading}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-foreground/90">
                    {item.bestFor}
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                        Grimoire Plan
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {item.grimoirePlan}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                        Race Plan
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {item.racePlan}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                        Stat Plan
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {item.statPlan}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                        Broom Plan
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {item.broomPlan}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.06)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      Why It Works
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {item.whyItWorks}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 13: Anti Magic Guide */}
      <section id="anti-magic-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-start">
            <div className="scroll-reveal lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                <Sparkles className="h-4 w-4" />
                {antiMagicGuide.eyebrow}
              </div>
              <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                <LinkedTitle
                  linkData={moduleLinkMap["lucidBlocksSteamDeckAndController"]}
                  locale={locale}
                >
                  {antiMagicGuide.title}
                </LinkedTitle>
              </h2>
              <p className="mt-4 text-lg text-foreground/90">
                {antiMagicGuide.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-muted-foreground">
                {antiMagicGuide.intro}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {antiMagicGuide.highlights.map(
                  (highlight: string, index: number) => {
                    const HighlightIcon = ANTI_MAGIC_HIGHLIGHT_ICONS[index];

                    return (
                      <div
                        key={index}
                        className="rounded-2xl border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.06)] p-4"
                      >
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.24)] bg-[hsl(var(--nav-theme)/0.1)]">
                          <HighlightIcon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                        </div>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {highlight}
                        </p>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            <div className="scroll-reveal space-y-4">
              {antiMagicGuide.faqs.map((faq: any, index: number) => {
                const ItemIcon = ANTI_MAGIC_FAQ_ICONS[index];
                const isExpanded = antiMagicExpanded === index;

                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-border bg-card/80"
                  >
                    <button
                      onClick={() => setAntiMagicExpanded(index)}
                      className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[hsl(var(--nav-theme)/0.05)]"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.1)]">
                        <ItemIcon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                          Clover Origins Chase Plan
                        </p>
                        <h3 className="mt-2 text-xl font-bold leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform ${
                          isExpanded
                            ? "rotate-180 text-[hsl(var(--nav-theme-light))]"
                            : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-[hsl(var(--nav-theme)/0.15)] px-5 pb-5 pt-4 text-sm leading-7 text-muted-foreground">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Module 14: PvP Guide */}
      <section
        id="pvp-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
              <Gamepad2 className="h-4 w-4" />
              {pvpGuide.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksSettingsAndAccessibility"]}
                locale={locale}
              >
                {pvpGuide.title}
              </LinkedTitle>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/90">
              {pvpGuide.subtitle}
            </p>
            <p className="mt-6 text-muted-foreground text-lg max-w-3xl mx-auto">
              {pvpGuide.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {pvpGuide.items.map((item: any, index: number) => {
              const ItemIcon = PVP_CARD_ICONS[index];

              return (
                <article
                  key={index}
                  className="group rounded-2xl border border-border bg-card/80 p-6 transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.08)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.1)]">
                      <ItemIcon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <span className="rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--nav-theme-light))]">
                      Focus {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {item.bullets.map((bullet: string, bulletIndex: number) => (
                      <li key={bulletIndex} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span className="text-sm text-muted-foreground">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 15: Good and Evil Path Guide */}
      <section
        id="good-and-evil-path-guide"
        className="scroll-mt-24 px-4 py-20"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] items-start">
            <div className="scroll-reveal lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                <MessageCircle className="h-4 w-4" />
                {pathGuide.eyebrow}
              </div>
              <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                <LinkedTitle
                  linkData={moduleLinkMap["lucidBlocksUpdatesAndPatchNotes"]}
                  locale={locale}
                >
                  {pathGuide.title}
                </LinkedTitle>
              </h2>
              <p className="mt-4 text-lg text-foreground/90">
                {pathGuide.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-muted-foreground">
                {pathGuide.intro}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {pathGuide.highlights.map((highlight: string, index: number) => {
                  const HighlightIcon = PATH_HIGHLIGHT_ICONS[index];

                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.06)] p-4"
                    >
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.24)] bg-[hsl(var(--nav-theme)/0.1)]">
                        <HighlightIcon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {highlight}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="scroll-reveal space-y-4">
              {pathGuide.faqs.map((faq: any, index: number) => {
                const ItemIcon = PATH_FAQ_ICONS[index];
                const isExpanded = pathExpanded === index;

                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-border bg-card/80"
                  >
                    <button
                      onClick={() => setPathExpanded(index)}
                      className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[hsl(var(--nav-theme)/0.05)]"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.1)]">
                        <ItemIcon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                          Clover Origins Route Choice
                        </p>
                        <h3 className="mt-2 text-xl font-bold leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform ${
                          isExpanded
                            ? "rotate-180 text-[hsl(var(--nav-theme-light))]"
                            : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-[hsl(var(--nav-theme)/0.15)] px-5 pb-5 pt-4 text-sm leading-7 text-muted-foreground">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Module 16: First Grimoire Guide */}
      <section
        id="first-grimoire-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
              <Clock className="h-4 w-4" />
              {firstGrimoireGuide.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={
                  moduleLinkMap["lucidBlocksCrashFixAndTroubleshooting"]
                }
                locale={locale}
              >
                {firstGrimoireGuide.title}
              </LinkedTitle>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/90">
              {firstGrimoireGuide.subtitle}
            </p>
            <p className="mt-6 text-muted-foreground text-lg max-w-3xl mx-auto">
              {firstGrimoireGuide.intro}
            </p>
          </div>
          <div className="scroll-reveal relative">
            <div className="absolute left-0 right-0 top-9 hidden xl:block h-px bg-gradient-to-r from-transparent via-[hsl(var(--nav-theme)/0.25)] to-transparent" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
              {firstGrimoireGuide.steps.map((step: any, index: number) => {
                const StepIcon = FIRST_GRIMOIRE_STEP_ICONS[index];

                return (
                  <article
                    key={index}
                    className="relative rounded-2xl border border-border bg-card/85 p-6 transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.08)]"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.12)] text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                        {step.step}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.08)]">
                        <StepIcon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      Clover Origins Step {step.step}
                    </p>
                    <h3 className="mt-3 text-xl font-bold leading-snug">
                      {step.label}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {step.details}
                    </p>
                    <div className="mt-6 rounded-2xl border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.06)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                        Next Move
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {step.action}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/PJ73fSRAGQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/games/134963296781989/Clover-Origins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/communities/34007786/Funzy-Labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@gamefunzy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
