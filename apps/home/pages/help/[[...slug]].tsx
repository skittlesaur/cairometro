import EnjoyYourJourney from '@/components/help/enjoy-your-journey'
import HelpLayout from '@/layouts/help-layout'

import fs from 'fs'
import matter from 'gray-matter'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import path from 'path'
import RemarkAutoLinkHeadings from 'rehype-autolink-headings'
import RemarkExternalLinks from 'remark-external-links'
import RemarkSlug from 'remark-slug'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any
  frontMatter: {
    title: string
    description: string
  }
}

const components = {
  EnjoyYourJourney,
}

const HelpPage = ({ source, frontMatter }: Props) => {
  return (
    <HelpLayout
      title={frontMatter.title}
    >
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
      />
      <MDXRemote
        {...source}
        components={components}
      />
    </HelpLayout>
  )
}

export const getStaticProps = async ({ locale, params }: { locale: string, params: { slug: string[] } }) => {
  const source = fs.readFileSync(path.join('help', ...params.slug, `${locale}.mdx`))

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        RemarkSlug, RemarkExternalLinks, RemarkAutoLinkHeadings,
      ],
    },
    scope: data,
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  const files = new Set<string>()
  
  const walkSync = (dir: string, filelist: string[] = []) => {
    fs.readdirSync(dir).forEach((file) => {
      const dirFile = path.join(dir, file)
      try {
        filelist = walkSync(dirFile, filelist)
        // eslint-disable-next-line
      } catch (err: any) {
        if (err.code === 'ENOTDIR' || err.code === 'EBUSY') filelist = [...filelist, dirFile]
        else throw err
      }
    })
    return filelist
  }

  walkSync('help').forEach((file) => {
    files.add(file)
  })

  const paths = Array.from(files).map(((file) => {
    const slug = file
      .replace(/help\/|\.mdx/g, '')
      .replace(/\/en|\/ar/g, '')
      .split('/')
    return {
      params: { slug },
    }
  }))

  return {
    paths,
    fallback: false,
  }
}

export default HelpPage