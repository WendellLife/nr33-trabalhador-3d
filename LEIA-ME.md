# NR 33 • Trabalhador autorizado (jogo educativo 3D)

Jogo educativo da série de jogos de segurança do trabalho, sobre **espaços confinados (NR 33)**, na função de **trabalhador autorizado**. Capacitação da função: **16 horas** iniciais e 8 horas a cada 12 meses (Anexo III da NR 33).

Você é o **trabalhador autorizado** que entra no tanque T-02 de uma estação de tratamento para a limpeza. Respeite a sinalização, confira a PET, coloque o seu cadeado, combine com a vigia, entre, recuse serviço fora da PET, comunique o sintoma, cumpra o abandono e não volte para socorrer sem proteção.

As outras funções têm jogo próprio, na mesma operação e no mesmo padrão: [Supervisor de entrada](https://github.com/WendellLife/nr33-supervisor-3d) • [Vigia](https://github.com/WendellLife/nr33-vigia-3d).

> **Conteúdo educativo.** Não substitui a capacitação com prática e avaliação, a PET, os procedimentos nem o plano de resgate da empresa. Leia o [SAFETY-NOTES.md](SAFETY-NOTES.md).

## Como abrir

Requer Node.js 18 ou superior (ou Python 3).

- **Windows:** dê dois cliques em `INICIAR.cmd` e abra http://127.0.0.1:8765
- **Qualquer sistema:** `npm start` (ou `node server.mjs`) e abra http://127.0.0.1:8765
- **Hospedagem estática:** publique a pasta `dist/` como está. Não há build nem dependências npm. O Three.js 0.170.0 está em `dist/`.

## Controles

| Ação | Teclado | Celular |
|---|---|---|
| Mover | WASD ou setas | botões de seta na tela |
| Correr | Shift | — |
| Interagir | E | botão AÇÃO |
| Fontes e origem do conteúdo | botão **Fontes** | botão **Fontes** |
| Pausar | Esc ou botão Ⅱ | botão Ⅱ |

O losango verde é você. O losango azul, o alvo luminoso e as setas no chão marcam o destino.

**Painel do detector** (canto superior direito): leitura de oxigênio, inflamáveis (% do LIE), gás sulfídrico e monóxido de carbono, com o limite de cada um, em verde quando aceitável e em vermelho quando não; a situação da **PET**; e **quantas pessoas estão dentro do tanque**.

**Tanque em corte:** o T-02 aparece sem o teto, para o jogador ver o interior. A entrada é só pela boca de visita, onde ficam a placa do Anexo I, o tripé com guincho e o posto do vigia. Quando a atmosfera fica perigosa, o interior ganha uma névoa amarelada e o alarme pisca na entrada.

## Origem do conteúdo (muito importante)

| Etiqueta | Significa |
|---|---|
| **Em vigor** | NR 33 com a redação da Portaria SEPRT 1.690/2022, em vigor desde 03/10/2022, incluídos os Anexos I (sinalização), II (modelo de PET) e III (capacitação). Também NR 7 quando citada. |
| **Boa prática — não é item de NR** | Procedimentos técnicos úteis, que não são exigência de NR. Os limites de H₂S (8 ppm) e CO (39 ppm) do painel são os limites de tolerância da NR 15, usados como referência. |

Etiquetas com **“conferir subitem”** marcam o Quadro 1 do Anexo III, que deve ser conferido no texto oficial antes do uso em sala de aula.

## Sequência das 12 etapas

| # | Etapa | Origem |
|---|---|---|
| 1 | Confira a sua capacitação | 33.6.2 • Anexo III — Quadro 1: trabalhador autorizado, 16 h inicial e 8 h a cada 12 meses • 33.5.19.2 |
| 2 | Leia a sinalização | 33.5.13 • Anexo I — sinalização obrigatória • 33.7.1 a) |
| 3 | Conheça os perigos do tanque | 33.5.10 • 33.3.1 f) • 33.2.2.1 |
| 4 | Confira a PET | 33.3.5 a) • 33.5.6 • 33.7.1 b) |
| 5 | Coloque o seu cadeado | 33.5.14.2 • 33.5.14.3 • 33.5.14.1 |
| 6 | Prepare o equipamento | 33.3.5 b) • 33.5.17.1 • 33.5.4 |
| 7 | Combine com a vigia e entre | 33.3.4 c) • 33.3.5 a) • 33.7.1 c) |
| 8 | Trabalhe dentro do tanque | 33.5.15.3 • 33.5.16.2 • 33.5.1 • 33.3.5 a) |
| 9 | Você não está bem | 33.3.5 c) • 33.3.4 f) |
| 10 | Ordem de abandono | 33.3.4 f) • 33.3.5 a) |
| 11 | Bento caiu lá dentro | 33.5.17.2 • 33.3.4 d) • 33.3.6 a) |
| 12 | Retire o seu cadeado | 33.5.14.3 • 33.3.4 b) • 33.5.11 |

Cada decisão tem três opções, uma única correta, e cada opção tem um feedback didático.

## Personagens

Você é: **Trabalhador autorizado**. Com você na operação: Marcos (supervisor de entrada), Elaine (vigia), Bento (parceiro de entrada), Sandra (líder da equipe de emergência) e Nelson (operador de processo).

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `dist/index.html`, `dist/style.css` | Interface (mesma da série, com painel do detector e etiquetas de origem) |
| `dist/rules.mjs` | Regras puras e testáveis: etapas, decisões, referências, capacitação, atmosfera, PET, contagem e objetos do cenário |
| `dist/layout.mjs` | Planta da estação, tanque, equipe e estados de cada pessoa |
| `dist/crew.mjs` | Fase de cada pessoa conforme o andamento e busca de rotas |
| `dist/scenery.mjs` | Cenário 3D |
| `dist/game.mjs` | Jogo: câmera, equipe, painel do detector e diálogos |
| `dist/graphics.mjs` | Qualidade, pós-processamento e texturas |
| `dist/characters.mjs` | Personagens com esqueleto, animações e poses de ação |
| `dist/models/` | Modelos GLB dos personagens |
| `server.mjs`, `INICIAR.cmd` | Servidor local (127.0.0.1:8765) |
| `manifest.mjs` | Gera o `MANIFESTO-SHA256.json` (`npm run manifest`) |
| `test.mjs` | Testes em Node puro (`npm test`) |

## Testes

```
npm test
```

Cobrem: ordem das etapas; uma única resposta certa por decisão, com feedback; todo item e alínea da NR 33 citados existem no texto em vigor; a função cobre todas as suas atribuições na norma; carga horária da capacitação; limites e leituras da atmosfera, coerentes com os textos; situação da PET e contagem em cada etapa; gás e alarme no cenário só quando a leitura é perigosa; o tanque só se acessa pela boca de visita; e acessibilidade de todos os destinos.
