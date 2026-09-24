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
- **Inventário (12 espaços):** módulos (8% por vírus, 100% no chefe) e chips de invocação. Com o inventário cheio, o que cai é reciclado em dados.
- **Chips de invocação:** Comum (1,5% por vírus, 30% no chefe; ★5 2%/★4 13%), Raro (0,3% / 8%; ★5 8%/★4 42%), Lendário (0,03% / 1,5%; ★5 30%/★4 70%).
- **Repetidos** viram dados (★3 < ★4 < ★5, escalando com a fase mais alta liberada).

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
