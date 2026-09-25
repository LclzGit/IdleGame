# Prompts de arte — Daemon Bar

Estilo de referência: os retratos aprovados de FIREWALL, SANDBOX-II, QUARENTENA, RESTORE-9 e KILLSWITCH-7.
Os prompts estão em inglês porque as ferramentas de imagem seguem melhor assim.

Este arquivo tem quatro tipos de pedido:

1. **Retrato** (busto, pro painel e a Coleção).
2. **Sprite de corpo inteiro** (pose de combate, a referência de cada personagem).
3. **Animações em folha de quadros**: movimento, ataque/disparo, defensiva (tanques) e suporte.
4. **Fichas por personagem**: o texto que entra no lugar de `[PERSONAGEM]`, `[ARMA]` etc.

## Como usar

1. Pegue o prompt-base do tipo que quer gerar e troque os campos entre colchetes pela ficha do personagem.
2. **Anexe uma imagem de referência** sempre que a ferramenta aceitar. Pro retrato, um retrato aprovado; pro corpo inteiro, o retrato do próprio personagem; pras animações, o sprite de corpo inteiro já aprovado do personagem. É o que mais segura o estilo e o visual entre as imagens.
3. Se vier fora do padrão, some o prompt negativo do tipo.
4. Mande pra mim com o nome do agente e o tipo ("PATCHER, disparo"). Eu recorto, tiro o fundo e monto no jogo (e um GIF pra você conferir).

### Sobre GIF

As ferramentas de imagem não geram GIF animado de forma confiável: os quadros mudam de tamanho, de cor e de personagem entre si. Por isso as animações são pedidas como **folha de quadros**: uma imagem só, com os quadros lado a lado, mesma escala e os pés na mesma linha. Eu transformo a folha na animação do jogo e em GIF.

Se a ferramenta errar muitos quadros de uma vez, peça **2 ou 3 quadros por imagem** (ex.: só "preparar + disparar") em vez da folha inteira, sempre anexando o sprite aprovado.

---

## 1. Retrato

### Prompt-base
```
High-detail pixel art character portrait for a video game, bust shot (head, neck and upper shoulders),
three-quarter view facing right, character centered, top of the head near the top of the frame,
shoulders cropped by the bottom edge. Thick black outlines, clean readable pixel clusters,
cel shading with 3 to 4 tones per material, strong rim light on the left edges,
[PERSONAGEM]
Plain solid white background. Rounded square frame with a thick dark gray border (#4a4f5c) and a thin black inner line.
Retro 16-bit JRPG / SNES portrait style, crisp pixels, no anti-aliasing blur, square 1:1 image, 1024x1024.
No text, no letters, no logo, no watermark, no signature.
```

### Negativo
```
Avoid: full body, legs, background scenery, gradient background, blurry, painterly, 3D render, photo, realistic,
smooth vector art, soft airbrush, multiple characters, text, UI, logo, watermark, extra fingers, cropped head.
```

Checklist: busto virado 3/4 pra direita, contorno preto grosso, fundo branco liso, moldura cinza arredondada, uma cor de brilho só, sem texto.

---

## 2. Sprite de corpo inteiro (pose de combate)

É a referência "oficial" do personagem pro jogo: tudo que vier depois (animações) deve bater com ele.
No jogo o personagem aparece pequeno (cerca de 70 px de altura na barra), então silhueta forte e cores bem separadas valem mais que detalhe miúdo.

### Prompt-base
```
Pixel art game sprite of a single character, full body from head to feet, side view facing right
(three-quarter side view), standing in a combat-ready stance: feet apart, knees slightly bent, weight forward,
[ARMA] held ready and pointing to the right.
[PERSONAGEM]
[CORPO]
Thick black outline around the whole silhouette, clean readable pixel clusters, cel shading with 3 tones per material,
rim light on the left edges, one glowing accent color. Strong readable silhouette that still works when shrunk
to 70 pixels tall. Character centered with empty margin around it, feet touching the same ground line.
Plain solid white background, no floor, no shadow, no frame.
Retro 16-bit SNES action game sprite style, crisp pixels, no anti-aliasing blur, 1024x1024.
No text, no logo, no watermark.
```

