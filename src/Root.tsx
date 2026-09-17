import "./index.css";
import { Composition, Folder } from "remotion";
import { ChapterTransitionProps, Overlay } from "./Overlay";
import { BRollPriceComparison } from "./components/BRollPriceComparison";
import { BRollSingleCard } from "./components/BRollSingleCard";
import { FocusedReelShot } from "./components/FocusedAnalysisCard";
import { BRollApiDocumentation } from "./components/BRollApiDocumentation";
import {
  EnglishTutorialProps,
  EnglishTutorialReel,
} from "./components/EnglishTutorialReel";
import {
  NotebookGrammarProps,
  NotebookGrammarReel,
} from "./components/NotebookGrammarReel";
import {
  PresentSimpleReel,
  PresentSimpleReelProps,
  StandaloneHookScene,
  StandalonePositiveScene,
  StandaloneNegativeScene,
  StandaloneHabitsScene,
  StandaloneFactsScene,
  StandaloneInstructionsScene,
  StandaloneStoriesScene,
  StandaloneCTAScene,
} from "./components/PresentSimpleReel";
import { NeoBrutalismReel } from "./components/variants/NeoBrutalismReel";
import { IpadNotesReel } from "./components/variants/IpadNotesReel";
import { KineticTypographyReel } from "./components/variants/KineticTypographyReel";
import { RetroDesktopReel } from "./components/variants/RetroDesktopReel";
import { MinimalCorporateReel } from "./components/variants/MinimalCorporateReel";

// --- PRESENT SIMPLE 60-SECOND EDUCATIONAL REEL ---
const presentSimpleReelDefaultProps: PresentSimpleReelProps = {
  accentColor: "#F59E0B",
  showVoiceoverCaptions: true,
  showSoundEffects: true,
  showTopTracker: true,
};

// --- PRESENT SIMPLE NOTEBOOK GRAMMAR REEL (Matching user reference video) ---
const presentSimpleNotebookProps: NotebookGrammarProps = {
  baseVerb: "drink",
  objectNoun: "coffee.",
  firstPronouns: ["I", "You"],
  thirdPronouns: ["He", "She"],
  bgImagePath: "assets/bg-en-claen.png",
};

// --- ENGLISH TUTORIAL (INSTAGRAM REELS) ---
const tutorial01Props: EnglishTutorialProps = {
  episodeTag: "DAILY ENGLISH • EPISODE 01",
  category: "vocabulary",
  headline: "Stop Saying 'I'm Very Busy'!",
  hookSubtext: "Level up your conversational English with this native phrase",
  incorrectPhrase: "I am very busy today.",
  incorrectLabel: "COMMON & REPETITIVE",
  correctPhrase: "I'm swamped.",
  correctLabel: "NATIVE & NATURAL",
  phonetic: "/swɑːmpt/",
  meaning: "Having too much to deal with at once",
  exampleSentence:
    '"Sorry I couldn\'t reply earlier, I\'m completely swamped with work."',
  exampleHighlight: "swamped",
  proTip:
    "💡 Nuance: Use 'swamped' at work or with friends when overwhelmed by tasks.",
  accentColor: "#F59E0B",
  ctaText: "Double tap ❤️ & save for your next conversation!",
};

const tutorial02Props: EnglishTutorialProps = {
  episodeTag: "GRAMMAR SECRETS • EPISODE 02",
  category: "grammar",
  headline: "Stop Making This Email Mistake!",
  hookSubtext: "90% of English learners make this common preposition error",
  incorrectPhrase: "I look forward to see you.",
  incorrectLabel: "COMMON MISTAKE",
  correctPhrase: "I look forward to seeing you.",
  correctLabel: "GRAMMATICALLY ACCURATE",
  phonetic: "/ˈsiːɪŋ/",
  meaning: "Anticipating future meeting with positive expectation",
  exampleSentence:
    '"Thank you for your time, I look forward to seeing you next Tuesday."',
  exampleHighlight: "seeing you",
  proTip:
    "💡 Rule: 'To' here is a preposition, not part of an infinitive, so it takes a gerund (-ing)!",
  accentColor: "#3B82F6",
  ctaText: "Save this 📌 for your next professional email!",
};

