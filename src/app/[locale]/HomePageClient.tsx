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
  ExternalLink,
  MessageCircle,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
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
}: {
  linkData: { url: string; title: string } | null | undefined;
  children: React.ReactNode;
  className?: string;
  locale: string;
}) {
  void linkData;
  void locale;

  if (className) {
    return <span className={className}>{children}</span>;
  }

  return <>{children}</>;
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

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
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const [deckExpanded, setDeckExpanded] = useState<number | null>(null);
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksFarmingAndGrowth"]}
                locale={locale}
              >
                {t.modules.lucidBlocksFarmingAndGrowth.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksFarmingAndGrowth.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.lucidBlocksFarmingAndGrowth.sections.map(
              (s: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="font-bold">
                      <LinkedTitle
                        linkData={
                          moduleLinkMap[
                            `lucidBlocksFarmingAndGrowth::sections::${index}`
                          ]
                        }
                        locale={locale}
                      >
                        {s.name}
                      </LinkedTitle>
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {s.description}
                  </p>
                </div>
              ),
            )}
          </div>
          <div className="scroll-reveal flex flex-wrap gap-3 justify-center">
            {t.modules.lucidBlocksFarmingAndGrowth.growthMilestones.map(
              (m: string, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm"
                >
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  {m}
                </span>
              ),
            )}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksBestEarlyUnlocks"]}
                locale={locale}
              >
                {t.modules.lucidBlocksBestEarlyUnlocks.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksBestEarlyUnlocks.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.lucidBlocksBestEarlyUnlocks.priorities.map(
              (p: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    <span className="text-xs px-2 py-1 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                      {p.priority}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2">
                    <LinkedTitle
                      linkData={
                        moduleLinkMap[
                          `lucidBlocksBestEarlyUnlocks::priorities::${index}`
                        ]
                      }
                      locale={locale}
                    >
                      {p.name}
                    </LinkedTitle>
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {p.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 11: Farming Guide */}
      <section id="farming-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksAchievementTracker"]}
                locale={locale}
              >
                {t.modules.lucidBlocksAchievementTracker.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksAchievementTracker.intro}
            </p>
          </div>
          <div className="scroll-reveal space-y-6">
            {t.modules.lucidBlocksAchievementTracker.groups.map(
              (group: any, gi: number) => (
                <div
                  key={gi}
                  className="p-6 bg-white/5 border border-border rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <ClipboardCheck className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="font-bold text-lg">
                      <LinkedTitle
                        linkData={
                          moduleLinkMap[
                            `lucidBlocksAchievementTracker::groups::${gi}`
                          ]
                        }
                        locale={locale}
                      >
                        {group.name}
                      </LinkedTitle>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.achievements.map((a: any, ai: number) => (
                      <div
                        key={ai}
                        className="p-3 bg-white/5 border border-border rounded-lg"
                      >
                        <p className="font-semibold text-sm text-[hsl(var(--nav-theme-light))]">
                          {a.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {a.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={
                  moduleLinkMap["lucidBlocksSingleplayerAndPlatformFAQ"]
                }
                locale={locale}
              >
                {t.modules.lucidBlocksSingleplayerAndPlatformFAQ.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksSingleplayerAndPlatformFAQ.intro}
            </p>
          </div>
          <div className="scroll-reveal space-y-2">
            {t.modules.lucidBlocksSingleplayerAndPlatformFAQ.faqs.map(
              (faq: any, index: number) => (
                <div
                  key={index}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setFaqExpanded(faqExpanded === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${faqExpanded === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {faqExpanded === index && (
                    <div className="px-5 pb-5 text-muted-foreground text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 13: Anti Magic Guide */}
      <section id="anti-magic-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-[hsl(var(--nav-theme-light))]" />
              <h2 className="text-4xl md:text-5xl font-bold">
                <LinkedTitle
                  linkData={moduleLinkMap["lucidBlocksSteamDeckAndController"]}
                  locale={locale}
                >
                  {t.modules.lucidBlocksSteamDeckAndController.title}
                </LinkedTitle>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksSteamDeckAndController.intro}
            </p>
          </div>
          <div className="scroll-reveal space-y-2">
            {t.modules.lucidBlocksSteamDeckAndController.faqs.map(
              (faq: any, index: number) => (
                <div
                  key={index}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setDeckExpanded(deckExpanded === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${deckExpanded === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {deckExpanded === index && (
                    <div className="px-5 pb-5 text-muted-foreground text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 14: PvP Guide */}
      <section
        id="pvp-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksSettingsAndAccessibility"]}
                locale={locale}
              >
                {t.modules.lucidBlocksSettingsAndAccessibility.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksSettingsAndAccessibility.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksSettingsAndAccessibility.settings.map(
              (s: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Settings className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="font-bold">
                      <LinkedTitle
                        linkData={
                          moduleLinkMap[
                            `lucidBlocksSettingsAndAccessibility::settings::${index}`
                          ]
                        }
                        locale={locale}
                      >
                        {s.name}
                      </LinkedTitle>
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                      {s.type}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {s.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 15: Good and Evil Path Guide */}
      <section
        id="good-and-evil-path-guide"
        className="scroll-mt-24 px-4 py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["lucidBlocksUpdatesAndPatchNotes"]}
                locale={locale}
              >
                {t.modules.lucidBlocksUpdatesAndPatchNotes.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksUpdatesAndPatchNotes.intro}
            </p>
          </div>
          <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-8">
            {t.modules.lucidBlocksUpdatesAndPatchNotes.entries.map(
              (entry: any, index: number) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                  <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                        {entry.type}
                      </span>
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h3 className="font-bold mb-1">
                      <LinkedTitle
                        linkData={
                          moduleLinkMap[
                            `lucidBlocksUpdatesAndPatchNotes::entries::${index}`
                          ]
                        }
                        locale={locale}
                      >
                        {entry.title}
                      </LinkedTitle>
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 16: First Grimoire Guide */}
      <section
        id="first-grimoire-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={
                  moduleLinkMap["lucidBlocksCrashFixAndTroubleshooting"]
                }
                locale={locale}
              >
                {t.modules.lucidBlocksCrashFixAndTroubleshooting.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksCrashFixAndTroubleshooting.intro}
            </p>
          </div>
          <div className="scroll-reveal space-y-4 mb-8">
            {t.modules.lucidBlocksCrashFixAndTroubleshooting.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                    <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      <LinkedTitle
                        linkData={
                          moduleLinkMap[
                            `lucidBlocksCrashFixAndTroubleshooting::steps::${index}`
                          ]
                        }
                        locale={locale}
                      >
                        {step.title}
                      </LinkedTitle>
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[hsl(var(--nav-theme-light))] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[hsl(var(--nav-theme-light))] mb-2">
                  Need more Clover Origins updates?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Track official Clover Origins announcements and group updates
                  through the core community channels:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://discord.com/invite/PJ73fSRAGQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Discord{" "}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.roblox.com/communities/34007786/Funzy-Labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"
                  >
                    Roblox Group <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
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
