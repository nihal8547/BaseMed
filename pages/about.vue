<template>
  <div class="about-page">
    <!-- Hero -->
    <section class="about-hero">
      <div class="container text-center">
        <h1 class="page-title">About BaseMed</h1>
        <p class="about-lead">
          Qatar's foremost and most trusted source for premium medical, dental, and CSSD supplies.
        </p>
      </div>
    </section>

    <!-- Vision & Mission -->
    <section class="section vm-section">
      <div class="container">
        <div class="vm-grid">
          <div class="vm-card vision">
            <div class="vm-icon-wrap vision-icon">
              <component :is="icons.Target" :size="26" />
            </div>
            <h2>Our Vision</h2>
            <p>
              To become Qatar's foremost and most trusted source for premium medical and dental supplies, advancing healthcare through innovation, dependability, and superior service.
            </p>
          </div>
          <div class="vm-card mission">
            <div class="vm-icon-wrap mission-icon">
              <component :is="icons.Lightbulb" :size="26" />
            </div>
            <h2>Our Mission</h2>
            <p>
              At BaseMed, we aim to provide high-quality medical and dental products that align with the dynamic needs of healthcare professionals in Qatar. We are dedicated to delivering excellence, prompt service, and personalized support — empowering clinics, hospitals, and dental practices to deliver exceptional patient care.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Who We Are -->
    <section class="section who-section">
      <div class="container">
        <div class="who-grid">
          <div class="who-image-wrapper">
            <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop" alt="BaseMed Medical Team" class="who-image" />
          </div>
          <div class="who-content">
            <h2>Who We Are</h2>
            <p>
              BaseMed is a reputable supplier of medical, dental, and CSSD materials, catering to the needs of healthcare facilities, dental clinics, and professionals in the region.
            </p>
            <p class="mt-4">
              With a commitment to delivering high-quality products, exceptional customer service, and timely delivery, we have established ourselves as a trusted partner in the healthcare industry.
            </p>
            <p class="mt-4">
              Our extensive range of medical consumables and dental materials ensures that healthcare providers have access to the essential supplies they require to deliver optimal patient care.
            </p>

            <div class="who-stats mt-8">
              <div class="stat">
                <div class="stat-value">3</div>
                <div class="stat-label">Core Specialties</div>
              </div>
              <div class="stat">
                <div class="stat-value">100+</div>
                <div class="stat-label">Products Available</div>
              </div>
              <div class="stat">
                <div class="stat-value">Qatar</div>
                <div class="stat-label">Nationwide Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="section values-section">
      <div class="container">
        <div class="text-center mb-8">
          <h2 class="section-title">Our Core Values</h2>
          <p class="section-subtitle">The principles that guide every decision we make.</p>
        </div>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon-wrap">
              <component :is="icons.Trophy" :size="24" />
            </div>
            <h3>Excellence</h3>
            <p>We hold ourselves to the highest standards in product quality, service delivery, and customer satisfaction — always striving to exceed expectations.</p>
          </div>
          <div class="value-card">
            <div class="value-icon-wrap">
              <component :is="icons.Microscope" :size="24" />
            </div>
            <h3>Innovation</h3>
            <p>We actively seek out advanced, innovative products that empower healthcare professionals to stay at the forefront of modern medical and dental practice.</p>
          </div>
          <div class="value-card">
            <div class="value-icon-wrap">
              <component :is="icons.Handshake" :size="24" />
            </div>
            <h3>Dependability</h3>
            <p>Our customers rely on us for consistent product availability, accurate delivery timelines, and steadfast support. We are a partner you can always count on.</p>
          </div>
          <div class="value-card">
            <div class="value-icon-wrap">
              <component :is="icons.HeartPulse" :size="24" />
            </div>
            <h3>Patient-Centered</h3>
            <p>Ultimately, every product we supply contributes to the care of a patient. We take this responsibility seriously in every choice we make.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Supply -->
    <section class="section supply-section">
      <div class="container">
        <div class="text-center mb-8">
          <h2 class="section-title">What We Supply</h2>
          <p class="section-subtitle">A comprehensive range across three key healthcare domains.</p>
        </div>
        <div class="supply-grid">
          <div class="supply-card">
            <div class="supply-icon-wrap medical-bg">
              <component :is="icons.Stethoscope" :size="28" />
            </div>
            <h3>Medical Supplies</h3>
            <p>Consumables, diagnostics, instruments, and patient care equipment for hospitals and clinics of all sizes across Qatar.</p>
          </div>
          <div class="supply-card">
            <div class="supply-icon-wrap dental-bg">
              <component :is="icons.Smile" :size="28" />
            </div>
            <h3>Dental Materials</h3>
            <p>Restorative composites, impression materials, handpieces, and full clinical consumables for dental practices seeking quality and consistency.</p>
          </div>
          <div class="supply-card">
            <div class="supply-icon-wrap cssd-bg">
              <component :is="icons.FlaskConical" :size="28" />
            </div>
            <h3>CSSD Materials</h3>
            <p>Full sterilization support including pouches, chemical indicators, tracking labels, and compliance-driven solutions for sterile services departments.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="about-cta">
      <div class="container text-center">
        <h2>Ready to Partner with BaseMed?</h2>
        <p class="mt-4">Contact our team for product inquiries, quotations, or to learn how we can support your facility.</p>
        <NuxtLink to="/contact" class="btn btn-primary mt-6">Get in Touch</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Target, Lightbulb, Trophy, Microscope, Handshake, HeartPulse,
  Stethoscope, Smile, FlaskConical
} from '@lucide/vue'

