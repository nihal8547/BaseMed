<template>
  <div>
    <!-- Premium Immersive Hero Section -->
    <section class="hero-premium">
      <div class="hero-bg">
        <img :src="cmsContent?.hero?.bgImage || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop'" alt="BaseMed Background" class="hero-bg-img" />
        <div class="hero-overlay"></div>
      </div>
      
      <div class="container hero-content">
        <div class="hero-text-center">
          <div class="hero-badge">{{ cmsContent?.hero?.badge || "Qatar's Trusted Healthcare Partner" }}</div>
          <h1 class="hero-title">{{ cmsContent?.hero?.title || "Elevating Patient Care Through Premium Supplies." }}</h1>
          <p class="hero-subtitle">
            {{ cmsContent?.hero?.subtitle || "BaseMed empowers hospitals, clinics, and dental practices across Qatar with high-quality medical, dental, and CSSD materials — delivered with uncompromising reliability." }}
          </p>
          <div class="hero-actions mt-8">
            <NuxtLink to="/products" class="btn btn-primary btn-large">
              Explore Our Catalog
              <component :is="icons.ArrowRight" :size="18" />
            </NuxtLink>
            <NuxtLink to="/contact" class="btn btn-glass btn-large">
              Request a Quote
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Floating Ribbon Stats -->
    <div class="ribbon-container">
      <div class="container">
        <div class="ribbon-card">
          <div class="ribbon-item">
            <div class="ribbon-icon-wrap"><component :is="icons.Stethoscope" :size="24" /></div>
            <div class="ribbon-text">
              <span class="ribbon-title">Medical</span>
              <span class="ribbon-desc">Premium Consumables</span>
            </div>
          </div>
          <div class="ribbon-divider"></div>
          <div class="ribbon-item">
            <div class="ribbon-icon-wrap"><component :is="icons.Smile" :size="24" /></div>
            <div class="ribbon-text">
              <span class="ribbon-title">Dental</span>
              <span class="ribbon-desc">Advanced Materials</span>
            </div>
          </div>
          <div class="ribbon-divider"></div>
          <div class="ribbon-item">
            <div class="ribbon-icon-wrap"><component :is="icons.FlaskConical" :size="24" /></div>
            <div class="ribbon-text">
              <span class="ribbon-title">CSSD</span>
              <span class="ribbon-desc">Sterilization Safety</span>
            </div>
          </div>
          <div class="ribbon-divider"></div>
          <div class="ribbon-item">
            <div class="ribbon-icon-wrap"><component :is="icons.PackageCheck" :size="24" /></div>
            <div class="ribbon-text">
              <span class="ribbon-title">Logistics</span>
              <span class="ribbon-desc">Nationwide Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Why BaseMed - Editorial Dark Style -->
    <section class="trust-section">
      <div class="trust-inner">
        <!-- Left: Headline Column -->
        <div class="trust-headline">
          <div class="trust-label">
            <component :is="icons.BadgeCheck" :size="14" />
            Why Choose Us
          </div>
          <h2 class="trust-title">{{ cmsContent?.trust?.title || "Why Healthcare Professionals Trust BaseMed" }}</h2>
          <p class="trust-sub">{{ cmsContent?.trust?.subtitle || "Delivering excellence, prompt service, and personalized support to Qatar's healthcare community." }}</p>
          <NuxtLink to="/about" class="trust-learn-btn">
            Learn More
            <component :is="icons.ArrowRight" :size="15" />
          </NuxtLink>
        </div>

        <!-- Right: Feature List -->
        <div class="trust-features">
          <div class="trust-item">
            <div class="trust-num">01</div>
            <div class="trust-item-content">
              <div class="trust-icon-wrap">
                <component :is="icons.ShieldCheck" :size="22" />
              </div>
              <div>
                <h3>{{ cmsContent?.trust?.features?.[0]?.title || "Uncompromising Quality" }}</h3>
                <p>{{ cmsContent?.trust?.features?.[0]?.desc || "We source exclusively from certified global manufacturers, ensuring every product meets the highest international safety and efficacy standards." }}</p>
              </div>
            </div>
          </div>

          <div class="trust-divider"></div>

          <div class="trust-item">
            <div class="trust-num">02</div>
            <div class="trust-item-content">
              <div class="trust-icon-wrap">
                <component :is="icons.Clock" :size="22" />
              </div>
              <div>
                <h3>{{ cmsContent?.trust?.features?.[1]?.title || "Prompt & Reliable Delivery" }}</h3>
                <p>{{ cmsContent?.trust?.features?.[1]?.desc || "Our efficient logistics network guarantees timely delivery to hospitals, clinics, dental practices, and CSSD departments across all of Qatar." }}</p>
              </div>
            </div>
          </div>

          <div class="trust-divider"></div>

          <div class="trust-item">
            <div class="trust-num">03</div>
            <div class="trust-item-content">
              <div class="trust-icon-wrap">
                <component :is="icons.Users" :size="22" />
              </div>
              <div>
                <h3>{{ cmsContent?.trust?.features?.[2]?.title || "Personalized Support" }}</h3>
                <p>{{ cmsContent?.trust?.features?.[2]?.desc || "Our dedicated local expert team provides exceptional customer service and technical assistance tailored to the unique needs of your facility." }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Specialties - Bento Box Model -->
    <section class="section specialties-bento">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Our Areas of Expertise</h2>
          <p class="section-subtitle">A comprehensive product range ensuring healthcare providers have everything they need.</p>
        </div>
        
        <div class="bento-grid">
          <!-- Large Feature Block -->
          <NuxtLink to="/products?category=Medical+Consumables" class="bento-card bento-large medical">
            <div class="bento-bg-icon">
              <component :is="icons.Stethoscope" :size="240" />
            </div>
            <div class="bento-content">
              <div class="bento-badge">Medical Division</div>
              <h3>Medical Supplies & Consumables</h3>
              <p>Comprehensive range of medical consumables and instruments for hospitals and clinics — from PPE and diagnostics to surgical tools and patient care equipment.</p>
              <span class="bento-explore">Explore Catalog <component :is="icons.ArrowRight" :size="16" /></span>
            </div>
          </NuxtLink>

          <!-- Top Right Block -->
          <NuxtLink to="/products?category=Dental+Supplies" class="bento-card bento-small dental">
            <div class="bento-bg-icon">
              <component :is="icons.Smile" :size="160" />
            </div>
            <div class="bento-content">
              <div class="bento-badge">Dental Division</div>
              <h3>Dental Materials</h3>
              <p>Premium restoratives, impression materials, and clinical instruments for consistent results.</p>
              <span class="bento-explore">Explore Catalog <component :is="icons.ArrowRight" :size="16" /></span>
            </div>
          </NuxtLink>

          <!-- Bottom Right Block -->
          <NuxtLink to="/products?category=CSSD+Materials" class="bento-card bento-small cssd">
            <div class="bento-bg-icon">
              <component :is="icons.FlaskConical" :size="160" />
            </div>
            <div class="bento-content">
              <div class="bento-badge">Sterilization</div>
              <h3>CSSD Materials</h3>
              <p>Complete sterilization supplies including pouches, indicators, and tracking solutions for full compliance.</p>
              <span class="bento-explore">Explore Catalog <component :is="icons.ArrowRight" :size="16" /></span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section featured-section">
      <div class="container">
        <div class="featured-header">
          <div>
            <div class="featured-label">Top Sellers</div>
            <h2 class="featured-title">Featured Products</h2>
          </div>
          <NuxtLink to="/products" class="featured-view-all">
            View Full Catalog
            <component :is="icons.ArrowRight" :size="16" />
          </NuxtLink>
        </div>
        <div class="featured-grid">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Mission Strip Premium -->
    <section class="mission-premium">
      <div class="mission-bg"></div>
      <div class="container text-center relative z-10">
        <div class="mission-icon-wrap">
          <component :is="icons.Quote" :size="32" class="quote-icon" />
        </div>
        <blockquote class="mission-quote">
          {{ cmsContent?.mission?.quote || '"To provide high-quality medical and dental products that align with the dynamic needs of healthcare professionals in Qatar — delivering excellence, prompt service, and personalized support."' }}
        </blockquote>
        <div class="mission-attr">BaseMed Mission Statement</div>
        <NuxtLink to="/about" class="mission-btn mt-8">
          Learn Our Story
          <component :is="icons.ArrowRight" :size="16" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Stethoscope, Smile, FlaskConical, PackageCheck,
  ShieldCheck, Clock, Users, Quote, BadgeCheck, ArrowRight
} from '@lucide/vue'

