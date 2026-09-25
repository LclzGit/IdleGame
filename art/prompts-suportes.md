# Suportes novos — Daemon Bar

## O que eu acho

Os conceitos são bons, mas metade é fantasia medieval (bardo, cavaleiro, sacerdote, cartógrafa) e o jogo é antivírus/cyber. Mantive o visual de cada um e **puxei para o tema**: roupa com circuitos, hologramas, equipamento tech. Assim eles combinam com os tanques e atiradores que já estão no jogo.

Cada suporte tem **uma função própria**, pra escolha ser uma decisão (hoje a PATCHER só cura):

| ★ | Nome | Veio do conceito | Função |
|---|---|---|---|
| ★★★ | **DEBUGGER** | mecânica de óculos e chave inglesa | a cada 6 s coloca uma barreira no tanque que absorve 15% da vida dele. |
| ★★★ | **PING** | operadora de rádio com tablet | +12% de velocidade de ataque para o esquadrão; na fase de chefe, +20%. |
| ★★★ | **CRAWLER** | cartógrafa com mapa | +15% de chance de drop de itens e +10% de pacotes de download. |
| ★★★★ | **HOTFIX** | alquimista com mochila de frascos | joga um frasco que cura o esquadrão aos poucos (4 s) e envenena os vírus da frente. |
| ★★★★ | **OVERVOLT** | robô-bateria | a cada 10 s descarrega energia no esquadrão: +40% de dano por 3 s. |
| ★★★★ | **STREAM** | bardo com instrumento | +25% de créditos e +15% de definições enquanto estiver no esquadrão. |
| ★★★★★ | **PROXY** | teleportadora | 25% dos ataques contra o esquadrão são desviados; a cada 15 s troca o tanque por uma cópia holográfica por 2 s. |
| ★★★★★ | **ENCRYPT** | cavaleiro com escudo de luz | barreira no esquadrão inteiro que absorve 20% da vida máxima, recarrega a cada 12 s. |
| ★★★★★ | **ROLLBACK** | sábia com lanterna | revive o primeiro agente que cair em cada fase com 50% da vida (o único suporte que revive). |

**Cortei a "Haven" (médica de campo):** faz o mesmo que a PATCHER (cura). O visual dela pode virar uma skin ou versão da PATCHER.

**Destaque:** ROLLBACK resolve o "ninguém revive" que deixamos anotado lá atrás — um agente caído hoje só volta na próxima fase.

**No jogo** (quando formos implementar): o suporte vira um slot trocável como tanque e ataque, entra no Download com as mesmas raridades, e a PATCHER continua como suporte inicial (★3). 3 por raridade, igual aos atiradores.

## Como usar

Igual aos outros: gere **Retrato → Corpo inteiro → animações**, anexando a referência (retrato no corpo; corpo nas animações). Mande com o nome e o tipo: *"PING, ação"*.
Suporte tem **duas folhas de efeito**: a **ação** (5 quadros, a habilidade dele) e o **pulso** (4 quadros, usado quando ataca).

---

## DEBUGGER ★★★ — mecânica de óculos e chave inglesa

**Remendo:** a cada 6 s coloca uma barreira no tanque que absorve 15% da vida dele.

**Retrato**
```
High-detail pixel art character portrait for a video game, bust shot (head, neck and upper shoulders), three-quarter view facing right, top of the head near the top of the frame, shoulders cropped by the bottom edge. A short stocky young engineer with wild curly red hair, big brass welding goggles pushed up on the forehead, freckles, a determined grin, a patched gray-blue work jumpsuit with glowing cyan seams. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background. Rounded square frame with a thick dark gray border and a thin black inner line. Square 1024x1024. No text, no logo, no watermark. Avoid: full body, background scenery, gradient background, blurry, painterly, 3D render, realistic.
```

