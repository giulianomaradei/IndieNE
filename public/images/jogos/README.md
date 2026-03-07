# Imagens dos jogos

Coloque aqui as imagens dos jogos (capas, thumbs, hero).

**Convenção:**
- Nome do arquivo: use o `id` do jogo (ex.: `god-breakers.jpg`, `hades.png`).
- No código (`app/data/jogos.ts`), defina o campo `thumb` com o caminho a partir da raiz do site:

  `thumb: '/images/jogos/god-breakers.jpg'`

**Exemplo:** se você colocar o arquivo `god-breakers.jpg` nesta pasta, no array de jogos use:

```ts
{ id: 'god-breakers', title: 'God Breakers', thumb: '/images/jogos/god-breakers.jpg', ... }
```

Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp`.
