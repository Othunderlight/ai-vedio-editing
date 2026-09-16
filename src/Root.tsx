import "./index.css";
import { Composition, Folder } from "remotion";
import { ChapterTransitionProps, Overlay } from "./Overlay";

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

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
    </>
  );
};
