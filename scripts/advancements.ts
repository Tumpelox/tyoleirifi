import { join, parse } from "https://deno.land/std@0.224.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.224.0/fs/mod.ts";

// --- ASETUKSET ---

// Oletetaan, että ollaan Minecraftin/Paketin juuressa.
const MINECRAFT_ROOT =
  "C:/Users/Tumpe/AppData/Roaming/.minecraft/versions/1.21.11_unobfuscated";

// Polku advancement-tiedostoihin (Data Pack -standardi)
const ADVANCEMENTS_DIR = join(
  MINECRAFT_ROOT,
  "data",
  "minecraft",
  "advancement"
);

const LANGUAGES_DIR = join(MINECRAFT_ROOT, "assets", "minecraft", "lang");

// Polku tekstuureihin (Resource Pack -standardi)
const TEXTURES_BASE_DIR = join(
  MINECRAFT_ROOT,
  "assets",
  "minecraft",
  "textures"
);

// Mihin tulokset tallennetaan
const OUTPUT_DIR = "./advancements";
const OUTPUT_LANG_DIR = join("./lang");

// ------------------

interface AdvancementData {
  parrent: string | null;
  frame: "task" | "goal" | "challenge";
  iconId: string | null;
  icon: {
    src: string | null;
    type: "blob" | "url";
  };
  title: string | null;
  description: string | null;
}