const tutorial03Props: EnglishTutorialProps = {
  episodeTag: "PHRASAL VERBS • EPISODE 03",
  category: "phrasal-verbs",
  headline: "Master The Verb 'Break Down'!",
  hookSubtext: "One phrasal verb with 3 completely different meanings",
  incorrectPhrase: "My car stopped working suddenly.",
  incorrectLabel: "BASIC VOCABULARY",
  correctPhrase: "My car broke down.",
  correctLabel: "NATURAL PHRASAL VERB",
  phonetic: "/broʊk daʊn/",
  meaning: "1. Mechanical failure | 2. Emotional collapse | 3. Explain simply",
  exampleSentence:
    '"Could you break down the monthly budget numbers for the team?"',
  exampleHighlight: "break down",
  proTip:
    "💡 Bonus: When someone says 'let's break it down', they mean let's analyze step by step!",
  accentColor: "#10B981",
  ctaText: "Share with a friend 🚀 & follow for daily lessons!",
};

// --- EXISTING COMPOSITIONS (Retained) ---
const defaultChapter05Props: ChapterTransitionProps = {
  chapterNumber: "05",
  chapterSubtitle: "Chapter 5 of 10",
  titleLine1: "Generate Your",
  titleLine2: "Video and Images",
  currentChapter: 5,
  totalChapters: 10,
  accentColor: "#E45A35",
  numberColor: "#43291F",
  glowColor: "rgba(215, 88, 38, 0.44)",
};

const chapter01Props: ChapterTransitionProps = {
  chapterNumber: "01",
  chapterSubtitle: "Chapter 1 of 10",
  titleLine1: "How to Build",
  titleLine2: "$10K Websites",
  currentChapter: 1,
  totalChapters: 10,
  accentColor: "#E45A35",
  numberColor: "#43291F",
  glowColor: "rgba(215, 88, 38, 0.44)",
};

const chapter10Props: ChapterTransitionProps = {
  chapterNumber: "10",
  chapterSubtitle: "Chapter 10 of 10",
  titleLine1: "Deploying Your",
  titleLine2: "Live Website",
  currentChapter: 10,
  totalChapters: 10,
  accentColor: "#E45A35",
  numberColor: "#43291F",
  glowColor: "rgba(215, 88, 38, 0.44)",
};

// --- NEW VIDEO SCRIPT CHAPTER COMPOSITIONS ---

// Chapter 01 (Recommended Symmetrical Question Hook)
const claudeChapter01Props: ChapterTransitionProps = {
  chapterNumber: "01",
  chapterSubtitle: "الفصل 1 من 2",
  titleLine1: "ليش ميزانيتك عم تتبخر",
  titleLine2: "مع كل برومبت؟ 💸",
  currentChapter: 1,
  totalChapters: 2,
  accentColor: "#E45A35",
  numberColor: "#482618",
  glowColor: "rgba(228, 90, 53, 0.46)",
};

// Chapter 02 (The approved bulldozer hook from your script)
const claudeChapter02Props: ChapterTransitionProps = {
  chapterNumber: "02",
  chapterSubtitle: "الفصل 2 من 2",
  titleLine1: 'ليش عم تستخدم "بلدوزر"',
  titleLine2: "لحتى تكسر جوزة؟ 🔨",
  currentChapter: 2,
  totalChapters: 2,
  accentColor: "#F59E0B",
  numberColor: "#4A3215",
  glowColor: "rgba(245, 158, 11, 0.45)",
};

