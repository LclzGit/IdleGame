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

## v1.24: personagens mais nítidos na barra

- **Contorno escuro de 1 px** em volta de cada sprite, no tamanho do jogo: devolve a silhueta que a arte tem e que sumia ao reduzir ~12×.
- **Nitidez leve** nos quadros: rosto, visor e placas da armadura voltam a aparecer.
- **Luz de fundo** na cor da classe atrás de cada agente: personagem escuro não se mistura mais com o cenário escuro.
- **Resolução da tela:** a barra e a arena do Chefão desenham na densidade real (Windows com zoom 125%/150%, retina), sem borrar.
- **Parado sem esticar:** a respiração que esticava e girava o sprite (e borrava a cada quadro) virou um sobe-e-desce de 1 px; posições alinhadas ao pixel.
- A barra continua do mesmo tamanho.

## v1.23: Oficina (recompilar T5/T6 e reforço das vagas)

- Nova aba **Oficina** (menu lateral e barra).
- **Recompilar T5/T6:** itens Quântico (T5) e Root (T6), equipados ou no inventário, sobem para o nível da fase mais alta. Passivas e conjunto continuam; só o nível sobe. Custa créditos e definições (Root custa mais). Tem "Recompilar tudo que der". Um Root do Nv90 volta a valer mais que um roxo do Nv200.
- **Reforço das vagas:** cada vaga de equipamento (capacete do tanque, arma do ataque etc.) tem um nível; cada +1 dá +2% nos atributos do item que estiver nela. O reforço é da vaga: trocar o item não perde nada. Limite = 5 + fase mais alta ÷ 3. Botões +1, +10 e "Reforçar tudo" (sempre o mais barato primeiro).

## v1.22: preparação da luta contra o Chefão

- **Dossiê do chefão:** ícone, ano, o que ele faz na luta (golpeia o tanque, marca áreas, enfurece no fim) e o prêmio.
- **Formação em pedestais:** os três agentes aparecem de corpo inteiro, com ATQ, VIDA e etiquetas do que ajudam na luta (ex.: "+80% no chefão", "cura", "reflete dano"). Clique num pedestal para trocar aquela vaga; o agente novo entra com efeito de materializar.
- **Medidor de chance:** poder contra o chefão (conta o bônus de Caça-chefes) com a marca do recomendado e o veredito: Vitória provável, Equilibrado, Arriscado ou Muito difícil. Mostra quanto o poder mudou na última troca.
- **Bandeja de troca:** cada agente mostra quanto o poder sobe ou desce se entrar no time, já ordenado do melhor para o pior. Marcas "MELHOR" e "na barra".
- **Atalhos:** "Time da barra", "Melhor time" e o botão **INICIAR LUTA** fixo embaixo.

## v1.21: escolher o time do Chefão

- **Enfrentar** agora abre a montagem do time antes da luta: uma coluna para Tanque, Ataque e Suporte, com todos os agentes que você tem.
- O poder do time escolhido aparece ao lado do poder recomendado, em verde, amarelo ou vermelho.
- O time do Chefão é separado: o time da barra não muda. O jogo lembra o último time usado.
- A tentativa só é gasta ao clicar em **Iniciar luta**; **Voltar** sai sem gastar.

## v1.20: arena do Chefão (vista de cima) e fase rodando junto

- A luta contra o chefão agora é uma arena vista de cima dentro da janela de Chefões: piso de placa de circuito, racks de servidor no fundo, cristais de dados, zonas corrompidas e o chefão no pedestal central com nome e vida.
- Faixa vermelha no topo com **CHEFE** e o tempo; nos últimos 20 s ela pisca e o chefão fica mais rápido.
- O esquadrão entra pelas portas da arena. O tanque golpeia de perto, o DPS atira do outro lado e o suporte cura com orbes.
- O chefão ataca o tanque e marca áreas de impacto no chão. Os agentes tentam sair delas antes da explosão.
- **A fase da barra não pausa mais**: ela continua rodando embaixo enquanto a luta acontece. O ícone de Chefões mostra um "!" durante a luta.
- Cartões do esquadrão com retrato e vida embaixo da arena, e o botão **Abandonar luta**.

## v1.19: chefão na janela de Chefões

- Ao clicar em **Enfrentar**, a luta abre dentro da própria janela de Chefões (mesmo tamanho dos outros menus): arena com o chefão, barra de vida, tempo e a vida de cada agente.
- O esquadrão sai da barra de tarefas e entra andando na arena; o chefão chega pelo outro lado e a luta começa com "LUTA!" (o tempo só corre depois disso).
- Enquanto isso, a barra mostra "esquadrão a caminho / em combate" com a vida do chefão e o tempo; clicar nela reabre a luta.
- Botão **Abandonar luta** (a tentativa continua gasta). Ao vencer, perder ou abandonar, os agentes voltam para a barra.

## v1.18: suportes trocáveis

- O slot de suporte agora é trocável como tanque e ataque: **Download · Suportes** (mesmas chances e garantias), aba Suportes na Coleção com versões e segunda passiva, botão "trocar agente" no painel.
- 9 suportes novos além da PATCHER (inicial), cada um com uma habilidade:
  - ★3 **DEBUGGER** (barreira de 15% no tanque a cada 6 s), **PING** (+12% vel. de ataque, +20% contra chefe), **CRAWLER** (+15% drop de itens, +10% pacotes).
  - ★4 **HOTFIX** (frasco a cada 5 s: cura 3%/s por 4 s e envenena o vírus da frente), **OVERVOLT** (+40% de dano por 3 s a cada 10 s), **STREAM** (+25% créditos, +15% definições).
  - ★5 **PROXY** (desvia 25% dos ataques), **ENCRYPT** (barreira de 20% no esquadrão a cada 12 s), **ROLLBACK** (revive o primeiro agente que cair na fase com 50% da vida).
