export default function PrivacyPolicy() {
  return (
    <div className="mx-auto h-full w-[900px] px-containerDesktop py-10">
      <h2 className="text-center text-3xl font-bold">Privacy policy</h2>

      <ol className="my-10 list-inside list-decimal leading-relaxed">
        <li>
          <span className="mb-8 inline-block text-xl font-medium">
            Information Collection
          </span>{' '}
          <br /> We collect and store the following user information from
          authentication providers:{' '}
          <ul className="mt-[10px] list-inside list-disc">
            <li>Name</li>
            <li>Email</li>
            <li>Profile picture</li>
          </ul>
        </li>
        <li>
          <span className="my-8 inline-block text-xl font-medium">
            Use of information
          </span>{' '}
          <br />
          We use the collected information to provide and improve our services,
          including user account management and communication.
        </li>
        <li>
          <span className="my-8 inline-block text-xl font-medium">
            Data Security
          </span>{' '}
          <br />
          We take reasonable measures to protect your data, but no method of
          transmission over the internet or electronic storage is entirely
          secure. We cannot guarantee the absolute security of your data.
        </li>
        <li>
          <span className="my-8 inline-block text-xl font-medium">
            Data Sharing
          </span>{' '}
          <br />
          We will not sell or share your data with third parties, except as
          required by law or as necessary to provide the services offered by the
          App.
        </li>
        <li>
          <span className="my-8 inline-block text-xl font-medium">
            Contact Information
          </span>{' '}
          <br />
          If you have any questions or concerns about this Privacy Policy or the
          Terms of Service, please contact us at{' '}
          <a className="underline" href="mailto:samuelbreznjak35@gmail.com">
            samuelbreznjak35@gmail.com
          </a>
        </li>
      </ol>
    </div>
  )
}
