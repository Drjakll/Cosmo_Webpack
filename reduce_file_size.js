import fs from "fs/promises";
import path from "path";
import sharp from "sharp";


const inputDir = "./Original";
const outputDir = "./Built_Client";

await fs.mkdir(outputDir, { recursive: true });

const files = await fs.readdir(inputDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const filename = path.parse(file).name;

  if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) continue;
  

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(
    outputDir,
    path.basename(file, ext) + ".webp"
  );

if(["profession_background", 
    "hobby_background", 
    "location_background", 
    "school_background", 
    "pp_placeholder",
    "personal_trait_background"].includes(filename)){
      
    await sharp(inputPath)
    .resize(1024, 1024, {
      fit: "cover",
      withoutEnlargement: true
    })
    .webp({ quality: 80 })
    .toFile(outputPath);

    console.log("Converted:", outputPath);
    continue;
  }

  await sharp(inputPath)
    .resize(256, 256, {
      fit: "cover",
      withoutEnlargement: true
    })
    .webp({ quality: 80 })
    .toFile(outputPath);

  console.log("Converted:", outputPath);
}