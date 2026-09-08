<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { fetchProducts } = useProducts()
const { fetchContent } = useSiteContent()

// Fetch initial data on app load
await Promise.all([
  fetchProducts(),
  fetchContent()
])

const title = 'BaseMed | Premium Medical Supplies in Qatar'
const description = "BaseMed is Qatar's trusted supplier of premium medical, dental, and CSSD materials. We empower clinics, hospitals, and dental practices with high-quality supplies, exceptional service, and timely delivery."
const siteUrl = 'https://basemed.qa'
const ogImage = 'https://basemed.qa/og-image.jpg'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  ogType: 'website',
  ogUrl: siteUrl,
  themeColor: '#15383e' // Primary brand color
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        name: 'BaseMed',
        url: siteUrl,
        logo: `${siteUrl}/og-image.jpg`,
        description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Healthcare Avenue, West Bay',
          addressLocality: 'Doha',
          addressCountry: 'QA'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+974-3101-3666, +974-7751-2884',
          contactType: 'customer service',
          email: 'basemedtrading@gmail.com'
        }
      })
    }
  ]
})
</script>
