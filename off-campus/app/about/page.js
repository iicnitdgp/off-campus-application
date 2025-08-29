import React from 'react';
import styles from './about.module.css';

export const metadata = {
  title: "About IIC | Institution's Innovation Council - NIT Durgapur",
  description: "Learn about the Institution's Innovation Council (IIC) at NIT Durgapur - fostering innovation, incubation, and entrepreneurship while managing off-campus placement opportunities.",
  keywords: "IIC NIT Durgapur, Institution Innovation Council, innovation, incubation, entrepreneurship, off-campus placements, technology verticals",
};

const AboutPage = () => {
  const technologicalVerticals = [
    {
      title: "Industry 4.0",
      description: "Industry 4.0 integrates AI, IoT, and automation to create smart factories, enhancing productivity, real-time decision-making, and seamless communication between machines, systems, and humans.",
      icon: "🏭"
    },
    {
      title: "Robotics and AI",
      description: "Robotics and AI work together to create smart machines that automate tasks, learn from data, and improve efficiency across industries through precision, speed, and adaptability.",
      icon: "🤖"
    },
    {
      title: "Quantum Innovation",
      description: "Quantum innovation uses the science of very tiny particles to make super-fast computers, safer ways to share information, and new tools for science and technology.",
      icon: "⚛️"
    },
    {
      title: "Semiconductor Technology",
      description: "Semiconductor technology powers electronic devices like phones and computers by controlling electricity flow, making them faster, smaller, and more efficient for everyday use.",
      icon: "💾"
    },
    {
      title: "E-mobility",
      description: "E-mobility means using electric vehicles like e-bikes and cars. It helps reduce pollution, saves fuel, and creates a cleaner, greener way to travel every day.",
      icon: "🔋"
    },
    {
      title: "IoT",
      description: "The Internet of Things (IoT) connects everyday devices like lights, fans, and TVs to the internet, letting them work smartly and talk to each other.",
      icon: "🌐"
    },
    {
      title: "Additive Manufacturing and 3D Printing",
      description: "Additive manufacturing, or 3D printing, builds objects layer by layer using digital designs. It helps make parts quickly, saves material, and allows custom shapes easily.",
      icon: "🖨️"
    },
    {
      title: "Healthcare Technology",
      description: "Healthcare technology uses machines, apps, and smart tools to help doctors treat patients better, track health easily, and improve care with faster and safer methods.",
      icon: "🏥"
    },
    {
      title: "Green and Clean Energy",
      description: "Green and clean energy comes from natural sources like sunlight, wind, and water. It reduces pollution and helps keep the Earth safe and healthy for everyone.",
      icon: "🌱"
    },
    {
      title: "Cyber Security and Blockchain",
      description: "Cybersecurity protects computers and data from hackers. Blockchain safely stores information in digital blocks, making online transactions more secure, honest, and harder to change or hack.",
      icon: "🔒"
    }
  ];

  return (
    <div className={styles.aboutPage}>
      <div className="container">
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Institution&apos;s Innovation Council</h1>
            <h2 className={styles.heroSubtitle}>Innovation & Incubation Cell</h2>
            <p className={styles.heroDescription}>
              Empowering visionaries to cultivate excellence while guiding future generations toward sustainable growth and innovation.
            </p>
            <div className={styles.motto}>
              <h3>Motto Of IIC: 3I</h3>
              <div className={styles.mottoItems}>
                <span>Innovation</span>
                <span>IPR</span>
                <span>Incubation</span>
              </div>
            </div>
          </div>
        </section>

        {/* About IIC Section */}
        <section className={styles.aboutSection}>
          <div className={styles.sectionHeader}>
            <h2>About IIC</h2>
            <div className={styles.buildingInfo}>
              <span className={styles.buildingName}>📍 Utkarsh Bhavan</span>
            </div>
          </div>
          
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <h3>Institution&apos;s Innovation Council</h3>
              <p>
                The Institution&apos;s Innovation Council (IIC) is dedicated to fostering a vibrant culture of innovation and incubation among faculty and students at NIT Durgapur. Our mission is to drive creativity and entrepreneurial spirit, resulting in the establishment of successful startups. These ventures, promoted and owned by our talented faculty and students, showcase the innovative potential and collaborative efforts within our community.
              </p>
              <p>
                By fostering collaboration and a proactive mindset, the IIC is dedicated to making NIT Durgapur a hub of innovation, where ideas are turned into reality, and the next generation of entrepreneurs is born.
              </p>
            </div>
          </div>
        </section>

        {/* Off-Campus Placements Section */}
        <section className={styles.placementSection}>
          <div className={styles.sectionHeader}>
            <h2>Off-Campus Placement Initiative</h2>
          </div>
          <div className={styles.placementContent}>
            <div className={styles.placementGrid}>
              <div className={styles.placementCard}>
                <div className={styles.cardIcon}>🎯</div>
                <h3>Our Mission</h3>
                <p>To bridge the gap between talented students and industry opportunities by facilitating off-campus placement drives and career guidance.</p>
              </div>
              <div className={styles.placementCard}>
                <div className={styles.cardIcon}>🤝</div>
                <h3>Industry Connect</h3>
                <p>Building strong partnerships with leading companies to provide diverse career opportunities for our students across various domains.</p>
              </div>
              <div className={styles.placementCard}>
                <div className={styles.cardIcon}>📈</div>
                <h3>Student Success</h3>
                <p>Empowering students with the right opportunities, guidance, and platform to launch successful careers in their chosen fields.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technological Verticals Section */}
        <section className={styles.verticalsSection}>
          <div className={styles.sectionHeader}>
            <h2>Technological Verticals of IIC</h2>
            <p>The following are key activities involved in the Institution&apos;s Innovation Council (IIC):</p>
          </div>
          
          <div className={styles.verticalsGrid}>
            {technologicalVerticals.map((vertical, index) => (
              <div key={index} className={styles.verticalCard}>
                <div className={styles.verticalIcon}>{vertical.icon}</div>
                <h3 className={styles.verticalTitle}>{vertical.title}</h3>
                <p className={styles.verticalDescription}>{vertical.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <div className={styles.contactContent}>
            <h2>Get in Touch</h2>
            <p>Have questions about off-campus opportunities or want to collaborate with IIC?</p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <span>iic@nitdgp.ac.in</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span>Utkarsh Bhavan, NIT Durgapur</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
