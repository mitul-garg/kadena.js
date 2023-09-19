import { BlogListWrapper } from '@/components/BlogList';
import {
  articleClass,
  contentClass,
  contentClassVariants,
  TitleHeader,
} from '@/components/Layout/components';
import { getInitBlogPosts } from '@/hooks/useGetBlogs/utils';
import type { IMenuData, IPageProps, ITag } from '@/types/Layout';
import { getAllBlogTags } from '@/utils';
import {
  checkSubTreeForActive,
  getPathName,
} from '@/utils/staticGeneration/checkSubTreeForActive.mjs';
import { getData } from '@/utils/staticGeneration/getData.mjs';
import classNames from 'classnames';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import React from 'react';

interface IProps extends IPageProps {
  posts: IMenuData[];
  tagId: string;
}

const Home: FC<IProps> = ({ posts, frontmatter, tagId }) => {
  return (
    <>
      <TitleHeader title={frontmatter.title} icon={frontmatter.icon} />
      <div
        className={classNames(contentClass, contentClassVariants.home)}
        id="maincontent"
      >
        <article className={articleClass}>
          <BlogListWrapper tagId={tagId} initPosts={posts} />
        </article>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  getAllBlogTags();
  return {
    paths: getAllBlogTags().map((tag: ITag) => ({
      params: { tagId: tag.tag },
    })),
    fallback: false, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps<{}, { tagId: string }> = async (
  ctx,
) => {
  const tagId = ctx.params?.tagId;

  const posts = getInitBlogPosts(getData() as IMenuData[], 0, 10, { tagId });

  return {
    props: {
      leftMenuTree: checkSubTreeForActive(getPathName(__filename)),
      posts,
      tagId,
      frontmatter: {
        title: `tag: ${tagId}`,
        menu: tagId,
        label: tagId,
        order: 0,
        layout: 'home',
        icon: 'Concepts',
      },
    },
  };
};

export default Home;