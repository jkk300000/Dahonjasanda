import dynamic from 'next/dynamic'
import Link from 'next/link'
import Dropdown from 'react-bootstrap/Dropdown'

const CardImage = dynamic(() => import('./MyCardImage'))
const CardImageSlider = dynamic(() => import('../../../components/partials/CardImageSlider'))

const PartyCard = ({
  images,
  href,
  title,
  year,
  location,
  price,
  badges,
  wishlistButton,
  checkbox,
  dropdown,
  footer,
  horizontal,
  light,
  className,
  subgroupId,
  isInterested,
  isLoggedIn,
  ...props
}) => {
  
  const horizontalClass = horizontal ? ' card-horizontal' : '',
        extraClass = className ? ` ${className}` : ''

  return (
    <div
      {...props}
      className={light ? `card card-light card-hover${horizontalClass}${extraClass}` : `card card-hover shadow-sm border-0${horizontalClass}${extraClass}`}
    >
      {images && <>
        {images.length > 1 ? 
          <CardImageSlider
            horizontal={horizontal ? true : false}
            images={images}
            href={href}
            badges={badges}
            wishlistButton={wishlistButton}
            light={light ? 1 : 0}
          /> :
          <CardImage
          isLoggedIn={isLoggedIn}
            horizontal={horizontal ? true : false}
            images={images}
            href={href}
            badges={badges}
            wishlistButton={wishlistButton}
            light={light ? 1 : 0}
          />
        }
      </>}
      <div className='card-body' onClick={() => window.location.href=`/party/${subgroupId}`}>
        <div className='d-flex align-items-center justify-content-between'>
          {year && <span className={`fs-sm${light ? ' text-light' : ''} me-3`}>
            {year}
          </span>}
          {dropdown ? <Dropdown className='mt-n1 me-n2'>
          </Dropdown> : checkbox && <div className={`form-check${light ? ' form-check-light' : ''}`}>
            <label className='form-check-label'>
              <input {...checkbox.props} type='checkbox' className='form-check-input' />
              <span className='fs-sm'>{checkbox.label}</span>
            </label>
          </div>}
        </div>
        {title && <h3 className='h6 mb-1'>
          {href ? <Link href={href} className={light ? 'nav-link-light' : 'nav-link'}>
            {title}
          </Link> : <span className={light ? 'text-light' : ''}>
            {title}
          </span>}
        </h3>}
        {price && <div className='text-primary fw-bold'>{price}</div>}
        {location && <div className={`fs-sm${light ? ' text-light opacity-70' : ''}`}>
          <i className='fi-map-pin me-1'></i>
          {location}
        </div>}
      </div>
      {!horizontal && <>
        {footer && 
            (<div className='m-3'>{footer}</div>)
        }
      </>}
    </div>
  )
}

export default PartyCard