- Barreira aparece como anel ciano; sobrecarga e veneno com partículas verdes; textos flutuantes REMENDO / SOBRECARGA / CRIPTOGRAFADO / RESTAURADO.
- Arte provisória desenhada por código até chegarem as imagens (prompts em `art/prompts-suportes.md`). Conquista nova: "Equipe de apoio".

## v1.17: PATCHER — elenco inteiro com arte nova

- PATCHER (suporte): retrato novo e animações da arte do autor. Guarda com o cajado; **cura** um aliado ferido com a folha de cura (ergue o cajado, o orbe brilha, solta partículas); **ataca** com o pulso de apoio (finca o cajado e solta um anel de energia).
- Com isso todos os 16 personagens têm retrato e animação novos (FORMAT-C provisório, redesenho anotado).
- `tools/import-anim.cjs`: opções `keepPockets` (armadura branca com brilhos) e `strongGlow` (magia clara mais opaca no fundo escuro); folhas de ataque de qualquer tamanho.

## v1.16.9: FORMAT-C (provisório)

- FORMAT-C com a arte enviada, **provisória**: o autor quer refazer num estilo de robô que se transforma em torreta (andador → torreta com metralhadora giratória). Prompts novos no topo de `art/prompts-arte.md`; a transformação entra como a animação de "defesa" quando os vírus encostarem.

## v1.16.8: DEFRAG

- DEFRAG: retrato novo e animações da arte do autor: guarda com o canhão rotativo, mira, feixe laser vermelho, recuo e volta à guarda; esteiras nos pés.
- `tools/import-anim.cjs`: linha de chão só é aceita no quarto de baixo, fina e com branco logo acima (um canhão atravessando corpos encostados não é mais confundido com o chão).

## v1.16.7: CHECKSUM

- CHECKSUM: retrato novo e animações da arte do autor: guarda com o arco tático, puxa a corda, solta três flechas douradas com clarão e volta à guarda.
- `tools/import-anim.cjs`: opção por personagem em `art/sprites/<id>/import.json` (`{"keepWhite": false}` apaga o branco preso entre arco e corda).
- `tools/portrait-import.cjs`: moldura dupla, lados direito/baixo medidos de verdade, fundo não entra por frestas do contorno (cabelo branco fica) e vão de branco liso entre peças (cachecol) sai.

## v1.16.6: SNIFFER

- SNIFFER: retrato novo e animações da arte do autor: guarda com a besta de energia, virote roxo com clarão, recuo com fumaça e volta à guarda.
- `tools/import-anim.cjs`: tamanho máximo de vão branco apagado agora é proporcional ao tamanho da imagem.

## v1.16.5: SPECTRE

- SPECTRE: retrato novo e animações da arte do autor: guarda com o sniper, disparo com clarão ciano e rastro laranja, recuo com fumaça e volta à guarda.
- `tools/portrait-import.cjs`: topo da moldura medido em três pontos (molduras com recorte no meio não cortam mais o cabelo).

## v1.16.4: PENTEST

- PENTEST: retrato novo e animações da arte do autor: guarda com o fuzil com mira, disparo com rajada verde, recuo com fumaça e volta à guarda.

## v1.16.3: SHREDDER

- SHREDDER: retrato novo e animações da arte do autor: guarda com o fuzil de baioneta, mira, rajada verde com cápsulas voando, recuo e volta à guarda.
- `tools/import-anim.cjs`: miudezas soltas (cápsulas, faíscas) ficam com o corpo mais perto à esquerda, não com o quadro onde caíram.

## v1.16.2: TRACEROUTE

- TRACEROUTE (agente de ataque inicial): retrato novo e animações da arte do autor: guarda com o rifle de precisão, mira, disparo com clarão laranja, recuo com fumaça e volta à guarda.

## v1.16.1: SCANNER (primeiro agente de ataque com arte nova)

- SCANNER: retrato novo e animações da arte do autor: guarda com o railgun, mira, disparo com raio ciano, recuo e volta à guarda. Caminhada e corpo inteiro importados.
- `tools/import-anim.cjs`: o núcleo branco de uma rajada que invade o quadro seguinte volta pro quadro de quem atirou.
- `tools/portrait-import.cjs`: o fundo branco é limpo a partir de uma faixa junto da moldura (cantos fechados pela linha da moldura também saem).
- `tools/battle-gif.cjs <tanque> [ataque]` grava também o agente de ataque.

## v1.16: KERNELGUARD-X1 — todos os tanques com arte nova

- KERNELGUARD-X1: retrato novo (o antigo foi pra `art/retratos/antigos/`) e animações da arte do autor: guarda com o rifle de antebraço e o drone Aegis, disparo ciano, escudo colossal hexagonal com vírus encostando (tiro pela fresta) e volta à guarda.
- Os 6 tanques agora têm retrato e animações novos: FIREWALL, SANDBOX-II, QUARENTENA, RESTORE-9, KILLSWITCH-7, KERNELGUARD-X1.
- `tools/portrait-import.cjs` reconhece retratos sem a moldura escura externa (só a linha cinza arredondada).

## v1.15.4: KILLSWITCH-7 animado

- KILLSWITCH-7 com a arte nova do autor: guarda com a lâmina-canhão, corte com rastro vermelho, escudo de engrenagem com vírus encostando (disparo pela borda do escudo) e volta à guarda. Brasas nos pés preservadas.
- `tools/import-anim.cjs`: vão branco entre as pernas fechado por brasas agora é reconhecido como fundo (encosta no chão), sem apagar o miolo branco de escudos; altura do chão vem do desenho quando a linha não existe.

## v1.15.3: RESTORE-9 animado

