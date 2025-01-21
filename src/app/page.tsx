'use client';
import DestinationCard from '@/components/card/DestinationCard';
import styles from './Home.module.scss';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className={styles.home}>
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
            <div className={styles['hero-overlay']}>
              <div className={styles['hero-content']}>
                <h1>Discover Colombia</h1>
                <p>Experience the magic of South America hidden gem</p>
                <button className={styles['start-journey-button']}>Start Your Journey</button>
              </div>
            </div>
          </section>

          {/* Sección de destinos */}
          <section id="destinations" className={styles.destinations}>
            <div className={styles.container}>
              <h2>Featured Destinations</h2>
              <div className={styles['destination-grid']}>
                {["Cartagena", "Medellín", "Bogotá"].map((city) => (
                  <DestinationCard
                    key={city}
                    city={city}
                    imageSrc={`/images/${city}.jpg`}
                    altText={`View of ${city}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Sección "about" */}
          <section id="about" className={styles.about}>
            <div className={styles.container}>
              <h2>
                Why <span>Colombia</span>?
              </h2>
              <div className={styles.grid}>
                {[
                  {
                    title: 'Rich Culture',
                    description: 'Experience vibrant traditions and warm hospitality',
                  },
                  {
                    title: 'Diverse Landscapes',
                    description: 'From Caribbean beaches to Andean mountains',
                  },
                  {
                    title: 'Culinary Delights',
                    description: 'Savor unique flavors and local specialties',
                  },
                ].map((item) => (
                  <div key={item.title} className={styles.card}>
                    <div className={styles['card-content']}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className={styles['footer-grid']}>
              {/* Links rápidos */}
              <div>
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#destinations">Destinations</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
              {/* Redes sociales */}
              <div>
                <h3>Follow Us</h3>
                <div className={styles['social-links']}>
                  <a href="#">Facebook</a>
                  <a href="#">Twitter</a>
                  <a href="#">Instagram</a>
                </div>
              </div>

            </div>
            {/* Newsletter */}
            <div>
              <h3>Newsletter</h3>
              <p>Stay updated with our latest offers and news</p>
              <div className={styles['newsletter-input']}>
                <input type="email" placeholder="Your email" />
                <button>Subscribe</button>
              </div>
            </div>
            <div className={styles['footer-bottom']}>
              <p>&copy; 2023 TurisTop. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
