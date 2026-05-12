[x] - Pulir NoteAiActions visualmente
[x] - Crear edit note modal/drawer
[x] - Añadir search/filter por título/contenido
[x] - Añadir filter by tags
[x] - Archive/unarchive UI
[x] - Note details page
[x] - Markdown editor
[] - AI chat with note
[x] - Semantic search con pgvector
[] - lobal AI Workspace Chat

NeuroNote — Roadmap para mañana
1. Chat with this note
Objetivo

Permitir conversar con una nota específica dentro de NoteDetailsPage.

Backend

Crear endpoint:

POST /api/ai/notes/:id/chat
Buscar nota por noteId

Construir contexto:

title + content + summary
Enviar contexto + pregunta a OpenAI
Devolver respuesta IA
Frontend

Crear componente:

components/ai/NoteChat.tsx

Integrarlo en:

NoteDetailsPage
UI tipo:
messages
input
send button
loading state
AI bubble
user bubble
Features
preguntas sobre la nota
expandir ideas
resumir
convertir en tareas
brainstorming
mejorar texto
explicar conceptos
2. Global AI Workspace Chat
Objetivo

Chat global que use semantic search sobre todas las notas.

Flujo
Pregunta usuario
→ semantic search
→ recuperar notas relevantes
→ enviar contexto a OpenAI
→ responder usando varias notas
Backend

Nuevo endpoint:

POST /api/ai/workspace-chat
Pipeline
generar embedding de la pregunta
semantic search pgvector
obtener top notas relevantes
construir contexto
enviar a OpenAI
Frontend

Componente:

components/ai/WorkspaceChat.tsx

Ubicación:

DashboardPage
Features
“qué ideas tenía sobre frontend?”
“qué planes tenía para freelancing?”
AI second brain
recuperación de conocimiento
memoria contextual
3. Integración n8n
Objetivo

Convertir NeuroNote en un sistema de automatización AI/productivity.

3.1 Webhook base
Backend

Crear integración:

POST → n8n webhook

Cuando:

se crea nota
se actualiza nota
se archiva
AI genera summary
3.2 Gmail Integration
Ideas
enviar nota por email
generar draft automáticamente
enviar summary diario
enviar proposals
Ejemplos
"Enviar proposal React"
→ Gmail draft
3.3 Google Calendar
Ideas

Extraer fechas/tareas desde notas.

Ejemplo
"Meeting Tuesday 3PM"
→ crear evento automáticamente
3.4 WhatsApp
Ideas
reminders
enviar notas
alerts
daily summaries
3.5 Google Sheets / Excel
Ideas
exportar notas
analytics
tracking
dashboards
4. Mejoras UI/UX
Note Chat
typing effect
animated bubbles
AI glow
scroll auto
markdown responses
code blocks
Workspace Chat
related notes preview
similarity score
expandable context
“sources used”
5. Futuro cercano
AI Memory System
related notes
automatic clustering
AI tag intelligence
knowledge graph
Productivity AI
auto task extraction
AI scheduling
AI reminders
workflow suggestions
AI Agents
autonomous workflows con n8n
multi-step automation
personal AI assistant

Prioridad recomendada
Fase 1
Chat with this note
Fase 2
Global Workspace Chat
Fase 3
n8n integrations
Fase 4
AI automation ecosystem
