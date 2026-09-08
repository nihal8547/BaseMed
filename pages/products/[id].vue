<template>
  <div class="product-detail-page">

    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
      <div class="container">
        <div class="breadcrumb">
          <NuxtLink to="/" class="breadcrumb-link">Home</NuxtLink>
          <component :is="icons.ChevronRight" :size="14" class="breadcrumb-sep" />
          <NuxtLink to="/products" class="breadcrumb-link">Products</NuxtLink>
          <component :is="icons.ChevronRight" :size="14" class="breadcrumb-sep" />
          <span class="breadcrumb-current">{{ product?.name ?? 'Not Found' }}</span>
        </div>
      </div>
    </div>

    <div class="container">
      <div v-if="product" class="detail-layout section">

        <!-- LEFT: Image Panel -->
        <div class="image-panel">
          <div class="main-image-wrap">
            <img :src="product.image" :alt="product.name" class="main-image" />
            <div class="image-badge" :class="`badge-${categorySlug}`">
              <component :is="categoryIcon" :size="13" />
              {{ product.category }}
            </div>
          </div>

          <!-- Inquiry Card -->
          <div class="inquiry-card">
            <div class="inquiry-header">
              <component :is="icons.ShieldCheck" :size="20" class="inquiry-icon" />
              <span>Quality Guaranteed</span>
            </div>
            <p>Sourced from certified global manufacturers. All products meet international healthcare standards.</p>
            <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary inquiry-btn">
              <component :is="icons.MessageSquare" :size="16" />
              Request a Quote
            </a>
            <div class="inquiry-meta">
              <div class="meta-item">
                <component :is="icons.Clock" :size="13" />
                <span>Reply within 24 hours</span>
              </div>
              <div class="meta-item">
                <component :is="icons.MapPin" :size="13" />
                <span>Delivery across Qatar</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Product Info -->
        <div class="product-info">

          <!-- Title Area -->
          <div class="product-header">
            <h1 class="product-title">{{ product.name }}</h1>
            <p class="product-description">{{ product.description }}</p>
          </div>

          <!-- Key Features -->
          <div class="info-block">
            <div class="block-title">
              <component :is="icons.Sparkles" :size="17" />
              Key Features
            </div>
            <div class="features-grid">
              <div v-for="(feature, index) in product.features" :key="index" class="feature-item">
                <component :is="icons.CheckCircle2" :size="16" class="check-icon" />
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Specifications -->
          <div class="info-block">
            <div class="block-title">
              <component :is="icons.FileText" :size="17" />
              Specifications
            </div>
            <div class="spec-table">
              <div v-for="(value, key) in product.specifications" :key="key" class="spec-row">
                <span class="spec-key">{{ key }}</span>
                <span class="spec-value">{{ value }}</span>
              </div>
            </div>
          </div>

          <!-- Action Row -->
          <div class="action-row">
            <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary action-btn">
              <component :is="icons.MessageSquare" :size="16" />
              Request a Quote
            </a>
            <NuxtLink to="/products" class="btn btn-outline action-btn">
              <component :is="icons.ArrowLeft" :size="16" />
              Back to Catalog
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="not-found section text-center">
        <component :is="icons.PackageX" :size="48" class="not-found-icon" />
        <h2>Product Not Found</h2>
        <p class="mt-2">This product may have been removed or the link is incorrect.</p>
        <NuxtLink to="/products" class="btn btn-primary mt-6">Browse All Products</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRight, ShieldCheck, MessageSquare, Clock, MapPin,
  Sparkles, CheckCircle2, FileText, ArrowLeft, PackageX,
  Stethoscope, Smile, FlaskConical, ScanLine, Wrench
} from '@lucide/vue'

const icons = {
  ChevronRight, ShieldCheck, MessageSquare, Clock, MapPin,
  Sparkles, CheckCircle2, FileText, ArrowLeft, PackageX,
  Stethoscope, Smile, FlaskConical, ScanLine, Wrench
}

const categoryIconMap: Record<string, any> = {
  'Medical Consumables': Stethoscope,
  'Diagnostics': ScanLine,
  'Medical Instruments': Wrench,
  'Dental Supplies': Smile,
  'Dental Instruments': Wrench,
  'CSSD Materials': FlaskConical,
}

const categorySlugMap: Record<string, string> = {
  'Medical Consumables': 'medical',
  'Diagnostics': 'diagnostics',
  'Medical Instruments': 'instruments',
  'Dental Supplies': 'dental',
  'Dental Instruments': 'dental',
  'CSSD Materials': 'cssd',
}