const icons = { Stethoscope, Smile, FlaskConical, PackageCheck, ShieldCheck, Clock, Users, Quote, BadgeCheck, ArrowRight }

const { products } = useProducts()
const { cmsContent } = useSiteContent()
const featuredProducts = computed(() => {
  if (!cmsContent.value || !cmsContent.value.featuredProductIds) {
    return products.value.slice(0, 4) // Fallback if not configured
  }
  const ids = cmsContent.value.featuredProductIds
  return products.value.filter(p => ids.includes(p.id))
})

useSeoMeta({
  title: 'BaseMed | Premium Medical & Dental Supplies in Qatar',
  ogTitle: 'BaseMed | Premium Medical & Dental Supplies in Qatar',
  description: 'BaseMed provides top-tier medical consumables, dental instruments, and CSSD materials to healthcare professionals and hospitals across Doha and Qatar.',
  ogDescription: 'BaseMed provides top-tier medical consumables, dental instruments, and CSSD materials to healthcare professionals and hospitals across Doha and Qatar.',
  ogImage: 'https://basemed.qa/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
/* Hero Premium */
.hero-premium {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 0 12rem; /* Extra padding at bottom for floating ribbon */
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(14, 165, 233, 0.7) 100%);
  backdrop-filter: blur(2px);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-text-center {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: #38bdf8;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  line-height: 1.15;
  letter-spacing: -1.5px;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

@media (min-width: 768px) { .hero-title { font-size: 4rem; } }

.hero-subtitle {
  font-size: 1.125rem;
  color: #e2e8f0;
  line-height: 1.7;
  max-width: 650px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

@media (min-width: 768px) { .hero-subtitle { font-size: 1.25rem; } }

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.0625rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-glass {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius);
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-glass:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: white;
}

/* Floating Ribbon Stats */
.ribbon-container {
  position: relative;
  z-index: 10;
  margin-top: -4rem; /* Pulls it up into the hero */
}

.ribbon-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .ribbon-card {
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 0;
  }
}

.ribbon-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  flex: 1;
}

.ribbon-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: rgba(14, 165, 233, 0.1);
  color: var(--color-primary);
  border-radius: 0.75rem;
  flex-shrink: 0;
}

