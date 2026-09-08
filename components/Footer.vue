<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <NuxtLink to="/" class="brand">
            <img src="/Based%20Med.png" alt="BaseMed Logo" class="brand-logo" />
            <span class="brand-text"><span class="brand-base">Base</span><span class="brand-med">Med</span></span>
          </NuxtLink>
          <p class="footer-text mt-4">
            Qatar's trusted supplier of premium medical, dental, and CSSD materials — empowering healthcare professionals to deliver exceptional patient care.
          </p>
          <div class="social-links mt-6">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" class="social-link" aria-label="Linkedin">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/products">Products</NuxtLink></li>
            <li><NuxtLink to="/about">About Us</NuxtLink></li>
            <li><NuxtLink to="/contact">Contact</NuxtLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Specialties</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/products">Medical Consumables</NuxtLink></li>
            <li><NuxtLink to="/products">Dental Supplies</NuxtLink></li>
            <li><NuxtLink to="/products">CSSD Materials</NuxtLink></li>
            <li><NuxtLink to="/products">Medical Instruments</NuxtLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Contact Us</h4>
          <ul class="footer-contact">
            <li>
              <component :is="icons.MapPin" :size="16" class="contact-icon" />
              <span>Doha, Qatar</span>
            </li>
            <li>
              <component :is="icons.Mail" :size="16" class="contact-icon" />
              <span>basemedtrading@gmail.com</span>
            </li>
            <li>
              <component :is="icons.Phone" :size="16" class="contact-icon" />
              <span>+974 31013666, +974 77512884</span>
            </li>
            <li>
              <component :is="icons.Clock" :size="16" class="contact-icon" />
              <span>Sun – Thu, 8am – 5pm</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} BaseMed Qatar. All rights reserved. - Developed By <a href="https://webbea.qa" target="_blank" rel="noopener noreferrer" class="developer-link">Webbea Software Development</a></p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MapPin, Mail, Phone, Clock } from '@lucide/vue'
const icons = { MapPin, Mail, Phone, Clock }
</script>

<style scoped>
.footer {
  background-color: var(--color-secondary);
  color: #f8fafc;
  padding-top: 5rem;
}
.brand { display: flex; align-items: center; gap: 0.5rem; font-size: 1.5rem; font-weight: 700; letter-spacing: -0.5px; color: white; text-decoration: none; }
.brand-logo { height: 2.5rem; object-fit: contain; }
.brand-base { color: white; }
.brand-med { color: #0ea5e9; }
.footer-grid { display: grid; gap: 3rem; margin-bottom: 3rem; }
@media (min-width: 768px) {
  .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
}
.footer-text { color: #94a3b8; max-width: 300px; }
.social-links { display: flex; gap: 1rem; }
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  transition: all 0.2s ease;
}
.social-link:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-2px);
}
.footer-heading { color: white; margin-bottom: 1.5rem; font-size: 1.125rem; }
.footer-links, .footer-contact { list-style: none; }
.footer-links li, .footer-contact li { margin-bottom: 0.75rem; }
.footer-links a { color: #94a3b8; }
.footer-links a:hover { color: #0ea5e9; }
.footer-contact li {
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.contact-icon {
  color: #0ea5e9;
  flex-shrink: 0;
}
.footer-bottom {
  border-top: 1px solid #334155;
  padding: 1.5rem 0;
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
}
.developer-link {
  color: #94a3b8;
  font-weight: 500;
  transition: color 0.2s ease;
}
.developer-link:hover {
  color: #0ea5e9;
}
</style>
