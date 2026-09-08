<template>
  <div class="product-card" :class="`cat-${categorySlug}`">
    <div class="product-image-container">
      <img :src="product.image" :alt="product.name" class="product-image" loading="lazy" />
      <div class="card-overlay">
        <NuxtLink :to="`/products/${product.id}`" class="overlay-btn">
          <component :is="icons.Eye" :size="16" />
          Quick View
        </NuxtLink>
      </div>
      <div class="category-badge" :class="`badge-${categorySlug}`">
        <component :is="categoryIcon" :size="11" />
        {{ product.category }}
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-desc">{{ product.shortDescription }}</p>
      <div class="card-footer">
        <NuxtLink :to="`/products/${product.id}`" class="details-link">
          View Details
          <component :is="icons.ArrowRight" :size="14" />
        </NuxtLink>
        <NuxtLink to="/contact" class="inquire-btn">
          <component :is="icons.MessageSquare" :size="14" />
          Inquire
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, ArrowRight, MessageSquare, Stethoscope, Smile, FlaskConical, ScanLine, Wrench } from '@lucide/vue'

const icons = { Eye, ArrowRight, MessageSquare, Stethoscope, Smile, FlaskConical, ScanLine, Wrench }

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

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

const categoryIcon = computed(() => categoryIconMap[props.product.category] || Stethoscope)
const categorySlug = computed(() => categorySlugMap[props.product.category] || 'medical')
</script>

<style scoped>
.product-card {
  background-color: var(--color-surface);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.product-card.cat-medical::before { background: linear-gradient(90deg, #0ea5e9, #38bdf8); }
.product-card.cat-diagnostics::before { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
.product-card.cat-instruments::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
.product-card.cat-dental::before { background: linear-gradient(90deg, #6366f1, #818cf8); }
.product-card.cat-cssd::before { background: linear-gradient(90deg, #10b981, #34d399); }

.product-card:hover {
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-6px);
  border-color: transparent;
}

.product-card:hover::before {
  opacity: 1;
}

/* Image */
.product-image-container {
  position: relative;
  height: 160px;
  overflow: hidden;
  background-color: #f1f5f9;
}

@media (min-width: 640px) {
  .product-image-container {
    height: 220px;
  }
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

/* Overlay */
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.product-card:hover .card-overlay {
  opacity: 1;
}

.overlay-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  color: var(--color-secondary);
  padding: 0.625rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  transform: translateY(8px);
  transition: transform 0.3s ease, background-color 0.2s ease;
}

.product-card:hover .overlay-btn {
  transform: translateY(0);
}

.overlay-btn:hover {
  background-color: var(--color-primary);
  color: white;
}

/* Badge */
.category-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

@media (min-width: 640px) {
  .category-badge {
    top: 0.875rem;
    left: 0.875rem;
    padding: 0.25rem 0.625rem;
    font-size: 0.7rem;
  }
}

.badge-medical { background-color: #e0f2fe; color: #0369a1; }
.badge-diagnostics { background-color: #ede9fe; color: #6d28d9; }
.badge-instruments { background-color: #fef3c7; color: #92400e; }
.badge-dental { background-color: #eef2ff; color: #4338ca; }
.badge-cssd { background-color: #d1fae5; color: #065f46; }

/* Info */
.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.75rem;
}

.product-name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-secondary);
  line-height: 1.35;
}

@media (min-width: 640px) {
  .product-name {
    font-size: 1.0625rem;
  }
}

.product-desc {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  flex-grow: 1;
  line-height: 1.6;
}

/* Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.details-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 600;
  transition: gap 0.2s ease;
}

.details-link:hover {
  gap: 0.5rem;
}

.inquire-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background-color: var(--color-primary);
  color: white;
  padding: 0.4rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.inquire-btn:hover {
  background-color: var(--color-primary-dark);
  color: white;
}
</style>
