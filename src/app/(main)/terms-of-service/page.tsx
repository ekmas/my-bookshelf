import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of service',
}

export default function TermsOfService() {
  return (
    <div className="mx-auto h-full w-full max-w-[900px] px-containerDesktop py-10">
      <h2 className="text-center text-3xl font-bold m500:text-xl">
        Terms of service
      </h2>

      <ol className="my-10 list-inside list-decimal leading-relaxed m500:text-sm">
        <li>
          <span className="mb-8 inline-block text-xl font-medium m500:mb-6 m500:text-lg">
            Acceptance of Terms
          </span>{' '}
          <br /> By using the My-Bookshelf web app ("the App"), you agree to
          comply with and be bound by these Terms of Service ("Terms"). If you
          do not agree to these Terms, please do not use the App.
        </li>
        <li>
          <span className="my-8 inline-block text-xl font-medium m500:mb-6 m500:text-lg">
            User Conduct
          </span>{' '}
          <br />
          You agree not to use the App for any unlawful or prohibited purpose
          and to comply with all applicable laws and regulations.
        </li>
        <li>
          <span className="my-8 inline-block text-xl font-medium m500:mb-6 m500:text-lg">
            Termination
          </span>{' '}
          <br />
          We reserve the right to terminate or suspend your account and access
          to the App at our discretion, without notice, for any violation of
          these Terms.
        </li>
        <li>
          <span className="my-8 inline-block text-xl font-medium m500:mb-6 m500:text-lg">
            Limitation of Liability
          </span>{' '}
          <br />
          We are not responsible for any direct, indirect, incidental,
          consequential, or punitive damages arising from your use of the App.
        </li>
        <li>
          <span className="my-8 inline-block text-xl font-medium m500:mb-6 m500:text-lg">
            Changes to Terms
          </span>{' '}
          <br />
          We may update these Terms from time to time, and any changes will be
          effective upon posting. Your continued use of the App after such
          changes constitutes acceptance of the updated Terms.
        </li>
      </ol>
    </div>
  )
}