- RESTORE-9 com a arte nova do autor: guarda, rajada verde do canhão de garra, escudo-torre branco com moldura dourada (rajada por cima do escudo) e volta à guarda. Drone acompanha em todos os quadros.
- `tools/import-anim.cjs` mais robusto pra personagens brancos e quadros encostados:
  - o fundo não vaza por frestas finas do contorno (o miolo branco do escudo fica); só bolsões pequenos presos entre braço e corpo são apagados;
  - só fica translúcido o que é claro e colorido (escudo de energia, brilho), nunca o branco neutro da armadura;
  - peça que encosta em dois quadros é afinada até partir nos dois corpos, e cada pixel volta pro corpo dele andando pelo desenho;
  - ponta de rajada grudada no corpo do quadro seguinte volta pra rajada do quadro anterior.
- FIREWALL, SANDBOX-II e QUARENTENA reimportados com essas regras; GIFs regerados.

## v1.15.2: QUARENTENA animado

- QUARENTENA com a arte nova do autor: guarda com a garra, golpe com onda de energia, escudo-torre com vírus encostando (golpe de garra pela lateral do escudo) e volta à guarda. Caminhada e corpo inteiro importados.
- `tools/import-anim.cjs` separa os quadros por peça conectada: o personagem com a arma vai inteiro pro quadro dele, mesmo quando a garra/espada invade o espaço do vizinho. Efeitos soltos (golpe, faísca, drone) vão pro corpo mais perto, preferindo o da esquerda (todos olham pra direita). FIREWALL e SANDBOX-II reimportados com isso.

## v1.15.1: SANDBOX-II animado

- SANDBOX-II (tanque inicial) com a arte nova do autor: guarda, tiro em sequência, bolha de energia laranja com vírus encostando (atira de dentro dela) e volta à guarda. Caminhada e corpo inteiro importados.
- `tools/import-anim.cjs` agora deixa escudos de energia, brilhos e clarões translúcidos (áreas claras ligadas ao fundo viram transparência proporcional; o que está dentro do contorno do personagem não muda). FIREWALL reimportado com o escudo hexagonal translúcido.
- `tools/battle-gif.cjs <id>`: GIF de um tanque em batalha num cenário controlado (guarda → escudo → volta), pra conferir as animações (precisa de `npm i gifenc pngjs`).

## v1.15: FIREWALL animado

- FIREWALL ganhou sprites e animações a partir da arte gerada pelo autor (`art/sprites/firewall/`):
  - **Guarda** parado esperando os vírus (quadro 1 da folha de ataque).
  - **Ataque** em sequência: mira → golpe com arco de energia → recuo → volta à guarda.
  - **Defesa**: com vírus encostando nele, levanta o escudo hexagonal, fica firme atrás dele e golpeia protegido; quando os vírus somem, abaixa o escudo.
  - Caminhada (6 quadros) e corpo inteiro já importados, pra entrada na fase e telas de Coleção/Download.
- Brilho de dano dos agentes mais suave (antes o personagem ficava todo branco).
- Novas ferramentas:
  - `tools/import-anim.cjs <id>`: lê `art/sprites/<id>/{corpo,caminhada,ataque,defesa,cura,pulso}.jpg`, tira o fundo branco e a linha de chão, separa os quadros (mesmo encostados), mesma escala e mesmo chão pra folha toda, grava `frames.json` e `preview.png`.
  - `tools/anim-gif.cjs <id>`: um GIF por animação (precisa de `npm i gifenc`).
- Qualquer agente que ganhar `atk`/`def` no `SHEET_SPR` usa essas animações automaticamente; os outros continuam como antes.

## v1.14.3: retrato do SANDBOX-II

- SANDBOX-II ganhou o retrato novo (armadura cinza com linhas laranja), no mesmo tratamento dos outros. O antigo foi pra `art/retratos/antigos/`.
- Confirmado pelo autor: RESTORE-9 é o retrato prata e dourado já aplicado na v1.14.2.

## v1.14.2: retratos novos dos tanques

- Retratos novos: FIREWALL (primeiro retrato dele), KILLSWITCH-7, QUARENTENA e RESTORE-9.
- Tratamento: moldura recortada, fundo branco apagado (flood fill a partir das bordas, o contorno do desenho segura o corte) e fundo padrão dos cartões do jogo na cor do agente, 160×160 webp.
- Retratos antigos guardados em `art/retratos/antigos/`. 
- `tools/portrait-import.cjs` faz esse tratamento em imagens novas.

## v1.14.1: menus do mesmo tamanho e HUD sem texto vazando

- Todos os menus abrem com o tamanho do painel de Agentes (a árvore do antivírus não abre mais larga; o mapa ocupa a altura toda e o resumo fica ao lado).
- Abas do HUD nunca encolhem: com espaço curto, as menos usadas (Log, Ranking, Bestiário, Upload, Compilador…) saem da fileira e continuam na coluna do painel. Era isso que fazia o "24/24" do inventário passar da borda.
- Testes agora usam as fontes reais do jogo (`tools/fonts`, licença OFL, via `tools/test-fonts.cjs`). Antes o ambiente de teste caía numa fonte reserva mais estreita e a checagem passava aqui mas falhava na tela do jogador.
- `tools/overflow-check.cjs` também confere HUD, abas, barra de tarefas e topo do painel, e acusa texto invadindo o padding (não só saindo da caixa). `INJECT_CSS` permite forçar um defeito pra provar que a checagem pega.
- Rodado em 1366×768, 1280×720, 1024×700, 920×700, 752×775 e 600×560 nos 3 idiomas: nada vazando.

## v1.14: ícones novos

- **Itens (24×24, um desenho por classe):**
  - Capacete: elmo fechado com crista (tanque), capacete tático com óculos e rádio (ataque), tiara-visor dourada (suporte).
  - Armadura: couraça com ombreiras e núcleo (tanque), colete balístico com bolsos (ataque), manto de nanofibra (suporte).
  - Botas: grevas blindadas (tanque), botas de salto com propulsor (ataque), sandália antigravidade com asa (suporte).
  - Escudo hexagonal, vacina, IA (processador com o rosto), driver (placa) e token (chave USB) redesenhados. Pacotes de download viraram caixas isométricas com seta.
