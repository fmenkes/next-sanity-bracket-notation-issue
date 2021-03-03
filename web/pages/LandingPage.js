import React from 'react'
import NextSeo from 'next-seo'
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import Layout from '../components/Layout'
import {getClient, usePreviewSubscription} from '../client'
import RenderSections from '../components/RenderSections'

console.log(getClient)

const builder = imageUrlBuilder(getClient(false))
const pageQuery = groq`
*[_type == "route" && slug.current == $slug][0]{
  page-> {
    ...,
    "test": test[$locale],
    "testDot": test.en,
    "locale": $locale,
    content[] {
      ...,
      cta {
        ...,
        route->
      },
      ctas[] {
        ...,
        route->
      }
    }
  }
}
`

const LandingPage = (props) => {
  const {data} = usePreviewSubscription(pageQuery, {
    initialData: props,
    enabled: props.slug === 'test',
    params: {locale: 'en', slug: props.slug}
  })

  console.log('Data:', data);

  const openGraphImages = props.openGraphImage
    ? [
      {
        url: builder.image(props.openGraphImage).width(800).height(600).url(),
        width: 800,
        height: 600,
        alt: props.title
      },
      {
        // Facebook recommended size
        url: builder.image(props.openGraphImage).width(1200).height(630).url(),
        width: 1200,
        height: 630,
        alt: props.title
      },
      {
        // Square 1:1
        url: builder.image(props.openGraphImage).width(600).height(600).url(),
        width: 600,
        height: 600,
        alt: props.title
      }
    ]
    : []

  return (
    <Layout config={props.config}>
      <NextSeo
        config={{
          title: props.title,
          titleTemplate: `${props.config.title} | %s`,
          description: props.description,
          canonical: props.config.url && `${props.config.url}/${props.slug}`,
          openGraph: {
            images: props.openGraphImages
          },
          noindex: props.disallowRobots
        }}
      />
      {data.page ? <RenderSections sections={data.page.content} /> : <RenderSections sections={props.content} /> }
      {props.slug === 'test' &&
      <>
        <div style={{marginLeft: '400px'}}>Preview mode with bracket notation: {data.page.test}</div>
        <div style={{marginLeft: '400px'}}>Preview mode with dot notation: {data.page.testDot}</div>
        <div style={{marginLeft: '400px'}}>Locale: {data.page.locale}</div>
      </>
      }
    </Layout>
  )
}
LandingPage.getInitialProps = ({query}) => {
  const {slug} = query
  console.log(query)
  if (!query) {
    console.error('no query')
    return
  }
  if (slug && slug !== '/') {
    return getClient(false)
      .fetch(pageQuery, {slug, locale: 'en'})
      .then((res) => ({...res, slug}))
  }

  // Frontpage
  if (slug && slug === '/') {
    return getClient(false)
      .fetch(
        groq`
        *[_id == "global-config"][0]{
          frontpage -> {
            ...,
            content[] {
              ...,
              cta {
                ...,
                route->
              },
              ctas[] {
                ...,
                route->
              }
            }
          }
        }
      `
      )
      .then((res) => ({...res.frontpage, slug}))
  }

  return null
}

export default LandingPage