**Corpo inteiro**
```
Pixel art game sprite of a single character, full body from head to feet, side view facing right, combat-ready stance (feet apart, knees slightly bent, weight forward), an oversized glowing cyan wrench held ready and pointing to the right. A short stocky young engineer with wild curly red hair, big brass welding goggles pushed up on the forehead, freckles, a determined grin, a patched gray-blue work jumpsuit with glowing cyan seams. Heavy work boots, knee pads, a tool belt with pouches, a tiny round repair drone with a cyan light hovering beside her. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Strong silhouette that still reads at 70 pixels tall. Centered with empty margin around it. Plain solid white background, no floor, no shadow, no frame. 1024x1024. No text, no logo, no watermark. Avoid: cropped feet, cropped weapon, facing left, front view, background, floor, shadow, 3D render, realistic.
```

**Movimentação (6 quadros)**
```
Pixel art sprite sheet of ONE character, 6 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a looping walk cycle to the right, 6 frames (contact, down, passing, up, contact with the other leg, passing), weapon held forward, slight body bob. A short stocky young engineer with wild curly red hair, big brass welding goggles pushed up on the forehead, freckles, a determined grin, a patched gray-blue work jumpsuit with glowing cyan seams. Heavy work boots, knee pads, a tool belt with pouches, a tiny round repair drone with a cyan light hovering beside her. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Ação (5 quadros)**
```
Pixel art sprite sheet of ONE character, 5 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support ability, 5 frames: 1 idle stance, 2 kneeling and slamming the wrench down, 3 cyan sparks and hexagonal patch fragments flying to the right, 4 a small cyan hexagonal barrier flying toward the allies, 5 back to idle stance. A short stocky young engineer with wild curly red hair, big brass welding goggles pushed up on the forehead, freckles, a determined grin, a patched gray-blue work jumpsuit with glowing cyan seams. Heavy work boots, knee pads, a tool belt with pouches, a tiny round repair drone with a cyan light hovering beside her. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Pulso (4 quadros)**
```
Pixel art sprite sheet of ONE character, 4 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support pulse, 4 frames: 1 idle, 2 planting the wrench on the ground, 3 a glowing ring in the accent color expanding around the feet, 4 the ring fading back to idle. A short stocky young engineer with wild curly red hair, big brass welding goggles pushed up on the forehead, freckles, a determined grin, a patched gray-blue work jumpsuit with glowing cyan seams. Heavy work boots, knee pads, a tool belt with pouches, a tiny round repair drone with a cyan light hovering beside her. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

---

## PING ★★★ — operadora de rádio com tablet

**Chamar alvo:** +12% de velocidade de ataque para o esquadrão; na fase de chefe, +20%.

**Retrato**
```
High-detail pixel art character portrait for a video game, bust shot (head, neck and upper shoulders), three-quarter view facing right, top of the head near the top of the frame, shoulders cropped by the bottom edge. A calm young radio operator with short black afro hair, dark skin, a headset with a boom mic, a navy blue tactical jumpsuit with padded shoulders and a chest rig full of pouches, a small blinking antenna on the shoulder. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background. Rounded square frame with a thick dark gray border and a thin black inner line. Square 1024x1024. No text, no logo, no watermark. Avoid: full body, background scenery, gradient background, blurry, painterly, 3D render, realistic.
```

**Corpo inteiro**
```
Pixel art game sprite of a single character, full body from head to feet, side view facing right, combat-ready stance (feet apart, knees slightly bent, weight forward), a glowing holographic tablet held ready and pointing to the right. A calm young radio operator with short black afro hair, dark skin, a headset with a boom mic, a navy blue tactical jumpsuit with padded shoulders and a chest rig full of pouches, a small blinking antenna on the shoulder. Knee pads, combat boots, a holstered sidearm, a rugged handheld radio and a glowing tablet. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Strong silhouette that still reads at 70 pixels tall. Centered with empty margin around it. Plain solid white background, no floor, no shadow, no frame. 1024x1024. No text, no logo, no watermark. Avoid: cropped feet, cropped weapon, facing left, front view, background, floor, shadow, 3D render, realistic.
```

**Movimentação (6 quadros)**
```
Pixel art sprite sheet of ONE character, 6 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a looping walk cycle to the right, 6 frames (contact, down, passing, up, contact with the other leg, passing), weapon held forward, slight body bob. A calm young radio operator with short black afro hair, dark skin, a headset with a boom mic, a navy blue tactical jumpsuit with padded shoulders and a chest rig full of pouches, a small blinking antenna on the shoulder. Knee pads, combat boots, a holstered sidearm, a rugged handheld radio and a glowing tablet. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Ação (5 quadros)**
```
Pixel art sprite sheet of ONE character, 5 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support ability, 5 frames: 1 idle stance, 2 raising the tablet and pressing the headset, 3 concentric sonar rings pulsing out of the tablet, 4 small target markers flying to the right, 5 back to idle stance. A calm young radio operator with short black afro hair, dark skin, a headset with a boom mic, a navy blue tactical jumpsuit with padded shoulders and a chest rig full of pouches, a small blinking antenna on the shoulder. Knee pads, combat boots, a holstered sidearm, a rugged handheld radio and a glowing tablet. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Pulso (4 quadros)**
```
Pixel art sprite sheet of ONE character, 4 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support pulse, 4 frames: 1 idle, 2 raising the radio antenna high, 3 a glowing ring in the accent color expanding around the feet, 4 the ring fading back to idle. A calm young radio operator with short black afro hair, dark skin, a headset with a boom mic, a navy blue tactical jumpsuit with padded shoulders and a chest rig full of pouches, a small blinking antenna on the shoulder. Knee pads, combat boots, a holstered sidearm, a rugged handheld radio and a glowing tablet. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

