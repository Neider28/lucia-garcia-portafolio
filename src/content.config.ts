import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
	work: defineCollection({
		// Load Markdown files in the src/content/work directory.
		loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
		schema: z
			.object({
				title: z.string(),
				description: z.string(),
				publishDate: z.coerce.date(),
				tags: z.array(z.string()),
				img: z.string().optional(),
				img_alt: z.string().optional(),
				video: z.string().optional(),
				video_alt: z.string().optional(),
				url: z.string().url().optional(),
			})
			.refine((data) => data.img || data.video, {
				message: 'Each work entry needs an img or video.',
			}),
	}),
};
