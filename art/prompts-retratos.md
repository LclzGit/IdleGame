# Prompts dos retratos — Daemon Bar

Estilo de referência: os retratos aprovados de FIREWALL, SANDBOX-II, QUARENTENA, RESTORE-9 e KILLSWITCH-7.
Os prompts estão em inglês porque as ferramentas de imagem seguem melhor assim.

## Como usar

1. Copie o **prompt-base** e troque `[PERSONAGEM]` pela ficha do personagem (seção abaixo).
2. Se a ferramenta aceitar imagem de referência, anexe **um retrato já aprovado** (de preferência da mesma classe: tanque com tanque, atirador com atirador). É o que mais segura o estilo.
3. Se vier fora do padrão, some o **prompt negativo** (ou cole no fim como "Avoid: ...").
4. Mande o arquivo pra mim com o nome do agente. O `tools/portrait-import.cjs` recorta a moldura, tira o fundo branco e aplica o fundo do jogo.

Checklist pra aprovar: busto (cabeça e ombros), virado 3/4 pra direita, contorno preto grosso, fundo branco liso, moldura cinza arredondada, uma cor de brilho só (olhos/visor/linhas), sem texto.

## Prompt-base

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

## Prompt negativo

```
Avoid: full body, legs, background scenery, gradient background, blurry, painterly, 3D render, photo, realistic,
smooth vector art, soft airbrush, multiple characters, text, UI, logo, watermark, extra fingers, cropped head.
```

## Cor de brilho por raridade (dica)

- ★3: poucos detalhes brilhando, armadura mais simples.
- ★4: linhas de energia pela armadura e partículas discretas no fundo.
- ★5: armadura ornamentada, núcleo/olhos brilhando forte e partículas (faíscas/fragmentos) ao redor da cabeça.

---

## Tanques

### FIREWALL (★3) — lâmina e escudo hexagonal · já aprovado
```
a young man with spiky copper-orange hair, black high-tech sunglasses-visor with small green lenses,
calm serious expression, black armored trench coat with a tall collar and dark gray segmented plating,
subtle cyan accent reflections.
```

### SANDBOX-II (★3) — rifle e drone de reconhecimento · já aprovado
```
a heavy combat robot in dark gunmetal gray power armor, a narrow red glowing visor slit,
thin glowing orange circuit lines across helmet and shoulders, bronze bolted shoulder joints,
bulky rounded pauldrons.
```

### QUARENTENA (★4) — garra hidráulica e escudo-torre · já aprovado
```
a heavy combat robot in dark navy and gunmetal armor, a cluster of five round camera eyes glowing cyan,
cyan energy strips on the helmet and shoulders, a hydraulic claw hand raised in front of the chest
with copper pistons, the edge of a riveted tower shield behind the left shoulder, a few cyan pixel particles.
```

### RESTORE-9 (★4) — canhão de garra e echo-drone · já aprovado
```
a sleek combat robot in polished silver-white and pale blue armor, gold bolted joints on the shoulders,
a glowing cyan V-shaped visor and a small cyan eye on the forehead, a large green glowing reactor core
in the center of the chest, a few cyan pixel particles around the head.
```

### KILLSWITCH-7 (★5) — lâmina-canhão e escudo de engrenagem · já aprovado
```
a menacing heavy combat robot in bronze and black armor, three glowing red eyes (one on the forehead),
a ribbed respirator faceplate, a big red glowing fusion core in a round bronze housing on the chest,
bronze bolted shoulder joints, small orange ember particles floating around.
```

### KERNELGUARD-X1 (★5) — escudo colossal e drone Aegis · **falta**
```
a colossal guardian robot in military green armor with brushed steel trim and bronze bolts,
a smooth rounded helmet with a single horizontal cyan visor, a glowing cyan circular core on the chest
framed by hexagonal plates, the top edge of a colossal hexagonal energy shield rising behind the right shoulder,
a small round Aegis drone with a cyan eye hovering near the head, faint cyan particles.
```

## Ataque

### SCANNER (★3) — railgun e cachecol
```
a young agent with short silver hair and a sleek cyan visor-goggles over the eyes,
white and navy blue light armor with a high collar, a long flowing magenta scarf around the neck,
the barrel of a slim railgun resting over the right shoulder with cyan glowing coils.
```

### TRACEROUTE (★3) — rifle de precisão
```
a stealth sniper wearing a dark charcoal hooded tactical helmet with a round orange glowing lens,
matte black and dark gray armor with thin orange accent lines, the long barrel and scope of a precision rifle
visible over the shoulder.
```

### SHREDDER (★3) — rifle com baioneta
```
a frontline soldier in military green armor with a cap-style combat helmet and a green glowing visor band,
angular chest plating, the tip of a bayonet rifle with a pale steel blade angled across the lower frame.
```

### PENTEST (★4) — rifle com mira e gancho
```
an infiltration specialist in cream white armor plates over a black bodysuit, green glowing accents,
a rounded helmet with a cyan visor and a headset with a small antenna,
a grappling-hook launcher on the forearm and the scope of a rifle near the shoulder, a few green pixel particles.
```

### SPECTRE (★4) — sniper e pistola
```
a stealth operative with a short white swept-back crest of hair on top of a dark navy tactical helmet,
dark visor with two small cyan lenses, slim navy armor with thin orange accent lines,
a silenced pistol held near the chest, a few faint cyan pixel particles.
```

### SNIFFER (★4) — besta de energia
```
a hunter in dark maroon and black armor with small horn-like fins on the helmet,
a wide glowing purple visor, thin red accent lines on the shoulders,
the front of an energy crossbow with purple glowing limbs near the shoulder, a few purple pixel particles.
```

### CHECKSUM (★5) — arco tático e aljava
```
an elite archer with wild spiky white hair and a black face mask covering the mouth,
sharp eyes, a long red scarf, navy and white armor with gold shoulder plates,
a quiver of arrows over the back and the curve of a tactical bow, small red and gold particles.
```

### DEFRAG (★5) — canhão laser e esteiras
```
a heavy gunner in olive drab armor with a goggle helmet and a glowing amber lens,
chunky plated shoulders, the barrel of a massive red laser cannon across the front with glowing red vents,
orange ember particles.
```

### FORMAT-C (★5) — modo tanque · artilharia
```
the front of an olive drab walker tank seen as a portrait: an armored cockpit turret with a narrow amber viewport,
a big artillery barrel pointing to the right, stacked red shell rack on the side, heavy riveted plating,
treads just visible at the bottom edge, orange ember particles.
```

## Suporte

### PATCHER (★3) — cajado de nanobots
```
a calm medic with long flowing white hair and dark brown skin, a lavender glowing visor band across the eyes,
white and lavender armor with soft rounded plates, a pastel iridescent cape over the shoulders,
the top of a slim staff with a glowing lavender orb emitting tiny nanobot particles.
```
