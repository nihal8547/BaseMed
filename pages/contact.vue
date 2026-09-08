<template>
  <div class="contact-page">
    <!-- Split Layout Container -->
    <div class="contact-split">
      
      <!-- LEFT: Dark Info Panel -->
      <div class="contact-info-panel">
        <div class="info-content">
          <div class="badge">Contact Us</div>
          <h1 class="page-title">Let's start a conversation.</h1>
          <p class="page-subtitle">Whether you need a specific product, a bulk quote, or technical support, our team in Doha is ready to assist you.</p>

          <div class="info-blocks">
            <!-- Office -->
            <div class="info-block">
              <div class="info-icon">
                <component :is="icons.MapPin" :size="24" />
              </div>
              <div class="info-details">
                <h3>Our Headquarters</h3>
                <p>123 Healthcare Avenue<br>West Bay, Doha, Qatar</p>
              </div>
            </div>

            <!-- Phone -->
            <div class="info-block">
              <div class="info-icon">
                <component :is="icons.Phone" :size="24" />
              </div>
              <div class="info-details">
                <h3>Call Us</h3>
                <p>+974 31013666<br>+974 77512884</p>
              </div>
            </div>

            <!-- Email -->
            <div class="info-block">
              <div class="info-icon">
                <component :is="icons.Mail" :size="24" />
              </div>
              <div class="info-details">
                <h3>Email Us</h3>
                <p>basemedtrading@gmail.com</p>
              </div>
            </div>

            <!-- Hours -->
            <div class="info-block">
              <div class="info-icon">
                <component :is="icons.Clock" :size="24" />
              </div>
              <div class="info-details">
                <h3>Business Hours</h3>
                <p>Sunday – Thursday<br>8:00 AM – 5:00 PM (AST)</p>
              </div>
            </div>
          </div>
          
          <!-- Removed Social Links -->
        </div>
        
        <!-- Decorative Background Elements -->
        <div class="bg-decoration shape-1"></div>
        <div class="bg-decoration shape-2"></div>
      </div>

      <!-- RIGHT: Form Panel -->
      <div class="contact-form-panel">
        <div class="form-content">
          <div class="form-header">
            <h2>Send a Message</h2>
            <p>Fill out the form below and a BaseMed representative will get back to you within 24 hours.</p>
          </div>

          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input v-model="form.firstName" type="text" id="firstName" required class="form-control" placeholder="Ahmed" />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input v-model="form.lastName" type="text" id="lastName" required class="form-control" placeholder="Al-Mahmoud" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email</label>
                <input v-model="form.email" type="email" id="email" required class="form-control" placeholder="basemedtrading@gmail.com" />
              </div>
              <div class="form-group">
                <label for="phone">Phone (Optional)</label>
                <input v-model="form.phone" type="tel" id="phone" class="form-control" placeholder="+974 31013666" />
              </div>
            </div>

            <div class="form-group">
              <label for="facility">Healthcare Facility / Clinic Name</label>
              <input v-model="form.facility" type="text" id="facility" class="form-control" placeholder="e.g. Doha Dental Center" />
            </div>

            <div class="form-group">
              <label for="subject">Inquiry Type</label>
              <div class="select-wrapper">
                <select v-model="form.subject" id="subject" class="form-control select-control">
                  <option value="" disabled selected>Select an option...</option>
                  <option value="quote">Product Quote</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership / Distribution</option>
                  <option value="other">Other</option>
                </select>
                <component :is="icons.ChevronDown" :size="16" class="select-icon" />
              </div>
            </div>

            <div class="form-group">
              <label for="message">Message Details</label>
              <textarea v-model="form.message" id="message" rows="5" required class="form-control" placeholder="Please specify the products or assistance you need..."></textarea>
            </div>

            <div v-if="successMessage" class="success-message">
              {{ successMessage }}
            </div>

            <button type="submit" class="submit-btn mt-4" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              <component :is="icons.ArrowRight" :size="18" v-if="!isSubmitting" />
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, ChevronDown } from '@lucide/vue'
const icons = { MapPin, Phone, Mail, Clock, Send, ArrowRight, ChevronDown }

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  facility: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')

const submitForm = async () => {
  isSubmitting.value = true
  successMessage.value = ''
  
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })
    successMessage.value = 'Thank you for contacting BaseMed. Our team will get back to you shortly.'
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      facility: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    alert('An error occurred while sending your message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: 'Contact Us | BaseMed',
  ogTitle: 'Contact Us | BaseMed',
  description: 'Get in touch with BaseMed for premium medical supplies, product inquiries, and support in Qatar. We respond within 24 hours to all inquiries.',
  ogDescription: 'Get in touch with BaseMed for premium medical supplies, product inquiries, and support in Qatar. We respond within 24 hours to all inquiries.',
  ogImage: 'https://basemed.qa/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
.contact-page {
  background-color: white;
  min-height: calc(100vh - 4.5rem); /* minus navbar */
}

/* Split Layout */
.contact-split {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 4.5rem);
}

@media (min-width: 1024px) {
  .contact-split {
    flex-direction: row;
  }
}

/* LEFT: Dark Info Panel */
.contact-info-panel {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1024px) {
  .contact-info-panel {
    max-width: 45%;
    padding: 6rem 4rem;
    justify-content: flex-end;
  }
}

.info-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 480px;
}

.badge {
  display: inline-block;
  background-color: rgba(14, 165, 233, 0.15);
  color: #38bdf8;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.page-title {
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: white;
}

.page-subtitle {
  color: #94a3b8;
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 3rem;
}

.info-blocks {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-block {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  color: #0ea5e9;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-details h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: white;
}

.info-details p {
  color: #94a3b8;
  font-size: 0.9375rem;
  line-height: 1.5;
}



/* Background Decorations */
.bg-decoration {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background-color: rgba(14, 165, 233, 0.15);
  top: -100px;
  right: -100px;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background-color: rgba(99, 102, 241, 0.1);
  bottom: -50px;
  left: -100px;
}

/* RIGHT: Form Panel */
.contact-form-panel {
  background-color: white;
  padding: 4rem 2rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1024px) {
  .contact-form-panel {
    padding: 6rem 4rem;
    justify-content: flex-start;
  }
}

.form-content {
  width: 100%;
  max-width: 560px;
}

.form-header {
  margin-bottom: 2.5rem;
}

.form-header h2 {
  font-size: 2rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.form-header p {
  color: var(--color-text-muted);
  font-size: 1.0625rem;
}

.form-row {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-secondary);
}

.form-control {
  width: 100%;
  padding: 0.875rem 1.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.9375rem;
  color: var(--color-text);
  background-color: #f8fafc;
  transition: all 0.2s ease;
}

.form-control::placeholder {
  color: #94a3b8;
}

.form-control:focus {
  outline: none;
  border-color: var(--color-primary);
  background-color: white;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
}

/* Custom Select */
.select-wrapper {
  position: relative;
}

.select-control {
  appearance: none;
  padding-right: 3rem;
  cursor: pointer;
}

.select-icon {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--color-primary);
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(21, 56, 62, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

.success-message {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f0fdf4;
  color: #166534;
  border-radius: 0.5rem;
  border: 1px solid #bbf7d0;
  font-weight: 500;
  text-align: center;
}
</style>
