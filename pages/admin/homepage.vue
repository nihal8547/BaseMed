<template>
  <div>
    <div class="admin-page-header">
      <h1 class="admin-title">Home Page CMS</h1>
      <p class="text-muted">Manage the content that appears on the public landing page.</p>
    </div>

    <div v-if="isLoading" class="p-8 text-center text-muted">
      Loading content configuration...
    </div>
    
    <div v-else class="cms-grid">
      <form @submit.prevent="handleSubmit" class="cms-form">
        
        <!-- Hero Section -->
        <div class="admin-form-card mb-6">
          <h2 class="section-heading">Hero Section</h2>
          <div class="form-group">
            <label>Badge Text</label>
            <input v-model="form.hero.badge" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label>Main Title</label>
            <input v-model="form.hero.title" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label>Subtitle</label>
            <textarea v-model="form.hero.subtitle" rows="3" class="form-input"></textarea>
          </div>
          <div class="form-group">
            <label>Background Image</label>
            <div class="image-upload-wrap">
              <div v-if="form.hero.bgImage" class="image-preview">
                <img :src="form.hero.bgImage" alt="Hero BG Preview" />
                <button type="button" class="btn-icon bg-white text-danger remove-img" @click="form.hero.bgImage = ''">
                  <component :is="icons.X" :size="16" />
                </button>
              </div>
              <div v-else class="upload-placeholder">
                <input type="file" accept="image/*" @change="handleBgImageUpload" class="file-input" :disabled="isUploadingBg" />
                <div class="upload-content">
                  <span v-if="isUploadingBg">Uploading...</span>
                  <span v-else>Click or drag to upload image</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trust Section -->
        <div class="admin-form-card mb-6">
          <h2 class="section-heading">Trust Section ("Why Choose Us")</h2>
          <div class="form-group">
            <label>Section Title</label>
            <input v-model="form.trust.title" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label>Section Subtitle</label>
            <textarea v-model="form.trust.subtitle" rows="2" class="form-input"></textarea>
          </div>

          <h3 class="subsection-heading mt-4">Features (3 items max recommended)</h3>
          <div v-for="(feat, index) in form.trust.features" :key="index" class="feature-box">
            <div class="flex justify-between items-center mb-2">
              <label class="mb-0">Feature 0{{ index + 1 }}</label>
              <button type="button" class="btn-icon text-danger btn-sm-icon" @click="removeTrustFeature(index)">
                <component :is="icons.X" :size="14" />
              </button>
            </div>
            <input v-model="feat.title" type="text" class="form-input mb-2" placeholder="Title" />
            <textarea v-model="feat.desc" rows="2" class="form-input" placeholder="Description"></textarea>
          </div>
          <button type="button" class="btn btn-outline btn-sm mt-2" @click="addTrustFeature">
            + Add Trust Feature
          </button>
        </div>

        <!-- Mission Section -->
        <div class="admin-form-card mb-6">
          <h2 class="section-heading">Mission Statement</h2>
          <div class="form-group">
            <label>Quote Text</label>
            <textarea v-model="form.mission.quote" rows="4" class="form-input"></textarea>
          </div>
        </div>

        <!-- Featured Products -->
        <div class="admin-form-card mb-6">
          <h2 class="section-heading">Featured Products</h2>
          <p class="text-muted mb-4">Select the products you want to feature on the public home page.</p>
          
          <div v-if="products.length === 0" class="text-muted">Loading products...</div>
          <div v-else class="featured-products-grid">
            <label v-for="product in products" :key="product.id" class="product-checkbox-card" :class="{ 'is-selected': form.featuredProductIds.includes(product.id) }">
              <input type="checkbox" :value="product.id" v-model="form.featuredProductIds" class="hidden-checkbox" />
              <img :src="product.image" alt="" class="product-thumb" />
              <div class="product-info">
                <div class="product-name truncate">{{ product.name }}</div>
                <div class="product-cat truncate">{{ product.category }}</div>
              </div>
              <div class="check-circle">
                <component :is="icons.Check" :size="14" v-if="form.featuredProductIds.includes(product.id)" />
              </div>
            </label>
          </div>
        </div>

        <div class="form-actions sticky-actions">
          <button type="submit" class="btn btn-primary btn-large" :disabled="isSaving || isUploadingBg">
            {{ isSaving ? 'Saving...' : 'Save All Content' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, Check } from '@lucide/vue'

definePageMeta({ layout: 'admin', middleware: ['auth'] })
useHead({ title: 'Home Page CMS' })

const icons = { X, Check }
const { cmsContent, fetchContent, updateContent } = useSiteContent()
const { products, fetchProducts } = useProducts()
const isLoading = ref(true)
const isSaving = ref(false)
const isUploadingBg = ref(false)

const form = ref({
  hero: { badge: '', title: '', subtitle: '', bgImage: '' },
  trust: { title: '', subtitle: '', features: [{ title: '', desc: '' }] },
  mission: { quote: '' },
  featuredProductIds: [] as string[]
})

onMounted(async () => {
  await Promise.all([
    fetchContent(),
    products.value.length === 0 ? fetchProducts() : Promise.resolve()
  ])
  if (cmsContent.value) {
    form.value = JSON.parse(JSON.stringify(cmsContent.value))
    if (!form.value.featuredProductIds) {
      form.value.featuredProductIds = []
    }
  }
  isLoading.value = false
})

const addTrustFeature = () => {
  form.value.trust.features.push({ title: '', desc: '' })
}

const removeTrustFeature = (index: number) => {
  form.value.trust.features.splice(index, 1)
}

const handleBgImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  const formData = new FormData()
  formData.append('file', file)

  isUploadingBg.value = true
  try {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (response.url) {
      form.value.hero.bgImage = response.url
    }
  } catch (error) {
    alert('Failed to upload image')
  } finally {
    isUploadingBg.value = false
    target.value = ''
  }
}

