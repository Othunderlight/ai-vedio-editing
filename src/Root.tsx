import "./index.css";
import { Composition, Folder } from "remotion";
import { ChapterTransitionProps, Overlay } from "./Overlay";
import { FocusedReelShot } from "./components/general/B-rolls/FocusedAnalysisCard";
import { BRollApiDocumentation } from "./components/general/B-rolls/BRollApiDocumentation";
import { KineticTypography } from "./components/general/captions/KineticTypography";
import { KineticWithVideo } from "./components/general/final/KineticWithVideo";

import {
  PresentSimpleReel,
  PresentSimpleReelProps,
} from "./components/projects/english-tutorial-instegram/PresentSimpleReel";
import { NeoBrutalismReel } from "./components/projects/english-tutorial-instegram/NeoBrutalismReel";
import { IpadNotesReel } from "./components/projects/english-tutorial-instegram/IpadNotesReel";


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
      <Folder name="general">
        <Folder name="overlay-part1-2-3">
          <Folder name="shorts-16-9">
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

          <Folder name="youtube">
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
            <Composition
              id="ChapterTransition"
              component={Overlay}
              durationInFrames={90}
              fps={30}
              width={1920}
              height={1080}
              defaultProps={defaultChapter05Props}
            />
          </Folder>
        </Folder>

        <Folder name="B-rolls">
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
          </Folder>

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
        </Folder>

        <Folder name="captions">
          <Composition
            id="Kinetic-Typography"
            component={KineticTypography}
            durationInFrames={195}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Kinetic-With-Video"
            component={KineticWithVideo}
            durationInFrames={195}
            fps={30}
            width={1080}
            height={1920}
          />
        </Folder>
      </Folder>

      <Folder name="english-tutorial-instegram">
        <Composition
          id="Reel-Present-Simple-60s-Master"
          component={PresentSimpleReel}
          durationInFrames={2190}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={presentSimpleReelDefaultProps}
        />
        <Composition
          id="Variant-1-Neo-Brutalism"
          component={NeoBrutalismReel}
          durationInFrames={2190}
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
          durationInFrames={2190}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            paperColor: "#FAF8F5",
            showCaptions: true,
          }}
        />
      </Folder>
    </>
  );
};
