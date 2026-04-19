import { ref } from 'vue'

export const useUpload = () => {
  const config = useRuntimeConfig()
  const uploadingId = ref<string | null>(null)
  const uploadProgress = ref(0)

  const parseError = (raw: string) => {
    try {
      const parsed = JSON.parse(raw)
      return parsed.error?.message || raw
    } catch (e) {
      return raw
    }
  }

  const performUpload = (file: File, type: 'image' | 'video', onProgress: (p: number) => void): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const maxSize = 100 * 1024 * 1024 // 100MB Limit Akun Free Cloudinary
      if (file.size > maxSize) {
        return reject(new Error('File terlalu besar (Maks 100MB). Mohon kompres video Anda terlebih dahulu.'))
      }

      const chunkSize = 10 * 1024 * 1024 // 10MB per chunk
      const totalSize = file.size
      const uniqueId = Date.now().toString() + Math.random().toString(36).substring(2)

      // Jika file kecil, gunakan standard upload
      if (totalSize <= chunkSize) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', config.public.cloudinaryUploadPreset)
        formData.append('resource_type', type)

        const xhr = new XMLHttpRequest()
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${config.public.cloudinaryCloudName}/auto/upload`)
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText).secure_url)
          else reject(new Error(parseError(xhr.responseText)))
        }
        xhr.onerror = () => reject(new Error('Masalah koneksi jaringan (Network Error)'))
        xhr.send(formData)
        return
      }

      // Jika file besar, gunakan Chunked Upload
      let start = 0
      let end = chunkSize
      let resultUrl = ''

      while (start < totalSize) {
        const chunk = file.slice(start, end)
        const isLastChunk = end >= totalSize
        const contentRange = `bytes ${start}-${Math.min(end, totalSize) - 1}/${totalSize}`

        try {
          const chunkUrl = await new Promise<string>((res, rej) => {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', `https://api.cloudinary.com/v1_1/${config.public.cloudinaryCloudName}/auto/upload`)
            
            xhr.setRequestHeader('X-Unique-Upload-Id', uniqueId)
            xhr.setRequestHeader('Content-Range', contentRange)

            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                const currentProgress = Math.round(((start + e.loaded) / totalSize) * 100)
                onProgress(Math.min(currentProgress, 99))
              }
            }

            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) res(JSON.parse(xhr.responseText).secure_url)
              else rej(new Error(parseError(xhr.responseText)))
            }
            xhr.onerror = () => rej(new Error('Network error saat upload chunk'))

            const formData = new FormData()
            formData.append('file', chunk)
            formData.append('upload_preset', config.public.cloudinaryUploadPreset)
            formData.append('resource_type', type)
            xhr.send(formData)
          })

          if (isLastChunk) {
            resultUrl = chunkUrl
          }
          start = end
          end = start + chunkSize
        } catch (err) {
          return reject(err)
        }
      }
      
      onProgress(100)
      resolve(resultUrl)
    })
  }

  return {
    uploadingId,
    uploadProgress,
    performUpload
  }
}
