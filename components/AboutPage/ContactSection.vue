<template>
  <section ref="el" class="border-t border-border py-24 md:py-36">
    <div class="container">
      <!-- TITLE -->
      <div class="mb-16 md:mb-20">
        <p class="mb-4 text-[10px] uppercase tracking-[0.4em] text-primary">
          Contact
        </p>

        <AnimatedText
          text="Let's Build"
          as="h2"
          animation="kinetic"
          :ready="ready"
          class="font-display text-5xl leading-[0.9] md:text-7xl lg:text-8xl"
        />

        <AnimatedText
          text="the Visual."
          as="h2"
          animation="kinetic"
          :delay="0.2"
          :ready="ready"
          class="font-display text-5xl leading-[0.9] md:text-7xl lg:text-8xl"
        />
      </div>

      <!-- CONTENT -->
      <div class="grid grid-cols-1 gap-16 md:gap-24 lg:grid-cols-12">
        <!-- FORM -->
        <form class="space-y-8 lg:col-span-7" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <!-- NAME -->
              <div>
                <input
                  v-model="form.name"
                  placeholder="Name"
                  class="input"
                  :class="{ 'input-error': errors.name }"
                  :disabled="loading"
                  @blur="errors.name = validateField('name', form.name)"
                />
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
              </div>

              <!-- EMAIL -->
              <div>
                <input
                  v-model="form.email"
                  placeholder="Email"
                  class="input"
                  :class="{ 'input-error': errors.email }"
                  :disabled="loading"
                  @blur="errors.email = validateField('email', form.email)"
                />
                <p v-if="errors.email" class="error">{{ errors.email }}</p>
              </div>
            </div>
          </div>
          <div>
            <input
              v-model="form.company"
              placeholder="Company"
              class="input"
              :class="{ 'input-error': errors.company }"
              :disabled="loading"
              @blur="errors.company = validateField('company', form.company)"
            />
            <p v-if="errors.company" class="error">{{ errors.company }}</p>
          </div>

          <div>
            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Project Details"
              class="input resize-none"
              :class="{ 'input-error': errors.message }"
              :disabled="loading"
              @blur="errors.message = validateField('message', form.message)"
            />
            <p v-if="errors.message" class="error">{{ errors.message }}</p>
          </div>

          <!-- SUCCESS -->
          <transition name="fade">
            <p v-if="success" class="success">
              {{ success }}
            </p>
          </transition>

          <MagneticButton>
            <button class="btn" :disabled="loading">
              <span v-if="loading" class="animate-pulse">Sending...</span>
              <span v-else>Send Inquiry</span>
            </button>
          </MagneticButton>
        </form>
        <!-- INFO -->
        <div class="space-y-10 lg:col-span-4 lg:col-start-9">
          <div>
            <p class="label">Email</p>
            <a :href="`mailto:${cmsStore.socialSettings?.email || 'aosthetics@gmail.com'}`" class="link">
              {{ cmsStore.socialSettings?.email || 'aosthetics@gmail.com' }}
            </a>
          </div>

          <div>
            <p class="label">Location</p>
            <p class="text-sm">Jakarta, Indonesia</p>
          </div>

          <div>
            <p class="label">Follow</p>
            <div class="flex flex-col gap-2">
              <a :href="cmsStore.socialSettings?.instagram || '#'" target="_blank">Instagram</a>
              <a :href="cmsStore.socialSettings?.youtube || '#'" target="_blank">YouTube</a>
              <a href="#">Behance</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import emailjs from '@emailjs/browser'
  import { useCmsStore } from '@/stores/cms'
  import { storeToRefs } from 'pinia'

  defineProps<{ ready: boolean }>()

  const cmsStore = useCmsStore()

  const config = useRuntimeConfig()

  const emailServiceId = config.public.EMAIL_SERVICE_ID as string
  const emailTemplateId = config.public.EMAIL_TEMPLATE_ID as string
  const emailPublicKey = config.public.EMAIL_PUBLIC_KEY as string

  const form = ref({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const loading = ref(false)
  const success = ref('')

  const errors = ref({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  /* ================= VALIDATION ================= */
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        return ''

      case 'email': {
        if (!value.trim()) return 'Email is required'

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Invalid email format'

        return ''
      }

      case 'company':
        if (!value.trim()) return 'Company is required'
        return ''

      case 'message':
        if (!value.trim()) return 'Message is required'
        return ''

      default:
        return ''
    }
  }

  /* ================= REAL-TIME VALIDATION ================= */
  watch(
    () => form.value,
    (newVal) => {
      // validate tiap field kalau user sudah pernah error
      Object.keys(errors.value).forEach((key) => {
        if (errors.value[key as keyof typeof errors.value]) {
          errors.value[key as keyof typeof errors.value] = validateField(
            key,
            newVal[key as keyof typeof newVal],
          )
        }
      })
    },
    { deep: true },
  )

  /* ================= VALIDATE ALL ================= */
  const validateAll = () => {
    let isValid = true

    Object.keys(form.value).forEach((key) => {
      const error = validateField(
        key,
        form.value[key as keyof typeof form.value],
      )

      errors.value[key as keyof typeof errors.value] = error

      if (error) isValid = false
    })

    return isValid
  }

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    success.value = ''

    if (!validateAll()) return

    loading.value = true

    try {
      await emailjs.send(
        emailServiceId,
        emailTemplateId,
        {
          name: form.value.name,
          email: form.value.email,
          company: form.value.company,
          message: form.value.message,
        },
        emailPublicKey,
      )

      success.value = 'Message sent successfully 🚀'

      form.value = { name: '', email: '', company: '', message: '' }
      errors.value = { name: '', email: '', company: '', message: '' }
    } catch (err) {
      console.error(err)
      errors.value.message = 'Failed to send. Try again later.'
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped>
  .input {
    @apply w-full border-b border-border bg-transparent py-3 outline-none transition-all duration-300;
  }

  .input:focus {
    @apply border-primary;
  }

  .input-error {
    @apply border-red-500;
  }

  .error {
    @apply mt-2 text-xs text-red-400 opacity-80 transition-all duration-300;
  }

  .success {
    @apply text-sm text-green-400 opacity-90 transition-all duration-500;
  }

  .btn {
    @apply border px-10 py-5 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 disabled:opacity-50;
  }

  /* smooth fade */
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>
