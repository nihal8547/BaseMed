<template>
  <div>
    <div class="admin-page-header">
      <h1 class="admin-title">Inbox</h1>
      <p class="text-muted">Manage incoming inquiries from the contact form.</p>
    </div>

    <div class="inbox-container">
      <!-- Message List Sidebar -->
      <div class="message-list">
        <div v-if="isLoading" class="p-8 text-center text-muted">Loading messages...</div>
        <div v-else-if="messages.length === 0" class="p-8 text-center text-muted">No messages found.</div>
        <template v-else>
          <div 
            v-for="msg in messages" 
            :key="msg.id" 
            class="message-item" 
            :class="{ 'is-active': selectedMessage?.id === msg.id, 'is-unread': msg.status === 'unread' }"
            @click="selectMessage(msg)"
          >
            <div class="msg-header">
              <span class="msg-name">{{ msg.firstName }} {{ msg.lastName }}</span>
              <span class="msg-date">{{ formatDate(msg.createdAt) }}</span>
            </div>
            <div class="msg-subject">{{ formatSubject(msg.subject) }}</div>
            <div class="msg-preview">{{ msg.message }}</div>
          </div>
        </template>
      </div>

      <!-- Message Detail View -->
      <div class="message-detail">
        <div v-if="!selectedMessage" class="empty-state">
          <component :is="icons.Mail" :size="48" class="text-muted mb-4" />
          <p>Select a message to read it</p>
        </div>
        <div v-else class="detail-content">
          <div class="detail-header">
            <div class="detail-info">
              <h2>{{ formatSubject(selectedMessage.subject) }}</h2>
              <div class="sender-details">
                <strong>From:</strong> {{ selectedMessage.firstName }} {{ selectedMessage.lastName }} &lt;{{ selectedMessage.email }}&gt;
              </div>
              <div class="sender-meta" v-if="selectedMessage.phone || selectedMessage.facility">
                <span v-if="selectedMessage.phone"><strong>Phone:</strong> {{ selectedMessage.phone }}</span>
                <span v-if="selectedMessage.facility"><strong>Facility:</strong> {{ selectedMessage.facility }}</span>
              </div>
              <div class="date-detail">{{ formatFullDate(selectedMessage.createdAt) }}</div>
            </div>
            <div class="detail-actions">
              <button class="btn btn-outline" @click="handleDelete(selectedMessage.id)">
                <component :is="icons.Trash2" :size="16" />
                Delete
              </button>
            </div>
          </div>
          <div class="detail-body">
            <p v-for="(paragraph, i) in selectedMessage.message.split('\n')" :key="i">{{ paragraph }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, Trash2 } from '@lucide/vue'

definePageMeta({ layout: 'admin', middleware: ['auth'] })
useHead({ title: 'Inbox' })

const icons = { Mail, Trash2 }
const { messages, isLoading, fetchMessages, markAsRead, deleteMessage } = useMessages()

const selectedMessage = ref<any>(null)

onMounted(async () => {
  await fetchMessages()
})

const selectMessage = async (msg: any) => {
  selectedMessage.value = msg
  if (msg.status === 'unread') {
    await markAsRead(msg.id)
  }
}

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this message?')) {
    await deleteMessage(id)
    if (selectedMessage.value?.id === id) {
      selectedMessage.value = null
    }
  }
}

const formatSubject = (val: string) => {
  const map: Record<string, string> = {
    quote: 'Product Quote',
    support: 'Technical Support',
    partnership: 'Partnership / Distribution',
    other: 'Other'
  }
  return map[val] || val
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
}

const formatFullDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.admin-page-header { margin-bottom: 1.5rem; }
.admin-title { font-size: 1.75rem; color: var(--color-secondary); margin-bottom: 0.25rem; }
.text-muted { color: var(--color-text-muted); }

.inbox-container {
  display: flex;
  height: calc(100vh - 180px);
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

/* Message List */
.message-list {
  width: 350px;
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
  background-color: #f8fafc;
}

.message-item {
  padding: 1.25rem;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background-color 0.2s;
}

.message-item:hover { background-color: white; }
.message-item.is-active { background-color: #f0f9ff; border-left: 4px solid var(--color-primary); }

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
}

.msg-name { font-weight: 600; color: var(--color-secondary); font-size: 0.9375rem; }
.message-item.is-unread .msg-name { color: var(--color-primary); font-weight: 700; }

.msg-date { font-size: 0.75rem; color: var(--color-text-muted); }
.message-item.is-unread .msg-date { color: var(--color-primary); font-weight: 600; }

.msg-subject { font-size: 0.8125rem; color: var(--color-text); margin-bottom: 0.5rem; font-weight: 500; }
.msg-preview {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Message Detail */
.message-detail {
  flex: 1;
  overflow-y: auto;
  background-color: white;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-muted);
}
.mb-4 { margin-bottom: 1rem; }

.detail-content {
  padding: 2.5rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 2rem;
}

.detail-info h2 { font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 1rem; }

.sender-details { font-size: 0.9375rem; color: var(--color-text); margin-bottom: 0.5rem; }
.sender-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}
.date-detail { font-size: 0.8125rem; color: var(--color-text-muted); margin-top: 1rem; }

.detail-body {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text);
  white-space: pre-wrap;
}

.detail-body p { margin-bottom: 1rem; }
</style>