---

## CRAWLER ★★★ — cartógrafa com mapa

**Varredura de rotas:** +15% de chance de drop de itens e +10% de pacotes de download.

**Retrato**
```
High-detail pixel art character portrait for a video game, bust shot (head, neck and upper shoulders), three-quarter view facing right, top of the head near the top of the frame, shoulders cropped by the bottom edge. An adventurous explorer with a silver bob haircut, sharp eyes, a long navy blue coat with gold trim over light chainmail, a leather satchel, a monocle-like scanner over one eye. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background. Rounded square frame with a thick dark gray border and a thin black inner line. Square 1024x1024. No text, no logo, no watermark. Avoid: full body, background scenery, gradient background, blurry, painterly, 3D render, realistic.
```

**Corpo inteiro**
```
Pixel art game sprite of a single character, full body from head to feet, side view facing right, combat-ready stance (feet apart, knees slightly bent, weight forward), a large glowing holographic map scroll held ready and pointing to the right. An adventurous explorer with a silver bob haircut, sharp eyes, a long navy blue coat with gold trim over light chainmail, a leather satchel, a monocle-like scanner over one eye. Leather belt with scroll cases, brown knee-high boots, the coat tails flowing. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Strong silhouette that still reads at 70 pixels tall. Centered with empty margin around it. Plain solid white background, no floor, no shadow, no frame. 1024x1024. No text, no logo, no watermark. Avoid: cropped feet, cropped weapon, facing left, front view, background, floor, shadow, 3D render, realistic.
```

