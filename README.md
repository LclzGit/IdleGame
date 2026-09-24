# Daemon Bar (nome provisório)

Idle RPG minúsculo que mora na barra de tarefas, no formato de *TBH: Task Bar Hero*, mas futurista.

**Premissa:** você não é um herói de fantasia, você é o antivírus. Três agentes digitais humanoides em pixel art 32×32, soldados futuristas de armadura e visor (FIREWALL, SCANNER e PATCHER), patrulham o seu próprio computador enquanto você trabalha. Eles descem de `C:\TEMP` até o kernel e depois saem pra rede, caçando bugs, worms, trojans e, no fim de cada setor, um RANSOMWARE.

- Moeda: **dados**, que sobem de KB → MB → GB → TB
- Loot: módulos com raridade Comum → Otimizado → Criptografado → Zero-Day → Quântico. O módulo muda o visual do agente: as luzes ganham a cor da raridade e níveis altos acrescentam peças e aura
- Derrota: *rollback* do setor, sem perder os dados
- Progresso offline enquanto a aba/janela está fechada

## Protótipo

Abra `prototype/index.html` no navegador. É um único arquivo, sem dependências de build.

## Invocação (gacha)

Em `invocar.exe` o jogador gasta **núcleos ◆** (chefe dá +3; vírus comum tem 4% de chance de dar +1; também rende offline) para invocar personagens. Cada classe tem seu próprio banner e contador de garantia.

**Banner de tanques**

| ★ | Chance | Tanques |
|---|---|---|
| ★5 | 3% | BULWARK-7, SENTINEL BULWARK-X1 |
| ★4 | 17% | SENTINEL BULWARK, VALKYRIE-9 |
| ★3 | 80% | FIREWALL, AURA VANGUARD Mk.II |

- ×10 garante ao menos um ★4; ★5 garantido a cada 50 invocações sem ★5
- Repetido vira sincronização: +12% de HP/ATK por nível, até +5 (depois disso devolve núcleos)
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
