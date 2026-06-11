import { defineStore } from 'pinia'

interface Notification {
  show: boolean
  message: string
  type: 'success' | 'error' | 'info'
}

interface Modal {
  show: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel?: () => void
}

export const useUiStore = defineStore('ui', () => {
  const notification = ref<Notification>({
    show: false,
    message: '',
    type: 'success'
  })

  const modal = ref<Modal>({
    show: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })

  const notify = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    notification.value = { show: true, message, type }
    setTimeout(() => {
      notification.value.show = false
    }, 4000)
  }

  const confirm = (title: string, message: string, onConfirm: () => void, onCancel?: () => void) => {
    modal.value = {
      show: true,
      title,
      message,
      onConfirm: () => {
        onConfirm()
        modal.value.show = false
      },
      onCancel: () => {
        if (onCancel) onCancel()
        modal.value.show = false
      }
    }
  }

  return {
    notification,
    modal,
    notify,
    confirm
  }
})