**Movimentação (6 quadros)**
```
Pixel art sprite sheet of ONE character, 6 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a looping walk cycle to the right, 6 frames (contact, down, passing, up, contact with the other leg, passing), weapon held forward, slight body bob. An adventurous explorer with a silver bob haircut, sharp eyes, a long navy blue coat with gold trim over light chainmail, a leather satchel, a monocle-like scanner over one eye. Leather belt with scroll cases, brown knee-high boots, the coat tails flowing. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Ação (5 quadros)**
```
Pixel art sprite sheet of ONE character, 5 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support ability, 5 frames: 1 idle stance, 2 unrolling the holographic map, 3 the map lighting up with glowing routes and pins, 4 a glowing arrow marker shooting to the right, 5 back to idle stance. An adventurous explorer with a silver bob haircut, sharp eyes, a long navy blue coat with gold trim over light chainmail, a leather satchel, a monocle-like scanner over one eye. Leather belt with scroll cases, brown knee-high boots, the coat tails flowing. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Pulso (4 quadros)**
```
Pixel art sprite sheet of ONE character, 4 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support pulse, 4 frames: 1 idle, 2 spreading the map open, 3 a glowing ring in the accent color expanding around the feet, 4 the ring fading back to idle. An adventurous explorer with a silver bob haircut, sharp eyes, a long navy blue coat with gold trim over light chainmail, a leather satchel, a monocle-like scanner over one eye. Leather belt with scroll cases, brown knee-high boots, the coat tails flowing. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

---

## HOTFIX ★★★★ — alquimista com mochila de frascos

**Frascos:** joga um frasco que cura o esquadrão aos poucos (4 s) e envenena os vírus da frente.

**Retrato**
```
High-detail pixel art character portrait for a video game, bust shot (head, neck and upper shoulders), three-quarter view facing right, top of the head near the top of the frame, shoulders cropped by the bottom edge. A rugged tech alchemist with messy brown hair and stubble, a leather apron over a green shirt with rolled sleeves, a bulky backpack with glass tanks of bubbling green liquid and copper pipes, safety goggles around the neck. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background. Rounded square frame with a thick dark gray border and a thin black inner line. Square 1024x1024. No text, no logo, no watermark. Avoid: full body, background scenery, gradient background, blurry, painterly, 3D render, realistic.
```

**Corpo inteiro**
```
Pixel art game sprite of a single character, full body from head to feet, side view facing right, combat-ready stance (feet apart, knees slightly bent, weight forward), a glowing green vial held ready and pointing to the right. A rugged tech alchemist with messy brown hair and stubble, a leather apron over a green shirt with rolled sleeves, a bulky backpack with glass tanks of bubbling green liquid and copper pipes, safety goggles around the neck. A belt full of small glowing vials, cargo pants, heavy brown boots. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Strong silhouette that still reads at 70 pixels tall. Centered with empty margin around it. Plain solid white background, no floor, no shadow, no frame. 1024x1024. No text, no logo, no watermark. Avoid: cropped feet, cropped weapon, facing left, front view, background, floor, shadow, 3D render, realistic.
```

**Movimentação (6 quadros)**
```
Pixel art sprite sheet of ONE character, 6 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a looping walk cycle to the right, 6 frames (contact, down, passing, up, contact with the other leg, passing), weapon held forward, slight body bob. A rugged tech alchemist with messy brown hair and stubble, a leather apron over a green shirt with rolled sleeves, a bulky backpack with glass tanks of bubbling green liquid and copper pipes, safety goggles around the neck. A belt full of small glowing vials, cargo pants, heavy brown boots. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Ação (5 quadros)**
```
Pixel art sprite sheet of ONE character, 5 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support ability, 5 frames: 1 idle stance, 2 pulling a vial from the belt and shaking it, 3 throwing the vial in an arc to the right, 4 the vial bursting into a green mist cloud with bubbles, 5 back to idle stance. A rugged tech alchemist with messy brown hair and stubble, a leather apron over a green shirt with rolled sleeves, a bulky backpack with glass tanks of bubbling green liquid and copper pipes, safety goggles around the neck. A belt full of small glowing vials, cargo pants, heavy brown boots. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Pulso (4 quadros)**
```
Pixel art sprite sheet of ONE character, 4 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support pulse, 4 frames: 1 idle, 2 pouring a vial on the ground, 3 a glowing ring in the accent color expanding around the feet, 4 the ring fading back to idle. A rugged tech alchemist with messy brown hair and stubble, a leather apron over a green shirt with rolled sleeves, a bulky backpack with glass tanks of bubbling green liquid and copper pipes, safety goggles around the neck. A belt full of small glowing vials, cargo pants, heavy brown boots. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

---

## OVERVOLT ★★★★ — robô-bateria

**Sobrecarga:** a cada 10 s descarrega energia no esquadrão: +40% de dano por 3 s.