- **Árvore do antivírus:** nós comuns com ícone de 16 px mostrado 1:1 (antes era 12 px esticado). Cada um dos 12 nós-chave tem desenho próprio (Execução, Respingo e Bloqueio apareciam em branco).
- **Menus:** ícones de 20 px com sombreamento (agentes, coleção, compilador, download, upload, antivírus, fases, chefões, contratos, bestiário, ranking, chances, log, configurações, leia-me). Moedas, poder e definições ganharam versão própria de 12 px.
- O tier continua pintando a energia dos itens; T4+ ganha brilho nos cantos.

## v1.13.2: tela pequena

- Menus sempre acessíveis: a coluna de ícones do painel não some mais em telas estreitas ou com zoom alto (antes, abaixo de 760 px, Compilador, Upload, Bestiário, Ranking, Log, Coleção e Chances ficavam sem acesso).
- O painel nunca passa do topo da tela: a altura máxima desconta a altura real da barra do jogo. Conteúdo e ícones rolam por dentro.
- Inventário com células fixas de 44 px: 8 colunas (24 espaços = 3 linhas cheias), ou 6 colunas quando o painel é muito estreito (4 linhas). Sem células esticadas.
- Topo do painel mostra só ícone + número de créditos e definições (com dica), então o título não é mais cortado.
- Chefes não viram mais um borrão branco: o brilho de dano pisca no máximo ~4× por segundo e é translúcido.
- `tools/overflow-check.cjs` rodado em 1366×768, 752×775 e 600×560 nos 3 idiomas: nada vazando. `tools/small-screen.cjs` confere se o menu de ícones aparece em cada tamanho.

## v1.13.1: nada vazando

- Inventário volta a fechar certinho: 8 colunas, então 24 espaços viram 3 linhas cheias. As células ocupam a largura do painel.
- Botões de aprimorar (overclock/blindagem) numa linha só: nome, nível e custo em colunas fixas; o "+dano/+vida" foi pra dica do botão.
- Fases: o tipo da fase usa nome curto (Horda, Blind., Chefe) e o número de poder não estoura mais a célula. A classe `.rp` era usada em dois lugares e trazia padding dos botões de Chefões.
- Loja do Download: o seletor de agente não sai mais do cartão.
- Novo `tools/overflow-check.cjs`: abre todos os menus nos 3 idiomas e acusa qualquer texto que saia do botão, célula ou cartão (`node tools/overflow-check.cjs pt,en,es 1366x768`). Rodado em 1366×768 e 1024×700: nada vazando.

## v1.13: arsenal

- Armas agora têm modelos próprios por classe, cada um com nome e desenho (24×24, com sombreamento):
  - **Tanque (corpo a corpo pesado):** Lâmina de plasma, Martelo de impacto, Machado-disjuntor, Lança de pulso, Punho hidráulico.
  - **Ataque · Varredor (área):** Lança-granadas, Canhão de plasma, Varredura em cone (escopeta), Metralhadora de pacotes.
  - **Ataque · Rastreador (precisão):** Mira de precisão (sniper), Regex Afiada (pistola), Sonda DPI (arco), Fuzil de varredura.
  - **Ataque · Caça-chefes:** Exploit de kernel (railgun), Marcador de alvo (besta), Lança-exploits (lança-foguetes), Munição perfurante (antimaterial).
  - **Suporte (foco):** Cajado de nanobots, Orbe de restauração, Grimório de patches, Varinha de depuração, Drone médico.
- O tier pinta a energia da arma na cor da raridade; a partir do T3 aparecem detalhes extras e o T5/T6 ganha brilho nos cantos.
- Itens antigos reconhecem o modelo pelo nome; os sem correspondência usam o primeiro modelo da classe.
- Ícones maiores no inventário (26 px) e tier no canto da célula.
- Nomes de armas e peças traduzidos para EN/ES.

## v1.12: configurações, som e idiomas

- Barra de tarefas: **leia-me.txt** e **configurações** viraram abas na barra. Saíram o ícone da área de trabalho e a aba "Reunião 14h".
- Menu de configurações (fica fora do save: apagar progresso não mexe nele):
  - **Idioma:** Português (BR), English, Español.
  - **Som:** volume da música e dos efeitos, e silenciar tudo.
  - **Tela:** números de dano, efeitos visuais completos/reduzidos, limite de FPS 60/30 (economiza bateria), formato dos números curto/completo.
  - **Avisos:** faixa na barra ao cair item raro, pacote ou chefão.
  - **Progresso:** exportar/importar save em texto e apagar progresso (saiu do leia-me).
  - **No jogo final (Steam), desligadas no protótipo:** iniciar com o Windows, sempre por cima, sumir com jogo em tela cheia, posição/monitor/transparência da barra.
- Som sintetizado (Web Audio, sem arquivos): tiro, abate, bloqueio, agente caído, chefe chegando, fase limpa, drops por raridade, vírus dourado e clique de interface. Trilha calma em lá menor, pra tocar horas no fundo. Começa no primeiro clique (regra do navegador).
- Idiomas: cada texto da tela (menus, dicas, log, canvas) passa por uma tabela pt | en | es. No Godot essa tabela vira o CSV de tradução com `tr()`. O que ainda não tem tradução continua em português: nomes de agentes, vírus e chefões (de propósito), descrições longas de chefões e agentes, e parte das dicas de itens e da árvore.
- Leia-me reescrito, mais curto.

## v1.11.2: guarda, cenário parado e núcleo novo

