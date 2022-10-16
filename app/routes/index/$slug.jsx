import { json } from '@remix-run/node';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { useLoaderData, Link } from '@remix-run/react';
import { marked } from 'marked';

export const loader = async ({ params }) => {
  const notion = new Client({
    auth: process.env.TOKEN,
  });

  // passing notion client to the option
  const n2m = new NotionToMarkdown({ notionClient: notion });

  const postID = params.slug;

  const postProperties = await notion.pages.retrieve({ page_id: postID });

  const mdblocks = await n2m.pageToMarkdown(postID);
  const mdString = n2m.toMarkdownString(mdblocks);
  const html = marked(mdString);

  return json({ postProperties, postContent: html });
};

export default function Slug() {
  const { postProperties, postContent } = useLoaderData();

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="relative w-full h-80 md:h-96 flex flex-col items-center">

        <img
          className="w-full h-full absolute top-0 left-0 object-cover filter brightness-50"
          src={postProperties?.cover?.external?.url}
          alt="cover"
        />

        <div className="relative w-full h-full max-w-screen-md">
          <span className="absolute -bottom-8 left-0 px-4 md:px-8 text-7xl">
            {postProperties?.icon?.emoji}
          </span>
          <span>
            <h1 className="absolute bottom-12 left-0 px-4 md:px-8 z-10 text-5xl md:text-7xl text-white font-bold">
              {postProperties?.properties?.Name?.title?.map(
                (titlePart) => titlePart?.text.content,
              )}
            </h1>
          </span>
        </div>

      </div>

      <div className="px-4 md:px-8 py-12 md:py-16 flex flex-col w-full max-w-screen-md leading-8 text-slate-800 text-base md:text-lg prose">
        <Link
          to="/"
          className="flex items-center font-bold gap-2 text-lg transition-opacity duration-300 ease-in-out hover:opacity-60"
        >
          <svg className="h-5 object-contain" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Home</span>
        </Link>
        <p>
          {postProperties?.properties?.description?.rich_text?.map(
            (titlePart) => titlePart?.plain_text,
          )}
        </p>

        <div
        // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: postContent }}
        />
      </div>
    </div>
  );
}