// Chapter 01 Alternatives for you to preview and choose
const altTokenMaxingProps: ChapterTransitionProps = {
  chapterNumber: "01",
  chapterSubtitle: "الفصل 1 من 2",
  titleLine1: "فخ الـ Token Maxing:",
  titleLine2: "صدمة الميزانية يلي ناطرتك ⚠️",
  currentChapter: 1,
  totalChapters: 2,
  accentColor: "#E45A35",
  numberColor: "#482618",
  glowColor: "rgba(228, 90, 53, 0.46)",
};

const altBudgetShockProps: ChapterTransitionProps = {
  chapterNumber: "01",
  chapterSubtitle: "الفصل 1 من 2",
  titleLine1: "صدمة الميزانية:",
  titleLine2: "الارتفاع الجنوني بأسعار التوكينز 📈",
  currentChapter: 1,
  totalChapters: 2,
  accentColor: "#E45A35",
  numberColor: "#482618",
  glowColor: "rgba(228, 90, 53, 0.46)",
};

const altLimitOutProps: ChapterTransitionProps = {
  chapterNumber: "01",
  chapterSubtitle: "الفصل 1 من 2",
  titleLine1: "خلص الـ Limit بنص الشغل؟",
  titleLine2: "فخ الأسعار الخيالية للتوكينز 🚨",
  currentChapter: 1,
  totalChapters: 2,
  accentColor: "#E45A35",
  numberColor: "#482618",
  glowColor: "rgba(228, 90, 53, 0.46)",
};

const altPocketBurnProps: ChapterTransitionProps = {
  chapterNumber: "01",
  chapterSubtitle: "الفصل 1 من 2",
  titleLine1: "فخ كـلود الخفي:",
  titleLine2: "كيف التوكينز عم تحرق جيبتك؟ 🔥",
  currentChapter: 1,
  totalChapters: 2,
  accentColor: "#E45A35",
  numberColor: "#482618",
  glowColor: "rgba(228, 90, 53, 0.46)",
};

// --- NEW INSTAGRAM REELS (9:16 VERTICAL 1080x1920) ---
// Chapter 1 Reel: Short punchy "فخ كـلود" without headers, extra large display typography
const reelClaude01Props: ChapterTransitionProps = {
  chapterNumber: "01",
  chapterSubtitle: "",
  titleLine1: "فخ كـلود",
  titleLine2: "",
  currentChapter: 1,
  totalChapters: 2,
  accentColor: "#E45A35",
  numberColor: "#482618",
  glowColor: "rgba(228, 90, 53, 0.48)",
  showTracker: true,
  titleFontSize: 150,
  numberFontSize: 650,
};

// Chapter 2 Reel: Exact text "بلدوزر لتكسر جوزة؟!" with "?!" placed cleanly after "جوزة"
// Split into 2 massive lines for maximum Instagram Reel visual weight
const reelClaude02Props: ChapterTransitionProps = {
  chapterNumber: "02",
  chapterSubtitle: "",
  titleLine1: "بلدوزر",
  titleLine2: "لتكسر جوزة\u200F؟!‏",
  currentChapter: 2,
  totalChapters: 2,
  accentColor: "#F59E0B",
  numberColor: "#4A3215",
  glowColor: "rgba(245, 158, 11, 0.45)",
  showTracker: true,
  titleLine1FontSize: 140,
  titleLine2FontSize: 124,
  numberFontSize: 650,
  titleGap: 24,
};

// Chapter 2 Reel Alternative: Exact full sentence on single line
const reelClaude02SingleLineProps: ChapterTransitionProps = {
  chapterNumber: "02",
  chapterSubtitle: "",
  titleLine1: "بلدوزر لتكسر جوزة\u200F؟!‏",
  titleLine2: "",
  currentChapter: 2,
  totalChapters: 2,
  accentColor: "#F59E0B",
  numberColor: "#4A3215",
  glowColor: "rgba(245, 158, 11, 0.45)",
  showTracker: true,
  titleFontSize: 106,
  numberFontSize: 650,
};