const route = useRoute()
const { getProductById } = useProducts()
const product = computed(() => getProductById(route.params.id as string))
const categoryIcon = computed(() => categoryIconMap[product.value?.category ?? ''] ?? Stethoscope)
const categorySlug = computed(() => categorySlugMap[product.value?.category ?? ''] ?? 'medical')

useSeoMeta({
  title: computed(() => product.value ? `${product.value.name} | BaseMed` : 'Product Not Found | BaseMed'),
  ogTitle: computed(() => product.value ? `${product.value.name} | BaseMed` : 'Product Not Found | BaseMed'),
  description: computed(() => product.value?.shortDescription || "Premium medical supplies in Qatar."),
  ogDescription: computed(() => product.value?.shortDescription || "Premium medical supplies in Qatar."),
  ogImage: computed(() => product.value?.image || 'https://basemed.qa/og-image.jpg'),
  twitterCard: 'summary_large_image',
  twitterImage: computed(() => product.value?.image || 'https://basemed.qa/og-image.jpg')
})

const whatsappNumber = '97431013666'
const whatsappLink = computed(() => {
  if (!product.value) return `https://wa.me/${whatsappNumber}`
  
  const text = `Hello, I would like to request a quote for the following product:\n\n*Product Name:* ${product.value.name}\n*Category:* ${product.value.category}`
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
})

useHead(() => ({
  script: product.value ? [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.value.name,
        image: product.value.image,
        description: product.value.shortDescription,
        brand: {
          '@type': 'Brand',
          name: 'BaseMed'
        },
        category: product.value.category,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'QAR',
          price: '0.00' // Assuming quote based for now
        }
      })
    }
  ] : []
}))
</script>

<style scoped>
/* Breadcrumb */
.breadcrumb-bar {
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding: 0.75rem 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
}

.breadcrumb-link { color: var(--color-text-muted); }
.breadcrumb-link:hover { color: var(--color-primary); }
.breadcrumb-sep { color: var(--color-border); flex-shrink: 0; }
.breadcrumb-current { color: var(--color-secondary); font-weight: 500; }

/* Layout */
.detail-layout {
  display: grid;
  gap: 3rem;
  align-items: start;
}

@media (min-width: 900px) {
  .detail-layout {
    grid-template-columns: 420px 1fr;
  }
}

/* Image Panel */
.image-panel { display: flex; flex-direction: column; gap: 1.5rem; }

.main-image-wrap {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background-color: #f8fafc;
  aspect-ratio: 4 / 3;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
}

.badge-medical { background-color: #e0f2fe; color: #0369a1; }
.badge-diagnostics { background-color: #ede9fe; color: #6d28d9; }
.badge-instruments { background-color: #fef3c7; color: #92400e; }
.badge-dental { background-color: #eef2ff; color: #4338ca; }
.badge-cssd { background-color: #d1fae5; color: #065f46; }

/* Inquiry Card */
.inquiry-card {
  background: linear-gradient(135deg, var(--color-secondary) 0%, #1e293b 100%);
  border-radius: 1rem;
  padding: 1.75rem;
}

.inquiry-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.inquiry-icon { color: var(--color-primary); }

.inquiry-card > p {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.inquiry-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  padding: 0.875rem;
  font-size: 1rem;
}

.inquiry-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #64748b;
}

/* Product Info */
.product-header { margin-bottom: 2rem; }

.product-title {
  font-size: 2.25rem;
  letter-spacing: -0.5px;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.product-description {
  font-size: 1.0625rem;
  color: var(--color-text-muted);
  line-height: 1.8;
}

/* Info Blocks */
.info-block {
  margin-bottom: 2rem;
  padding: 1.75rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
}

.block-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 1.25rem;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-primary);
}

/* Features */
.features-grid {
  display: grid;
  gap: 0.625rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.9375rem;
  color: var(--color-text);
}

.check-icon { color: var(--color-primary); flex-shrink: 0; margin-top: 1px; }

/* Specs */
.spec-table { display: flex; flex-direction: column; gap: 0; }

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  gap: 1rem;
}

.spec-row:last-child { border-bottom: none; }

.spec-key {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--color-secondary);
  flex-shrink: 0;
}

.spec-value {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  text-align: right;
}

/* Actions */
.action-row { display: flex; gap: 1rem; flex-wrap: wrap; }
.action-btn { flex: 1; min-width: 160px; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; }

/* Not Found */
.not-found-icon { color: var(--color-border); margin: 0 auto 1rem; display: block; }
.not-found h2 { font-size: 1.75rem; }
.not-found p { color: var(--color-text-muted); }
</style>
