<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <NuxtLink to="/admin" class="admin-brand">
          <span class="brand-icon">B</span>
          <span class="brand-text">BaseMed Admin</span>
        </NuxtLink>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">MENU</div>
        <NuxtLink to="/admin" class="nav-link" active-class="active" exact>
          <component :is="icons.LayoutDashboard" :size="18" />
          Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/products" class="nav-link" active-class="active">
          <component :is="icons.PackageSearch" :size="18" />
          Products
        </NuxtLink>
        <NuxtLink to="/admin/messages" class="nav-link" active-class="active">
          <component :is="icons.Mail" :size="18" />
          Inbox
        </NuxtLink>
        <NuxtLink to="/admin/categories" class="nav-link" active-class="active">
          <component :is="icons.Tags" :size="18" />
          Categories
        </NuxtLink>
        <NuxtLink to="/admin/homepage" class="nav-link" active-class="active">
          <component :is="icons.LayoutTemplate" :size="18" />
          Home Page CMS
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <NuxtLink to="/" class="nav-link text-muted">
          <component :is="icons.ExternalLink" :size="18" />
          View Live Site
        </NuxtLink>
        <button @click="handleLogout" class="nav-link text-danger w-full text-left mt-2" style="background: transparent; border: none; cursor: pointer;">
          <component :is="icons.LogOut" :size="18" />
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="admin-main">
      <header class="admin-header">
        <div class="header-search">
          <component :is="icons.Search" :size="16" class="text-muted" />
          <input type="text" placeholder="Search admin..." />
        </div>
        <div class="header-user">
          <div class="user-avatar">A</div>
          <span>Admin User</span>
        </div>
      </header>

      <main class="admin-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutDashboard, PackageSearch, LayoutTemplate, ExternalLink, Search, LogOut, Tags, Mail } from '@lucide/vue'

const icons = { LayoutDashboard, PackageSearch, LayoutTemplate, ExternalLink, Search, LogOut, Tags, Mail }
const { user, logout } = useAuth()
const router = useRouter()

const handleLogout = async () => {
  await logout()
  router.push('/admin/login')
}

useHead({
  titleTemplate: '%s | BaseMed Admin'
})
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

/* Sidebar */
.admin-sidebar {
  width: 260px;
  background-color: white;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.admin-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.brand-icon {
  width: 32px;
  height: 32px;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 800;
  font-size: 1.125rem;
}

.brand-text {
  font-weight: 700;
  color: var(--color-secondary);
  font-size: 1.125rem;
}

.sidebar-nav {
  padding: 1.5rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-section {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
  letter-spacing: 1px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: var(--color-text);
  font-weight: 500;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #f1f5f9;
}

.nav-link.active {
  background-color: #e0f2fe;
  color: var(--color-primary);
}

.nav-link.active svg {
  color: var(--color-primary);
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}

.text-muted { color: var(--color-text-muted); }
.text-danger { color: #dc2626; }
.text-danger:hover { background-color: #fee2e2; }
.w-full { width: 100%; }
.text-left { text-align: left; }
.mt-2 { margin-top: 0.5rem; }

/* Main Content */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Important for flex children to truncate text */
}

.admin-header {
  height: 64px;
  background-color: white;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f1f5f9;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  width: 300px;
}

.header-search input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.875rem;
  width: 100%;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-avatar {
  width: 36px;
  height: 36px;
  background-color: var(--color-secondary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.admin-content {
  padding: 2rem;
  flex: 1;
}
</style>