const icons = { Target, Lightbulb, Trophy, Microscope, Handshake, HeartPulse, Stethoscope, Smile, FlaskConical }

useSeoMeta({
  title: 'About Us | BaseMed',
  ogTitle: 'About Us | BaseMed',
  description: 'Learn about BaseMed, Qatar\'s premier supplier of medical, dental, and CSSD equipment. We empower clinics and hospitals with high-quality healthcare supplies.',
  ogDescription: 'Learn about BaseMed, Qatar\'s premier supplier of medical, dental, and CSSD equipment. We empower clinics and hospitals with high-quality healthcare supplies.',
  ogImage: 'https://basemed.qa/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
.about-hero {
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
  padding: 5rem 0;
  border-bottom: 1px solid var(--color-border);
}
.page-title { font-size: 3rem; margin-bottom: 1rem; }
.about-lead {
  font-size: 1.25rem;
  color: var(--color-primary);
  font-weight: 500;
  max-width: 650px;
  margin: 0 auto;
}

/* Vision & Mission */
.vm-section { background-color: var(--color-secondary); }
.vm-grid { display: grid; gap: 2rem; }
@media (min-width: 768px) { .vm-grid { grid-template-columns: 1fr 1fr; } }
.vm-card {
  padding: 2.5rem;
  border-radius: var(--radius);
  border: 1px solid #334155;
}
.vm-card.vision { background-color: rgba(14, 165, 233, 0.05); border-color: rgba(14, 165, 233, 0.2); }
.vm-card.mission { background-color: rgba(255,255,255,0.02); border-color: #334155; }
.vm-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 0.75rem;
  margin-bottom: 1.25rem;
}
.vision-icon { background-color: rgba(14, 165, 233, 0.15); color: #0ea5e9; }
.mission-icon { background-color: rgba(255, 255, 255, 0.08); color: #e2e8f0; }
.vm-card h2 { font-size: 1.5rem; color: white; margin-bottom: 1rem; }
.vm-card p { color: #94a3b8; line-height: 1.8; }

/* Who We Are */
.who-section { background-color: white; }
.who-grid { display: grid; gap: 4rem; align-items: center; }
@media (min-width: 768px) { .who-grid { grid-template-columns: 1fr 1fr; } }
.who-image-wrapper { border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-lg); }
.who-image { width: 100%; height: auto; display: block; }
.who-content h2 { font-size: 2rem; margin-bottom: 1rem; }
.who-content p { color: var(--color-text-muted); line-height: 1.8; }
.who-stats { display: flex; gap: 2rem; flex-wrap: wrap; padding-top: 1.5rem; border-top: 1px solid var(--color-border); }
.stat-value { font-size: 1.75rem; font-weight: 700; color: var(--color-primary); }
.stat-label { font-size: 0.875rem; color: var(--color-text-muted); margin-top: 0.25rem; }

/* Core Values */
.values-section { background-color: var(--color-background); }
.section-title { font-size: 2rem; letter-spacing: -0.5px; margin-bottom: 0.75rem; }
.section-subtitle { color: var(--color-text-muted); font-size: 1.125rem; max-width: 600px; margin: 0 auto; }
.values-grid { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.value-card {
  background-color: white;
  padding: 2rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  transition: var(--transition);
}
.value-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.value-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background-color: rgba(14, 165, 233, 0.1);
  border-radius: 0.75rem;
  color: var(--color-primary);
  margin-bottom: 1.25rem;
}
.value-card h3 { font-size: 1.125rem; margin-bottom: 0.75rem; }
.value-card p { color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.7; }

/* What We Supply */
.supply-section { background-color: white; }
.supply-grid { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.supply-card {
  text-align: center;
  padding: 2.5rem 2rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  transition: var(--transition);
}
.supply-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.supply-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 1rem;
  margin: 0 auto 1.5rem;
}
.medical-bg { background-color: #e0f2fe; color: #0ea5e9; }
.dental-bg { background-color: #ede9fe; color: #6366f1; }
.cssd-bg { background-color: #d1fae5; color: #10b981; }
.supply-card h3 { font-size: 1.25rem; margin-bottom: 0.75rem; }
.supply-card p { color: var(--color-text-muted); line-height: 1.7; }

/* CTA */
.about-cta { background-color: var(--color-secondary); padding: 5rem 0; color: white; }
.about-cta h2 { color: white; font-size: 2rem; }
.about-cta p { color: #94a3b8; font-size: 1.125rem; }
.about-cta .btn-primary { display: inline-flex; }
</style>