- Agentes esperam os vírus em posição de guarda (arma pronta, respiração e troca de peso), não mais em pé parados.
- O cenário não desliza mais: fundo, chão e trilhas ficam fixos; só os nós da placa piscam. A fase não parece mais andar.
- Núcleo redesenhado: torre com monitor de batimento, baias com LEDs, ventilação brilhando, cabos, emblema flutuante e escudo de hexágonos que acende quando os vírus chegam perto.
- Inventário compacto: grade de 10 colunas, pacotes na mesma linha do título, detalhes só com item selecionado e texto de regras removido.
- Árvore de talentos sem barras de rolagem: navega só arrastando (ou com a roda do mouse).

## v1.11.1: compartimento de pacotes

- Todos os pacotes de download (os garantidos, os das fases, os vinculados e os negociáveis) ficam num compartimento **Pacotes** acima do inventário. Não ocupam os 24 espaços e não têm limite, então dá pra guardar e abrir quando quiser.
- Com o inventário cheio, os pacotes continuam entrando. Antes, o pacote era reciclado em créditos.

## v1.11: defesa do núcleo

- Os agentes ficam parados em posição de defesa e os vírus avançam até eles. Acabou a caminhada dos agentes.
- Na ponta esquerda da barra fica o **núcleo do sistema**, que o esquadrão protege: um gabinete com LEDs piscando, ventoinha girando, símbolo do antivírus e um escudo holográfico que pulsa. Quando um agente cai, o núcleo fica vermelho e pisca "!".
- O cenário só deriva devagar no fundo, pra continuar vivo sem parecer que o esquadrão está andando.

## v1.10: menus compactos, minichefões, bônus do bestiário e contratos recalibrados

- **Menus compactos, no estilo do TBH:**
  - Janela menor (500 px), presa no canto direito e com a navegação só em ícones (o nome aparece ao passar o mouse).
  - Equipamentos numa grade 5 + 4 de quadradinhos.
  - Chefões em 2 linhas; a história e os drops aparecem ao passar o mouse.
  - Textos mais curtos no Download e na loja.
- **Caminhada:** cada agente usa uma pose só. As pernas são animadas cortando a parte de baixo do sprite em perna de trás e da frente, que alternam, e o tronco balança por cima. Acabou a troca entre poses diferentes.
- **Inventário:** o nível dos itens (Nv) vazava das células porque usava o mesmo nome de estilo das linhas de contrato. Corrigido.
- **Minichefões por setor**, com arte e animação:

  | Setor | Chefe |
  |---|---|
  | C:\TEMP | RANSOMWARE |
  | CACHE L2 | CACHE POISON |
  | RAM | MEMORY LEAK |
  | KERNEL | BOOTKIT |
  | REDE LOCAL | BOTNET |
  | DEEP WEB | DARKNET HYDRA |

- **Bestiário com bônus:** a cada marco de abates de um vírus (100, 1k, 10k, 100k, 1M), o esquadrão ganha +3% de dano contra ele e recebe 2% menos dano dele, até +15% / -10%.
- **Contratos** recalibrados com a simulação (casual, 3 h por dia, contra 24/7):
  - Diário, cerca de 1 h de jogo casual: 500 vírus · 30 fases · 2 Chefões · 8 compilações · 5 aprimoramentos · 8 itens T3+ · 4 vírus dourados.
  - Semanal, cerca de uma semana de jogo casual: 7.500 vírus · 500 fases · 30 Chefões · 150 compilações · 15 itens T4+ · 90 vírus dourados.
  - Saiu o contrato "Baixe agentes".
  - Resultado: o casual fecha os diários todo dia e os semanais no fim de semana. Quem joga 24/7 fecha tudo em 1–2 dias.

## v1.9: chefões redesenhados, 5 vírus novos e morte sem volta na fase

- **Morte:** um agente que cai fica fora ("OFF") até a próxima fase, porque ainda não existe suporte que revive. Os vírus param sempre na linha do tanque, mesmo com ele caído, e passam a cuspir à distância nos agentes de trás.
- **Vírus novos**, no mesmo estilo dos atuais e com animação própria:

  | Vírus | Onde aparece | Desenho |
  |---|---|---|
  | SPYWARE | a partir do Avançado | olho-câmera voador |
  | ADWARE | a partir do Crítico | pop-up com dentes |
  | KEYLOGGER | a partir do Zero-Day | aranha-teclado |
  | CRYPTOMINER | no Kernel Panic e nas fases Blindados do Crítico em diante | robô minerador |
  | ROOTKIT | **só nas fases Blindados** (a partir do Ato 2) | besouro de chapa de aço |

  Cada um conta pra vacina de uma família: spyware = worm, adware e keylogger = bug, rootkit e cryptominer = trojan. Todos estão no bestiário.
- **Chefões:** os 16 (10 fixos e 6 convidados) foram redesenhados em 64×64 com 2 quadros de animação, na batalha, no menu e no bestiário.
- **Simulação 24/7 (168 h):** o começo ficou mais lento (Crítico 2-3 em 24 h; antes, Zero-Day 1-2), mas o Kernel Panic continua chegando em ~110–120 h.

## v1.8.1: animação dos personagens e dos vírus

- **Agentes com ficha:**
  - Até 2 quadros de caminhada e 2 de ataque (mira e disparo), recortados das fichas na mesma escala. As coordenadas ficam em `tools/extract-sprites.cjs`.
  - Andando: alterna os passos, sobe a cada passo, amassa quando o pé bate no chão e inclina pra frente com balanço.
  - Atacando: entra na pose de ataque assim que o inimigo entra no alcance, mostra o quadro de disparo a cada tiro, com recuo, e respira entre um tiro e outro.
  - Parado: respiração leve.
  - Sombra nos pés.
- **Vírus:**
  - O bug anda pulando e amassa ao tocar o chão.
  - O worm estica e encolhe.
  - O trojan trota.
  - O ransomware pulsa.
  - Todos avançam e esticam ao atacar e têm sombra no chão.

