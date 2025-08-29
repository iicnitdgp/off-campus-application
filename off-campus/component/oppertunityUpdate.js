"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './styles/OpportunityUpdate.module.css';

export default function OpportunityUpdate() {
  const [isOpen, setIsOpen] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch all opportunities when component opens
  useEffect(() => {
    if (isOpen) {
      fetchOpportunities();
    }
  }, [isOpen]);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/oppertunity', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setOpportunities(data);
      } else {
        toast.error('Failed to fetch opportunities');
      }
    } catch (error) {
      toast.error('Error fetching opportunities');
    }
    setLoading(false);
  };

  const handleOpportunitySelect = (opportunity) => {
    setSelectedOpportunity(opportunity);
    // Pre-fill form with existing data
    setFormData({
      id: opportunity._id,
      company: opportunity.company || '',
      companyImage: opportunity.companyImage || '',
      title: opportunity.title || '',
      deadline: opportunity.deadline ? opportunity.deadline.split('T')[0] : '',
      officeLocation: Array.isArray(opportunity.officeLocation) ? opportunity.officeLocation.join(', ') : '',
      applyLink: opportunity.applyLink || '',
      jobDescription: opportunity.jobDescription || '',
      opportunityType: opportunity.opportunityType || '',
      durationWeeks: opportunity.durationWeeks || '',
      joiningDate: opportunity.joiningDate ? opportunity.joiningDate.split('T')[0] : '',
      graduationYear: opportunity.graduationYear || '',
      contactName: opportunity.contact?.name || '',
      contactEmail: opportunity.contact?.email || '',
      contactPhone: opportunity.contact?.phone || '',
      contactDesignation: opportunity.contact?.designation || '',
      ctc: opportunity.compensation?.ctc || '',
      compensationDetails: opportunity.compensation?.details || '',
      cgpa: opportunity.eligibility?.cgpa || '',
      activeBacklogsAllowed: opportunity.eligibility?.activeBacklogsAllowed || false,
      departments: Array.isArray(opportunity.eligibility?.departments) ? opportunity.eligibility.departments.join(', ') : '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch('/api/oppertunity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success('Opportunity updated successfully!');
        setSelectedOpportunity(null);
        setFormData({});
        fetchOpportunities(); // Refresh the list
      } else {
        const errorText = await res.text();
        toast.error(`Failed to update opportunity: ${errorText}`);
      }
    } catch (error) {
      toast.error('Error updating opportunity');
    }
    setUpdating(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOpportunity(null);
    setFormData({});
  };

  return (
    <>
      <button 
        className={styles.updateBtn}
        onClick={() => setIsOpen(true)}
      >
        📝 Update Events
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Update Opportunities</h2>
              <button className={styles.closeBtn} onClick={closeModal}>×</button>
            </div>

            {!selectedOpportunity ? (
              // List of opportunities
              <div className={styles.opportunityList}>
                <h3>Select an opportunity to update:</h3>
                {loading ? (
                  <div className={styles.loading}>Loading opportunities...</div>
                ) : (
                  <div className={styles.listContainer}>
                    {opportunities.length === 0 ? (
                      <div className={styles.emptyState}>No opportunities found</div>
                    ) : (
                      opportunities.map((opp) => (
                        <div 
                          key={opp._id} 
                          className={styles.opportunityItem}
                          onClick={() => handleOpportunitySelect(opp)}
                        >
                          <div className={styles.oppHeader}>
                            <h4>{opp.company}</h4>
                            <span className={styles.oppType}>{opp.opportunityType}</span>
                          </div>
                          <p className={styles.oppTitle}>{opp.title}</p>
                          <div className={styles.oppDetails}>
                            <span>📍 {Array.isArray(opp.officeLocation) ? opp.officeLocation.join(', ') : 'N/A'}</span>
                            <span>⏰ {opp.deadline ? new Date(opp.deadline).toLocaleDateString() : 'No deadline'}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ) : (
              // Update form
              <div className={styles.updateForm}>
                <div className={styles.formHeader}>
                  <button 
                    className={styles.backBtn}
                    onClick={() => setSelectedOpportunity(null)}
                  >
                    ← Back to List
                  </button>
                  <h3>Update: {selectedOpportunity.company} - {selectedOpportunity.title}</h3>
                </div>

                <form onSubmit={handleUpdateSubmit} className={styles.form}>
                  <div className={styles.formGrid}>
                    {/* Company Information */}
                    <fieldset className={styles.fieldset}>
                      <legend>Company Information</legend>
                      <div className={styles.inputGroup}>
                        <label>Company Name *</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Company Logo URL</label>
                        <input
                          type="url"
                          name="companyImage"
                          value={formData.companyImage}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Job Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Opportunity Type *</label>
                        <select
                          name="opportunityType"
                          value={formData.opportunityType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="Summer Internship">Summer Internship</option>
                          <option value="Winter Internship">Winter Internship</option>
                          <option value="Full Time">Full Time</option>
                          <option value="6M+FullTime">6M+FullTime</option>
                        </select>
                      </div>
                    </fieldset>

                    {/* Job Details */}
                    <fieldset className={styles.fieldset}>
                      <legend>Job Details</legend>
                      <div className={styles.inputGroup}>
                        <label>Office Locations (comma-separated)</label>
                        <input
                          type="text"
                          name="officeLocation"
                          value={formData.officeLocation}
                          onChange={handleInputChange}
                          placeholder="e.g., Mumbai, Delhi, Bangalore"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Apply Link *</label>
                        <input
                          type="url"
                          name="applyLink"
                          value={formData.applyLink}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Job Description</label>
                        <textarea
                          name="jobDescription"
                          value={formData.jobDescription}
                          onChange={handleInputChange}
                          rows="4"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Duration (weeks)</label>
                        <input
                          type="number"
                          name="durationWeeks"
                          value={formData.durationWeeks}
                          onChange={handleInputChange}
                          min="1"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Joining Date</label>
                        <input
                          type="date"
                          name="joiningDate"
                          value={formData.joiningDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Graduation Year</label>
                        <input
                          type="number"
                          name="graduationYear"
                          value={formData.graduationYear}
                          onChange={handleInputChange}
                          min="2020"
                          max="2030"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Application Deadline</label>
                        <input
                          type="date"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleInputChange}
                        />
                      </div>
                    </fieldset>

                    {/* Contact Information */}
                    <fieldset className={styles.fieldset}>
                      <legend>Contact Information</legend>
                      <div className={styles.inputGroup}>
                        <label>Contact Name</label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Contact Email</label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Contact Phone</label>
                        <input
                          type="tel"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Contact Designation</label>
                        <input
                          type="text"
                          name="contactDesignation"
                          value={formData.contactDesignation}
                          onChange={handleInputChange}
                        />
                      </div>
                    </fieldset>

                    {/* Compensation */}
                    <fieldset className={styles.fieldset}>
                      <legend>Compensation</legend>
                      <div className={styles.inputGroup}>
                        <label>CTC</label>
                        <input
                          type="text"
                          name="ctc"
                          value={formData.ctc}
                          onChange={handleInputChange}
                          placeholder="e.g., 10-12 LPA"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Compensation Details</label>
                        <textarea
                          name="compensationDetails"
                          value={formData.compensationDetails}
                          onChange={handleInputChange}
                          rows="2"
                        />
                      </div>
                    </fieldset>

                    {/* Eligibility */}
                    <fieldset className={styles.fieldset}>
                      <legend>Eligibility Criteria</legend>
                      <div className={styles.inputGroup}>
                        <label>Minimum CGPA</label>
                        <input
                          type="number"
                          name="cgpa"
                          value={formData.cgpa}
                          onChange={handleInputChange}
                          min="0"
                          max="10"
                          step="0.01"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Eligible Departments (comma-separated)</label>
                        <input
                          type="text"
                          name="departments"
                          value={formData.departments}
                          onChange={handleInputChange}
                          placeholder="e.g., CSE, ECE, EE"
                        />
                      </div>
                      <div className={styles.checkboxGroup}>
                        <label>
                          <input
                            type="checkbox"
                            name="activeBacklogsAllowed"
                            checked={formData.activeBacklogsAllowed}
                            onChange={handleInputChange}
                          />
                          Active Backlogs Allowed
                        </label>
                      </div>
                    </fieldset>
                  </div>

                  <div className={styles.submitSection}>
                    <button 
                      type="submit" 
                      className={styles.submitBtn}
                      disabled={updating}
                    >
                      {updating ? 'Updating...' : 'Update Opportunity'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
