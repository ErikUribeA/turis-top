'use client';
import DestinationCard from '@/components/card/DestinationCard';
import styles from './Home.module.scss';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import { useTheme } from '../context/ThemeContext'; // Importa el hook useTheme
import TurisBotMain from "@/components/buttons/TurisBotMain";
export default function Home() {
  const t = useTranslations('home');
  const tr = useTranslations('footer');
  const { theme } = useTheme();
  return (
    <>
      <div className={`${styles.home} ${theme === 'dark' ? styles.dark : styles.light}`}>
        <main className={styles.main}>
          {/* Sección de héroe */}
          <section className={styles.hero}>
            <Image
              src="/images/colombia_landscape.jpg"
              alt="Beautiful landscape of Colombia"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className={styles["hero-overlay"]}>
              <div className={styles["hero-content"]}>
                <h1>{t("title")}</h1>
                <p>{t("parragraph")}</p>
                <button className={styles["start-journey-button"]}>
                  {t("messageBegin")}
                </button>
              </div>
            </div>
          </section>

          {/* Sección de destinos */}
          <section id="destinations" className={`${styles.destinations} ${theme === 'dark' ? styles.dark : styles.light}`}>
            <div className={styles.container}>
              <h2>{t("destinations")}</h2>
              <div className={styles["destination-grid"]}>
                {["Santa Fé de Antioquia", "Medellín", "Guatapé"].map(
                  (city) => (
                    <DestinationCard
                      key={city}
                      city={city}
                      imageSrc={`/images/${city}.jpg`}
                      altText={`View of ${city}`}
                    />
                  )
                )}
              </div>
            </div>
          </section>

          {/* Sección "about" */}
          <section id="about" className={`${styles.about} ${theme === 'dark' ? styles.dark : styles.light}`}>
            <div className={styles.container}>
              <h2>
                {t("subtitle-1")} <span>{t("subtitle-2")}</span>?
              </h2>
              <div className={styles.grid}>
                {[
                  {
                    title: t("cardTitle-1"),
                    description: t("cardDescription-1"),
                  },
                  {
                    title: t("cardTitle-2"),
                    description: t("cardDescription-2"),
                  },
                  {
                    title: t("cardTitle-3"),
                    description: t("cardDescription-3"),
                  },
                ].map((item) => (
                  <div key={item.title} className={styles.card}>
                    <div className={styles["card-content"]}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <TurisBotMain
            imageUrl="/images/turisbot.png?height=400&width=400"
            welcomeMessage={t("turisbot")}
          />
        </main>

        {/* Footer */}
        <footer className={`${styles.footer} ${theme === 'dark' ? styles.dark : styles.light}`}>
          <div className={styles.container}>
            <div className={styles["footer-grid"]}>
              {/* Links rápidos */}
              <div>
                <h3>{tr("links.title")}</h3>
                <ul>
                  <li>
                    <a href="#">{tr("links.home")}</a>
                  </li>
                  <li>
                    <a href="#destinations">{tr("links.destinations")}</a>
                  </li>
                  <li>
                    <a href="#about">{tr("links.aboutUs")}</a>
                  </li>
                  <li>
                    <a href="#">{tr("links.contact")}</a>
                  </li>
                </ul>
              </div>
              {/* Redes sociales */}
              <div>
                <h3>{tr("follow.subtitle")}</h3>
                <div className={styles["social-links"]}>
                  <a href="#">{tr("follow.facebook")}</a>
                  <a href="#">{tr("follow.twitter")}</a>
                  <a href="#">{tr("follow.instagram")}</a>
                </div>
              </div>
            </div>
            {/* Newsletter */}
            <div>
              <h3>{tr("newsletter.title")}</h3>
              <p>{tr("newsletter.parragraph")}</p>
              <div className={styles["newsletter-input"]}>
                <input type="email" placeholder={tr("newsletter.email")} />
                <button>{tr("newsletter.subscribe")}</button>
              </div>
            </div>
            <div className={styles["footer-bottom"]}>
              <p>&copy; {new Date().getFullYear()}{tr("newsletter.rights")}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