## v1.8: arte nova em batalha e menu Chances enxuto

- **Personagens em batalha:** os 13 agentes que têm ficha usam os sprites recortados das próprias fichas (fundo removido automaticamente), em 2 poses: andando e atacando. O tier do equipamento aparece como aura colorida em volta do agente.
  - A faixa de batalha agora é desenhada em resolução dobrada.
  - O esquadrão inicial passou a ser SANDBOX-II + TRACEROUTE + PATCHER, pra primeira impressão já usar a arte das fichas. Os saves existentes não mudam.
  - Continuam com o desenho antigo, por falta de ficha: FIREWALL, SCANNER e PATCHER.
  - `tools/extract-sprites.cjs` guarda as coordenadas das poses e o recorte, pra repetir com fichas novas.
- **Inimigos redesenhados:** com 4× mais detalhe e 2 quadros de animação, todos encarando os agentes:
  - bug: besouro de glitch magenta com patas e antenas;
  - worm: verme de dados segmentado;
  - trojan: cavalo de Troia de placa de circuito com um olho escondido no peito;
  - ransomware: monstro-cadeado com fechadura brilhando e correntes.
- **Cenários por setor:** cada setor tem duas camadas em movimento, em velocidades diferentes, e chão de placa de circuito:
  - C:\TEMP: pastas, papéis e lixeiras;
  - CACHE L2: blocos de memória;
  - RAM: pentes e chips;
  - KERNEL: anéis do núcleo e canos;
  - REDE LOCAL: constelação e roteadores;
  - DEEP WEB: camadas de cebola, glitches e olhos vermelhos;
  - Kernel Panic: tons de alerta.
- **Menu Chances:** textos curtos, sem a coluna de garantias e sem as tabelas "base → agora".

## v1.7.2: chances só no menu Chances

- As porcentagens saíram do Download, do inventário, do Compilador e das tooltips de pacote. Essas telas mostram só as garantias ("★5 garantido em 500", "nunca ★3").
- O menu **Chances** concentra tudo, incluindo a tabela "com os seus bônus" (antes ficava no inventário).
- Os cards dos Chefões continuam mostrando os drops de cada chefão.

## v1.7.1: Download de lançamento separado

- O agente novo tem um **Download próprio** nas 2 primeiras semanas, na aba "Lançamento · NOME". O jogador escolhe onde gastar os pacotes: no agente novo ou nos Downloads padrão.
  - No Download de lançamento, 50% dos resultados da raridade do agente novo saem pra ele. O resto é sorteado entre a mesma classe. As garantias são separadas das dos Downloads padrão.
  - Os Downloads padrão (Tanques e Ataque) não têm destaque: todos da raridade têm a mesma chance. O agente novo só entra neles depois das 2 semanas.
  - Na loja de fragmentos, o agente novo entra 4 semanas depois do lançamento.
  - Pra testar sem arte nova, o botão "protótipo: simular lançamento" trata um ★5 existente como se tivesse acabado de ser lançado.
- As conquistas "Parede de fogo" e "Arsenal completo" agora pedem só os agentes **padrão** (os que começam no jogo). Os lançados depois não entram na conta.

## v1.7: lançamentos de agentes, chefão convidado da semana e fim das temporadas

- **Temporadas e modificadores semanais removidos.** Saíram a aba de temporada do ranking, os prêmios de fim de temporada e as regras da semana (Semana do Worm etc.). O ranking abre em **Mais longe**.
- **Chefão convidado da semana:** a parte da rotação que ficou. Cada semana traz um malware real diferente, que gira entre SQL SLAMMER (2003), BLASTER (2003), ZEUS (2007), CRYPTOLOCKER (2013), MIRAI (2016) e NOTPETYA (2017).
  - O nível acompanha a sua fase máxima, então ele é sempre um desafio justo.
  - 1 tentativa por dia, e só naquela semana.
  - Dá 2 itens (T3 a T6 Root, 0,5% de Root), 3 Comuns vinculados e +50% de créditos e definições.
  - Aparece no topo do menu Chefões, no menu Contratos e no bestiário.
- **Lançamentos de agentes:**
  - Cada agente pode ter `rel:'AAAA-MM-DD'`. Antes da data ele não existe no jogo.
  - Nas 2 primeiras semanas fica **em destaque** no Download dele: metade dos resultados ★5 (ou ★4) sai pra ele.
  - Só entra na **loja de fragmentos 4 semanas depois do lançamento**. O primeiro mês é na sorte; depois disso qualquer um consegue.
  - Sem lançamento recente, o destaque gira entre os agentes existentes a cada 2 semanas.
  - A caixa "Em destaque" do Download mostra a data do próximo lançamento.
  - Pra lançar um agente novo, basta criar ele em `art.js` com `rel` e o retrato.

## v1.6.1: ranking "Mais longe"

- Nova aba **Mais longe** no ranking: mostra a fase mais funda já alcançada, contando todas as formatações. Formatar não tira a posição.

## v1.6: repetidos úteis, Formatar C:, contratos, temporadas, vírus dourado, bestiário e conquistas

**Repetidos** (antes viravam poucos créditos):

| Estrelas | Repetidos por passo (v1.0 → v2.0) | Total |
|---|---|---|
| ★3 | 5, 6, 8, 10, 12, 14, 17, 20, 25, 33 | 150 |
| ★4 | 1, 1, 2, 2, 2, 3, 3, 3, 4, 4 | 25 |
| ★5 | 1 por passo | 10 |

- **Versões:** cada versão dá +6% de vida e dano ao agente. A **v1.5** deixa a passiva 50% mais forte e a **v2.0** libera uma **segunda passiva** exclusiva (ex.: CHECKSUM ganha flechas perfurantes).
- **Fragmentos de código:** o repetido de um agente já na v2.0 vira fragmentos (★3 1 · ★4 5 · ★5 25). Eles são vinculados à conta e compram na loja do Download:

  | Item | Preço |
  |---|---|
  | ★4 à escolha | 300 |
  | ★5 à escolha | 1200 |
  | Pacote Raro vinculado | 150 |
  | ×2 créditos por 1 h | 60 |
  | ×2 definições por 1 h | 60 |

