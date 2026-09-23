import "./index.css";
import { Composition, Folder } from "remotion";
import { ChapterTransitionProps, Overlay } from "./Overlay";
import { BRollPriceComparison } from "./components/general/B-rolls/BRollPriceComparison";
import { BRollSingleCard } from "./components/general/B-rolls/BRollSingleCard";
import { FocusedReelShot } from "./components/general/B-rolls/FocusedAnalysisCard";
import { BRollApiDocumentation } from "./components/general/B-rolls/BRollApiDocumentation";
import { ArtificialAnalysisCard } from "./components/general/B-rolls/ArtificialAnalysisCard";
import { KineticTypography } from "./components/general/captions/KineticTypography";
import { KineticWithVideo } from "./components/general/final/KineticWithVideo";
import { DefusionLLM } from "./components/projects/defusion-llm/DefusionLLM";
import { WhyILoveDjango } from "./components/projects/why-i-love-django/WhyILoveDjango";
import { RecordVsTableBroll } from "./components/projects/why-i-love-django/RecordVsTableBroll";
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
} from "./components/projects/english-tutorial-instegram/PresentSimpleReel";
import { NeoBrutalismReel } from "./components/projects/english-tutorial-instegram/NeoBrutalismReel";
import { IpadNotesReel } from "./components/projects/english-tutorial-instegram/IpadNotesReel";
import {
  PresentContinuousNeoBrutalismReel,
  PCScene1Hook,
  PCScene2Structure,
  PCScene3HappeningNow,
  PCScene4Temporary,
  PCScene5Trends,
  PCScene6AnnoyingHabits,
  PCScene7StateVerbsWarning,
  PCScene8CTA,
} from "./components/projects/english-tutorial-instegram/PresentContinuousNeoBrutalismReel";

// --- PRESENT SIMPLE 60-SECOND EDUCATIONAL REEL ---
const presentSimpleReelDefaultProps: PresentSimpleReelProps = {
  accentColor: "#F59E0B",
  showVoiceoverCaptions: true,
  showSoundEffects: true,
  showTopTracker: true,
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
      {/* 1. SECTION TRANSITION & REEL OVERLAYS */}
      <Folder name="section-transition">
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

      {/* 2. GENERAL B-ROLL GRAPHICS */}
      <Folder name="B-Roll-Pricing-Analysis">
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

        <Composition
          id="ArtificialAnalysisCard"
          component={ArtificialAnalysisCard}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            type: "intelligence",
          }}
        />

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

      {/* 3. B-ROLL API DOCUMENTATION */}
      <Folder name="B-Roll-API-Documentation">
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

      {/* 4. GENERAL CAPTIONS & FINAL COMPOSITIONS */}
      <Folder name="general-captions-and-final">
        <Composition
          id="General-KineticTypography"
          component={KineticTypography}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="General-KineticWithVideo"
          component={KineticWithVideo}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      {/* 5. PROJECT: DEFUSION LLM */}
      <Folder name="project-defusion-llm">
        <Composition
          id="DefusionLLM-Main"
          component={DefusionLLM}
          durationInFrames={2719}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      {/* 6. PROJECT: WHY I LOVE DJANGO */}
      <Folder name="project-why-i-love-django">
        <Composition
          id="WhyILoveDjango-Main"
          component={WhyILoveDjango}
          durationInFrames={1646}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="WhyILoveDjango-RecordVsTable"
          component={RecordVsTableBroll}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      {/* 7. PROJECT: ENGLISH TUTORIAL INSTAGRAM */}
      <Folder name="project-english-tutorial-instagram">
        <Composition
          id="Reel-Present-Simple-60s-Master"
          component={PresentSimpleReel}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={presentSimpleReelDefaultProps}
        />

        <Folder name="Scenes-Breakdown">
          <Composition
            id="Scene-01-Title-Hook"
            component={StandaloneHookScene}
            durationInFrames={150}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ accentColor: "#F59E0B" }}
          />
          <Composition
            id="Scene-02-Positive-Structure"
            component={StandalonePositiveScene}
            durationInFrames={390}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ accentColor: "#F59E0B" }}
          />
          <Composition
            id="Scene-03-Negative-Questions"
            component={StandaloneNegativeScene}
            durationInFrames={240}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ accentColor: "#F59E0B" }}
          />
          <Composition
            id="Scene-04-Habits-Timeline"
            component={StandaloneHabitsScene}
            durationInFrames={360}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ accentColor: "#F59E0B" }}
          />
          <Composition
            id="Scene-05-Facts-BoilingWater"
            component={StandaloneFactsScene}
            durationInFrames={210}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ accentColor: "#F59E0B" }}
          />
          <Composition
            id="Scene-06-Instructions-Desktop"
            component={StandaloneInstructionsScene}
            durationInFrames={180}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ accentColor: "#F59E0B" }}
          />
          <Composition
            id="Scene-07-Stories-Films"
            component={StandaloneStoriesScene}
            durationInFrames={150}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ accentColor: "#F59E0B" }}
          />
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

        <Folder name="Design-Variants">
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
        </Folder>

        {/* --- PRESENT CONTINUOUS NEO-BRUTALISM 60S REEL --- */}
        <Folder name="Present-Continuous-Reel">
          <Composition
            id="Reel-Present-Continuous-60s-NeoBrutalism"
            component={PresentContinuousNeoBrutalismReel}
            durationInFrames={2100}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{
              primaryBg: "#FFE600",
              showCaptions: true,
            }}
          />
          <Folder name="Present-Continuous-Scenes">
            <Composition
              id="PC-Scene-01-Title-Hook"
              component={PCScene1Hook}
              durationInFrames={180}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="PC-Scene-02-Structure"
              component={PCScene2Structure}
              durationInFrames={510}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="PC-Scene-03-Use1-Happening-Now"
              component={PCScene3HappeningNow}
              durationInFrames={210}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="PC-Scene-04-Use2-Temporary"
              component={PCScene4Temporary}
              durationInFrames={180}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="PC-Scene-05-Use3-Trends"
              component={PCScene5Trends}
              durationInFrames={210}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="PC-Scene-06-Use4-Annoying-Habits"
              component={PCScene6AnnoyingHabits}
              durationInFrames={210}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="PC-Scene-07-Warning-State-Verbs"
              component={PCScene7StateVerbsWarning}
              durationInFrames={330}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="PC-Scene-08-CTA-EndCard"
              component={PCScene8CTA}
              durationInFrames={270}
              fps={30}
              width={1080}
              height={1920}
            />
          </Folder>
        </Folder>
      </Folder>
    </>
  );
};
