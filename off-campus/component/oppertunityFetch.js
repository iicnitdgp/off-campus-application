"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/OpportunityFetch.module.css';

export default function OpportunityFetch() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  
  const ITEMS_PER_PAGE = 18;

  useEffect(() => {
    async function fetchOpportunities() {
      setLoading(true);
      const res = await fetch('/api/oppertunity', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setOpportunities(data);
      }
      setLoading(false);
    }
    fetchOpportunities();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(opportunities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOpportunities = opportunities.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="loading">Loading opportunities...</div>;

  return (
    <div className={styles.opportunityContainer}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Off-Campus Opportunities</h2>
        <div className={styles.stats}>
          Showing {currentOpportunities.length} of {opportunities.length} opportunities (Page {currentPage} of {totalPages})
        </div>
      </div>

      {opportunities.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📋</div>
          <h3>No opportunities found</h3>
          <p>Check back later for new job openings and internships</p>
        </div>
      ) : (
        <>
          <div className={styles.opportunityGrid}>
            {currentOpportunities.map(opp => (
              <div 
                key={opp._id} 
                className={styles.opportunityCard} 
                onClick={() => router.push(`/oppertunity/${opp._id}`)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.companyLogo}>
                    {opp.companyImage ? (
                      <img src={opp.companyImage} alt={opp.company} />
                    ) : (
                      <div className={styles.logoPlaceholder}>
                        {opp.company ? opp.company.charAt(0).toUpperCase() : '?'}
                      </div>
                    )}
                  </div>
                  <div className={styles.opportunityType}>
                    {opp.opportunityType}
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.companyName}>{opp.company || 'Unknown Company'}</h3>
                  <h4 className={styles.jobTitle}>{opp.title || 'No title'}</h4>
                  
                  {opp.officeLocation && opp.officeLocation.length > 0 && (
                    <div className={styles.location}>
                      📍 {opp.officeLocation.join(', ')}
                    </div>
                  )}
                  
                  <div className={styles.deadline}>
                    ⏰ Apply by: {opp.deadline ? new Date(opp.deadline).toLocaleDateString('en-IN') : 'N/A'}
                  </div>
                  
                  {opp.compensation?.ctc && (
                    <div className={styles.compensation}>
                      💰 {opp.compensation.ctc}
                    </div>
                  )}
                </div>
                
                <div className={styles.cardFooter}>
                  <span className={styles.viewDetails}>View Details →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              
              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`${styles.pageBtn} ${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button 
                className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