### Negativo
```
Avoid: portrait crop, cropped feet, cropped weapon, facing left, front view, background scenery, floor, cast shadow,
gradient background, motion blur, painterly, 3D render, realistic, multiple characters, text, UI, watermark.
```

Checklist: corpo inteiro com pés e arma completos, virado pra direita, fundo branco, sem sombra no chão, margem em volta.

---

## 3. Animações (folha de quadros)

Regras que valem pra todas as folhas (vão junto em todo prompt de animação):

```
Pixel art sprite sheet of ONE character, [N] animation frames in a single horizontal row, evenly spaced,
each frame the same size, same character, same scale, same colors and same proportions in every frame,
side view facing right, feet on the same ground line in every frame, nothing overlapping between frames.
[PERSONAGEM]
[CORPO]
Thick black outlines, crisp pixels, cel shading with 3 tones, one glowing accent color.
Plain solid white background, no floor, no shadow, no frame, no frame numbers.
Retro 16-bit SNES action game sprite style, no anti-aliasing blur, wide image 1536x512.
No text, no logo, no watermark.
```
Cole isso e troque `[N]` e acrescente a descrição da animação (abaixo) logo depois da primeira linha.

### Negativo (todas as animações)
```
Avoid: different characters between frames, changing size, changing colors, changing weapon, facing left, front view,
frames overlapping, cropped feet, cropped weapon, motion blur, floor, shadow, background scenery, frame numbers,
text, grid lines, watermark.
```

### 3.1 Movimentação (6 quadros)
Hoje o esquadrão fica parado defendendo o núcleo, mas o ciclo de caminhada serve pra entrada na fase, troca de agente e telas de Download/Coleção.
```
Animation: a looping walk cycle moving to the right, 6 frames: contact, down, passing, up, contact (other leg), passing.
The weapon stays held in the same hands and pointing forward, the upper body bobs slightly, arms and legs alternate.
```

### 3.2 Ataque / disparo (5 quadros)
Usado sempre que o agente ataca. Tanque e atirador usam esta; o suporte tem a dele (3.4).
```
Animation: an attack sequence, 5 frames:
1 guard stance (idle, weapon ready), 2 aim / wind-up, 3 [ATAQUE] with a bright muzzle flash or energy burst in the accent color,
4 recoil (body pushed back, weapon kicks up), 5 recover back to the guard stance.
```

### 3.3 Defensiva — só tanques (5 quadros)
O tanque levanta o escudo e continua atacando por trás dele.
```
Animation: a defensive sequence, 5 frames:
1 guard stance, 2 raising the [ESCUDO] in front of the body, 3 fully braced behind the raised shield, knees bent,
4 firing / striking from behind the shield ([ATAQUE_PROTEGIDO]) with a flash in the accent color,
5 still braced behind the shield, ready for the next hit.
```

### 3.4 Suporte (duas folhas)

**Cura (5 quadros)**
```
Animation: a healing cast, 5 frames:
1 idle stance holding [ARMA], 2 raising the [ARMA] overhead, 3 the orb/emitter glows brighter,
4 releasing a wave of small glowing particles to the right toward allies, 5 lowering back to idle.
Particles and glow in the accent color.
```

**Pulso de apoio / bônus (4 quadros)**
```
Animation: a support pulse, 4 frames:
1 idle, 2 planting the [ARMA] on the ground, 3 a glowing ring expanding around the feet,
4 the ring fading while the character returns to idle. Glow in the accent color.
```

### 3.5 Guarda parada (opcional, 4 quadros)
Pra quando o agente espera os vírus chegarem.
```
Animation: a subtle idle guard loop, 4 frames: breathing in, holding, breathing out, holding.
Only the chest, shoulders and weapon move by one or two pixels; the feet do not move.
```

---

## 4. Fichas por personagem