**Retrato**
```
High-detail pixel art character portrait for a video game, bust shot (head, neck and upper shoulders), three-quarter view facing right, top of the head near the top of the frame, shoulders cropped by the bottom edge. A hulking friendly battery robot in olive drab armor plates, a huge glass capsule of glowing green energy on its back connected by cables, small round green optic eyes, a clawed mechanical hand, hazard stripes on the shoulders. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background. Rounded square frame with a thick dark gray border and a thin black inner line. Square 1024x1024. No text, no logo, no watermark. Avoid: full body, background scenery, gradient background, blurry, painterly, 3D render, realistic.
```

**Corpo inteiro**
```
Pixel art game sprite of a single character, full body from head to feet, side view facing right, combat-ready stance (feet apart, knees slightly bent, weight forward), its clawed hand crackling with green electricity held ready and pointing to the right. A hulking friendly battery robot in olive drab armor plates, a huge glass capsule of glowing green energy on its back connected by cables, small round green optic eyes, a clawed mechanical hand, hazard stripes on the shoulders. Thick armored legs, heavy feet, cables hanging from the back capsule, green sparks around the joints. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Strong silhouette that still reads at 70 pixels tall. Centered with empty margin around it. Plain solid white background, no floor, no shadow, no frame. 1024x1024. No text, no logo, no watermark. Avoid: cropped feet, cropped weapon, facing left, front view, background, floor, shadow, 3D render, realistic.
```

**Movimentação (6 quadros)**
```
Pixel art sprite sheet of ONE character, 6 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a looping walk cycle to the right, 6 frames (contact, down, passing, up, contact with the other leg, passing), weapon held forward, slight body bob. A hulking friendly battery robot in olive drab armor plates, a huge glass capsule of glowing green energy on its back connected by cables, small round green optic eyes, a clawed mechanical hand, hazard stripes on the shoulders. Thick armored legs, heavy feet, cables hanging from the back capsule, green sparks around the joints. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Ação (5 quadros)**
```
Pixel art sprite sheet of ONE character, 5 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support ability, 5 frames: 1 idle stance, 2 the back capsule charging up and glowing brighter, 3 raising the claw with green lightning arcing, 4 a green lightning bolt discharging to the right toward the allies, 5 back to idle stance. A hulking friendly battery robot in olive drab armor plates, a huge glass capsule of glowing green energy on its back connected by cables, small round green optic eyes, a clawed mechanical hand, hazard stripes on the shoulders. Thick armored legs, heavy feet, cables hanging from the back capsule, green sparks around the joints. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Pulso (4 quadros)**
```
Pixel art sprite sheet of ONE character, 4 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support pulse, 4 frames: 1 idle, 2 slamming both fists on the ground, 3 a glowing ring in the accent color expanding around the feet, 4 the ring fading back to idle. A hulking friendly battery robot in olive drab armor plates, a huge glass capsule of glowing green energy on its back connected by cables, small round green optic eyes, a clawed mechanical hand, hazard stripes on the shoulders. Thick armored legs, heavy feet, cables hanging from the back capsule, green sparks around the joints. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

---

## STREAM ★★★★ — bardo com instrumento

**Transmissão ao vivo:** +25% de créditos e +15% de definições enquanto estiver no esquadrão.

**Retrato**
```
High-detail pixel art character portrait for a video game, bust shot (head, neck and upper shoulders), three-quarter view facing right, top of the head near the top of the frame, shoulders cropped by the bottom edge. A charismatic young musician with curly dark hair, warm brown skin and a confident smile, an iridescent layered coat in pastel teal and purple, a futuristic keytar-lute slung on the back, a small holographic horn in one hand. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background. Rounded square frame with a thick dark gray border and a thin black inner line. Square 1024x1024. No text, no logo, no watermark. Avoid: full body, background scenery, gradient background, blurry, painterly, 3D render, realistic.
```

**Corpo inteiro**
```
Pixel art game sprite of a single character, full body from head to feet, side view facing right, combat-ready stance (feet apart, knees slightly bent, weight forward), a glowing holographic horn held ready and pointing to the right. A charismatic young musician with curly dark hair, warm brown skin and a confident smile, an iridescent layered coat in pastel teal and purple, a futuristic keytar-lute slung on the back, a small holographic horn in one hand. Loose teal pants, brown boots, the coat tails flowing like ribbons, tiny floating music-note holograms. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Strong silhouette that still reads at 70 pixels tall. Centered with empty margin around it. Plain solid white background, no floor, no shadow, no frame. 1024x1024. No text, no logo, no watermark. Avoid: cropped feet, cropped weapon, facing left, front view, background, floor, shadow, 3D render, realistic.
```

**Movimentação (6 quadros)**
```
Pixel art sprite sheet of ONE character, 6 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a looping walk cycle to the right, 6 frames (contact, down, passing, up, contact with the other leg, passing), weapon held forward, slight body bob. A charismatic young musician with curly dark hair, warm brown skin and a confident smile, an iridescent layered coat in pastel teal and purple, a futuristic keytar-lute slung on the back, a small holographic horn in one hand. Loose teal pants, brown boots, the coat tails flowing like ribbons, tiny floating music-note holograms. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Ação (5 quadros)**
```
Pixel art sprite sheet of ONE character, 5 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support ability, 5 frames: 1 idle stance, 2 raising the horn to the lips, 3 blowing the horn with glowing sound waves, 4 floating neon music notes flying to the right, 5 back to idle stance. A charismatic young musician with curly dark hair, warm brown skin and a confident smile, an iridescent layered coat in pastel teal and purple, a futuristic keytar-lute slung on the back, a small holographic horn in one hand. Loose teal pants, brown boots, the coat tails flowing like ribbons, tiny floating music-note holograms. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Pulso (4 quadros)**
```
Pixel art sprite sheet of ONE character, 4 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support pulse, 4 frames: 1 idle, 2 strumming the lute once with a flourish, 3 a glowing ring in the accent color expanding around the feet, 4 the ring fading back to idle. A charismatic young musician with curly dark hair, warm brown skin and a confident smile, an iridescent layered coat in pastel teal and purple, a futuristic keytar-lute slung on the back, a small holographic horn in one hand. Loose teal pants, brown boots, the coat tails flowing like ribbons, tiny floating music-note holograms. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