.ribbon-text { display: flex; flex-direction: column; }

.ribbon-title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-secondary);
}

.ribbon-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.ribbon-divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-border);
}

@media (min-width: 768px) {
  .ribbon-divider {
    width: 1px;
    height: auto;
  }
}

/* Section Titles */
.section-title { font-size: 2rem; letter-spacing: -0.5px; margin-bottom: 0.75rem; }
.section-subtitle {
  color: var(--color-text-muted);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
}
.section-header { display: flex; justify-content: space-between; align-items: flex-end; }
.view-all { color: var(--color-primary); font-weight: 600; }
.view-all:hover { text-decoration: underline; }

/* Trust Section — Dark Editorial Style */
.trust-section {
  background-color: var(--color-secondary);
  position: relative;
  overflow: hidden;
}

.trust-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.4), transparent);
}

.trust-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: grid;
  gap: 4rem;
  align-items: start;
}

@media (min-width: 900px) {
  .trust-inner {
    grid-template-columns: 360px 1fr;
    gap: 6rem;
  }
}

/* Left headline */
.trust-headline {
  position: sticky;
  top: 5rem;
}

.trust-label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #0ea5e9;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.trust-title {
  font-size: 2.25rem;
  color: white;
  line-height: 1.2;
  letter-spacing: -0.5px;
  margin-bottom: 1.25rem;
}

.trust-sub {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.trust-learn-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #0ea5e9;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: gap 0.2s ease;
}