const handleSubmit = async () => {
  isSaving.value = true
  try {
    await updateContent(form.value)
    alert('Home page content updated successfully!')
  } catch (error) {
    alert('Failed to update content.')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.admin-page-header { margin-bottom: 2rem; }
.admin-title { font-size: 1.75rem; color: var(--color-secondary); margin-bottom: 0.25rem; }
.text-muted { color: var(--color-text-muted); }

.cms-grid { max-width: 800px; }

.admin-form-card {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.mb-6 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-0 { margin-bottom: 0 !important; }

.section-heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.subsection-heading {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-secondary);
}

.form-group { margin-bottom: 1.25rem; }
.form-group label {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.9375rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.feature-box {
  background-color: #f8fafc;
  border: 1px solid var(--color-border);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.flex { display: flex; }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }

.btn-sm { padding: 0.35rem 0.75rem; font-size: 0.8125rem; }
.btn-sm-icon { width: 24px; height: 24px; }

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
}

.text-danger { color: #dc2626; }
.text-danger:hover { background-color: #fee2e2; }

.sticky-actions {
  position: sticky;
  bottom: 2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 0 0 1px var(--color-border);
  display: flex;
  justify-content: flex-end;
  z-index: 20;
}

.btn-large { padding: 0.875rem 2.5rem; font-size: 1rem; }

.image-upload-wrap {
  border: 2px dashed var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  transition: border-color 0.2s;
  background-color: #f8fafc;
}

.image-upload-wrap:hover {
  border-color: var(--color-primary);
}

.image-preview {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.image-preview img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  display: block;
}

.remove-img {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.bg-white { background-color: white; }

.upload-placeholder {
  position: relative;
  padding: 2rem 1rem;
  cursor: pointer;
}

.file-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-content {
  color: var(--color-text-muted);
  font-weight: 500;
  font-size: 0.875rem;
}

.mb-4 { margin-bottom: 1rem; }
.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Featured Products Selection */
.featured-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.hidden-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.product-checkbox-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;
  user-select: none;
}

.product-checkbox-card:hover {
  border-color: #cbd5e1;
  background-color: #f8fafc;
}

.product-checkbox-card.is-selected {
  border-color: var(--color-primary);
  background-color: #f0f9ff;
}

.product-thumb {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  object-fit: cover;
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-secondary);
}

.product-cat {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.check-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  transition: all 0.2s;
}

.is-selected .check-circle {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
