---
title: "World Models"
keyword: "WORLD MODELS"
topic: "A Survey of Internal Representations in Artificial Intelligence"
lang: "EN"
---


# Introduction

The ability to model the world is a cornerstone of intelligence. A **world model** is an internal representation that an agent builds of its environment, enabling it to predict future states, reason about consequences, and plan actions without direct trial and error in the real world. This concept appears across cognitive science, robotics, control theory, and deep learning.

In artificial intelligence, world models have gained prominence through architectures that explicitly separate perception, memory, and planning components. This document traces the evolution of these ideas.

# Cognitive Foundations

#### Mental Models in Psychology

The notion of internal models traces back to Kenneth Craik's 1943 work *The Nature of Explanation*, where he proposed that organisms build "small-scale models" of reality to anticipate events and test alternatives mentally.

#### Dorsal and Ventral Streams

In neuroscience, the visual cortex is organized into two pathways:

-   **Ventral stream**: object recognition (\"what\")

-   **Dorsal stream**: spatial processing (\"where / how\")

Modern world model architectures often mirror this separation between representational and spatial reasoning pathways.

# Theoretical Frameworks

#### Free Energy Principle

Karl Friston's Free Energy Principle (FEP) posits that any self-organizing system restricted to a bounded number of states must minimize a mathematical quantity called *variational free energy* to resist natural entropic decay and maintain its structural integrity <sup>1</sup>. Within this framework, world models emerge as a thermodynamic and statistical necessity. An agent maintains an internal generative model $p(o_t, s_t)$ over sensory observations $o_t$ and hidden environmental states $s_t$. By constructing a variational recognition density $q(s_t)$ that parameterizes its beliefs, the agent minimizes a tractable upper bound on sensory surprise (negative log-evidence):


```sidenote
Friston, "The free-energy principle: a unified brain theory?"
```




$$
\begin{split}
        F &= \mathbb{E}_{q(s_t)}\left[\log q(s_t) - \log p(o_t, s_t)\right] \\
          &= D_{\mathrm{KL}}\left(q(s_t) \parallel p(s_t \mid o_t)\right) - \log p(o_t)
    \end{split}
$$



Because the Kullback-Leibler ($D_{\mathrm{KL}}$) divergence is always non-negative, minimizing $F$ implicitly maximizes the evidence for the agent's internal model of the world, formalizing perception as variational inference.

#### Active Inference

A direct corollary of the FEP is active inference, a paradigm asserting that action and perception are not distinct processes, but rather two sides of the same coin. While perception updates internal beliefs $q(s_t)$ to fit incoming data $o_t$, action alters the environment to force future data to conform to the model's prior expectations. Under active inference, an agent evaluates a policy $\pi$ by calculating its Expected Free Energy $G(\pi)$ across a future time horizon:



$$
G(\pi) = \sum_\tau \mathbb{E}_{q(o_\tau, s_\tau \mid \pi)}\left[\log q(s_\tau \mid \pi) - \log p(o_\tau, s_\tau)\right]
$$



By expanding this formulation, $G(\pi)$ can be cleanly decomposed into an epistemic value component (seeking out salient information to minimize ambiguity) and an instrumental value component (maximizing expected utility or preference satisfaction):



$$
G(\pi) \approx \sum_\tau \underbrace{-\mathbb{E}_{q(s_\tau \mid \pi)}\left[\mathcal{H}\left(q(o_\tau \mid s_\tau)\right)\right]}_{\text{Epistemic (Ambiguity Reduction)}} + \underbrace{\vphantom{\mathbb{E}_{q(s_\tau \mid \pi)}}D_{\mathrm{KL}}\left(q(o_\tau \mid \pi) \parallel p(o_\tau)\right)}_{\text{Instrumental (Risk Minimization)}}
$$



This formulation structurally unifies the exploration-exploitation dilemma native to model-free reinforcement learning by grounding decision-making inside the agent's generative prediction loop.

#### Predictive Coding

At the neurocomputational level, Rao and Ballard (1999) proposed that the mammalian cerebral cortex implements a hierarchical architecture optimizing this free-energy objective via a scheme known as *predictive coding* <sup>2</sup>. In this structural hierarchy, higher cortical areas transmit top-down generative predictions to lower layers. The lower layers compare these predictions against raw sensory inputs or lower-level representations, generating a localized prediction error vector $\varepsilon_t = o_t - f(s_t)$.


```sidenote
Rao and Ballard, "Predictive coding in the visual cortex"
```


Crucially, rather than propagating raw, high-dimensional sensory states up the processing chain, the cortex exclusively transmits these residual error signals ($\varepsilon_t$) upward to adjust the latent states of higher-tier generative layers. This biological mechanism maps directly onto modern neural world models---such as Recurrent State-Space Models (RSSMs) and Predictive Coding Networks (PCNs)---where predictive reconstruction mismatches serve as the fundamental self-supervised learning signal for representation learning.


```marginfigure
![Side figure 0](/notes/world-models/figures/fig0.svg)
```


# Two Paradigms: Predictive vs Generative World Models

A useful distinction cuts across modern world model research: **predictive** world models forecast specific future states given past context and actions, while **generative** world models learn to sample novel trajectories or environments from a learned distribution, often unconditionally or from minimal conditioning.

## Predictive World Models

Predictive world models learn a transition dynamics function $f$ that maps current state and action to a distribution over next states:



$$
p(s_{t+1} \mid s_t, a_t) = f_\theta(s_t, a_t)
$$



The purpose is *forecasting*: given what has happened, what will happen next? These models are trained to minimize prediction error and are typically used for planning and model-based reinforcement learning --- the agent "imagines" the outcomes of candidate action sequences before executing them.

Key representatives:

-   **Ha and Schmidhuber (2018)**: the original *World Models* paper uses a VAE + RNN to predict future latent states. The model is trained on observation-action trajectories and used for planning in latent space.

-   **LeCun's World Model (JEPA)**: Yann LeCun's proposed architecture for autonomous machine intelligence frames world models as a key component that predicts latent representations of future states, trained via self-supervised learning <sup>3</sup>. The world model operates in representation space rather than pixel space, predicting abstract features of the environment.


```sidenote
LeCun, "A Path Towards Autonomous Machine Intelligence"
```


-   **Dreamer family (Hafner et al.)**: RSSM-based models that learn a latent dynamics model and train policies entirely on imagined trajectories.

#### JEPA: Joint Embedding Predictive Architecture

LeCun's JEPA <sup>4</sup> is a self-supervised learning framework that forms the perceptual backbone of his proposed world model. Unlike generative architectures that predict in pixel space (e.g., VAEs), JEPA predicts in latent embedding space:


```sidenote
LeCun, "Joint Embedding Predictive Architecture"
```




$$
\text{JEPA:} \quad \hat{s}_y = \text{Predictor}(s_x, \theta), \quad \mathcal{L} = \|\hat{s}_y - s_y\|^2
$$



where $s_x$ and $s_y$ are embeddings of two views (e.g., two crops of an image, or two consecutive video frames) produced by a shared encoder, and the predictor estimates one from the other. The key properties are:

-   **Representation collapse prevention**: a stop-gradient on the target encoder prevents the trivial constant solution, forcing the embeddings to be informative.

-   **Abstraction**: by predicting in latent space, JEPA discards low-level, unpredictable details (pixel noise, texture variation) and captures high-level semantic structure.

-   **Hierarchical extension**: stacked JEPA modules can operate at increasing levels of abstraction and timescales, mirroring the hierarchical predictive coding theory of cortex.

In the context of world models, JEPA provides the *perception* component that maps raw observations to a structured latent space where prediction becomes tractable. The world model proper then operates on these latent representations, predicting future $s_y$ from past $s_x$ and actions. Predictive world models are evaluated on prediction accuracy, planning success, and sample efficiency in downstream tasks.

![](/notes/world-models/figures/fig1.svg)

## Generative World Models

Generative world models model the full joint distribution over environmental observation streams and actions. This formulation grants them the ability to *sample* completely *\"novel\"*, high-fidelity synthetic trajectories from scratch:



$$
p(o_1, \dots, o_T, a_1, \dots, a_T) = \prod_{t=1}^T p(o_t, a_t \mid o_{<t}, a_{<t})
$$



Rather than committing to a localized, point-estimate calculation, generative world models capture the full multimodal distribution of possible environmental outcomes. They are typically optimized using unsupervised or self-supervised generative objectives---such as score-matching diffusion or autoregressive next-token prediction---making them highly capable simulators.

Key structural paradigms include:

-   **Google Genie** <sup>5</sup>: Trained on massive corpuses of unannotated video data, Genie uncovers an explicit latent action space via an end-to-end video tokenizer coupled with a causal dynamics model. Given a starting visual frame and an intended sequence of discrete latent actions, it synthesizes subsequent video frames sequentially. At inference time, a single prompt image allows the framework to instantiate an interactive, controllable 2D world on the fly.


```sidenote
Bruce et al., "Genie: Generative Interactive Environments"
```


-   **High-Capacity Video Generation Models (GAIA-1, UniSim):** Large-scale transformers and temporal diffusion networks learn foundational physical properties by directly predicting high-dimensional frame dynamics. Though historically treated purely as media synthesis systems, these architectures implicitly learn rich intuitive physics, object permanence, and temporal causality directly from raw pixel data.

Generative world models are primarily evaluated on sample quality, distributional diversity, long-horizon temporal consistency, and their capacity for out-of-distribution compositional generalization.

  **Dimension**            **Predictive Paradigm**                  **Generative Paradigm**
  ------------------------ ---------------------------------------- -----------------------------------
  **Primary Objective**    Minimize latent feature distance         Maximize joint log-likelihood
  **Output Type**          Abstract state target prediction         Full observation stream sampling
  **Learning Signal**      Feature alignment or energy scores       Pixel reconstruction / token loss
  **Downstream Utility**   Local look-ahead planning & MBRL         Ambient environment simulation
  **Core Vulnerability**   Susceptible to representation collapse   High computational sample cost

  : Key differences between predictive and generative world models.

## Bridging the Two Views

The boundary dividing these two modeling paradigms is fundamentally fluid. Modern deep architectures frequently hybridize both frameworks to exploit their complementary strengths. For instance, DeepMind's *Dreamer* utilizes an underlying generative model over compact latent configurations, but applies it predictively to generate localized rollouts for policy optimization. Conversely, Google's *Genie* integrates a predictive, action-conditioned latent controller inside a wider autoregressive generative pipeline.

Importantly, Yann LeCun's JEPA explicitly rejects generative construction loops in favor of a purely predictive, energy-based abstract scoring predictor to prevent representational hallucinations. However, as Jürgen Schmidhuber historically demonstrated, the fundamental mechanics remain deeply entangled: any world model tracking transitions can generate experiences iteratively by feeding its previous outputs back into its input layers, and any high-capacity generative sampler implicitly encapsulates an accurate predictive model of the underlying physical landscape. The taxonomy is therefore defined by the choice of learning signal and representational abstraction level rather than a rigid architectural barrier.

## Schmidhuber's Theoretical Foundations

Jürgen Schmidhuber's contributions to world models span decades, predating the deep learning era. His work provides the theoretical bedrock for both predictive and generative paradigms.

#### Artificial Curiosity (1991)

Schmidhuber formalized *artificial curiosity* <sup>6</sup> as an intrinsic reward signal that drives an agent to seek experiences that improve its world model. The agent is rewarded for prediction errors --- but only those that are *learnable*, avoiding both predictable noise and inherently unpredictable chaos. This creates a lifelong learning loop where the world model and the exploration policy co-develop:


```sidenote
Schmidhuber, "A Possibility for Implementing Curiosity and Boredom in
Model-Building Neural Controllers"
```




$$
\text{curiosity reward} = \|\hat{s}_{t+1} - s_{t+1}\|^2 \quad \text{(only if learnable)}
$$



This principle directly inspired modern exploration bonuses in model-based RL (e.g., Intrinsic Curiosity Module by Pathak et al., 2017).

#### Computational Principles of Creativity (2012)

Schmidhuber extended the same framework to explain creativity and humor <sup>7</sup>. A creator (artist, scientist, comedian) generates works that induce a learnable compression progress in the observer's world model. The "fun" or "beauty" of an experience is proportional to the learning progress it produces --- the improvement in the observer's ability to predict or compress the data.


```sidenote
Schmidhuber, "Formal Theory of Creativity, Fun, and Intrinsic
Motivation"
```


#### Predictive World Models as Universal

Schmidhuber argues that any powerful AI will necessarily build predictive world models because they are required for:

-   **Planning**: simulating action outcomes before committing to one.

-   **Explanation**: compressing sensory data into causal structures.

-   **Transfer**: abstracting invariant patterns across different tasks.

The 2018 *World Models* paper by Ha and Schmidhuber was a direct implementation of these decades-old principles, showing that a VAE + RNN + controller trained with a simple evolutionary strategy could solve RL tasks by "dreaming" --- planning in latent space.

# Foundational Architectures

The modern formulation of world models in deep learning was popularized by Ha and Schmidhuber (2018) in their paper *World Models* <sup>8</sup>. Their architecture consists of three components:


```sidenote
Ha and Schmidhuber, "World Models"
```


1.  **Vision (V)**: A variational autoencoder (VAE) that compresses high-dimensional observations into a compact latent representation.

2.  **Memory (R)**: A recurrent neural network (typically an LSTM or GRU) that predicts future latent states given actions, enabling temporal reasoning.

3.  **Controller (C)**: A policy network that selects actions based on the latent trajectory, often trained with a simple linear model or evolutionary strategies.


```marginfigure
![Side figure 2](/notes/world-models/figures/fig2.svg)
```


#### Latent State Representation

The VAE maps the observation $x_t$ to a latent Gaussian distribution $z_t \sim \mathcal{N}(\mu_t, \sigma_t)$. The memory model predicts the next latent state given the current state and action:



$$
\hat{z}_{t+1} = f_\theta(z_t, a_t)
$$



The controller then selects actions $a_t = \pi(z_t)$ to maximize cumulative reward, often trained separately using the latent space rather than raw pixels.

## Planning in Latent Space

A key advantage of world models is the ability to plan by *imagining* future trajectories in latent space, avoiding expensive pixel-level simulation. This is formalized as:

> **Given**: Vision model $V$, Memory model $R$, current latent $z_t$\  
> **For** each candidate action sequence $(a_t, ..., a_{t+H})$:\  
> $z \leftarrow z_t$\  
> **For** $k = 1$ to $H$:\  
> $z \leftarrow f_\theta(z, a_{t+k-1})$\  
> Accumulate reward $r_k$\  
> Select sequence with highest total reward\  
> Execute first action $a_t$  
## Dreamer

Building on Ha and Schmidhuber, Dreamer (Hafner et al., 2020) extends world models by integrating the learning of all three components end-to-end using gradients through dynamics <sup>9</sup>.


```sidenote
Hafner et al., "Dream to Control: Learning Behaviors by Latent
Imagination"
```


The Dreamer architecture uses:

-   A **RSSM** (Recurrent State-Space Model) that combines deterministic and stochastic recurrent states.

-   **Latent imagination**: value and policy networks trained entirely on imagined trajectories.

-   **Behavior learning** via actor-critic in the compact latent space.

## Contrastive Approaches

More recent work explores contrastive objectives for learning world models without generative decoding. Approaches like CURL <sup>10</sup> use instance discrimination to shape the latent space, avoiding the computational cost of reconstructing high-dimensional observations.


```sidenote
Laskin et al., "CURL: Contrastive Unsupervised Representations for
Reinforcement Learning"
```


# Technical Deep Dive

## Recurrent State-Space Model (RSSM)

The RSSM, introduced by Hafner et al. in Dreamer, combines deterministic and stochastic recurrent paths. At each time step $t$, the model computes:



$$
\begin{aligned}
    h_t &= f_\phi(h_{t-1}, z_{t-1}, a_{t-1}) \quad \text{(deterministic)} \\
    z_t &\sim \mathcal{N}(\mu_\phi(h_t), \sigma_\phi(h_t)) \quad \text{(stochastic)} \\
    \hat{o}_t &= g_\phi(h_t, z_t) \quad \text{(observation reconstruction)}
\end{aligned}
$$



The key insight is the hybrid state: the deterministic path $h_t$ carries long-range temporal dependencies, while the stochastic path $z_t$ captures multimodal future outcomes. This avoids the posterior collapse common in purely stochastic recurrent models.

## DreamerV2 and V3

#### DreamerV2

DreamerV2 <sup>11</sup> introduced several critical innovations:


```sidenote
Hafner et al., "Mastering Atari with Discrete World Models"
```


-   **Discrete latents**: replacing Gaussian $z_t$ with categorical distributions enabled richer multimodal representations.

-   **KL balancing**: separate KL coefficients for the prior and posterior to prevent the posterior from collapsing to the prior.

-   **Two-hot reward prediction**: predicting reward distributions rather than point estimates improved value learning.

The discrete latent representation $z_t \in \{1, ..., K\}^D$ uses straight-through gradients, allowing backpropagation through the categorical sampling step:



$$
z_t = \text{one-hot}\left(\operatorname{argmax}_k \pi_k\right) + \pi - \text{sg}(\pi)
$$



where $\pi$ are the logits and $\text{sg}$ denotes stop-gradient.

#### DreamerV3

DreamerV3 <sup>12</sup> further generalized the approach to work across hundreds of environments with a single set of hyperparameters --- a major milestone in robust world model learning. Key additions include:


```sidenote
Hafner et al., "DreamerV3: Mastering Diverse Domains through World
Models"
```


-   **Symlog predictions**: using the symlog transformation $\text{symlog}(x) = \text{sign}(x)\log(|x|+1)$ to handle targets of varying scale without normalization.

-   **Free bits**: a KL regularizer that allows the posterior to stay close to the prior without collapsing, enforced by a minimum KL divergence.

-   **Normalized predictions**: reward and value heads predict distributions normalized by running statistics, enabling cross-domain transfer.

# Transformer-Based World Models

The success of transformers in sequence modeling has inspired a new generation of world model architectures that replace recurrent dynamics with attention mechanisms.

## IRIS

IRIS <sup>13</sup> replaces the recurrent memory with a GPT-style transformer operating on discrete visual tokens:


```sidenote
Micheli et al., "Transformers are Sample Efficient World Models"
```


![](/notes/world-models/figures/fig3.svg)

The observation $o_t$ is first tokenized by a VQ-VAE into discrete codes $z_t$. These are fed into an autoregressive transformer that predicts the next token sequence:



$$
p(z_{t+1} \mid z_{\leq t}, a_{\leq t}) = \prod_{k=1}^K p(z_{t+1}^k \mid z_{< t+1}^k, z_{\leq t}, a_{\leq t})
$$



This approach achieves sample efficiency competitive with model-free methods while maintaining the representational capacity of discrete token spaces.

## Video Prediction Models

Beyond RL, world models appear in unsupervised video prediction. Models like **VideoGPT**, **Phenaki**, and **CogVideo** learn spatiotemporal transformers that predict future video frames conditioned on past context. The core challenge is scaling to high-resolution, long-horizon video while maintaining temporal coherence.

#### Objective Function

Video world models are typically trained by minimizing a combination of reconstruction and KL-divergence losses:



$$
\mathcal{L} = \underbrace{\mathbb{E}[\|o_t - \hat{o}_t\|^2]}_{\text{reconstruction}}
    + \beta \underbrace{D_{KL}(q(z_t \mid o_{\leq t}) \mid\mid p(z_t \mid z_{< t}))}_{\text{KL regularization}}
$$



# Applications

## Robotics

World models enable sample-efficient robot learning by allowing policies to be trained in "imagination" rather than the physical world. **DayDreamer** <sup>14</sup> deployed DreamerV3 directly on real robots, learning complex locomotion and manipulation skills with minimal real-world interaction.


```sidenote
Wu et al., "DayDreamer: World Models for Physical Robot Learning"
```


## Autonomous Driving

Companies like Wayve use world models for driving simulation. The model learns a latent representation of road scenes from fleet data, then enables *closed-loop* evaluation of driving policies --- essential for safety-critical systems where real-world testing is expensive and dangerous.

## Model-Based Reinforcement Learning

The primary application remains model-based RL, where the world model enables:

-   **Hallucinated rollouts**: training the policy on imagined trajectories increases sample efficiency by orders of magnitude.

-   **Uncertainty-aware planning**: ensembles of world models provide uncertainty estimates over future states, guiding exploration.

# Evaluation Metrics

Evaluating world models requires metrics beyond task reward:

  Metric                   Description
  ------------------------ ------------------------------------------------------------
  **Prediction MSE**       Pixel-level or latent MSE over a prediction horizon
  **KL divergence**        Match between prior and posterior latents
  **Planning accuracy**    How well imagined trajectories correlate with real returns
  **Sample efficiency**    Environment steps needed to achieve threshold reward
  **Generalization gap**   Performance drop on unseen environment variations

  : Common evaluation metrics for world models

# Implications and Open Problems

#### Compositionality

A key open question is how to build world models that compose known concepts to generalize to novel scenarios, rather than memorizing transitions. Current models struggle with out-of-distribution composition --- combining learned primitives in unseen ways requires a modular, disentangled latent structure.

#### Long-Horizon Prediction

World models degrade over long prediction horizons due to compounding error. Even with accurate single-step predictions, small errors accumulate quadratically. Solutions under exploration include:

-   Iterative refinement (diffusion-based prediction)

-   Sparse temporal attention (long-context transformers)

-   Hierarchical timescale separation

#### Scalability

Current world models are mostly demonstrated in controlled environments (e.g., ViZDoom, CarRacing). Scaling them to open-ended, real-world settings with high-dimensional observations, long episodes, and sparse rewards remains a fundamental challenge.

#### Grounding

The "symbol grounding problem" reappears: how do latent representations maintain consistent meaning across different tasks and embodiments? Without explicit grounding, world models can develop brittle representations that fail under distribution shift.

#### Causality

The most promising direction may be integrating causal reasoning into world models. Rather than learning statistical correlations, causal world models would distinguish intervention from observation, enabling genuine counterfactual reasoning --- the ability to ask "what if?" questions about unseen scenarios.

![](/notes/world-models/figures/fig4.svg)

# Conclusion

World models represent a convergence of cognitive science, control theory, and deep learning, offering a principled way to build agents that understand their environment through internal simulation. The trajectory from Ha and Schmidhuber's three-component architecture to Hafner's Dreamer family and transformer-based token prediction shows steady progress toward more capable, general, and sample-efficient agents.


```marginfigure
![Side figure 5](/notes/world-models/figures/fig5.svg)
```


Key challenges remain in compositionality, long-horizon prediction, scalability, and causal grounding. However, the convergence of ideas from neuroscience (predictive coding, free energy), deep learning (VAEs, transformers), and control theory (model-based RL) suggests that world models will play a central role in the next generation of intelligent systems.

# References {#bibliography .unnumbered}