.trust-learn-btn:hover {
  gap: 0.65rem;
  color: #38bdf8;
}

/* Right feature list */
.trust-features {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.trust-item {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 1.5rem;
  align-items: start;
  padding: 2rem 0;
  transition: background-color 0.2s ease;
}

.trust-item:first-child { padding-top: 0; }

.trust-num {
  font-size: 1rem;
  font-weight: 800;
  color: #0ea5e9;
  opacity: 0.5;
  letter-spacing: -0.5px;
  padding-top: 0.25rem;
}

.trust-item:hover .trust-num {
  opacity: 1;
}

.trust-item-content {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.trust-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: rgba(14, 165, 233, 0.15);
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 0.75rem;
  color: #0ea5e9;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
}

.trust-item:hover .trust-icon-wrap {
  background-color: rgba(14, 165, 233, 0.2);
}

.trust-item-content h3 {
  font-size: 1.125rem;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.trust-item-content p {
  color: #64748b;
  font-size: 0.9375rem;
  line-height: 1.75;
}

.trust-divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.15), transparent);
  margin-left: calc(48px + 1.5rem);
}

/* Specialties Bento Grid */
.specialties-bento { background-color: var(--color-background); }
.bento-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 900px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    min-height: 520px;
  }
}

.bento-card {
  position: relative;
  background-color: white;
  border-radius: 1.25rem;
  padding: 2.5rem;
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-decoration: none;
  z-index: 1;
}

@media (min-width: 900px) {
  .bento-large {
    grid-row: span 2;
  }
}

.bento-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}

.bento-bg-icon {
  position: absolute;
  top: -10%;
  right: -10%;
  opacity: 0.04;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.bento-large .bento-bg-icon { right: -20%; top: 10%; opacity: 0.03; }

.bento-card:hover .bento-bg-icon {
  transform: scale(1.1) rotate(-5deg);
  opacity: 0.08;
}

.bento-content { position: relative; z-index: 2; }

.bento-badge {
  display: inline-flex;
  padding: 0.35rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.medical .bento-badge { background-color: #e0f2fe; color: #0284c7; }
.dental .bento-badge { background-color: #e0e7ff; color: #4f46e5; }
.cssd .bento-badge { background-color: #d1fae5; color: #059669; }

.bento-card h3 {
  font-size: 1.75rem;
  color: var(--color-secondary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.bento-large h3 { font-size: 2.5rem; }

.bento-card p {
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.bento-large p { font-size: 1.125rem; max-width: 90%; margin-bottom: 2.5rem; }

.bento-explore {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: gap 0.2s ease;
}

.medical .bento-explore { color: #0ea5e9; }
.dental .bento-explore { color: #6366f1; }
.cssd .bento-explore { color: #10b981; }

.bento-card:hover .bento-explore { gap: 0.75rem; }

/* Featured Products */
.featured-section {
  background-color: white;
  padding: 6rem 0;
}

.featured-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.featured-label {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.8125rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.featured-title {
  font-size: 2.25rem;
  color: var(--color-secondary);
  letter-spacing: -0.5px;
  margin: 0;
}

.featured-view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.9375rem;
  transition: gap 0.2s ease;
}

.featured-view-all:hover { gap: 0.75rem; }

.featured-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 640px) {
  .featured-grid {
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

/* Mission Strip Premium */
.mission-premium {
  position: relative;
  background-color: var(--color-secondary);
  padding: 6rem 0;
  overflow: hidden;
  color: white;
}

.mission-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
  z-index: 0;
}

.mission-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.2);
  margin-bottom: 2rem;
}

.quote-icon { color: #0ea5e9; }

.mission-quote {
  font-size: 1.5rem;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;
  color: white;
  font-weight: 500;
  border: none;
  letter-spacing: -0.5px;
}

@media (min-width: 768px) { .mission-quote { font-size: 2rem; } }

.mission-attr {
  color: #0ea5e9;
  font-weight: 700;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.mission-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  color: var(--color-secondary);
  padding: 0.875rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}

.mission-btn:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(21, 56, 62, 0.4);
}

.relative { position: relative; }
.z-10 { z-index: 10; }

</style>
