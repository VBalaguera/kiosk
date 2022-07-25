/* link sharing */
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share'

export default function SharingButtons({ url }) {
  return (
    <div>
      <EmailShareButton url={url}>
        <img
          src='../assets/icons/envelope-regular.svg'
          alt='read more'
          className='sharing-icon'
        />
      </EmailShareButton>
      <FacebookShareButton url={url}>
        {' '}
        <img
          src='../assets/icons/facebook-f-brands.svg'
          alt='read more'
          className='sharing-icon'
        />
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <img
          src='../assets/icons/linkedin-in-brands.svg'
          alt='read more'
          className='sharing-icon'
        />
      </LinkedinShareButton>
      <RedditShareButton url={url}>
        <img
          src='../assets/icons/reddit-brands.svg'
          alt='read more'
          className='sharing-icon'
        />
      </RedditShareButton>
      <TelegramShareButton url={url}>
        <img
          src='../assets/icons/telegram-brands.svg'
          alt='read more'
          className='sharing-icon'
        />
      </TelegramShareButton>
      <TwitterShareButton url={url}>
        <img
          src='../assets/icons/twitter-brands.svg'
          alt='read more'
          className='sharing-icon'
        />
      </TwitterShareButton>
    </div>
  )
}
