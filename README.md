# Daemon Bar (nome provisório)

Idle RPG minúsculo que mora na barra de tarefas, no formato de *TBH: Task Bar Hero*, mas futurista.

**Premissa:** você não é um herói de fantasia, você é o antivírus. Três agentes digitais humanoides em pixel art 32×32, soldados futuristas de armadura e visor (FIREWALL, SCANNER e PATCHER), patrulham o seu próprio computador enquanto você trabalha. Eles descem de `C:\TEMP` até o kernel e depois saem pra rede, caçando bugs, worms, trojans e, no fim de cada setor, um RANSOMWARE.

- Moeda: **dados**, que sobem de KB → MB → GB → TB
- Loot: módulos com raridade Comum → Otimizado → Criptografado → Zero-Day → Quântico. O módulo muda o visual do agente: as luzes ganham a cor da raridade e níveis altos acrescentam peças e aura
- Derrota: *rollback* do setor, sem perder os dados
- Progresso offline enquanto a aba/janela está fechada

## Protótipo

Abra `prototype/index.html` no navegador. É um único arquivo, sem dependências de build.

## Como a v0.3 funciona

A interface é só a barra do jogo, com uma linha fina de HUD. Esquadrão, Inventário, Invocar, Fases e Log abrem como painéis pequenos acima dela.

- **Dados** (KB → MB → GB) são o dinheiro do jogo. Servem pra aprimorar **dano** e **resistência** de cada personagem (+12% por nível; o nível fica com o personagem mesmo quando ele sai do esquadrão).
- **Fases:** 5 por setor (1-1 … 1-5, 2-1 …). Cada uma tem 10 vírus e um chefe. Vencer o chefe libera a próxima. Dá pra escolher qualquer fase liberada pra farmar. Cada fase mostra o **poder recomendado** (verde, âmbar ou vermelho em relação ao seu). Com "avançar sozinho", o esquadrão sobe de fase e recua uma se cair 2 vezes.
- **Inventário (18 espaços):** equipamentos (8% por vírus, 100% no chefe) e pacotes de download. Com o inventário cheio, o que cai é reciclado em dados.
- **Pacotes de download** (antes "chips de invocação"): Comum (1,5% por vírus, 30% no chefe; ★5 2%/★4 13%), Raro (0,3% / 8%; ★5 8%/★4 42%), Lendário (0,03% / 1,5%; ★5 30%/★4 70%).
- **Repetidos** viram dados (★3 < ★4 < ★5, escalando com a fase mais alta liberada).

## v1.3.1: retratos das fichas e aba de Suportes

- **Retratos:** os agentes que têm ficha de personagem mostram o recorte da arte da ficha na tela de diagnóstico e na Coleção. São eles BULWARK-7, SENTINEL BULWARK, VALKYRIE-9, AURA VANGUARD, BULWARK-X1, INFILTRATOR, GHOST, ARCHER, PULSE-R, BLADE, NIGHTHAWK, LASER-T e TANK-M-1. Os recortes ficam em `art/retratos/`. FIREWALL, SCANNER e PATCHER continuam com o busto pintado por código até ganharem ficha própria.
- **Coleção:** nova aba **Suportes**, por enquanto só com o PATCHER.
- **Correção:** o jogo travava ao abrir quando havia item equipado no save.

## v1.3: T6 Root, três classes de ataque, ranking e chances publicadas

- **Retratos novos:** cada agente ganhou um busto 64×64 pintado por código, com rosto ou visor, ombreiras, arma e fundo na cor do tier. Aparece na tela de diagnóstico, na Coleção e no resultado do Download.
- **T6 Root** (grená):
  - Só cai em fase de **Chefão** (0,03% dos itens de fase de chefe) e não sai do Compilador (T5 e T6 não compilam).
  - Chega com 3 passivas em branco. O jogador escolhe as 3 **uma única vez**, e elas vêm no valor máximo.
  - Pode ir pro mercado configurado ou em branco (aí quem comprar escolhe).
  - Nunca é equipado sozinho nem reciclado em massa.
- **Três classes de ataque**, no lugar das subclasses de DPS: **Rastreador** (precisão), **Varredor** (área) e **Caça-chefes**. A Coleção tem uma aba pra cada classe, e a arma da classe certa dá ×1,5 de ATK. O esquadrão continua com tanque, ataque e suporte.
- **Nível do operador e ranking:**
  - Os créditos compram níveis do operador: 1000 × 1,12ⁿ cada, sem teto, com +0,5% de vida e dano por nível.
  - O ranking tem duas abas: maior poder já alcançado e nível do operador. No protótipo os rivais são simulados; no lançamento o ranking vem do servidor.
