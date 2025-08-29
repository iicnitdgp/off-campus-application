import mongoose from "mongoose";
import Opportunity from "@/model/oppertunity";
import connectDB from "@/lib/db";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from './page.module.css';

export async function generateMetadata({ params }) {
  await connectDB();
  const opp = await Opportunity.findById(params.id);
  
  if (!opp) {
    return {
      title: 'Opportunity Not Found | IIC Off-Campus Placements - NIT Durgapur',
      description: 'The requested opportunity could not be found. Browse other available opportunities at NIT Durgapur.',
    };
  }
  
  const locations = Array.isArray(opp.officeLocation) ? opp.officeLocation.join(', ') : '';
  const deadline = opp.deadline ? new Date(opp.deadline).toLocaleDateString() : '';
  
  return {
    title: `${opp.title} at ${opp.company} | IIC Off-Campus Placements - NIT Durgapur`,
    description: `${opp.opportunityType} opportunity at ${opp.company}. ${locations ? `Locations: ${locations}. ` : ''}${deadline ? `Apply by: ${deadline}. ` : ''}${opp.jobDescription ? opp.jobDescription.substring(0, 150) + '...' : 'Apply now through NIT Durgapur IIC portal.'}`,
    keywords: `${opp.company}, ${opp.title}, ${opp.opportunityType}, NIT Durgapur, placement, internship, job, career`,
  };
}

export default async function OpportunityDetailPage({ params }) {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return (
      <div className="container">
        <div className={styles.errorContainer}>
          <h1>Invalid Opportunity ID</h1>
          <Link href="/" className="btn btn-primary">← Back to Home</Link>
        </div>
      </div>
    );
  }
  
  const opp = await Opportunity.findById(params.id).lean();
  if (!opp) {
    return (
      <div className="container">
        <div className={styles.errorContainer}>
          <h1>Opportunity not found</h1>
          <Link href="/" className="btn btn-primary">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.detailContainer}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> &gt; <Link href="/">Opportunities</Link> &gt; {opp.company}
        </div>
        
        <div className={styles.header}>
          <div className={styles.companyInfo}>
            <div className={styles.companyLogo}>
              {opp.companyImage ? (
                <Image 
                  src={opp.companyImage} 
                  alt={opp.company || 'Company logo'} 
                  width={80}
                  height={80}
                  className={styles.logoImage}
                />
              ) : (
                <div className={styles.logoPlaceholder}>
                  {opp.company.charAt(0)}
                </div>
              )}
            </div>
            <div className={styles.titleSection}>
              <h1 className={styles.jobTitle}>{opp.title}</h1>
              <h2 className={styles.companyName}>{opp.company}</h2>
              <div className={styles.opportunityType}>{opp.opportunityType}</div>
            </div>
          </div>
          
          {opp.applyLink && (
            <a 
              href={opp.applyLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.applyBtn}
            >
              Apply Now →
            </a>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <div className={styles.section}>
              <h3>Job Description</h3>
              <p className={styles.description}>{opp.jobDescription || 'No description provided'}</p>
            </div>

            <div className={styles.section}>
              <h3>Key Details</h3>
              <div className={styles.detailGrid}>
                {opp.officeLocation && opp.officeLocation.length > 0 && (
                  <div className={styles.detailItem}>
                    <span className={styles.icon}>📍</span>
                    <div>
                      <strong>Office Location</strong>
                      <p>{opp.officeLocation.join(', ')}</p>
                    </div>
                  </div>
                )}
                
                {opp.durationWeeks && (
                  <div className={styles.detailItem}>
                    <span className={styles.icon}>⏱️</span>
                    <div>
                      <strong>Duration</strong>
                      <p>{opp.durationWeeks} weeks</p>
                    </div>
                  </div>
                )}
                
                {opp.joiningDate && (
                  <div className={styles.detailItem}>
                    <span className={styles.icon}>🗓️</span>
                    <div>
                      <strong>Joining Date</strong>
                      <p>{new Date(opp.joiningDate).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                )}
                
                {opp.graduationYear && (
                  <div className={styles.detailItem}>
                    <span className={styles.icon}>🎓</span>
                    <div>
                      <strong>Graduation Year</strong>
                      <p>{opp.graduationYear}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {opp.compensation && (opp.compensation.ctc || opp.compensation.details) && (
              <div className={styles.section}>
                <h3>Compensation</h3>
                <div className={styles.compensationCard}>
                  {opp.compensation.ctc && <div className={styles.ctc}>💰 {opp.compensation.ctc}</div>}
                  {opp.compensation.details && <p>{opp.compensation.details}</p>}
                </div>
              </div>
            )}

            {opp.eligibility && (
              <div className={styles.section}>
                <h3>Eligibility Criteria</h3>
                <div className={styles.eligibilityCard}>
                  {opp.eligibility.cgpa && (
                    <div className={styles.eligibilityItem}>
                      <strong>Minimum CGPA:</strong> {opp.eligibility.cgpa}
                    </div>
                  )}
                  <div className={styles.eligibilityItem}>
                    <strong>Active Backlogs:</strong> {opp.eligibility.activeBacklogsAllowed ? 'Allowed' : 'Not Allowed'}
                  </div>
                  {opp.eligibility.departments && opp.eligibility.departments.length > 0 && (
                    <div className={styles.eligibilityItem}>
                      <strong>Eligible Departments:</strong> {opp.eligibility.departments.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={styles.sidebar}>
            <div className={styles.deadlineCard}>
              <h3>Application Deadline</h3>
              <div className={styles.deadline}>
                {opp.deadline ? (
                  <>
                    <div className={styles.deadlineDate}>
                      {new Date(opp.deadline).toLocaleDateString('en-IN')}
                    </div>
                    <div className={styles.deadlineTime}>
                      {new Date(opp.deadline).toLocaleTimeString('en-IN')}
                    </div>
                  </>
                ) : (
                  <div className={styles.noDeadline}>No deadline specified</div>
                )}
              </div>
            </div>

            {opp.contact && (opp.contact.name || opp.contact.email) && (
              <div className={styles.contactCard}>
                <h3>Contact Information</h3>
                <div className={styles.contactInfo}>
                  {opp.contact.name && (
                    <div className={styles.contactItem}>
                      <strong>Name:</strong> {opp.contact.name}
                    </div>
                  )}
                  {opp.contact.designation && (
                    <div className={styles.contactItem}>
                      <strong>Designation:</strong> {opp.contact.designation}
                    </div>
                  )}
                  {opp.contact.email && (
                    <div className={styles.contactItem}>
                      <strong>Email:</strong> 
                      <a href={`mailto:${opp.contact.email}`}>{opp.contact.email}</a>
                    </div>
                  )}
                  {opp.contact.phone && (
                    <div className={styles.contactItem}>
                      <strong>Phone:</strong> 
                      <a href={`tel:${opp.contact.phone}`}>{opp.contact.phone}</a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