---

## PROXY ★★★★★ — teleportadora

**Redirecionar:** 25% dos ataques contra o esquadrão são desviados; a cada 15 s troca o tanque por uma cópia holográfica por 2 s.

**Retrato**
```
High-detail pixel art character portrait for a video game, bust shot (head, neck and upper shoulders), three-quarter view facing right, top of the head near the top of the frame, shoulders cropped by the bottom edge. An agile infiltrator with an asymmetric violet undercut, a sleek cyan visor, a matte black and dark blue bodysuit with glowing blue lines, a small floating blue portal orb over one palm. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background. Rounded square frame with a thick dark gray border and a thin black inner line. Square 1024x1024. No text, no logo, no watermark. Avoid: full body, background scenery, gradient background, blurry, painterly, 3D render, realistic.
```

**Corpo inteiro**
```
Pixel art game sprite of a single character, full body from head to feet, side view facing right, combat-ready stance (feet apart, knees slightly bent, weight forward), a swirling blue portal orb held ready and pointing to the right. An agile infiltrator with an asymmetric violet undercut, a sleek cyan visor, a matte black and dark blue bodysuit with glowing blue lines, a small floating blue portal orb over one palm. Slim armored boots, glowing blue lines along the legs, blue glitch particles trailing behind. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Strong silhouette that still reads at 70 pixels tall. Centered with empty margin around it. Plain solid white background, no floor, no shadow, no frame. 1024x1024. No text, no logo, no watermark. Avoid: cropped feet, cropped weapon, facing left, front view, background, floor, shadow, 3D render, realistic.
```

