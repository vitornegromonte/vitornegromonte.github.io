# Graph Report - vitornegromonte.github.io  (2026-10-18)

## Corpus Check
- Large corpus: 181 files · ~889,193 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 562 nodes · 764 edges · 38 communities (31 shown, 7 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 77 edges (avg confidence: 0.81)
- Token cost: 1,400 input · 1,650 output

## Community Hubs (Navigation)
- Build Config and Dependencies
- World Models
- Site Audit Scripts
- Autodiff and Optimization
- CV and Publications
- Layout Components
- Generative Image Models
- Neural Network Basics
- Build and Deploy Pipeline
- Generalization and Regularization
- TypeScript Config
- Notes Listing Pages
- Publications and RSS
- Computer Vision Projects
- Home Page Aggregation
- Runtime Dependencies
- Projects Listing Page
- NPM Scripts
- Note Article Page
- Work and Blog Routes
- Dynamic Page Routes
- Site Branding Assets
- Note Cover Art
- Project Hero Art
- Preview Thumbnails
- Accessibility Research
- AI Note Cover Art
- Project Preview Thumbs
- Project Preview Thumbs II
- Project Card Art
- Trading Bot Stack
- Trading Bot Imagery
- F1 Imagery
- Breast Cancer Imagery
- Field Notes Imagery
- Mars Imagery
- Parkinson Imagery
- F1 Prediction Model

## God Nodes (most connected - your core abstractions)
1. `World Models` - 20 edges
2. `Generative Models for Images` - 14 edges
3. `Vitor Negromonte Cabral de Oliveira` - 14 edges
4. `Generalization and Regularization` - 12 edges
5. `Introduction to Neural Networks` - 11 edges
6. `scripts` - 9 edges
7. `remarkTikzSingle()` - 9 edges
8. `Differentiable Programming and Optimization` - 9 edges
9. `Backpropagation` - 9 edges
10. `Generative Adversarial Network (GAN)` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Polynomial Fits to Noisy Data (underfit, good fit, overfit)` --semantically_similar_to--> `Polynomial fits to the same noisy data`  [INFERRED] [semantically similar]
  public/notes/generalization/figures/fig-19fbe4a1fc.svg → src/content/notes/generalization.md
- `Polynomial Fits to Noisy Data (underfit, good fit, overfit) variant` --semantically_similar_to--> `Polynomial fits to the same noisy data`  [INFERRED] [semantically similar]
  public/notes/generalization/figures/fig-a397bfcb3b.svg → src/content/notes/generalization.md
- `BatchNorm Pipeline: Normalize, Scale, Shift variant` --semantically_similar_to--> `The BatchNorm pipeline`  [INFERRED] [semantically similar]
  public/notes/generalization/figures/fig-d4855ff7d4.svg → src/content/notes/generalization.md
- `Standard ML Pipeline` --semantically_similar_to--> `The standard ML pipeline`  [INFERRED] [semantically similar]
  public/notes/untitled/figures/fig-92eebecec7.svg → src/content/notes/intro-neural-networks.md
- `Anatomy of a Biological Neuron` --semantically_similar_to--> `Anatomy of a biological neuron`  [INFERRED] [semantically similar]
  public/notes/untitled/figures/fig-742231c5af.svg → src/content/notes/intro-neural-networks.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Reverse-mode autodiff pipeline (chain rule -> graph -> backward pass)** — src_content_notes_autodiff_chain_rule, src_content_notes_autodiff_sum_rule, src_content_notes_autodiff_computational_graph, src_content_notes_autodiff_backpropagation [EXTRACTED 1.00]
- **Evolution of gradient descent optimizers** — src_content_notes_autodiff_mini_batch_sgd, src_content_notes_autodiff_momentum, src_content_notes_autodiff_rmsprop, src_content_notes_autodiff_adam [EXTRACTED 1.00]
- **Regularization techniques acting on loss, architecture, activations, schedule** — src_content_notes_generalization_l2_regularization, src_content_notes_generalization_dropout, src_content_notes_generalization_batch_normalization, src_content_notes_generalization_early_stopping [EXTRACTED 1.00]
- **Style Transfer Loss Pipeline** — src_content_notes_generative_images_style_transfer, src_content_notes_generative_images_content_loss, src_content_notes_generative_images_style_loss, src_content_notes_generative_images_gram_matrix [EXTRACTED 1.00]
- **GAN Adversarial Training as a Minimax Game** — src_content_notes_generative_images_gan, src_content_notes_generative_images_minimax_game, src_content_notes_generative_images_nash_equilibrium, src_content_notes_generative_images_jensen_shannon_divergence [EXTRACTED 1.00]
- **Dreamer / RSSM Architecture Lineage** — src_content_notes_world_models_dreamer, src_content_notes_world_models_rssm, src_content_notes_world_models_dreamerv2, src_content_notes_world_models_dreamerv3 [EXTRACTED 1.00]
- **Computer Vision for Medical Diagnosis** — src_content_work_breast_cancer, src_content_work_breast_cancer_resnet50, src_content_work_parkinson, src_content_work_parkinson_cnn [INFERRED 0.75]
- **Accessibility Research for Autistic Users** — src_content_publications_ihc_2024, src_content_publications_ihc_2024_gaia, src_content_publications_ihc_2024_urban_mobility_apps, src_content_publications_sbsi_2025 [INFERRED 0.85]
- **Astro Site Build and GitHub Pages Deployment Pipeline** — _github_workflows_deploy, _github_workflows_deploy_bun, _github_workflows_deploy_github_pages, readme_astro, readme_bun [INFERRED 0.85]
- **Sinapse AI Criminal Intelligence Platform Stack** — public_cv_sinapse, public_cv_software_engineering_intern, public_cv_fastapi, public_cv_postgresql, public_cv_vllm, public_cv_medallion_architecture, public_cv_lgpd [EXTRACTED 1.00]
- **Ligia AI Academic League Leadership** — public_cv_ligia, public_cv_president_co_founder_role, public_cv_vitor_negromonte, public_cv_federal_university_of_pernambuco [EXTRACTED 1.00]
- **INES Accessibility Research Publications** — public_cv_ines, public_cv_undergraduate_research_assistant_role, public_cv_accessibility_research, public_cv_mapping_review_autism_accessibility, public_cv_comparative_study_autistic_urban_mobility, public_cv_kiev_gama, public_cv_ana_paula_chaves [EXTRACTED 1.00]
- **Site Icon Set (Favicon and Installable App Icons)** — public_favicon, public_favicon_96x96, public_apple_touch_icon, public_web_app_manifest_192x192, public_web_app_manifest_512x512 [INFERRED 0.95]
- **ML Notes Cover Images** — public_images_notes_autodiff, public_images_notes_generalization, public_images_notes_generative_images, public_images_notes_intro_neural_networks, public_images_notes_world_models [INFERRED 0.90]
- **Portfolio Project Hero Images** — public_images_bc_detection, public_images_f1predict, public_images_mars, public_images_parkinson, public_images_trading_bot [INFERRED 0.90]
- **Crosshatch Line-Stroke Note Covers** — public_images_notes_autodiff, public_images_notes_generalization, public_images_notes_intro_neural_networks [INFERRED 0.75]
- **Numbered Project Preview Thumbnails (01–05)** — public_images_preview_breast_cancer, public_images_preview_parkinson, public_images_preview_mars, public_images_preview_f1_predict, public_images_preview_trading_bot [INFERRED 0.95]
- **Study Note Preview Thumbnails (06–07)** — public_images_preview_note_genai_attractor, public_images_preview_note_world_models [INFERRED 0.95]
- **Shared Stippled-Grid Preview Card Design (numbered, seeded, category/year footer)** — public_images_preview_breast_cancer, public_images_preview_parkinson, public_images_preview_mars, public_images_preview_f1_predict, public_images_preview_trading_bot, public_images_preview_note_genai_attractor, public_images_preview_note_world_models [INFERRED 0.85]
- **Watercolor Portfolio Project Card Set** — public_images_projects_breast_cancer, public_images_projects_f1_predict, public_images_projects_field_notes, public_images_projects_mars, public_images_projects_parkinson, public_images_projects_trading_bot [EXTRACTED 1.00]
- **Machine Learning / Data Science Project Cards** — public_images_projects_breast_cancer_concept, public_images_projects_parkinson_concept, public_images_projects_f1_predict_concept, public_images_projects_trading_bot_concept [INFERRED 0.75]
- **Autodiff optimization figures (loss landscape, learning rate, SGD vs momentum)** — public_notes_autodiff_figures_fig_720cf61e78, public_notes_autodiff_figures_fig_ce73b714fe, public_notes_autodiff_figures_fig_be28103d51, src_content_notes_autodiff [EXTRACTED 1.00]
- **Style Transfer Pipeline** — public_notes_generative_images_figures_fig0, public_notes_generative_images_figures_fig1, public_notes_generative_images_figures_fig2 [INFERRED 0.75]
- **GAN Architecture, Training and Theory** — public_notes_generative_images_figures_fig5, public_notes_generative_images_figures_fig6, public_notes_generative_images_figures_fig7, public_notes_generative_images_figures_fig9 [INFERRED 0.75]

## Communities (38 total, 7 thin omitted)

### Community 0 - "Build Config and Dependencies"
Cohesion: 0.06
Nodes (45): allowScripts, esbuild, devDependencies, @astrojs/check, svgo, tailwindcss, @tailwindcss/typography, @tailwindcss/vite (+37 more)

### Community 1 - "World Models"
Cohesion: 0.05
Nodes (52): Side figure 0 (World Models), Figure 1 (World Models), Side figure 2 (World Models), Figure 3 (World Models), Figure 4 (World Models), Side figure 5 (World Models), World Models, Active Inference (+44 more)

### Community 2 - "Site Audit Scripts"
Cohesion: 0.05
Nodes (34): svgo, auditPage(), eachImg(), meta(), collectFiles(), collectSvgs(), files, NOTES_DIR (+26 more)

### Community 3 - "Autodiff and Optimization"
Cohesion: 0.06
Nodes (39): A computational graph for L = (a x b) + c, fig-47ed5ba8d9 — Autodiff figure (not referenced in autodiff.md), fig-4bd4303b0a — Autodiff figure (not referenced in autodiff.md), A slice of a loss landscape, Optimization in a ravine: plain SGD vs Momentum, Effect of the learning rate on training, Differentiable Programming and Optimization, Adam (Adaptive Moment Estimation) (+31 more)

### Community 4 - "CV and Publications"
Cohesion: 0.07
Nodes (40): Vitor Negromonte — Curriculum Vitae, Accessibility for Autistic Adults in Web and Mobile Apps, Ana Paula Chaves (NAU), Campus Party '24 Keynote, Center for Informatics, UFPE, Cleber Zanchettin, Cohere Labs Catalyst Grants Program, A Comparative Study on Accessibility for Autistic Individuals with Urban Mobility Apps (IHC 2024) (+32 more)

### Community 5 - "Layout Components"
Cohesion: 0.09
Nodes (20): katex, canonicalURL, Props, socialImage, year, Props, Props, Props (+12 more)

### Community 6 - "Generative Image Models"
Cohesion: 0.08
Nodes (36): Figure 0 (Generative Models for Images), Figure 1 (Generative Models for Images), Figure 2 (Generative Models for Images), Figure 3 (Generative Models for Images), Figure 4 (Generative Models for Images), Figure 5 (Generative Models for Images), Figure 6 (Generative Models for Images), Figure 7 (Generative Models for Images) (+28 more)

### Community 7 - "Neural Network Basics"
Cohesion: 0.09
Nodes (34): 2D Contour Optimization, Geometric representation of linear separability, 3D Loss Surface, Linear Boundary of a Single Hyperplane, Anatomy of a biological neuron, The standard ML pipeline, Visualization of the Universal Approximation Theorem, Common activation functions (+26 more)

### Community 8 - "Build and Deploy Pipeline"
Cohesion: 0.09
Nodes (23): Deploy to GitHub Pages Workflow, oven-sh/setup-bun Build Step, GitHub Pages Deployment Platform, bun run note:check Authoring Invariant Step, Push to main Trigger, Sitemap Index (vitornegromonte.github.io), Project README (Astro Starter Kit), Astro Framework (+15 more)

### Community 9 - "Generalization and Regularization"
Cohesion: 0.20
Nodes (14): The Double Descent phenomenon, Polynomial Fits to Noisy Data (underfit, good fit, overfit), Dropout during training, Polynomial fits to the same noisy data, Training vs. validation loss (early stopping), Polynomial Fits to Noisy Data (underfit, good fit, overfit) variant, The BatchNorm pipeline, BatchNorm Pipeline: Normalize, Scale, Shift variant (+6 more)

### Community 10 - "TypeScript Config"
Cohesion: 0.15
Nodes (12): astro/tsconfigs/strict, compilerOptions, baseUrl, paths, exclude, extends, include, @/components/* (+4 more)

### Community 11 - "Notes Listing Pages"
Cohesion: 0.18
Nodes (10): Props, buttons, empty, HANDBOOK_IDS, minutesOf(), notes, notesWithTime, rows (+2 more)

### Community 12 - "Publications and RSS"
Cohesion: 0.20
Nodes (6): @astrojs/rss, isAward, Props, publications, pubsByYear, pubYears

### Community 13 - "Computer Vision Projects"
Cohesion: 0.24
Nodes (11): Computer Vision in Breast Cancer Diagnosis, CBIS-DDSM Mammography Dataset, Histogram Equalization Preprocessing, InceptionV3, ResNet50, Transfer Learning with ImageNet Weights, VGG16, Parkinson Diagnosis using Computer Vision (+3 more)

### Community 14 - "Home Page Aggregation"
Cohesion: 0.18
Nodes (10): allWork, featured, leadYear, notes, publications, rest, selected, topNotes (+2 more)

### Community 15 - "Runtime Dependencies"
Cohesion: 0.20
Nodes (10): dependencies, astro, @astrojs/markdown-remark, @astrojs/rss, @astrojs/sitemap, katex, rehype-katex, rehype-raw (+2 more)

### Community 16 - "Projects Listing Page"
Cohesion: 0.20
Nodes (8): allWork, buttons, byYear, categories, empty, groups, rows, years

### Community 17 - "NPM Scripts"
Cohesion: 0.22
Nodes (9): scripts, astro, build, check, dev, note:check, note:new, prebuild (+1 more)

### Community 18 - "Note Article Page"
Cohesion: 0.22
Nodes (7): list, minutes, mobile, mobileList, page, toc, toggle

### Community 19 - "Work and Blog Routes"
Cohesion: 0.25
Nodes (4): Props, year, minutes, year

### Community 20 - "Dynamic Page Routes"
Cohesion: 0.25
Nodes (5): classes, Props, variants, Props, year

### Community 21 - "Site Branding Assets"
Cohesion: 0.52
Nodes (7): Apple Touch Icon (180x180 Home Screen Icon), Favicon SVG (Adaptive Light/Dark Brand Mark), Favicon 96x96 PNG, Open Graph Social Preview Card (Vitor Negromonte, Data Scientist & ML Researcher), PWA Manifest Icon 192x192, PWA Manifest Icon 512x512, Site Branding (Visual Identity: Mark, Type, Palette)

### Community 22 - "Note Cover Art"
Cohesion: 0.40
Nodes (6): Automatic Differentiation, Model Generalization, Introduction to Neural Networks, Collage of Colored Crosshatched Line Strokes, Scattered Black and Colored Crossing Line Strokes, Tangled Blue, Gold and Black Line Strokes over Faint Blobs

### Community 23 - "Project Hero Art"
Cohesion: 0.33
Nodes (6): Breast Cancer Detection from Mammograms, MARS Project, Parkinson's Disease Detection, Mammogram with Detection Grid and Bounding Boxes, Hub-and-Spoke Node Network with Geometric Primitives, Concentric Spiral Line Drawing

### Community 24 - "Preview Thumbnails"
Cohesion: 0.33
Nodes (6): Multi-Agent Recommendation System (03) Preview Thumbnail, Multi-Agent Recommendation System (MARS) — Productivity Tool (2025), Generative Models for Images (06) Note Preview Thumbnail, Generative Models for Images — Study Note (PT), World Models (07) Note Preview Thumbnail, World Models — Study Note (EN)

### Community 25 - "Accessibility Research"
Cohesion: 0.50
Nodes (5): A Comparative Study on Accessibility for Autistic Individuals with Urban Mobility Apps (IHC 2024), Interfaces Accessibility Guide for Autism (GAIA), Urban Mobility Apps Accessibility for Autistic Individuals, A Mapping Review to Understand Web and Mobile Apps Accessibility for Adults with Autism (SBSI 2025), Cognitive Load Theory

### Community 26 - "AI Note Cover Art"
Cohesion: 0.50
Nodes (4): Generative Image Models, World Models, Overlapping Brush-Drawn Rings over Watercolor Blobs, Black Brush Ring over Blue Watercolor Sphere with Small Orbs

### Community 27 - "Project Preview Thumbs"
Cohesion: 0.50
Nodes (4): Breast Cancer (01) Preview Thumbnail, Breast Cancer — Computer Vision Project (2023), Parkinson (02) Preview Thumbnail, Parkinson's Disease — Computer Vision Project (2024)

### Community 28 - "Project Preview Thumbs II"
Cohesion: 0.50
Nodes (4): Formula 1 (04) Preview Thumbnail, Formula 1 — Predictive Modeling Project (2025), Trading Bot (05) Preview Thumbnail, Trading Bot — College Project (2025)

### Community 29 - "Project Card Art"
Cohesion: 0.50
Nodes (4): F1 Predict Project Card Illustration, F1 Race Outcome Prediction Project, Trading Bot Project Card Illustration, Trading Bot Project

### Community 30 - "Trading Bot Stack"
Cohesion: 0.50
Nodes (4): Trading Bot (C++), Alpaca Exchange API, Binance Exchange API, Event-Driven Trading Architecture

## Ambiguous Edges - Review These
- `U-Net` → `Predictive Coding`  [AMBIGUOUS]
  src/content/notes/world-models.md · relation: conceptually_related_to
- `Mechanistic Interpretability` → `Graph Neural Networks`  [AMBIGUOUS]
  public/cv.pdf · relation: semantically_similar_to

## Knowledge Gaps
- **112 isolated node(s):** `@astrojs/check`, `@tailwindcss/typography`, `tailwindcss`, `typescript`, `astro/tsconfigs/strict` (+107 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 251 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `katex` connect `Layout Components` to `Build Config and Dependencies`, `Site Audit Scripts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `@astrojs/check`, `@tailwindcss/typography`, `tailwindcss` to the rest of the system?**
  _112 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Build Config and Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.057329462989840346 - nodes in this community are weakly interconnected._
- **Why does `Generalization and Regularization` connect `Generalization and Regularization` to `Autodiff and Optimization`, `Neural Network Basics`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Should `World Models` be split into smaller, more focused modules?**
  _Cohesion score 0.05203619909502263 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `U-Net` and `Predictive Coding`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Mechanistic Interpretability` and `Graph Neural Networks`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._