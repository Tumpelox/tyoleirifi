import adventureAdvancements from "./minecraft_adventure.json";
import endAdvancements from "./minecraft_end.json";
import husbandryAdvancements from "./minecraft_husbandry.json";
import netherAdvancements from "./minecraft_nether.json";
import novaAdventure from "./nova_structures_adventure.json";
import novaNether from "./nova_structures_adventure.json";
import storyAdvancements from "./minecraft_story.json";

export interface Advancement {
  frame: "task" | "goal" | "challenge";
  iconId: string;
  icon: {
    src: string;
    type: "blob" | "url";
  };
  title: string;
  description: string;
}

const advancements: Record<string, Advancement> = {
  ...(storyAdvancements as unknown as Record<string, Advancement>),
  ...(adventureAdvancements as unknown as Record<string, Advancement>),
  ...(husbandryAdvancements as unknown as Record<string, Advancement>),
  ...(netherAdvancements as unknown as Record<string, Advancement>),
  ...(endAdvancements as unknown as Record<string, Advancement>),
  ...(novaAdventure as unknown as Record<string, Advancement>),
  ...(novaNether as unknown as Record<string, Advancement>),
};

export default advancements;
