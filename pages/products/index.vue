<template>
  <div class="page-container">
    <!-- Hero Header -->
    <section class="page-header">
      <div class="container">
        <div class="header-content">
          <div>
            <h1 class="page-title">Our Product Catalog</h1>
            <p class="page-subtitle">Premium medical, dental, and CSSD supplies for Qatar's healthcare community.</p>
          </div>
          <div class="header-stats">
            <div class="stat-chip">
              <component :is="icons.Package" :size="16" />
              {{ products.length }} Products
            </div>
            <div class="stat-chip">
              <component :is="icons.LayoutGrid" :size="16" />
              {{ categories.length }} Categories
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Catalog Section -->
    <section class="catalog-section">
      <div class="container">

        <!-- Category Filter Tabs -->
        <div class="filter-bar">
          <div class="filter-tabs">
            <button
              class="filter-tab"
              :class="{ active: selectedCategory === '' }"
              @click="selectedCategory = ''"
            >
              <component :is="icons.LayoutGrid" :size="15" />
              All
              <span class="tab-count">{{ products.length }}</span>
            </button>
            <button
              v-for="cat in categoryMeta"
              :key="cat.name"
              class="filter-tab"
              :class="['filter-tab', `tab-${cat.slug}`, { active: selectedCategory === cat.name }]"
              @click="selectedCategory = cat.name"
            >
              <component :is="cat.icon" :size="15" />
              {{ cat.label }}
              <span class="tab-count">{{ cat.count }}</span>
            </button>
          </div>

          <!-- Search + Controls -->
          <div class="filter-controls">
            <div class="search-wrap">
              <component :is="icons.Search" :size="16" class="search-icon" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="search-input"
              />
            </div>
          </div>
        </div>

        <!-- Results Info -->
        <div class="results-info">
          <span>{{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }} found</span>
          <span v-if="selectedCategory" class="active-filter">
            in <strong>{{ selectedCategory }}</strong>
            <button class="clear-filter" @click="selectedCategory = ''; searchQuery = ''">
              <component :is="icons.X" :size="12" />
            </button>
          </span>
        </div>

        <!-- Product Grid -->
        <div v-if="filteredProducts.length === 0" class="no-products">
          <component :is="icons.SearchX" :size="40" class="no-icon" />
          <h3>No products found</h3>
          <p>Try adjusting your search or selecting a different category.</p>
          <button class="btn btn-outline mt-4" @click="selectedCategory = ''; searchQuery = ''">Clear Filters</button>
        </div>
        <div v-else class="products-grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- CTA Banner -->
        <div class="catalog-cta mt-8">
          <div class="cta-content">
            <component :is="icons.HeadphonesIcon" :size="32" class="cta-icon" />
            <div>
              <h3>Can't find what you need?</h3>
              <p>Our team can source specific medical or dental supplies on request.</p>
            </div>
          </div>
          <NuxtLink to="/contact" class="btn btn-primary">Contact Our Team</NuxtLink>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Package, LayoutGrid, Search, X, SearchX, HeadphonesIcon,
  Stethoscope, Smile, FlaskConical, ScanLine, Wrench
} from '@lucide/vue'

const icons = { Package, LayoutGrid, Search, X, SearchX, HeadphonesIcon, Stethoscope, Smile, FlaskConical, ScanLine, Wrench }

const { products, getCategories } = useProducts()
const categories = getCategories()
const selectedCategory = ref('')
const searchQuery = ref('')

const categoryMetaMap: Record<string, { label: string; slug: string; icon: any }> = {
  'Medical Consumables': { label: 'Medical', slug: 'medical', icon: Stethoscope },
  'Diagnostics':         { label: 'Diagnostics', slug: 'diagnostics', icon: ScanLine },
  'Medical Instruments': { label: 'Instruments', slug: 'instruments', icon: Wrench },
  'Dental Supplies':     { label: 'Dental', slug: 'dental', icon: Smile },
  'Dental Instruments':  { label: 'Dental Inst.', slug: 'dental', icon: Wrench },
  'CSSD Materials':      { label: 'CSSD', slug: 'cssd', icon: FlaskConical },
}

