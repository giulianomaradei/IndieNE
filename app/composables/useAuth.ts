const AUTH_COOKIE = 'indiene_auth'
const USERS_STORAGE = 'indiene_users'

export interface User {
  email: string
  nome: string
}

export interface StoredUser extends User {
  senha: string
}

function getStoredUsers (): StoredUser[] {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(USERS_STORAGE)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }
  return []
}

function setStoredUsers (users: StoredUser[]) {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    localStorage.setItem(USERS_STORAGE, JSON.stringify(users))
  }
}

export function useAuth () {
  const authCookie = useCookie<{ user: User } | null>(AUTH_COOKIE, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    default: () => null
  })

  const user = computed(() => authCookie.value?.user ?? null)
  const isLoggedIn = computed(() => !!authCookie.value?.user)

  function login (email: string, senha: string): { ok: boolean; erro?: string } {
    const users = getStoredUsers()
    const normalized = email.trim().toLowerCase()
    const found = users.find(u => u.email.toLowerCase() === normalized)
    if (!found) {
      return { ok: false, erro: 'E-mail não cadastrado.' }
    }
    if (found.senha !== senha) {
      return { ok: false, erro: 'Senha incorreta.' }
    }
    authCookie.value = { user: { email: found.email, nome: found.nome } }
    return { ok: true }
  }

  function register (nome: string, email: string, senha: string): { ok: boolean; erro?: string } {
    const trimmedNome = nome.trim()
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedNome) return { ok: false, erro: 'Nome é obrigatório.' }
    if (!trimmedEmail) return { ok: false, erro: 'E-mail é obrigatório.' }
    if (senha.length < 6) return { ok: false, erro: 'Senha deve ter no mínimo 6 caracteres.' }

    const users = getStoredUsers()
    if (users.some(u => u.email.toLowerCase() === trimmedEmail)) {
      return { ok: false, erro: 'Este e-mail já está cadastrado.' }
    }

    users.push({ nome: trimmedNome, email: trimmedEmail, senha })
    setStoredUsers(users)
    authCookie.value = { user: { nome: trimmedNome, email: trimmedEmail } }
    return { ok: true }
  }

  function logout () {
    authCookie.value = null
  }

  return { user, isLoggedIn, login, register, logout }
}