Cada ficha tem:
- **Retrato** → entra em `[PERSONAGEM]` do retrato.
- **Corpo** → entra em `[PERSONAGEM]` + `[CORPO]` do sprite e das animações.
- `[ARMA]`, `[ATAQUE]` e, nos tanques, `[ESCUDO]` e `[ATAQUE_PROTEGIDO]`.

Dica de raridade: ★3 simples; ★4 com linhas de energia e poucas partículas; ★5 armadura ornamentada, núcleo/olhos brilhando forte e partículas.

## Tanques

### FIREWALL (★3) — lâmina e escudo hexagonal · retrato aprovado
- **Retrato:**
  ```
  a young man with spiky copper-orange hair, black high-tech sunglasses-visor with small green lenses,
  calm serious expression, black armored trench coat with a tall collar and dark gray segmented plating,
  subtle cyan accent reflections.
  ```
- **Corpo:** `long black armored trench coat reaching the knees, dark gray segmented chest and leg plating, black combat boots with cyan edge lights.`
- `[ARMA]` `a heavy black energy blade with a cyan glowing edge`
- `[ATAQUE]` `a wide horizontal slash with a cyan energy arc`
- `[ESCUDO]` `hexagonal cyan energy shield projected from the left forearm`
- `[ATAQUE_PROTEGIDO]` `a short blade thrust past the edge of the hexagonal shield`

### SANDBOX-II (★3) — rifle e drone de reconhecimento · retrato aprovado
- **Retrato:**
  ```
  a heavy combat robot in dark gunmetal gray power armor, a narrow red glowing visor slit,
  thin glowing orange circuit lines across helmet and shoulders, bronze bolted shoulder joints,
  bulky rounded pauldrons.
  ```
- **Corpo:** `bulky dark gunmetal robot body with thick armored legs, bronze knee joints, orange circuit lines on the legs, a small round recon drone with an orange eye floating above the shoulder.`
- `[ARMA]` `a heavy assault rifle with an orange glowing barrel`
- `[ATAQUE]` `a three-round burst from the rifle`
- `[ESCUDO]` `a round deployable bubble shield in orange energy`
- `[ATAQUE_PROTEGIDO]` `firing the rifle through a gap in the bubble shield`

### QUARENTENA (★4) — garra hidráulica e escudo-torre · retrato aprovado
- **Retrato:**
  ```
  a heavy combat robot in dark navy and gunmetal armor, a cluster of five round camera eyes glowing cyan,
  cyan energy strips on the helmet and shoulders, a hydraulic claw hand raised in front of the chest
  with copper pistons, the edge of a riveted tower shield behind the left shoulder, a few cyan pixel particles.
  ```
- **Corpo:** `massive navy and gunmetal robot body, thick piston legs with copper hydraulics, cyan energy strips down the legs.`
- `[ARMA]` `a huge hydraulic claw arm with copper pistons`
- `[ATAQUE]` `a crushing claw grab thrust forward with a cyan shockwave`
- `[ESCUDO]` `a tall riveted steel tower shield with a cyan stripe`
- `[ATAQUE_PROTEGIDO]` `the claw lunging out from beside the tower shield`

### RESTORE-9 (★4) — canhão de garra e echo-drone · retrato aprovado
- **Retrato:**
  ```
  a sleek combat robot in polished silver-white and pale blue armor, gold bolted joints on the shoulders,
  a glowing cyan V-shaped visor and a small cyan eye on the forehead, a large green glowing reactor core
  in the center of the chest, a few cyan pixel particles around the head.
  ```
- **Corpo:** `sleek silver-white robot body with pale blue plating, gold knee joints, cyan light lines on the legs, a small white echo-drone with a green light floating behind the head.`
- `[ARMA]` `a claw-shaped arm cannon with a green glowing muzzle`
- `[ATAQUE]` `a green plasma blast from the claw cannon`
- `[ESCUDO]` `a tall white tower shield with gold trim and a cyan emblem`
- `[ATAQUE_PROTEGIDO]` `a green plasma blast fired over the top of the tower shield`