async function main() {
  try {
    // 1. Tarkistetaan hakemistot
    if (!(await exists(ADVANCEMENTS_DIR))) {
      console.error(
        `VIRHE: Advancement-hakemistoa ei löytynyt: ${ADVANCEMENTS_DIR}`
      );
      console.error(
        "Varmista, että ajat scriptin puretun version tai data packin juuressa."
      );
      Deno.exit(1);
    }

    // Luodaan output-hakemistot
    await Deno.mkdir(OUTPUT_DIR, { recursive: true });
    await Deno.mkdir(OUTPUT_LANG_DIR, { recursive: true });

    console.log(`Luetaan tiedostoja hakemistosta: ${ADVANCEMENTS_DIR}`);
    console.log(`Etsitään tekstuureja hakemistosta: ${TEXTURES_BASE_DIR}`);

    const targetLanguages = ["en_us", "fi_fi"];

    const langData: Record<string, Record<string, string>> = {};

    const outputLangData: Record<string, Record<string, string>> = {};

    for (const lang of targetLanguages) {
      const fileContent = await Deno.readTextFile(
        join(LANGUAGES_DIR, `${lang}.json`)
      );
      const json = JSON.parse(fileContent);

      langData[lang] = json;
      outputLangData[lang] = {};
    }

    // 2. Käydään läpi advancement-kansion alihakemistot (esim. "story", "nether")
    for await (const dirEntry of Deno.readDir(ADVANCEMENTS_DIR)) {
      if (dirEntry.isDirectory) {
        const categoryName = dirEntry.name; // esim. "story"
        const subDirPath = join(ADVANCEMENTS_DIR, categoryName);

        console.log(`\nKäsitellään kategoriaa: ${categoryName}...`);

        const outputData: Record<string, Record<string, AdvancementData>> = {};

        // 3. Käydään läpi JSON-tiedostot alihakemistossa
        for await (const fileEntry of Deno.readDir(subDirPath)) {
          if (fileEntry.isFile && fileEntry.name.endsWith(".json")) {
            const filePath = join(subDirPath, fileEntry.name);

            try {
              const fileContent = await Deno.readTextFile(filePath);
              const json = JSON.parse(fileContent);
              const fileNameNoExt = parse(fileEntry.name).name;

              const namespace = (json.parent ?? "minecraft:").split(":")[0];

              if (!outputData[namespace]) {
                outputData[namespace] = {};
              }

              // Avain pyydetyssä muodossa
              const key = `${namespace}:${categoryName}/${fileNameNoExt}`;

              if (json.display) {
                // Haetaan ikonin ID.
                // 1.20+ versioissa se on usein "item", vanhemmissa tai muokatussa datassa voi olla "id".
                const iconId = json.display.icon?.item || json.display.icon?.id;

                // Yritetään etsiä ja kopioida tekstuuri
                let localTexturePath = null;
                if (iconId) {
                  localTexturePath = await findAndCopyTexture(iconId);
                }

                const title = json.display.title?.translate ?? null;
                const description = json.display.description?.translate ?? null;

                if (title && description) {
                  for (const lang of targetLanguages) {
                    outputLangData[lang][title] =
                      langData[lang][title] || title;

                    outputLangData[lang][description] =
                      langData[lang][description] || description;
                  }
                }

                outputData[namespace][key] = {
                  parrent: json.parent || null,
                  frame: json.display.frame || "task",
                  iconId: iconId, // Alkuperäinen ID (esim. minecraft:stone)
                  icon: {
                    src: localTexturePath,
                    type: localTexturePath ? "blob" : "url",
                  },
                  title: title,
                  description: description,
                };
              } else {
                console.warn(
                  `   Varoitus: Tiedostolla ei ole display-osaa: ${fileNameNoExt}`
                );
              }
            } catch (err) {
              console.error(`Virhe tiedostossa ${filePath}:`, err);
            }
          } else {
            console.log(
              `   Ohitetaan ei-JSON-tiedosto tai kansio: ${fileEntry.name}`
            );
          }
        }

        // 4. Tallennetaan kategorian JSON
        if (Object.keys(outputData).length > 0) {
          for (const namespace in outputData) {
            const childrenMap: Record<string, string[]> = {};

            // 1. Kartoita suhteet
            Object.keys(outputData[namespace]).forEach((key) => {
              const item = outputData[namespace][key];
              const parrent = item.parrent;

              if (parrent) {
                if (!childrenMap[parrent]) {
                  childrenMap[parrent] = [];
                }
                childrenMap[parrent].push(key);
              }
            });

            const sortMinecraftTree = (
              data: Record<string, string[]>
            ): string[] => {
              // 2. Etsitään kaikki uniikit solmut ja määritetään juuri (Root)
              const allNodes = new Set<string>();
              const childrenNodes = new Set<string>();

              // Kerätään kaikki solmut talteen
              for (const [parent, children] of Object.entries(data)) {
                allNodes.add(parent);
                children.forEach((child) => {
                  allNodes.add(child);
                  childrenNodes.add(child);
                });
              }

              // Juuri on se, joka löytyy kaikista solmuista, mutta ei ole kenenkään lapsi
              // Array.from muuttaa Setin listaksi, jotta voimme käyttää filteriä
              const roots: string[] = Array.from(allNodes).filter(
                (node) => !childrenNodes.has(node)
              );

              if (roots.length === 0) {
                return ["Virhe: Juurta ei löytynyt"];
              }
              const root = roots[0];

              // 3. Lasketaan "Korkeus" (Height) - Etäisyys lehteen (DFS)
              const memoHeight = new Map();

              const getHeight = (node: string): number => {
                if (memoHeight.has(node)) {
                  return memoHeight.get(node);
                }

                const children = data[node] || [];

                // Jos ei lapsia, korkeus on 0
                if (children.length === 0) {
                  memoHeight.set(node, 0);
                  return 0;
                }

                // Rekursiivisesti haetaan lasten korkeudet
                const childHeights = children.map(getHeight);
                const maxHeight = 1 + Math.max(...childHeights);

                memoHeight.set(node, maxHeight);
                return maxHeight;
              };

              // Alustetaan korkeuslaskenta juuresta
              getHeight(root);

              // 4. Lasketaan "Syvyys" (Depth) - Etäisyys juuresta (BFS)
              const depths = new Map();
              const queue = [root];
              depths.set(root, 0);

              while (queue.length > 0) {
                // Otetaan jonon ensimmäinen (shift = pop(0))
                const current = queue.shift();
                const currentDepth = depths.get(current);

                if (current === undefined) break;

                const children = data[current] || [];

                children.forEach((child) => {
                  depths.set(child, currentDepth + 1);
                  queue.push(child);
                });
              }

              // 5. Järjestetään lista
              // Array.from(allNodes) tekee Setistä taulukon sorttausta varten
              const sortedNodes = Array.from(allNodes).sort((a, b) => {
                // Ensisijainen: Syvyys (pienin ensin)
                // Käytetään ?? 999 siltä varalta että solmu on irrallinen (ei pitäisi tapahtua tässä datassa)
                const depthA = depths.get(a) ?? 999;
                const depthB = depths.get(b) ?? 999;

                if (depthA !== depthB) {
                  return depthA - depthB;
                }

                return b.localeCompare(a);
              });

              return sortedNodes;
            };

            const sortedNodes = sortMinecraftTree(childrenMap);

            outputData[namespace] = sortedNodes.reduce(
              (acc: Record<string, AdvancementData>, cur) => {
                acc[cur] = outputData[namespace][cur];
                return acc;
              },
              {}
            );

            const outputFileName = join(
              OUTPUT_DIR,
              `${namespace}_${categoryName}.json`
            );
            await Deno.writeTextFile(
              outputFileName,
              JSON.stringify(outputData[namespace], null, 2)
            );
            console.log(`-> Luotu JSON: ${outputFileName}`);
          }
        }
      }
    }

    // 5. Tallennetaan kielitiedostot
    for (const lang of targetLanguages) {
      const outputLangFile = join(OUTPUT_LANG_DIR, `${lang}.json`);
      await Deno.writeTextFile(
        outputLangFile,
        JSON.stringify(outputLangData[lang], null, 2)
      );
      console.log(`-> Luotu kielitiedosto: ${outputLangFile}`);
    }
  } catch (error) {
    console.error("Odottamaton virhe:", error);
  }
}

// --- APUFUKTIO: Tekstuurin etsintä ja kopiointi ---
async function findAndCopyTexture(
  namespacedId: string
): Promise<string | null> {
  // namespacedId on muotoa "minecraft:apple" tai pelkkä "apple"

  // Poistetaan "minecraft:" etuliite, koska kansiorakenne assets/minecraft/textures ei käytä sitä sisäisesti
  const cleanId = namespacedId.replace("minecraft:", "");

  const path = join(TEXTURES_BASE_DIR, "item", `${cleanId}.png`);

  if (await exists(path)) {
    // Löytyi! Kopioidaan se talteen.

    return (await Deno.readFile(path)).toBase64(); // Palautetaan tiedostonimi JSONia varten
  }

  // Jos ei löytynyt
  // console.warn(`   Tekstuuria ei löytynyt ID:lle "${namespacedId}"`);
  return null;
}

if (import.meta.main) {
  main();
}
