/**
 * Real figure imagery for each chapter. Prompts are sent to the text-to-image
 * endpoint at request time, so no binary assets are stored in the repo.
 */
const ENDPOINT = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image";

type ImageSize =
  | "square_hd"
  | "square"
  | "portrait_4_3"
  | "portrait_16_9"
  | "landscape_4_3"
  | "landscape_16_9";

function fig(prompt: string, size: ImageSize): string {
  return `${ENDPOINT}?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;
}

/** Shared warm, editorial photographic tone matching the desk/paper palette. */
export const figures = {
  product: fig(
    "Minimalist desktop workspace on a warm paper-toned desk, a laptop displaying a web browser being operated automatically by an unseen AI agent, soft oxide-orange accents, editorial product photography, muted warm tones, shallow depth of field, high detail",
    "landscape_16_9",
  ),
  company: fig(
    "Hangzhou West Lake cityscape at golden hour, warm muted tones, misty skyline with gentle hills, calm editorial travel photography",
    "landscape_4_3",
  ),
  download: fig(
    "Desktop computer showing a console window and a browser window side by side on a warm paper-toned desk, oxide-orange accents, editorial product photography, muted warm tones",
    "landscape_16_9",
  ),
};
