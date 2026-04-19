export default defineNuxtRouteMiddleware(async (to) => {
  const { $firebase } = useNuxtApp() as any
  const auth = $firebase?.auth

  if (!auth) return

  // Fungsi helper untuk mengecek status login
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user: any) => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
  }

  // Jika mencoba akses /admin tapi belum login
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    const user = (await getCurrentUser()) as any
    
    // Whitelist check
    const allowedEmails = ['rizfirman@gmail.com', 'aosthetics.aosthetics@gmail.com']
    const isAllowedDomain = user?.email?.endsWith('@aosthetics.com')
    const isAllowedEmail = allowedEmails.includes(user?.email || '')

    if (!user || (!isAllowedEmail && !isAllowedDomain)) {
      if (user) await auth.signOut() 
      return navigateTo('/admin/login')
    }
  }

  // Jika sudah login tapi malah buka halaman login lagi
  if (to.path === '/admin/login') {
    const user = await getCurrentUser()
    if (user) {
      return navigateTo('/admin')
    }
  }
})