- **Painel Chances:** mostra todas as probabilidades lidas das mesmas constantes do sorteio: pacotes, garantias, tiers (base e valor atual), Compilador e faixas de passivas.
- **Comércio:** T5 e T6 ficam bloqueados pra venda no lançamento.
- `docs/plano-lancamento.html` agora cobre a porta pro Godot (servidor que decide os drops e Steam Inventory Service) e as travas contra bots e contas em massa.

## v1.2: progressão estilo TBH, taxas calibradas e Central de Upload

**Progressão** (mesma estrutura do TBH): 5 dificuldades × 3 atos × 10 fases.

- Dificuldades: Normal → Avançado → Crítico → Zero-Day. Depois delas vem o **Kernel Panic**, uma torre infinita.
- Atos: Sistema de arquivos, Memória e kernel, Rede.
- A 5ª e a 10ª fase de cada ato são **Chefão**. As outras alternam entre **Horda** e **Blindados**.
- Cada dificuldade multiplica a vida dos vírus por 2,5, o dano por 2, e melhora a chance de T3+.
- **Tempo limite de 150 s por fase.** Se estourar o tempo ou o esquadrão cair 2 vezes, ele recua uma fase e farma 5 vezes antes de tentar de novo.

**Curvas** (simuladas em 168 h com `tools/balance-sim.cjs`):

- Vírus: ×1,10 por fase.
- Recompensa: ×1,08 por fase.
- Itens: ×1,06 por nível.
- Aprimoramentos: ×1,06 por nível, com custo ×1,3.
- Árvore: custo base 300 (3000 nos nós-chave), ×1,35 por distância e ×1,6 por nível.

**Pacotes de download** (chance ao concluir uma fase, sem bônus de sorte, porque são negociáveis):

| Pacote | Fase comum | Fase de chefe | Média na simulação |
|---|---|---|---|
| Comum | 3,5% | 7% | ~0,9/h |
| Raro | 1% | 2% | ~0,3/h |
| Lendário | 0,05% | 0,1% | ~1 a cada 33 h |

A garantia de ★5 do Raro (180 downloads) sai em ~24 dias jogando 24/7. Um casual com ~3 h por dia recebe a maior parte dos ★4 e ★5 por sorte, antes da garantia.

**Itens** não têm garantia. Pesos de tier:

| Tier | Fase comum | Fase de chefe |
|---|---|---|
| T1–T2 | 72% / 22% | 55% / 32% |
| T3–T5 | 5,45% / 0,5% / 0,05% | 10,75% / 2% / 0,25% |

- T3+ ganha +25% por dificuldade.
- **Sorte** (árvore, passivas e Honeypot) aumenta a chance de T3+, com teto de +50%.

**Central de Upload** (ponte pro inventário da Steam, simulada no protótipo):

- Negociáveis: pacotes de download e itens T4.
- Vinculados à conta: T1–T3, itens saídos do Compilador e T5 (bloqueado no lançamento).
- 4 espaços de envio. Cada um fica ocupado por 8 h depois de usado.
- Um item que volta da Steam fica 7 dias preso ao jogo.
- A tooltip diz se o item é negociável ou o motivo de estar vinculado.

## v1.0: tela de diagnóstico, créditos, tooltip e novas taxas

- **Agentes** virou uma tela de **diagnóstico**: processos no topo (`firewall.sys PID 0421`), câmara de varredura com feixe animado, **soquetes de equipamento** em lista e leitura de atributos em terminal (`> dano ..... 13`) com comandos `> overclock` / `> blindagem`.
- **Inventário com 24 espaços** (4 linhas de 6).
- **Tooltip:** passar o mouse num item (inventário, soquetes, compilador) abre uma janela com atributos, passivas, conjunto, comparação com o equipado e valor de reciclagem.
- **Créditos:** o dinheiro agora se chama créditos e é escrito como a gente fala (12,4 mil · 3,1 mi · 2 bi), com ícone de moeda. DEF virou **definições**.

**Pacotes de download** (chance ao **concluir uma fase**; offline sorteia como uma fase comum a cada 2 min):

| Pacote | Fase comum | Fase de chefe (Chefão) |
|---|---|---|
| Comum | 0,5% | 2% |
| Raro | 0,1% | 0,5% |
| Lendário | 0,05% | 0,1% |

**O que cada pacote baixa** (garantias contam por banner e por tipo de pacote):