const categoryMeta = computed(() =>
  categories.map(cat => ({
    name: cat,
    label: categoryMetaMap[cat]?.label ?? cat,
    slug: categoryMetaMap[cat]?.slug ?? 'medical',
    icon: categoryMetaMap[cat]?.icon ?? Stethoscope,
    count: products.value.filter(p => p.category === cat).length,
  }))
)

const filteredProducts = computed(() => {
  let list = products.value
  if (selectedCategory.value) list = list.filter(p => p.category === selectedCategory.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }
  return list
})

useSeoMeta({
  title: 'Our Product Catalog | BaseMed',
  ogTitle: 'Our Product Catalog | BaseMed',
  description: "Browse BaseMed's comprehensive catalog of premium medical, dental, and CSSD supplies in Qatar. Search top-tier healthcare products for clinics and hospitals.",
  ogDescription: "Browse BaseMed's comprehensive catalog of premium medical, dental, and CSSD supplies in Qatar. Search top-tier healthcare products for clinics and hospitals.",
  ogImage: 'https://basemed.qa/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
/* Header */
.page-header {
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
  padding: 4rem 0 3rem;
  border-bottom: 1px solid var(--color-border);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.page-title { font-size: 2.5rem; margin-bottom: 0.5rem; }
.page-subtitle { color: var(--color-text-muted); font-size: 1.0625rem; }

.header-stats { display: flex; gap: 0.75rem; flex-wrap: wrap; }

.stat-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

/* Catalog Section */
.catalog-section { padding: 3rem 0 5rem; }

/* Filter Bar */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1.5px solid var(--color-border);
  background: white;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tab:hover { border-color: var(--color-primary); color: var(--color-primary); }

.filter-tab.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.tab-count {
  background-color: rgba(255,255,255,0.25);
  padding: 0.05rem 0.4rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
}

.filter-tab:not(.active) .tab-count {
  background-color: var(--color-background);
  color: var(--color-text-muted);
}

/* Category colors */
.tab-medical.active { background: #0ea5e9; border-color: #0ea5e9; }
.tab-diagnostics.active { background: #8b5cf6; border-color: #8b5cf6; }
.tab-instruments.active { background: #f59e0b; border-color: #f59e0b; }
.tab-dental.active { background: #6366f1; border-color: #6366f1; }
.tab-cssd.active { background: #10b981; border-color: #10b981; }

/* Search */
.filter-controls { display: flex; gap: 0.75rem; align-items: center; }

.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.875rem;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-input {
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1.5px solid var(--color-border);
  border-radius: 9999px;
  font-family: inherit;
  font-size: 0.875rem;
  width: 220px;
  transition: all 0.2s ease;
  background-color: white;
  color: var(--color-text);
}

.search-input::placeholder { color: #b0b8c8; }
.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  width: 260px;
}

/* Results Info */
.results-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.active-filter {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.clear-filter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--color-border);
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: background-color 0.2s ease;
}

.clear-filter:hover { background-color: #cbd5e1; }

/* Products Grid */
.products-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 640px) {
  .products-grid {
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

/* No Products */
.no-products {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--color-text-muted);
  background-color: var(--color-background);
  border-radius: 1rem;
  border: 1px dashed var(--color-border);
}

.no-icon {
  color: var(--color-border);
  margin: 0 auto 1rem;
  display: block;
}

.no-products h3 {
  font-size: 1.25rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

/* CTA Banner */
.catalog-cta {
  background: linear-gradient(135deg, var(--color-secondary) 0%, #1e293b 100%);
  border-radius: 1rem;
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.cta-content {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.cta-icon { color: var(--color-primary); flex-shrink: 0; }

.catalog-cta h3 { color: white; font-size: 1.125rem; margin-bottom: 0.25rem; }
.catalog-cta p { color: #94a3b8; font-size: 0.9375rem; }
</style>
