/* eslint-disable react/no-unescaped-entities */
import { Client } from '@notionhq/client';
import { useLoaderData } from '@remix-run/react';

export async function loader() {
  const notion = new Client({
    auth: process.env.TOKEN,
  });

  const getPosts = async () => {
    const response = await notion.databases.query({
      database_id: process.env.DBID,
    });
    return response;
  };
  return getPosts();
}

export default function Index() {
  const { results: posts } = useLoaderData();

  return (
    <div className="bg-light-base text-black min-h-screen px-4 md:px-8 py-12 md:py-24 flex flex-col justify-start items-center">
      <div className="max-w-screen-lg w-full flex flex-col gap-12 md:gap-16">
        <div>
          <h1 className="text-7xl w-full font-medium">
            Elvis's Blog
          </h1>
          <p className="font-light">
            Powered by
            {' '}
            <b className="font-semibold">Notion</b>
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map(({ cover, id, properties }) => (
            <a href={`/${id}`} key={id} className="shadow-md rounded-lg overflow-hidden">
              <img src={cover?.external?.url} className="aspect-video object-cover w-full" alt="cover" />
              <div className="p-4 flex flex-col gap-2">
                <h5 className="text-xl md:text-2xl font-medium">
                  {properties?.Name?.title?.map(
                    (titlePart) => titlePart?.text.content,
                  )}
                </h5>
                <p className="text-gray-700 leading-6">
                  {properties?.description?.rich_text?.map(
                    (titlePart) => titlePart?.plain_text,
                  )}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
