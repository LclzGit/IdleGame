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
- **Inventário (12 espaços):** equipamentos (8% por vírus, 100% no chefe) e pacotes de download. Com o inventário cheio, o que cai é reciclado em dados.
- **Pacotes de download** (antes "chips de invocação"): Comum (1,5% por vírus, 30% no chefe; ★5 2%/★4 13%), Raro (0,3% / 8%; ★5 8%/★4 42%), Lendário (0,03% / 1,5%; ★5 30%/★4 70%).
- **Repetidos** viram dados (★3 < ★4 < ★5, escalando com a fase mais alta liberada).

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