**Movimentação (6 quadros)**
```
Pixel art sprite sheet of ONE character, 6 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a looping walk cycle to the right, 6 frames (contact, down, passing, up, contact with the other leg, passing), weapon held forward, slight body bob. An agile infiltrator with an asymmetric violet undercut, a sleek cyan visor, a matte black and dark blue bodysuit with glowing blue lines, a small floating blue portal orb over one palm. Slim armored boots, glowing blue lines along the legs, blue glitch particles trailing behind. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Ação (5 quadros)**
```
Pixel art sprite sheet of ONE character, 5 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support ability, 5 frames: 1 idle stance, 2 crouching and charging the portal orb, 3 vanishing into a burst of blue glitch squares, 4 reappearing in a flash of blue light with a portal ring, 5 back to idle stance. An agile infiltrator with an asymmetric violet undercut, a sleek cyan visor, a matte black and dark blue bodysuit with glowing blue lines, a small floating blue portal orb over one palm. Slim armored boots, glowing blue lines along the legs, blue glitch particles trailing behind. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Pulso (4 quadros)**
```
Pixel art sprite sheet of ONE character, 4 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support pulse, 4 frames: 1 idle, 2 opening a small portal ring on the ground, 3 a glowing ring in the accent color expanding around the feet, 4 the ring fading back to idle. An agile infiltrator with an asymmetric violet undercut, a sleek cyan visor, a matte black and dark blue bodysuit with glowing blue lines, a small floating blue portal orb over one palm. Slim armored boots, glowing blue lines along the legs, blue glitch particles trailing behind. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

---

## ENCRYPT ★★★★★ — cavaleiro com escudo de luz

**Criptografia:** barreira no esquadrão inteiro que absorve 20% da vida máxima, recarrega a cada 12 s.

**Retrato**
```
High-detail pixel art character portrait for a video game, bust shot (head, neck and upper shoulders), three-quarter view facing right, top of the head near the top of the frame, shoulders cropped by the bottom edge. A noble armored defender with short brown hair and a strong jaw, polished steel plate armor with a navy blue tabard showing a glowing lock emblem, a short mace at the belt. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background. Rounded square frame with a thick dark gray border and a thin black inner line. Square 1024x1024. No text, no logo, no watermark. Avoid: full body, background scenery, gradient background, blurry, painterly, 3D render, realistic.
```

**Corpo inteiro**
```
Pixel art game sprite of a single character, full body from head to feet, side view facing right, combat-ready stance (feet apart, knees slightly bent, weight forward), a large translucent hard-light shield with a glowing lock emblem held ready and pointing to the right. A noble armored defender with short brown hair and a strong jaw, polished steel plate armor with a navy blue tabard showing a glowing lock emblem, a short mace at the belt. Steel greaves, armored boots, a navy blue tabard hanging to the knees. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Strong silhouette that still reads at 70 pixels tall. Centered with empty margin around it. Plain solid white background, no floor, no shadow, no frame. 1024x1024. No text, no logo, no watermark. Avoid: cropped feet, cropped weapon, facing left, front view, background, floor, shadow, 3D render, realistic.
```

**Movimentação (6 quadros)**
```
Pixel art sprite sheet of ONE character, 6 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a looping walk cycle to the right, 6 frames (contact, down, passing, up, contact with the other leg, passing), weapon held forward, slight body bob. A noble armored defender with short brown hair and a strong jaw, polished steel plate armor with a navy blue tabard showing a glowing lock emblem, a short mace at the belt. Steel greaves, armored boots, a navy blue tabard hanging to the knees. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Ação (5 quadros)**
```
Pixel art sprite sheet of ONE character, 5 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support ability, 5 frames: 1 idle stance, 2 raising the hard-light shield, 3 the lock emblem glowing brightly, 4 a wide translucent blue dome of light expanding to the right over the allies, 5 back to idle stance. A noble armored defender with short brown hair and a strong jaw, polished steel plate armor with a navy blue tabard showing a glowing lock emblem, a short mace at the belt. Steel greaves, armored boots, a navy blue tabard hanging to the knees. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Pulso (4 quadros)**
```
Pixel art sprite sheet of ONE character, 4 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support pulse, 4 frames: 1 idle, 2 planting the shield on the ground, 3 a glowing ring in the accent color expanding around the feet, 4 the ring fading back to idle. A noble armored defender with short brown hair and a strong jaw, polished steel plate armor with a navy blue tabard showing a glowing lock emblem, a short mace at the belt. Steel greaves, armored boots, a navy blue tabard hanging to the knees. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