- **Bônus de coleção:** +0,4% de vida e dano pro esquadrão por versão somada de todos os agentes.

**Formatar C:** libera no Kernel Panic.
- Zera fase, créditos e aprimoramentos. Mantém agentes, versões, itens, árvore, operador e Chefões.
- Ganha **setores** = 10 × ((fases no Kernel Panic + 10) / 10)², ou seja, ir mais fundo rende bem mais.
- Bônus permanente: √(1 + setores/100) de vida e dano e √(1 + setores/50) de créditos.
- Depois de formatar, os itens funcionam no nível da fase máxima atual +10. O tier, as passivas e os conjuntos continuam valendo.
- As duas primeiras versões dessas regras viraram loop infinito na simulação: o jogador passava do Kernel Panic 800 em 2 semanas. As regras acima são a correção.

**Contratos e presença** (tudo vinculado à conta; menu **Contratos**):
- 3 contratos por dia (2 Comuns + 10 fragmentos cada) e 3 por semana (1 Raro + 60 fragmentos cada).
- Calendário de presença de 7 dias que **não zera se você faltar**.

**Temporadas e modificador semanal** (removidos na v1.7):
- Cada semana tem um modificador, na ordem: Semana do Worm, Patch Tuesday, Semana do Loot, Semana Blindada, Semana dos Chefões, Semana das Definições.
- Temporadas duram 4 semanas. O ranking tem a aba da temporada e dá fragmentos por posição no fim (#1 400 · top 3 250 · top 10 120 · top 20 60 · demais 30).

**Momentos na barra:**
- **Vírus dourado:** passa a cada 5 a 12 min e some em 12 s. Clicar dá créditos, definições, 1 Comum vinculado ou 10 fragmentos.
- Aviso quando um Chefão fica disponível.
- As IAs equipadas falam no log.

**Bestiário e conquistas:** malwares reais com a história, vírus com contagem de abates e 18 conquistas com recompensa vinculada.

**Relógio do jogo:** esperas, contratos e semanas contam por um relógio único. Os botões "protótipo: avançar 1 dia / 1 semana" servem pra testar.

**Correção:** o jogo travava ao abrir com uma IA equipada no save. Era a causa das quebras relatadas. A vida dos agentes agora só é calculada no fim do carregamento, e `node tools/smoke-test.cjs` abre o jogo com 4 tipos de save e passa por todos os painéis.

### Simulações (`node tools/balance-sim.cjs 336 raids` · `720 raids casual` · `nometa` pra comparar)

| | 24/7, 14 dias, sem os sistemas novos | 24/7, 14 dias, v1.6 | Casual 3 h/dia, 30 dias, sem | Casual, 30 dias, v1.6 |
|---|---|---|---|---|
| Chega ao Kernel Panic | ~120 h | ~120 h | dia ~30 | dia ~20 |
| Fase máxima no fim | Kernel Panic 49 | Kernel Panic 107 (13 formatações) | Kernel Panic 2 | Kernel Panic 2 (6 formatações) |
| Pacotes negociáveis das fases (C/R/L) | 413 / 111 / 7 | 371 / 108 / 2 | 78 / 14 / 2 | 98 / 35 / 3 |
| Agentes na coleção (de 16) | 12 | 14 | 11 | 15 |
| Versões somadas | 37 | 43 | 45 | 61 |
| Contratos / vírus dourados | — | 53 / 592 | — | 101 / 530 |

As recompensas novas não aumentam a oferta de itens negociáveis. Os pacotes que vão pro mercado continuam vindo só das fases e variam dentro da sorte normal. A pontuação alta da coluna 24/7 v1.6 vem do Formatar C:, e o ritmo no Kernel Panic ficou constante (~11 fases/dia), sem acelerar.

## v1.5.3: Comuns dos Chefões vinculados e barra nova

- **Pacotes Comuns que caem dos Chefões ficam vinculados à conta**: podem ser abertos no Download, mas não vão pro mercado. Os Raros e o Lendário garantidos dos Chefões continuam negociáveis, assim como todo pacote que cai nas fases. No inventário, a pilha vinculada fica separada, com a marca **V**. O Download gasta primeiro os pacotes vinculados, pra preservar os negociáveis.
- **Barra do jogo refeita:**
  - Mostra fase, progresso e tempo à esquerda, recursos em caixinhas com ícone e menus só com ícone (o nome aparece ao passar o mouse e, em telas com 1500 px ou mais, ao lado do ícone).
  - Nada mais se sobrepõe. Em telas estreitas, os menus menos usados somem da barra, mas continuam no menu lateral do painel.

## v1.5.2: pacotes garantidos nos Chefões

| Chefão | Pacotes garantidos | Itens |
|---|---|---|
| CREEPER, BRAIN | 5 Comuns | 1 |
| MORRIS WORM, MELISSA, ILOVEYOU | 8 Comuns | 2 |
| CODE RED | 10 Comuns | 2 |
| MYDOOM, CONFICKER | 1 Raro | 3 |
| STUXNET | 5 Raros | 4 |
| WANNACRY | 1 Lendário | 4 |

**Simulação de 168 h (jogador 24/7):** comparei um jogador que só farma fases com um que também enfrenta cada chefão quando a espera acaba e o poder chega a 90% do recomendado. Pra rodar: `node tools/balance-sim.cjs 168 raids`.

| | Sem chefões | Com chefões |
|---|---|---|
| Fase máxima em 168 h | Kernel Panic 6 | Kernel Panic 11 |
| Campanha concluída | ~120 h | ~120 h |
| Pacotes Comuns | 133 | 163 + **339 dos chefões** (3,8×) |
| Pacotes Raros | 46 | 60 + 6 |
| Pacotes Lendários | 1 | 2 (nenhum do WANNACRY: não chegou no poder dele) |
| Agentes ★4 baixados | 4 | 16 |
| Itens T4 / T5 | 239 / 24 | 229 + 15 / 20 + 3 |

## v1.5.1: T6 só dos Chefões e aviso de erro

- **T6 Root** agora cai **somente dos Chefões**, com estas chances por item: CODE RED 0,5%, MYDOOM 1%, CONFICKER 2%, STUXNET 3% e WANNACRY 5%. As fases de Chefão da campanha não dão mais T6. O sorteio também não cai mais num tier de peso zero por arredondamento.
- **Aviso de erro na tela:** se o protótipo quebrar, aparece a mensagem do erro com os botões "Copiar erro", "Continuar" e "Apagar save e recomeçar".

## v1.5: Chefões (malwares reais)

Menu **Chefões**, fora da campanha, com 10 malwares famosos da vida real. A tentativa é gasta ao entrar na luta, mesmo em caso de derrota, e a espera corre em tempo real. O esquadrão tem 90 s pra vencer.

| Chefão | Ano | Espera | Libera em | Itens | Destaque do drop |
|---|---|---|---|---|---|
| CREEPER | 1971 | 8 h | fase 1 | 1 | T2+ |
| BRAIN | 1986 | 12 h | fase 13 | 1 | T4 13% |
| MORRIS WORM | 1988 | 1 dia | fase 25 | 2 | T4 17% |
| MELISSA | 1999 | 1 dia | fase 38 | 2 | T4 21% |
| ILOVEYOU | 2000 | 2 dias | fase 51 | 2 | T3+, Lendário 0,2% |
| CODE RED | 2001 | 3 dias | fase 65 | 3 | T6 0,5% (primeiro com Root) |
| MYDOOM | 2004 | 1 semana | fase 79 | 3 | T5 11% |
| CONFICKER | 2008 | 1 semana | fase 93 | 3 | T5 14%, T6 2% |
| STUXNET | 2010 | 2 semanas | fase 108 | 4 | T4+, T6 3% |
| WANNACRY | 2017 | 1 mês | Kernel Panic 3 | 4 | T5 30%, T6 5%, Comum garantido |

- Cada chefão libera 8 fases antes do nível dele, pra virar meta. Nas simulações, o esquadrão perde nas primeiras tentativas e começa a vencer algumas horas de progresso depois. O WANNACRY só cai com ~1 semana de jogo 24/7.
- Os itens caem no nível da fase máxima do jogador, então não pulam a progressão.
- **Impacto na economia** (tryhard com tudo liberado, por semana): ~7% a mais de pacotes Comuns, ~3% de Raros, ~7% de T4 e ~16% de T5 em relação às fases.
- Todas as chances estão no card de cada chefão e no painel Chances. O protótipo tem um botão pra zerar as esperas.

## v1.4: nomes novos, 4 acessórios e IAs

**Agentes renomeados** pra termos de antivírus e segurança. Os ids internos não mudaram, então os saves continuam valendo.

| Antes | Agora | Classe |
|---|---|---|
| AURA VANGUARD Mk.II | SANDBOX-II | Tanque |
| SENTINEL BULWARK | QUARENTENA | Tanque |
| VALKYRIE-9 | RESTORE-9 | Tanque |
| BULWARK-7 | KILLSWITCH-7 | Tanque |
| SENTINEL BULWARK-X1 | KERNELGUARD-X1 | Tanque |
| PULSE-R | TRACEROUTE | Rastreador |
| SENTINEL ARCHER | CHECKSUM | Rastreador |
| NIGHTHAWK | SNIFFER | Varredor |
| LASER-T | DEFRAG | Varredor |
| SENTINEL TANK-M-1 | FORMAT-C | Varredor |
| GHOST | SPECTRE | Caça-chefes |
| INFILTRATOR | PENTEST | Caça-chefes |
| BLADE | SHREDDER | Caça-chefes |

FIREWALL, SCANNER e PATCHER continuam com o mesmo nome.

**Acessórios:** cada agente tem 4 espaços de acessório, somados às peças normais:

- **Vacina:** dano extra contra um tipo de vírus.
- **IA:** uma assistente com efeito único.
- **Driver:** ATK e velocidade de ataque.
- **Token:** vida e redução de dano.

**IAs** (valor = base × multiplicador do tier):

| IA | Efeito | T1 → T6 |
|---|---|---|
| GEPETO | créditos | 3% → 33% |
| CLAUDIO | redução de dano (quem usa) | 1,2% → 13,2% |
| GEMINIOS | ataque duplo (quem usa) | 1,5% → 16,5% |
| GRUK | crítico | 1% → 11% |
| COPILOTO | velocidade de ataque (quem usa) | 1,5% → 16,5% |
| LHAMA | drop de itens | 2% → 22% |
| DIPSIQUE | desconto nos aprimoramentos (máx. 50%) | 1,2% → 13,2% |
| MISTRAU | dano em área | 2% → 22% |
| PERPLEXO | sorte (T3+) | 1% → 11% |
| SIRIGUELA | ganho offline | 5% → 55% |
| CLIPE | dano contra chefes | 2% → 22% |
| DAEMONZINHO | definições | 2% → 22% |

IA vem com número de versão no nome (ex.: `GEPETO v42`) e tem tabela própria no painel Chances.

**Balanceamento:** simulei 168 h de novo. O Driver e o Token ficaram mais fracos que as outras peças pra não acelerar a campanha: o Kernel Panic chega em ~108 h (antes, ~120 h). Como os itens agora se dividem entre mais espaços, cada peça específica cai menos.

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
