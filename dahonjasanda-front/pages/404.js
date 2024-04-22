import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import lottie from 'lottie-web/build/player/lottie_light'

const NotFoundPage = () => {
  
  const animationContainer = useRef(null)

  useEffect(() => {
    if (animationContainer.current) {
      const animation = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/animation/city-guide-404.json'
      })

      return () => animation.destroy()
    }
  }, [])

  return (
    <>
      {/* Custom page title attribute */}
      <Head>
        <title>Finder | 404 Not Found</title>
      </Head>

      {/* Page content */}
      <main className='page-wrapper'>
        <section className='d-flex align-items-center min-vh-100 py-5 bg-secondary'>
          <Container className='d-flex justify-content-center text-center'>
            <Col xs={12} md={10} lg={8} className='px-0'>
              <div className='ratio ratio-16x9 mb-lg-5 mb-4'>
                <div ref={animationContainer}></div>
              </div>
              <h1 className='h3 pt-lg-4'>핸드폰을 보고 걸으신 겁니까???</h1>
              <p className='lead mb-5 pb-lg-2'>앞 좀 똑바로 보고 다니세욧!!!! </p>
              <Button as={Link} href='/' size='lg' variant='primary rounded-pill w-sm-auto w-100 mb-3'>당장 돌아가세욧!!!!</Button>
            </Col>
          </Container>
        </section>
      </main>
    </>
  )
}

export default NotFoundPage
