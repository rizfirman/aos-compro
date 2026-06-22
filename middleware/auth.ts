import { doc, getDoc } from 'firebase/firestore'

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
    
    if (!user) {
      return navigateTo('/admin/login')
    }

    const userEmail = user?.email || ''
    const isAllowedDomain = userEmail.endsWith('@aosthetics.com')
    
    let isAllowedUser = false
    try {
      if (userEmail) {
        const db = $firebase.db
        const userDocRef = doc(db, 'users', userEmail)
        const userDocSnap = await getDoc(userDocRef)
        isAllowedUser = userDocSnap.exists() && userDocSnap.data()?.active === true
      }
    } catch (err) {
      console.error('Error verifying admin status in Firestore:', err)
    }

    if (!isAllowedUser && !isAllowedDomain) {
      await auth.signOut() 
      return navigateTo('/admin/login?error=unauthorized')
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

