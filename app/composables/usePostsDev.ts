import type { Atualizacao } from '~/types/jogo-detalhes.interface'
import type { ApiPostagem } from '~/types/postagem.interface'
import { usePostagemService } from '~/services/postagem.service'
import { useImagemService } from '~/services/imagem.service'

function mapPost (post: ApiPostagem, imagem?: string): Atualizacao {
  return {
    id: post.id, titulo: post.titulo, descricao: post.descricao || '',
    data: new Date(post.data).toLocaleString('pt-BR'), imagem, comentarios: []
  }
}

export function usePostsDev () {
  const data = useState<Record<string, Atualizacao[]>>('posts-dev-api', () => ({}))
  const postagemService = usePostagemService()
  const imagemService = useImagemService()
  const { getJogoById } = useMeusJogos()

  function getPosts (jogoId: string) { return data.value[jogoId] || [] }

  async function refresh (jogoId: string) {
    const jogo = getJogoById(jogoId)
    if (!jogo?.apiId) return
    // TODO(API): usar GET /publicacoes?jogoId quando o backend oferecer o filtro; o limite de 100 pode omitir publicações.
    const page = await postagemService.listar({ size: 100, sort: 'data,desc' })
    data.value[jogoId] = await Promise.all(page.content
      .filter(post => post.jogoId === jogo.apiId)
      .map(async (post) => {
        const imagens = await imagemService.listar({ postagemId: post.id })
        return mapPost(post, imagens[0]?.imagem)
      }))
  }

  async function addPost (jogoId: string, post: Omit<Atualizacao, 'comentarios'>) {
    const jogo = getJogoById(jogoId)
    if (!jogo?.apiId) throw new Error('Jogo não encontrado.')
    const created = await postagemService.criar({ jogoId: jogo.apiId, titulo: post.titulo, descricao: post.descricao })
    // TODO(API): o seletor produz Data URL, mas o contrato atual limita imagem a 2.000 caracteres.
    if (post.imagem) await imagemService.criar({ postagemId: created.id, imagem: post.imagem })
    data.value[jogoId] = [mapPost(created, post.imagem), ...getPosts(jogoId)]
  }

  return { getPosts, refresh, addPost }
}
