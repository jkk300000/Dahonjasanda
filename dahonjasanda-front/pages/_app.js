import SSRProvider from 'react-bootstrap/SSRProvider'
import Router from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'
import ScrollTopButton from '../components/ScrollTopButton'
import './board/globals.css'
import '../scss/theme.scss'

const Finder = ({ Component, pageProps }) => {

  // Bind NProgress to Next Router events (Page loading animation)
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>다혼자산다 </title>
        <meta name='description' content='Finder - Directory &amp; Listings React / Next.js Bootstrap Template' />
        <meta name='keywords' content='react, nextjs, bootstrap, business, directory, listings, e-commerce, car dealer, city guide, real estate, job board, user account, multipurpose, ui kit, css3, javascript, gallery, slider, touch' />
        <meta name='author' content='Createx Studio' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon/logo.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon/logo.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon/logo.png' />
        <link rel='manifest' href='/favicon/logo.png' />
        <link rel='mask-icon' color='#5bbad5' href='/favicon/logo.png' />
        <meta name='msapplication-TileColor' content='#766df4' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      
      <Component {...pageProps} />
      
      <ScrollTopButton
        showOffset={600}
        duration={800}
        easing='easeInOutQuart'
        tooltip='Top'
      />
    </SSRProvider>
  )
}

export default Finder
