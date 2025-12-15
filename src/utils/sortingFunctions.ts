import { Player } from "@/models";

export const sortPlayersByName = (a: Player, b: Player) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) return -1;
  else return 1;
};
