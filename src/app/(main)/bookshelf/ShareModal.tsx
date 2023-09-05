'use client'

import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share'
import { BiLogoFacebook, BiLogoReddit, BiLogoTwitter } from 'react-icons/bi'
import Button from '@/components/Button'

export default function ShareModal() {
  return (
    <div>
      <h2 className="text-center text-xl font-bold">Share this bookshelf</h2>

      <div className="mt-8 flex w-[200px] justify-between">
        <FacebookShareButton
          quote="Check this list of books on my bookshelf!"
          url={location.href}
        >
          <Button className="p-[10px]" variant={'cta'}>
            <BiLogoFacebook className="h-8 w-8" />
          </Button>
        </FacebookShareButton>
        <RedditShareButton
          title="Check this list of books on my bookshelf!"
          url={location.href}
        >
          <Button className="p-[10px]" variant={'cta'}>
            <BiLogoReddit className="h-8 w-8" />
          </Button>
        </RedditShareButton>
        <TwitterShareButton
          title="Check this list of books on my bookshelf!"
          url={location.href}
        >
          <Button className="p-[10px]" variant={'cta'}>
            <BiLogoTwitter className="h-8 w-8" />
          </Button>
        </TwitterShareButton>
      </div>
    </div>
  )
}
