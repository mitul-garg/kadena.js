import { AuthorList } from '@/components/AuthorList/AuthorList';
import { AuthorListItem } from '@/components/AuthorList/AuthorListItem';
import { AuthorProfileCard } from '@/components/AuthorProfileCard/AuthorProfileCard';
import { TitleHeader } from '@/components/Layout/components/TitleHeader/TitleHeader';
import {
  articleClass,
  contentClass,
  contentClassVariants,
} from '@/components/Layout/components/articleStyles.css';
import authorsData from '@/data/authors.json';
import { getPageConfig } from '@/utils/config';
import { getLatestBlogPostsOfAuthor } from '@/utils/getBlogPosts';
import type { IAuthorInfo, IPageProps } from '@kadena/docs-tools';
import { Card, Stack } from '@kadena/react-ui';
import classNames from 'classnames';
import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import React from 'react';

interface IProps extends IPageProps {
  authors: IAuthorInfo[];
}

const Home: FC<IProps> = ({ frontmatter, authors }) => {
  return (
    <>
      <TitleHeader title={frontmatter.title} subTitle={frontmatter.subTitle} />
      <div
        className={classNames(contentClass, contentClassVariants.home)}
        id="maincontent"
      >
        <article className={articleClass}>
          <Stack direction="column" gap="$2xl">
            <AuthorList>
              {authors.map((author) => (
                <AuthorListItem key={author.id}>
                  <Card fullWidth>
                    <AuthorProfileCard author={author} />
                  </Card>
                </AuthorListItem>
              ))}
            </AuthorList>
          </Stack>
        </article>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const authorsSortedByName = authorsData.sort((a, b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });

  const authors = await Promise.all(
    authorsSortedByName.map(async (author) => {
      return {
        ...author,
        posts: await getLatestBlogPostsOfAuthor(author),
      } as IAuthorInfo;
    }),
  );

  return {
    props: {
      ...(await getPageConfig({
        blogPosts: true,
        popularPages: '/',
        filename: __filename,
      })),
      authors,
      frontmatter: {
        title: 'BlogChain authors',
        menu: 'authors Overview',
        label: 'overview',
        order: 0,
        description: 'who is writing our blogchain posts?',
        layout: 'home',
      },
    },
  };
};

export default Home;
