<template>
  <header class="navbar">
    <div class="container navbar-content">
      <NuxtLink to="/" class="brand">
        <img src="/Based%20Med.png" alt="BaseMed Logo" class="brand-logo" />
        <span class="brand-text"><span class="brand-base">Base</span><span class="brand-med">Med</span></span>
      </NuxtLink>
      <nav class="nav-links">
        <NuxtLink to="/" class="nav-link" active-class="active">Home</NuxtLink>
        <NuxtLink to="/products" class="nav-link" active-class="active">Products</NuxtLink>
        <NuxtLink to="/about" class="nav-link" active-class="active">About</NuxtLink>
        <NuxtLink to="/contact" class="nav-link" active-class="active">Contact</NuxtLink>
      </nav>
      <div class="navbar-right">
        <NuxtLink to="/contact" class="btn btn-primary btn-inquire">
          <component :is="icons.MessageSquare" :size="16" />
          Inquire Now
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MessageSquare } from '@lucide/vue'
const icons = { MessageSquare }
</script>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--color-border);
}
.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.5rem;
}
.brand { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
.brand-logo { height: 2.5rem; object-fit: contain; }
.brand-text { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.5px; }
.brand-base { color: var(--color-secondary); }
.brand-med { color: var(--color-primary); }
.nav-links { display: none; }
@media (min-width: 768px) { .nav-links { display: flex; gap: 2rem; } }
.nav-link { color: var(--color-text-muted); font-weight: 500; position: relative; }
.nav-link:hover, .nav-link.active { color: var(--color-primary); }
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 0.2s ease;
}
.nav-link:hover::after, .nav-link.active::after { width: 100%; }
.navbar-right { display: none; }
@media (min-width: 768px) { .navbar-right { display: flex; } }
.btn-inquire {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
}
</style>