---

## ROLLBACK ★★★★★ — sábia com lanterna

**Restaurar ponto:** revive o primeiro agente que cair em cada fase com 50% da vida (o único suporte que revive).

**Retrato**
```
High-detail pixel art character portrait for a video game, bust shot (head, neck and upper shoulders), three-quarter view facing right, top of the head near the top of the frame, shoulders cropped by the bottom edge. A wise elderly sysadmin with long flowing white hair and deep dark skin, gentle eyes, layered cream and gold robes with circuit-like embroidery, a tall wooden staff with a curled top, an old brass lantern glowing with warm golden light. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background. Rounded square frame with a thick dark gray border and a thin black inner line. Square 1024x1024. No text, no logo, no watermark. Avoid: full body, background scenery, gradient background, blurry, painterly, 3D render, realistic.
```

**Corpo inteiro**
```
Pixel art game sprite of a single character, full body from head to feet, side view facing right, combat-ready stance (feet apart, knees slightly bent, weight forward), a brass lantern glowing warm gold held ready and pointing to the right. A wise elderly sysadmin with long flowing white hair and deep dark skin, gentle eyes, layered cream and gold robes with circuit-like embroidery, a tall wooden staff with a curled top, an old brass lantern glowing with warm golden light. Long robes reaching the ankles, simple sandals, a soft golden glow around the lantern. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Strong silhouette that still reads at 70 pixels tall. Centered with empty margin around it. Plain solid white background, no floor, no shadow, no frame. 1024x1024. No text, no logo, no watermark. Avoid: cropped feet, cropped weapon, facing left, front view, background, floor, shadow, 3D render, realistic.
```

**Movimentação (6 quadros)**
```
Pixel art sprite sheet of ONE character, 6 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a looping walk cycle to the right, 6 frames (contact, down, passing, up, contact with the other leg, passing), weapon held forward, slight body bob. A wise elderly sysadmin with long flowing white hair and deep dark skin, gentle eyes, layered cream and gold robes with circuit-like embroidery, a tall wooden staff with a curled top, an old brass lantern glowing with warm golden light. Long robes reaching the ankles, simple sandals, a soft golden glow around the lantern. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Ação (5 quadros)**
```
Pixel art sprite sheet of ONE character, 5 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support ability, 5 frames: 1 idle stance, 2 raising the lantern high, 3 the lantern flaring with a bright golden light, 4 a golden ghostly silhouette rising to the right, 5 back to idle stance. A wise elderly sysadmin with long flowing white hair and deep dark skin, gentle eyes, layered cream and gold robes with circuit-like embroidery, a tall wooden staff with a curled top, an old brass lantern glowing with warm golden light. Long robes reaching the ankles, simple sandals, a soft golden glow around the lantern. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```

**Pulso (4 quadros)**
```
Pixel art sprite sheet of ONE character, 4 frames in a single horizontal row, evenly spaced, same size, same character, same scale, same colors in every frame, side view facing right, feet on the same ground line, frames not overlapping. Animation: a support pulse, 4 frames: 1 idle, 2 tapping the staff on the ground, 3 a glowing ring in the accent color expanding around the feet, 4 the ring fading back to idle. A wise elderly sysadmin with long flowing white hair and deep dark skin, gentle eyes, layered cream and gold robes with circuit-like embroidery, a tall wooden staff with a curled top, an old brass lantern glowing with warm golden light. Long robes reaching the ankles, simple sandals, a soft golden glow around the lantern. Thick black outlines, crisp readable pixel clusters, cel shading with 3 tones per material, rim light on the left edges, one glowing accent color. Retro 16-bit SNES game art, no anti-aliasing blur. Plain solid white background, no floor, no shadow, no frame numbers. Wide image 1536x512. No text, no logo, no watermark. Avoid: different characters between frames, changing size or colors, facing left, overlapping frames, cropped feet, motion blur, grid lines.
```
