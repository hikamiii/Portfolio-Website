import beeWareContent from "../content/projects/bee-ware.md?raw";
import echoCrocContent from "../content/projects/echo-croc.md?raw";
import fihContent from "../content/projects/fih.md?raw";
import ghostIncContent from "../content/projects/ghost-inc.md?raw";
import oneSpoonAtATimeContent from "../content/projects/one-spoon-at-a-time.md?raw";
import runicArcanaContent from "../content/projects/runic-arcana.md?raw";
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
    itchLabel: "Play on itch.io",
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
    workingProcess: {
      images: [
        {
          src: "/working-process/fih/work-1.png",
          alt: "Fih working process image 1",
        },
        {
          src: "/working-process/fih/work-2.png",
          alt: "Fih working process image 2",
        },
        {
          src: "/working-process/fih/work-3.png",
          alt: "Fih working process image 3",
        },
      ],
    },
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
    workingProcess: {
      images: [
        {
          src: "/working-process/echo-croc/work-1.png",
          alt: "EchoCroc working process image 1",
        },
        {
          src: "/working-process/echo-croc/work-2.png",
          alt: "EchoCroc working process image 2",
        },
        {
          src: "/working-process/echo-croc/work-3.png",
          alt: "EchoCroc working process image 3",
        },
      ],
    },
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
    workingProcess: {
      images: [
        {
          src: "/working-process/bee-ware/work-1.png",
          alt: "Bee-Ware working process image 1",
        },
        {
          src: "/working-process/bee-ware/work-2.png",
          alt: "Bee-Ware working process image 2",
        },
        {
          src: "/working-process/bee-ware/work-3.png",
          alt: "Bee-Ware working process image 3",
        },
      ],
    },
    markdown: beeWareContent,
  },
  {
    slug: "ghost-inc",
    title: "Ghost Inc.",
    description: "A game about scaring customers with your own voice to gain points",
    image: "/project-thumbnails/ghost-inc.png",
    fallbackImage: "https://images.unsplash.com/photo-1613992519026-c1a3bb8341ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    itchUrl: "https://hikamiii.itch.io/ghost-house",
    itchLabel: "Play on itch.io",
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
    workingProcess: {
      images: [
        {
          src: "/working-process/one-spoon-at-a-time/work-1.png",
          alt: "One Spoon at a Time working process image 1",
        },
        {
          src: "/working-process/one-spoon-at-a-time/work-2.png",
          alt: "One Spoon at a Time working process image 2",
        },
      ],
      documents: [
        {
          label: "One Spoon at a Time GDD (PDF)",
          url: "/working-process/one-spoon-at-a-time/gdd.pdf",
        },
      ],
    },
    markdown: oneSpoonAtATimeContent,
  },
  {
    slug: "runic-arcana",
    title: "Runic Arcana",
    description: "A pixel-art fantasy project with a magic-forward world and strong visual identity",
    image: "/project-thumbnails/runic-arcana.png",
    fallbackImage: "https://images.unsplash.com/photo-1709229001931-39ef155e40f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    itchUrl: "https://topeydopey.itch.io/runic-arcana",
    itchLabel: "Play on itch.io",
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
];
