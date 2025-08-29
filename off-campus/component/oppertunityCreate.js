import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './styles/OpportunityCreate.module.css';

const initialState = {
  title: '',
  company: '',
  companyImage: '',
  officeLocation: '',
  applyLink: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactDesignation: '',
  jobDescription: '',
  opportunityType: '',
  durationWeeks: '',
  joiningDate: '',
  graduationYear: '',
  ctc: '',
  compensationDetails: '',
  cgpa: '',
  activeBacklogsAllowed: false,
  departments: '',
  deadline: '',
};

export default function OpportunityCreate() {
  const [form, setForm] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/oppertunity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (response.status === 401) {
        toast.error('You must be logged in to post an opportunity.');
        setLoading(false);
        return;
      }
      if (!response.ok) throw new Error('Network response was not ok');
      toast.success('Opportunity created successfully!');
      setForm(initialState);
      setShowModal(false);
    } catch (e) {
      toast.error('Failed to create opportunity');
    }
    setLoading(false);
  };

  return (
    <>
      <button className={styles.createBtn} onClick={() => setShowModal(true)}>
        + Post New Opportunity
      </button>
      
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Create Off-Campus Opportunity</h2>
              <button 
                className={styles.closeBtn} 
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Job Title *
                    <input 
                      name="title" 
                      value={form.title} 
                      onChange={handleChange} 
                      required 
                      className={styles.input}
                      placeholder="e.g. Software Engineer"
                    />
                  </label>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Company *
                    <input 
                      name="company" 
                      value={form.company} 
                      onChange={handleChange} 
                      required 
                      className={styles.input}
                      placeholder="e.g. Google"
                    />
                  </label>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Company Logo URL
                    <input 
                      name="companyImage" 
                      value={form.companyImage} 
                      onChange={handleChange} 
                      className={styles.input}
                      placeholder="https://example.com/logo.png"
                    />
                  </label>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Opportunity Type *
                    <select 
                      name="opportunityType" 
                      value={form.opportunityType} 
                      onChange={handleChange} 
                      required
                      className={styles.select}
                    >
                      <option value="">Select Type</option>
                      <option value="Summer Internship">Summer Internship</option>
                      <option value="Winter Internship">Winter Internship</option>
                      <option value="Full Time">Full Time</option>
                      <option value="6M+FullTime">6M+FullTime</option>
                    </select>
                  </label>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Office Locations (comma separated)
                    <input 
                      name="officeLocation" 
                      value={form.officeLocation} 
                      onChange={handleChange} 
                      className={styles.input}
                      placeholder="Bangalore, Mumbai, Delhi"
                    />
                  </label>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Apply Link
                    <input 
                      name="applyLink" 
                      value={form.applyLink} 
                      onChange={handleChange} 
                      className={styles.input}
                      placeholder="https://company.com/apply"
                    />
                  </label>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Duration (weeks)
                    <input 
                      name="durationWeeks" 
                      type="number" 
                      value={form.durationWeeks} 
                      onChange={handleChange} 
                      className={styles.input}
                    />
                  </label>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Joining Date
                    <input 
                      name="joiningDate" 
                      type="date" 
                      value={form.joiningDate} 
                      onChange={handleChange} 
                      className={styles.input}
                    />
                  </label>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Graduation Year
                    <input 
                      name="graduationYear" 
                      type="number" 
                      value={form.graduationYear} 
                      onChange={handleChange} 
                      className={styles.input}
                      placeholder="2025"
                    />
                  </label>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Deadline
                    <input 
                      name="deadline" 
                      type="datetime-local" 
                      value={form.deadline} 
                      onChange={handleChange} 
                      className={styles.input}
                    />
                  </label>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Job Description
                  <textarea 
                    name="jobDescription" 
                    value={form.jobDescription} 
                    onChange={handleChange} 
                    className={styles.textarea}
                    rows="4"
                    placeholder="Describe the role, responsibilities, and requirements..."
                  />
                </label>
              </div>
              
              <fieldset className={styles.fieldset}>
                <legend>Contact Information</legend>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Contact Name
                      <input 
                        name="contactName" 
                        value={form.contactName} 
                        onChange={handleChange} 
                        className={styles.input}
                      />
                    </label>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Contact Email
                      <input 
                        name="contactEmail" 
                        type="email"
                        value={form.contactEmail} 
                        onChange={handleChange} 
                        className={styles.input}
                      />
                    </label>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Contact Phone
                      <input 
                        name="contactPhone" 
                        value={form.contactPhone} 
                        onChange={handleChange} 
                        className={styles.input}
                      />
                    </label>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Designation
                      <input 
                        name="contactDesignation" 
                        value={form.contactDesignation} 
                        onChange={handleChange} 
                        className={styles.input}
                      />
                    </label>
                  </div>
                </div>
              </fieldset>
              
              <fieldset className={styles.fieldset}>
                <legend>Compensation</legend>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      CTC
                      <input 
                        name="ctc" 
                        value={form.ctc} 
                        onChange={handleChange} 
                        className={styles.input}
                        placeholder="e.g. ₹12 LPA"
                      />
                    </label>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Additional Details
                      <textarea 
                        name="compensationDetails" 
                        value={form.compensationDetails} 
                        onChange={handleChange} 
                        className={styles.textarea}
                        rows="2"
                      />
                    </label>
                  </div>
                </div>
              </fieldset>
              
              <fieldset className={styles.fieldset}>
                <legend>Eligibility Criteria</legend>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Minimum CGPA
                      <input 
                        name="cgpa" 
                        type="number" 
                        step="0.01" 
                        value={form.cgpa} 
                        onChange={handleChange} 
                        className={styles.input}
                        placeholder="7.5"
                      />
                    </label>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input 
                        name="activeBacklogsAllowed" 
                        type="checkbox" 
                        checked={form.activeBacklogsAllowed} 
                        onChange={handleChange} 
                        className={styles.checkbox}
                      />
                      Active Backlogs Allowed
                    </label>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Eligible Departments (comma separated)
                      <input 
                        name="departments" 
                        value={form.departments} 
                        onChange={handleChange} 
                        className={styles.input}
                        placeholder="CSE, ECE, EE, Mech"
                      />
                    </label>
                  </div>
                </div>
              </fieldset>
              
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitBtn} 
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Opportunity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
