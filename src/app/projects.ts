import beeWareContent from "../content/projects/bee-ware.md?raw";
import echoCrocContent from "../content/projects/echo-croc.md?raw";
import fihContent from "../content/projects/fih.md?raw";
import ghostIncContent from "../content/projects/ghost-inc.md?raw";
import oneSpoonAtATimeContent from "../content/projects/one-spoon-at-a-time.md?raw";
import runicArcanaContent from "../content/projects/runic-arcana.md?raw";
import solveNoScrollContent from "../content/projects/solve-no-scroll.md?raw";
import stumbleCoupleContent from "../content/projects/stumble-couple.md?raw";

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  fallbackImage: string;
  itchUrl?: string;
  itchLabel?: string;
  tags: string[];
  workingProcess?: {
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
    documents?: Array<{
      label: string;
      url: string;
    }>;
  };
  markdown: string;
};

export const projects: Project[] = [
  {
    slug: "stumble-couple",
    title: "Stumble Couple",
    description: "A game about an exhausted couple trying to navigate into each other's life",
    image: "/project-thumbnails/stumble-couple.png",
    fallbackImage: "https://images.unsplash.com/photo-1768933294252-92470e942eea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    itchUrl: "https://hikamiii.itch.io/stumble-couple",
    itchLabel: "Open on itch.io",
    tags: ["Narrative", "Co-op"],
    workingProcess: {
      images: [
        {
          src: "/working-process/stumble-couple/work-1.png",
          alt: "Stumble Couple working process image 1",
        },
        {
          src: "/working-process/stumble-couple/work-2.png",
          alt: "Stumble Couple working process image 2",
        },
      ],
    },
    markdown: stumbleCoupleContent,
  },
  {
    slug: "fih",
    title: "Fih",
    description: "A cozy fih game about fishing from unusual places you're not meant to",
    image: "/project-thumbnails/fih.png",
    fallbackImage: "https://images.unsplash.com/photo-1660507224958-729c18ba1277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    itchUrl: "https://hikamiii.itch.io/fih",
    itchLabel: "Play on itch.io",
    tags: ["Adventure", "Puzzle"],
    markdown: fihContent,
  },
  {
    slug: "echo-croc",
    title: "EchoCroc",
    description: "2D platformer where your past-self is both your hazard and your tool",
    image: "/project-thumbnails/echo-croc.png",
    fallbackImage: "https://images.unsplash.com/photo-1768933294578-02022bfb7532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    itchUrl: "https://hikamiii.itch.io/echocroc",
    itchLabel: "Play on itch.io",
    tags: ["Platformer", "Puzzle"],
    markdown: echoCrocContent,
  },
  {
    slug: "bee-ware",
    title: "Bee-Ware!",
    description: "Command your hive, gather nectar, and stand against the growing threat of nature in this fast-paced bee-themed RTS!",
    image: "/project-thumbnails/bee-ware.png",
    fallbackImage: "https://images.unsplash.com/photo-1709229001931-39ef155e40f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    itchUrl: "https://hikamiii.itch.io/bee-ware",
    itchLabel: "Play on itch.io",
    tags: ["Strategy", "RTS"],
    markdown: beeWareContent,
  },
  {
    slug: "ghost-inc",
    title: "Ghost Inc.",
    description: "A game about scaring customers with your own voice to gain points",
    image: "/project-thumbnails/ghost-inc.png",
    fallbackImage: "https://images.unsplash.com/photo-1613992519026-c1a3bb8341ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    itchUrl: "https://sankalpagames.itch.io/ghost-inc",
    itchLabel: "Open on itch.io",
    tags: ["Action", "Voice Control"],
    markdown: ghostIncContent,
  },
  {
    slug: "one-spoon-at-a-time",
    title: "One Spoon at a Time",
    description: "A tiny, stubborn game about making progress one spoonful at a time",
    image: "/project-thumbnails/one-spoon-at-a-time.png",
    fallbackImage: "https://images.unsplash.com/photo-1546949268-4d54c6adf6cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    itchUrl: "https://topeydopey.itch.io/one-spoon-at-a-time",
    itchLabel: "Play on itch.io",
    tags: ["Experimental", "Comedy"],
    markdown: oneSpoonAtATimeContent,
  },
  {
    slug: "runic-arcana",
    title: "Runic Arcana",
    description: "A pixel-art fantasy project with a magic-forward world and strong visual identity",
    image: "/project-thumbnails/runic-arcana.png",
    fallbackImage: "https://images.unsplash.com/photo-1709229001931-39ef155e40f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    itchUrl: "https://topeydopey.itch.io/runic-arcana",
    itchLabel: "Open on itch.io",
    tags: ["Fantasy", "Adventure"],
    workingProcess: {
      images: [
        {
          src: "/working-process/runic-arcana/work.png",
          alt: "Runic Arcana working process image",
        },
      ],
      documents: [
        {
          label: "Runic Arcana GDD (PDF)",
          url: "/working-process/runic-arcana/gdd.pdf",
        },
      ],
    },
    markdown: runicArcanaContent,
  },
  {
    slug: "solve-no-scroll",
    title: "Solve no Scroll",
    description: "Better off solving than scrolling",
    image: "/project-thumbnails/solve-no-scroll.png",
    fallbackImage: "https://images.unsplash.com/photo-1546949268-4d54c6adf6cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    itchUrl: "https://hikamiii.itch.io/solve-no-scroll",
    itchLabel: "Play on itch.io",
    tags: ["Platformer", "Puzzle"],
    markdown: solveNoScrollContent,
  },
];