### KILLSWITCH-7 (★5) — lâmina-canhão e escudo de engrenagem · retrato aprovado
- **Retrato:**
  ```
  a menacing heavy combat robot in bronze and black armor, three glowing red eyes (one on the forehead),
  a ribbed respirator faceplate, a big red glowing fusion core in a round bronze housing on the chest,
  bronze bolted shoulder joints, small orange ember particles floating around.
  ```
- **Corpo:** `hulking bronze and black robot body with heavy plated legs, red glowing vents on the thighs, a dark tattered armored skirt, orange embers around the feet.`
- `[ARMA]` `a gunblade: a long crimson blade with a cannon barrel along its spine`
- `[ATAQUE]` `a downward slash that fires a red blast from the gunblade barrel`
- `[ESCUDO]` `a round bronze gear-shaped shield with a red core in the center`
- `[ATAQUE_PROTEGIDO]` `the gunblade barrel firing a red shot past the edge of the gear shield`

### KERNELGUARD-X1 (★5) — escudo colossal e drone Aegis · **retrato falta**
- **Retrato:**
  ```
  a colossal guardian robot in military green armor with brushed steel trim and bronze bolts,
  a smooth rounded helmet with a single horizontal cyan visor, a glowing cyan circular core on the chest
  framed by hexagonal plates, the top edge of a colossal hexagonal energy shield rising behind the right shoulder,
  a small round Aegis drone with a cyan eye hovering near the head, faint cyan particles.
  ```
- **Corpo:** `colossal military green robot body with steel-trimmed armored legs and bronze joints, a small round Aegis drone with a cyan eye hovering above.`
- `[ARMA]` `a heavy rifle mounted on the right forearm`
- `[ATAQUE]` `a heavy rifle shot with a cyan muzzle flash`
- `[ESCUDO]` `a colossal hexagonal green-and-steel shield as tall as the character with a cyan core`
- `[ATAQUE_PROTEGIDO]` `the forearm rifle firing through a slot in the colossal shield while the Aegis drone glows`

## Ataque

### SCANNER (★3) — railgun e cachecol
- **Retrato:**
  ```
  a young agent with short silver hair and a sleek cyan visor-goggles over the eyes,
  white and navy blue light armor with a high collar, a long flowing magenta scarf around the neck,
  the barrel of a slim railgun resting over the right shoulder with cyan glowing coils.
  ```
- **Corpo:** `slim athletic build, white and navy light armor, navy pants with white knee guards, light boots, the magenta scarf flowing behind.`
- `[ARMA]` `a long slim railgun with cyan glowing coils, held at the hip`
- `[ATAQUE]` `a straight cyan railgun beam`

### TRACEROUTE (★3) — rifle de precisão
- **Retrato:**
  ```
  a stealth sniper wearing a dark charcoal hooded tactical helmet with a round orange glowing lens,
  matte black and dark gray armor with thin orange accent lines, the long barrel and scope of a precision rifle
  visible over the shoulder.
  ```
- **Corpo:** `lean body in matte black and dark gray tactical armor with orange accent lines, a backpack, black boots.`
- `[ARMA]` `a long precision sniper rifle with a scope`
- `[ATAQUE]` `a single sniper shot with a sharp orange muzzle flash`

### SHREDDER (★3) — rifle com baioneta
- **Retrato:**
  ```
  a frontline soldier in military green armor with a cap-style combat helmet and a green glowing visor band,
  angular chest plating, the tip of a bayonet rifle with a pale steel blade angled across the lower frame.
  ```
- **Corpo:** `stocky soldier in military green armor, green padded pants with knee plates, heavy boots.`
- `[ARMA]` `an assault rifle with a long pale steel bayonet`
- `[ATAQUE]` `a fast burst of fire with green muzzle flashes`

### PENTEST (★4) — rifle com mira e gancho
- **Retrato:**
  ```
  an infiltration specialist in cream white armor plates over a black bodysuit, green glowing accents,
  a rounded helmet with a cyan visor and a headset with a small antenna,
  a grappling-hook launcher on the forearm and the scope of a rifle near the shoulder, a few green pixel particles.
  ```
