import { PageIntro } from '@/components/ui/PageIntro';
import { business } from '@/content/business';
import { pageMetadata } from '@/lib/metadata';
import styles from './privacy.module.css';

export const metadata = pageMetadata({
  title: 'Privacy',
  description: 'How the Browandlooks website handles your information.',
  path: '/privacy',
});

/* Describes what this site actually does today. Update it whenever analytics,
   forms, embeds or a booking widget are added. Should be reviewed before launch. */
export default function PrivacyPage() {
  return (
    <>
      <PageIntro label="Privacy" title="Your information, *plainly.*" />
      <div className={`container ${styles.body}`}>
        <p className={styles.updated}>Last updated 1 November 2026</p>

        <h2>What this website collects</h2>
        <p>
          This website does not use analytics, advertising trackers or tracking cookies, and it has no forms or
          accounts. We do not collect personal information through the site itself.
        </p>
        <p>
          Like most websites, the server that hosts this site may record standard technical information — such as your
          IP address, browser type and the pages requested — in short-lived logs used to keep the site running securely.
        </p>
        <p>
          The site remembers, for the length of your browser session only, that you have already seen the opening
          animation, so it is not replayed. This is stored in your browser and is never sent to us.
        </p>

        <h2>Booking and contacting us</h2>
        <p>
          When you call or email us, we use the details you give us only to arrange and manage your appointment.
          If we introduce an online booking service, its own privacy policy will apply to information you enter there,
          and this page will be updated to say so.
        </p>

        <h2>Questions</h2>
        <p>
          For any question about your information, contact us
          {business.email ? (
            <>
              {' '}at <a href={`mailto:${business.email.value}`}>{business.email.value}</a>
            </>
          ) : null}
          .
        </p>
      </div>
    </>
  );
}