// Clean versions without side tracker (if desired)
const reelClaude01CleanProps: ChapterTransitionProps = {
  ...reelClaude01Props,
  showTracker: false,
};

const reelClaude02CleanProps: ChapterTransitionProps = {
  ...reelClaude02Props,
  showTracker: false,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="section-transition">
      {/* 1. INSTAGRAM REELS (9:16 Vertical - 1080x1920) */}
      <Composition
        id="Reel-Claude-Chapter-01"
        component={Overlay}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={reelClaude01Props}
      />
      <Composition
        id="Reel-Claude-Chapter-02"
        component={Overlay}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={reelClaude02Props}
      />

      <Folder name="Instagram-Reels-Variations">
        <Composition
          id="Reel-Ch2-SingleLine"
          component={Overlay}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={reelClaude02SingleLineProps}
        />
        <Composition
          id="Reel-Ch1-NoTracker"
          component={Overlay}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={reelClaude01CleanProps}
        />
        <Composition
          id="Reel-Ch2-NoTracker"
          component={Overlay}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={reelClaude02CleanProps}
        />
      </Folder>

      {/* 2. B-ROLL GRAPHICS: Artificial Analysis Intelligence & Cost Comparisons */}
      <Folder name="B-Roll-Pricing-Analysis">
        {/* Isolated Single-Shot Visuals: Claude (Fable + Opus) vs DeepSeek V4.1 Flash ONLY (No text outside card) */}
        <Composition
          id="Reel-Shot-Intelligence-Only"
          component={FocusedReelShot}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            type: "intelligence",
          }}
        />

        <Composition
          id="Reel-Shot-Cost-Only"
          component={FocusedReelShot}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            type: "cost",
          }}
        />

        {/* Master Instagram Reel Comparison with Audio Cues (9:16 - 1080x1920) */}
        <Composition
          id="Reel-BRoll-CostVsIntelligence"
          component={BRollPriceComparison}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            titleArabicLine1: "كلود 7 دولار تقريباً عالتاسك...",
            titleArabicLine2: "ديب سيك 0.67 دولار فقط!",
            claudePriceText: "$7.63",
            deepseekPriceText: "$0.67",
            multiplierText: "أرخص بأكثر من 11 ضعف!",
            highlightComparison: true,
          }}
        />

        {/* Dedicated Cost per Task Reel (9:16 - 1080x1920) */}
        <Composition
          id="Reel-BRoll-CostOnly"
          component={BRollSingleCard}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            type: "cost",
            arabicHeadline: "السعر: كلود 7$ عالتاسك... ديب سيك 0.67$!",
            arabicSubheadline: "وفر أكثر من 11 ضعف التكلفة لنفس النتيجة بالضبط 💸",
            highlightComparison: true,
          }}
        />

        {/* Dedicated Intelligence Index Reel (9:16 - 1080x1920) */}
        <Composition
          id="Reel-BRoll-IntelligenceOnly"
          component={BRollSingleCard}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            type: "intelligence",
            arabicHeadline: "مقارنة الذكاء: ديب سيك وكلود بنفس الكفاءة!",
            arabicSubheadline: "أداء شبه متطابق في المهام متوسطة الصعوبة 🧠",
            highlightComparison: true,
          }}
        />

        {/* Widescreen YouTube / 16:9 Versions (1920x1080) */}
        <Composition
          id="BRoll-CostVsIntelligence-16x9"
          component={BRollPriceComparison}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleArabicLine1: "كلود سبعة دولار تقريباً عالتاسك...",
            titleArabicLine2: "ديب سيك 0.67 فقط!",
            claudePriceText: "$7.63",
            deepseekPriceText: "$0.67",
            multiplierText: "أرخص بأكثر من 11 ضعف!",
            highlightComparison: true,
          }}
        />
        <Composition
          id="BRoll-CostOnly-16x9"
          component={BRollSingleCard}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            type: "cost",
            arabicHeadline: "السعر: كلود 7$ عالتاسك... ديب سيك 0.67$!",
            arabicSubheadline: "فرق التكلفة أكثر من 11 ضعف لكل مهمة 💸",
            highlightComparison: true,
          }}
        />
      </Folder>

      {/* 3. B-ROLL GRAPHICS: Routine API & OpenAPI Documentation (Audio Cue: jump cut at 01:03) */}
      <Folder name="B-Roll-API-Documentation">
        {/* Instagram Reel (9:16 - 1080x1920) */}
        <Composition
          id="Reel-BRoll-ApiDocumentation"
          component={BRollApiDocumentation}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            scrollSpeed: 1.6,
          }}
        />

        {/* Landscape Version (16:9 - 1920x1080) */}
        <Composition
          id="BRoll-ApiDocumentation-16x9"
          component={BRollApiDocumentation}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            scrollSpeed: 1.6,
          }}
        />
      </Folder>

      {/* 4. Primary 16:9 Script Chapters (Preserved) */}
      <Composition
        id="Claude-Chapter-01"
        component={Overlay}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={claudeChapter01Props}
      />
      <Composition
        id="Claude-Chapter-02"
        component={Overlay}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={claudeChapter02Props}
      />

      {/* 2. Alternative Variations for Chapter 1 */}
      <Folder name="Chapter-01-Alternatives">
        <Composition
          id="Ch1-Alt-TokenMaxing"
          component={Overlay}
          durationInFrames={90}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={altTokenMaxingProps}
        />
        <Composition
          id="Ch1-Alt-BudgetShock"
          component={Overlay}
          durationInFrames={90}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={altBudgetShockProps}
        />
        <Composition
          id="Ch1-Alt-LimitOut"
          component={Overlay}
          durationInFrames={90}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={altLimitOutProps}
        />
        <Composition
          id="Ch1-Alt-PocketBurn"
          component={Overlay}
          durationInFrames={90}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={altPocketBurnProps}
        />
      </Folder>

      {/* 3. Original Compositions (Preserved) */}
      <Composition
        id="ChapterTransition"
        component={Overlay}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultChapter05Props}
      />
      <Composition
        id="Overlay"
        component={Overlay}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultChapter05Props}
      />
      <Folder name="Examples">
        <Composition
          id="Chapter-01-Intro"
          component={Overlay}
          durationInFrames={90}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={chapter01Props}
        />
        <Composition
          id="Chapter-10-Deploy"
          component={Overlay}
          durationInFrames={90}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={chapter10Props}
        />
      </Folder>
    </Folder>

    {/* 2. ENGLISH TUTORIALS FOR INSTAGRAM (9:16 Vertical - 1080x1920) */}
    <Folder name="english-tutorials-instagram">
      <Composition
        id="IG-Notebook-Grammar-Present-Simple"
        component={NotebookGrammarReel}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={presentSimpleNotebookProps}
      />
      <Composition
        id="IG-English-01-Stop-Saying-Busy"
        component={EnglishTutorialReel}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={tutorial01Props}
      />
      <Composition
        id="IG-English-02-Look-Forward-To"
        component={EnglishTutorialReel}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={tutorial02Props}
      />
      <Composition
        id="IG-English-03-Phrasal-Verb-Break-Down"
        component={EnglishTutorialReel}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={tutorial03Props}
      />
      <Composition
        id="IG-English-Template-Customizable"
        component={EnglishTutorialReel}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={tutorial01Props}
      />
    </Folder>

    {/* 3. NEW: PRESENT SIMPLE IN 60 SECONDS (1080x1920 Vertical Reel) */}
    <Folder name="present-simple-in-60-seconds">
      {/* Master 60-Second Full Educational Reel (1800 frames @ 30fps) */}
      <Composition
        id="Reel-Present-Simple-60s-Master"
        component={PresentSimpleReel}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={presentSimpleReelDefaultProps}
      />

      {/* Individual Scene Breakdown for rapid testing, previewing & targeted exporting */}
      <Folder name="Scenes-Breakdown">
        {/* Scene 1: Hook & Title (0:00 - 0:05 | 150 frames) */}
        <Composition
          id="Scene-01-Title-Hook"
          component={StandaloneHookScene}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ accentColor: "#F59E0B" }}
        />

        {/* Scene 2: Structure (+) Positive Form (0:05 - 0:18 | 390 frames) */}
        <Composition
          id="Scene-02-Positive-Structure"
          component={StandalonePositiveScene}
          durationInFrames={390}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ accentColor: "#F59E0B" }}
        />

        {/* Scene 3: Structure (– & ?) Negatives & Questions (0:18 - 0:26 | 240 frames) */}
        <Composition
          id="Scene-03-Negative-Questions"
          component={StandaloneNegativeScene}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ accentColor: "#F59E0B" }}
        />

        {/* Scene 4: Use 1: Habits & Routine Timeline (0:26 - 0:38 | 360 frames) */}
        <Composition
          id="Scene-04-Habits-Timeline"
          component={StandaloneHabitsScene}
          durationInFrames={360}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ accentColor: "#F59E0B" }}
        />

        {/* Scene 5: Use 2: Facts & Truths Boiling Water (0:38 - 0:45 | 210 frames) */}
        <Composition
          id="Scene-05-Facts-BoilingWater"
          component={StandaloneFactsScene}
          durationInFrames={210}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ accentColor: "#F59E0B" }}
        />

        {/* Scene 6: Use 3: Instructions Desktop Click (0:45 - 0:51 | 180 frames) */}
        <Composition
          id="Scene-06-Instructions-Desktop"
          component={StandaloneInstructionsScene}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ accentColor: "#F59E0B" }}
        />

        {/* Scene 7: Use 4: Stories & Films Clapperboard (0:51 - 0:56 | 150 frames) */}
        <Composition
          id="Scene-07-Stories-Films"
          component={StandaloneStoriesScene}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ accentColor: "#F59E0B" }}
        />

        {/* Scene 8: Call to Action & End Card (0:56 - 1:00 | 120 frames) */}
        <Composition
          id="Scene-08-CTA-EndCard"
          component={StandaloneCTAScene}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ accentColor: "#F59E0B" }}
        />
      </Folder>
    </Folder>

    {/* 4. PRESENT SIMPLE DESIGN VARIANTS (Choose between 5 Distinct Styles) */}
    <Folder name="present-simple-design-variants">
      {/* Variant 1: Neo-Brutalism Style */}
      <Composition
        id="Variant-1-Neo-Brutalism"
        component={NeoBrutalismReel}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          backgroundColor: "#FFF9D2",
          showCaptions: true,
        }}
      />

      {/* Variant 2: Modern iPad Note-Taking Style */}
      <Composition
        id="Variant-2-Modern-iPad-Notes"
        component={IpadNotesReel}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          paperColor: "#FAF8F5",
          showCaptions: true,
        }}
      />

      {/* Variant 3: Bold Kinetic Typography Style */}
      <Composition
        id="Variant-3-Kinetic-Typography"
        component={KineticTypographyReel}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          backgroundColor: "#000000",
          showCaptions: true,
        }}
      />

      {/* Variant 4: 90s Retro / Lo-Fi Desktop Style */}
      <Composition
        id="Variant-4-90s-Retro-Desktop"
        component={RetroDesktopReel}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showCaptions: true,
        }}
      />

      {/* Variant 5: Premium Minimalist Corporate Style */}
      <Composition
        id="Variant-5-Premium-Minimalist"
        component={MinimalCorporateReel}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          brandColor: "#0F172A",
          accentBlue: "#2563EB",
          showCaptions: true,
        }}
      />
    </Folder>
    </>
  );
};