- **Corpo:** `cream white armor plates over a black bodysuit, cream shin guards, green glowing lines on the legs, a grappling-hook launcher on the left forearm.`
- `[ARMA]` `a scoped rifle`
- `[ATAQUE]` `a scoped rifle shot with a green tracer`

### SPECTRE (★4) — sniper e pistola
- **Retrato:**
  ```
  a stealth operative with a short white swept-back crest of hair on top of a dark navy tactical helmet,
  dark visor with two small cyan lenses, slim navy armor with thin orange accent lines,
  a silenced pistol held near the chest, a few faint cyan pixel particles.
  ```
- **Corpo:** `slim stealth body in dark navy armor with orange accent lines, a holstered silenced pistol on the thigh.`
- `[ARMA]` `a long dark sniper rifle`
- `[ATAQUE]` `a silent sniper shot with a small cyan flash and a thin tracer`

### SNIFFER (★4) — besta de energia
- **Retrato:**
  ```
  a hunter in dark maroon and black armor with small horn-like fins on the helmet,
  a wide glowing purple visor, thin red accent lines on the shoulders,
  the front of an energy crossbow with purple glowing limbs near the shoulder, a few purple pixel particles.
  ```
- **Corpo:** `agile body in dark maroon and black armor, red accent lines on the legs, dark boots.`
- `[ARMA]` `an energy crossbow with purple glowing limbs`
- `[ATAQUE]` `a glowing purple bolt shot from the crossbow`

### CHECKSUM (★5) — arco tático e aljava
- **Retrato:**
  ```
  an elite archer with wild spiky white hair and a black face mask covering the mouth,
  sharp eyes, a long red scarf, navy and white armor with gold shoulder plates,
  a quiver of arrows over the back and the curve of a tactical bow, small red and gold particles.
  ```
- **Corpo:** `agile body in navy and white armor with gold shoulder plates, dark leggings, white boots, a brown leather quiver on the back, the red scarf flowing behind.`
- `[ARMA]` `a tactical recurve bow with gold details`
- `[ATAQUE]` `drawing the bow and releasing three glowing arrows at once`

### DEFRAG (★5) — canhão laser e esteiras
- **Retrato:**
  ```
  a heavy gunner in olive drab armor with a goggle helmet and a glowing amber lens,
  chunky plated shoulders, the barrel of a massive red laser cannon across the front with glowing red vents,
  orange ember particles.
  ```
- **Corpo:** `heavy olive drab armored body, small tank treads instead of feet, a power pack on the back.`
- `[ARMA]` `a massive red laser cannon held at the hip`
- `[ATAQUE]` `a thick continuous red laser beam firing to the right`

### FORMAT-C (★5) — modo tanque · artilharia
- **Retrato:**
  ```
  the front of an olive drab walker tank seen as a portrait: an armored cockpit turret with a narrow amber viewport,
  a big artillery barrel pointing to the right, stacked red shell rack on the side, heavy riveted plating,
  treads just visible at the bottom edge, orange ember particles.
  ```
- **Corpo:** `a compact olive drab tank on treads with an armored turret, a big artillery barrel pointing right, a red shell rack on the side.`
- `[ARMA]` `the turret artillery cannon`
- `[ATAQUE]` `the cannon firing a shell with a big orange blast and the treads rocking back`
- Movimentação dele: troque "walk cycle" por `treads rolling to the right, the hull bobbing slightly`.

## Suporte

### PATCHER (★3) — cajado de nanobots
- **Retrato:**
  ```
  a calm medic with long flowing white hair and dark brown skin, a lavender glowing visor band across the eyes,
  white and lavender armor with soft rounded plates, a pastel iridescent cape over the shoulders,
  the top of a slim staff with a glowing lavender orb emitting tiny nanobot particles.
  ```
- **Corpo:** `slender figure in white and lavender armor with soft rounded plates, a long pastel iridescent cape, white boots.`
- `[ARMA]` `a slim white staff topped with a glowing lavender orb`
- Animações: use as de **Suporte** (3.4) e a de movimentação (3.1). O ataque dele (3.2) é opcional: `[ATAQUE]` = `a small lavender energy bolt from the staff orb`.