| Pacote | ★5 | ★4 | Garantias |
|---|---|---|---|
| Comum | 0,2% | 2% | ★5 em 500 downloads · ★4 em 50 |
| Raro | 2% | 15% | ★5 em 180 downloads · ×10 garante ★4 |
| Lendário | 10% | 90% | nunca ★3 |

**Itens** (chance por vírus: 8% em fase comum, 15% em fase de chefe; o chefe de cada fase sempre dá item, mínimo T2):

| Tier | Fase comum | Fase de chefe |
|---|---|---|
| T1 Comum | 70% | 50% |
| T2 Otimizado | 22% | 30% |
| T3 Criptografado | 6,5% | 14% |
| T4 Zero-Day | 1,3% | 5% |
| T5 Quântico | 0,2% | 1% |

Garantias de item: um T4 ou melhor a cada 150 itens sem T4, e um T5 a cada 1000 itens sem T5.

## v0.9: identidade própria, vacinas e árvore grande

- **Janela em estilo console de antivírus:** barra de título `daemon.exe › seção` com botões de janela, trilho de ícones na lateral e barra de status ("● PROTEÇÃO ATIVA · fase · itens · poder · definições").
- **Vacina (acessório):** novo espaço pra todas as classes. Cada vacina é contra um tipo de vírus (Anti-Bug, Anti-Worm, Anti-Trojan, Anti-Ransomware) e dá +% de dano do **esquadrão inteiro** contra ele, além de um pouco de HP. Tem tier, passivas e conjunto como os outros itens.
- **Núcleo do antivírus (árvore):** mapa arrastável com 81 nós. Do núcleo saem 4 braços: Varredura (dano, cima), Quarentena (farm, direita), Firewall (defesa e vacinas, baixo) e Kernel (velocidade e sistema, esquerda). Cada braço tem 8 nós no eixo e 3 ramificações que terminam em **nós-chave** (Varredura total, Caçador de rootkits, Honeypot, Mineração profunda, Imunidade, Vacinação em massa, Particionamento, Overclock extremo…). O custo em DEF cresce com a distância do núcleo. Quem tinha pontos na árvore antiga recebe o DEF de volta.

## v0.8: menus no estilo TBH

- Os menus viraram uma **janela centralizada acima da barra**, com moldura, placa de título, dados/DEF no canto e uma **barra de ícones** embaixo (Agentes, Coleção, Compilador, Download, Antivírus, Fases, Log). O HUD da barra também usa esses ícones.
- **Agentes** junta esquadrão e inventário, como a tela HERO do TBH: equipamentos à esquerda, retrato grande com seletor ◂ ▸ e formação no centro, atributos e aprimoramentos à direita, e o **inventário embaixo com 18 espaços (6×3)**.
- Coleção e Compilador viraram menus próprios.

## v0.7: Compilador (síntese)

Aba **Compilador** no Inventário: 5 itens do mesmo tier → 1 item.

- Chance de subir de tier: T1→T2 100% · T2→T3 80% · T3→T4 50% · T4→T5 25%. Se falhar, sai um item novo do mesmo tier.
- O resultado fica com o **maior nível** entre os usados e copia classe/tipo de um deles (5 do mesmo tipo garantem o tipo).
- **3 ou mais peças do mesmo conjunto garantem o conjunto** no resultado.
- **Preenchimento automático** escolhe o menor tier com 5 itens, priorizando o conjunto e o tipo mais comuns (por padrão, só itens piores que os equipados).
- Opção **compilar sozinho quando o inventário encher**, em vez de reciclar o drop.

## v0.6: passivas e conjuntos

**Passivas:** os bônus de drop são **relativos**: multiplicam a chance base (+10% sobre 0,1% vira 0,11%). O inventário mostra as chances atuais (base → com bônus). Cada item sorteia passivas quando cai (T1 nenhuma, T2 1, T3 1, T4 2, T5 3). O valor é a faixa abaixo × o multiplicador do tier (T1 ×1 … T5 ×7). A velocidade de ataque vale só pra quem usa; o resto vale pro esquadrão todo.

| Passiva | Faixa base |
|---|---|
| Chance de pacote de download | +1–2% |
| Chance de drop de armas | +1,5–3% |
| Chance de drop de itens | +1–2,5% |
| Dados ganhos / DEF ganho | +1–3% |
| Chance de crítico | +0,5–1% |
| Dano contra chefes / dano em área | +1,5–3% |
| Velocidade de ataque | +0,5–1,5% |

**Conjuntos:** todo item pertence a um conjunto, que aparece no nome ("Elmo Sentinela Mk3"). As peças do mesmo conjunto equipadas no mesmo personagem ativam bônus:

| Conjunto | 2 peças | 4 peças |
|---|---|---|
| Sentinela | +10% HP | -8% dano recebido |
| Varredura | +10% ATK | +10% dano em área |
| Rootkit | +12% dano contra chefes | +5% crítico |
| Minerador | +10% dados | +15% chance de pacote de download |
| Overclock | +6% velocidade de ataque | +10% ATK |

## v0.5: equipamentos com tier e Download

**Equipamentos por classe:** capacete, armadura, botas e arma pra todos; escudo só pro tanque. A arma de DPS tem tipo (Área, Precisão, Caça-chefes). Cada item tem ícone próprio desenhado por código e aparece no personagem: capacete na cabeça, armadura nas ombreiras e botas nas solas, na cor do tier. A arma (no tanque, o escudo) define a cor das luzes.

| Peça | Atributos |
|---|---|
| Arma | +% ATK |
| Capacete | +% HP e +% ATK |
| Armadura | +% HP |
| Botas | +% HP e +% velocidade de ataque |
| Escudo (tanque) | +% HP e redução de dano |

**Tiers:** T1 Comum 60% · T2 Otimizado 25% · T3 Criptografado 10% · T4 Zero-Day 4% · T5 Quântico 1% (chefes dão no mínimo T2). **Nível do item = número da fase**, então fases baixas só dão itens de nível baixo, seja qual for o tier.

**Download** substitui "Invocar": pacotes de download Comum/Raro/Lendário baixam novos agentes. A **Coleção** saiu do Download e foi pro **Esquadrão** (aba Coleção).

## v0.4: subclasses, tipos de fase e árvore do antivírus

**Subclasses de DPS** (as armas de DPS têm os mesmos tipos; arma do mesmo tipo da subclasse dá ×1,5 de bônus):

| Subclasse | Efeito | Personagens |
|---|---|---|
| Área | Cada tiro respinga 30% em todos os inimigos | LASER-T ★5, TANK-M-1 ★5, NIGHTHAWK ★4 |
| Precisão | +35% no alvo principal | SENTINEL ARCHER ★5, PULSE-R ★3, SCANNER ★3 |
| Caça-chefes | +80% contra chefes, +40% contra blindados | GHOST ★4, INFILTRATOR ★4, BLADE ★3 |

**Tipos de fase** (a lista de fases mostra o tipo e a subclasse recomendada):

| Tipo | Inimigos | Melhor subclasse |
|---|---|---|
| Horda | 18 vírus fracos, até 6 na tela | Área |
| Blindados | 5 vírus com 3,2× de vida, um de cada vez; dano em área causa metade | Precisão |
| Chefão (última fase de cada setor) | 4 vírus e um chefe com 18× de vida | Caça-chefes |

**Árvore do antivírus**, paga com **DEF** (definições de vírus, que caem de todo inimigo e mais dos chefes). São 4 ramos: Varredura (dano, crítico, área, chefes), Firewall (HP, redução de dano, regeneração), Quarentena (dados, módulos, chips) e Kernel (velocidade, +2 espaços de inventário, ganho offline).

## Invocação (gacha)

Em **Invocar** o jogador gasta chips de invocação para invocar personagens. Cada classe tem seu próprio banner e contador de garantia.

**Banner de tanques**

| ★ | Chance | Tanques |
|---|---|---|
| ★5 | 3% | BULWARK-7, SENTINEL BULWARK-X1 |
| ★4 | 17% | SENTINEL BULWARK, VALKYRIE-9 |
| ★3 | 80% | FIREWALL, AURA VANGUARD Mk.II |

- ×10 garante ao menos um ★4; ★5 garantido a cada 50 invocações sem ★5
- Cada tanque tem uma passiva própria (redução de dano, reflexo, regeneração, bônus de equipe)

**Banner de DPS**

| ★ | DPS | Passiva |
|---|---|---|
| ★5 | SENTINEL ARCHER | 3 flechas por disparo, +10% velocidade |
| ★5 | LASER-T | Feixe laser que atravessa toda a fila |
| ★5 | SENTINEL TANK-M-1 | Modo tanque: artilharia com dano em área e ataque orbital a cada 5 disparos |
| ★4 | INFILTRATOR | Esquadrão +12% dano |
| ★4 | GHOST | 30% de crítico (×2,5) |
| ★4 | NIGHTHAWK | Virote perfura o próximo inimigo (60%) |
| ★3 | SCANNER, PULSE-R, BLADE | +10% dano / 20% crítico / +20% velocidade |
