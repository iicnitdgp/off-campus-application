import React from 'react'
import OpportunityFetch from '@/component/oppertunityFetch'
import styles from './page.module.css'

export const metadata = {
  title: "IIC Off-Campus Placements | NIT Durgapur",
  description: "Gateway to exciting off-campus opportunities and internships at NIT Durgapur. Discover career opportunities from top companies and stay updated with latest placement drives.",
  keywords: "NIT Durgapur, off-campus placement, internship, job opportunities, career, IIC, Industrial Interaction Cell, placement portal",
  openGraph: {
    title: "IIC Off-Campus Placements | NIT Durgapur",
    description: "Gateway to exciting off-campus opportunities and internships at NIT Durgapur",
    type: "website",
  },
};

const page = () => {
  return (
    <div className={styles.homePage}>
      <div className="container">
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Off-Campus Placement Opportunities
          </h1>
          <p className={styles.heroSubtitle}>
            Discover exciting career opportunities and internships from top companies. 
            Stay updated with the latest placement drives and build your future.
          </p>
        </section>
        
        <section className={styles.opportunitiesSection}>
          <div className={styles.sectionHeader}>
            <h2>Latest Opportunities</h2>
            <p>Explore the newest job openings and internship programs</p>
          </div>
          <OpportunityFetch />
        </section>
      </div>
    </div>
  )
}

export default page
