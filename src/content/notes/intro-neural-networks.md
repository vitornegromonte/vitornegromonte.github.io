---
title: "Introduction to Neural Networks"
keyword: "Neural Nets"
topic: "Neural Networks"
lang: "EN"
---

# The Concept of Modeling

Before diving into neurons and weights, we must understand what it means to \textit{model} something. In the physical sciences, a model is a simplified representation of a complex reality. A map is a model of a city; it discards irrelevant details (the color of individual houses) to highlight essential structures (streets and distances). 

In machine learning, we take a formal approach. We assume there is a true, underlying relationship between some input variables $\mathbf{x}$ and an output $y$. We cannot observe this relationship directly, but we can observe a dataset $\mathcal{D} = \{(\mathbf{x}_d, y_d)\}_{d=1}^N$. 

![The standard ML pipeline: a model <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>f</mi><mi>θ</mi></msub></mrow><annotation encoding="application/x-tex">f_\theta</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.1076em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">θ</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> maps inputs to outputs.](/notes/intro-neural-networks/figures/fig-92eebecec7.svg){#fig-92eebecec7}

**Definition 0.1 (Mathematical Model)** A mathematical model is a parametric function $f_\theta: \mathcal{X} \to \mathcal{Y}$ that maps an input space $\mathcal{X}$ to an output space $\mathcal{Y}$. The vector $\theta \in \Theta$ represents the \textbf{parameters} of the model, drawn from a hypothesis space $\Theta$.

## The Learn Paradigm

In traditional programming, a human engineer writes explicit rules (code) to transform data into answers. In machine learning, we invert this process: we provide the data and the answers, and the algorithm searches for the rules.

To "learn" means to find the specific parameters $\theta^*$ that make the model's predictions $f_\theta(\mathbf{x})$ closely match the true outputs $y$ for unseen data. This requires three components:
* **The Hypothesis Space:** The set of all functions our model can represent. A linear model can only draw straight lines; a neural network can draw highly complex curves.
* **The Loss Function:** A metric $\mathcal{L}(\hat{y}, y)$ that quantifies the penalty for an incorrect prediction.
* **The Optimization Algorithm:** A procedure to navigate the hypothesis space and find $\theta^*$ that minimizes the loss.

Remark 0.1 (Inductive Bias)  No model can learn without assumptions. If we assume the relationship between $\mathbf{x}$ and $y$ is linear, our hypothesis space is small and easy to optimize, but it will fail if the true relationship is complex. If we use a highly flexible model (like a deep neural network), our hypothesis space is vast, but we need vast amounts of data to find the correct parameters without merely memorizing the training set. The assumptions we embed into the model's architecture are called its *inductive bias*.

# The Biological Inspiration

To understand why artificial neural networks are structured the way they are, we must first look at their biological counterpart: the human brain. The brain is the most powerful learning machine known, capable of recognizing patterns, understanding language, and making complex decisions, all while consuming roughly 20 watts of power.

The fundamental unit of this biological processor is the \textbf{neuron}. The human brain contains approximately 86 billion neurons, connected in vast networks. To build our mathematical model, we will abstract the key functional mechanisms of these biological cells.

![Anatomy of a biological neuron. Electrical signals flow from dendrites, through the soma, down the axon, to the synapses.](/notes/intro-neural-networks/figures/fig-742231c5af.svg){#fig-742231c5af}

## Anatomy of a Neuron
A biological neuron is a specialized cell that processes and transmits electrical and chemical signals. It consists of three main structural components:

1. **Dendrites:** These are tree-like extensions that act as the "antennae" of the neuron. They receive signals (neurotransmitters) from other neurons. The physical structure of the dendrites determines how the neuron integrates these incoming signals.
2. **Soma (Cell Body):** The soma contains the nucleus of the cell. Its critical function is to aggregate the electrical signals received from the dendrites. It acts as an integrator, summing up the excitatory and inhibitory inputs.
3. **Axon:** If the aggregated signal in the soma exceeds a certain threshold, the neuron "fires." This generates an electrical impulse called an action potential, which travels down the axon. The axon is the output wire of the neuron.
4. **Synapses:** At the end of the axon are terminal branches that form connections (synapses) with the dendrites of other neurons. The *strength* of these synaptic connections determines how much influence one neuron has on another. 

## The Action Potential and Non-Linearity

A crucial biological feature is how the neuron decides to fire. The soma does not simply pass along the sum of its inputs linearly. Instead, it operates on an "all-or-nothing" principle.

When the aggregated electrical potential inside the cell reaches a specific *threshold*, voltage-gated ion channels open, causing a massive, rapid spike in voltage—the action potential. If the input is below the threshold, nothing happens; the neuron remains silent.

Furthermore, the strength of the connections (synapses) is not fixed. Biological synapses exhibit **plasticity**. If two neurons fire together frequently, the synaptic connection between them strengthens. This is known as Hebbian theory: "Neurons that fire together, wire together." This biological adaptation of connection strengths is the direct inspiration for how artificial neural networks "learn" by adjusting weights.

# From Biology to Mathematics: The Artificial Neuron

In the 1940s and 1950s, researchers like Warren McCulloch and Walter Pitts sought to abstract the biological neuron into a mathematical model. They recognized that the structural components of a biological neuron could be translated into algebraic operations.

| Biological Concept | Mathematical Abstraction | Symbol |
|---|---|---|
| Dendrites (receiving signals) | Input vector | $\mathbf{x}$ |
| Synaptic strength | Weight parameter | $\mathbf{w}$ |
| Soma (signal integration) | Dot product (weighted sum) | $\mathbf{w} \cdot \mathbf{x}$ |
| Baseline firing threshold | Bias parameter | $b$ |
| Action Potential (all-or-nothing) | Non-linear activation function | $\phi(\cdot)$ |

*Table: Mapping biological mechanisms to the mathematical components of an artificial neuron.*

A single artificial neuron (historically called a Perceptron) is fundamentally an affine transformation followed by a non-linear function. It maps an input vector $\mathbf{x} = (x_1,\dots,x_d)^{\mathsf{T}} \in \mathbb{R}^d$ to an output $o$:

$$
o = \phi(\mathbf{w} \cdot \mathbf{x} + b)
$$
Here, the parameters $\theta$ are the weights $\mathbf{w} \in \mathbb{R}^d$ and the bias $b \in \mathbb{R}$. But what does the operation $\mathbf{w} \cdot \mathbf{x}$ actually represent? 

Geometrically, the dot product is a measure of *alignment* between two vectors. If the input vector $\mathbf{x}$ points in a similar direction to the weight vector $\mathbf{w}$, their dot product is a large positive number. If they point in opposite directions, it is negative. If they are perpendicular, it is zero. Therefore, the weights act as a *filter*: the neuron outputs a high value only when the input matches a specific pattern encoded in $\mathbf{w}$.

The bias $b$ acts as a baseline threshold. It shifts the activation point, allowing the neuron to fire even when the alignment with $\mathbf{w}$ is not perfectly positive, or requiring a very strong alignment to fire at all.

Geometrically, the weights define a hyperplane that cuts the space. A single neuron can only represent *linearly separable* functions; the XOR problem is the classic counterexample where no single hyperplane can partition the activation states.

![Geometric representation of linear separability. (a) A single hyperplane partitions space based on the weight vector <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="bold">w</mi></mrow><annotation encoding="application/x-tex">\mathbf{w}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4444em;"></span><span class="mord mathbf" style="margin-right:0.016em;">w</span></span></span></span>. (b) The XOR problem cannot be solved by a single linear hyperplane.](/notes/intro-neural-networks/figures/fig-442ca70c42.svg){#fig-442ca70c42}

```python
import numpy as np

class Neuron:
    def __init__(self, in_dim):
        # Random initialization for the forward pass
        self.w = np.random.randn(in_dim)
        self.b = np.random.randn()
        
    def __call__(self, x):
        # Affine transformation: w * x + b
        z = np.dot(self.w, x) + self.b
        # Non-linear activation (ReLU)
        return np.maximum(0, z)

```

![3D Loss Surface](/notes/intro-neural-networks/figures/fig-4adce70132.svg){#fig-4adce70132 .fullwidth}

![2D Contour Optimization](/notes/intro-neural-networks/figures/fig-3ffce2b060.svg){#fig-3ffce2b060 .fullwidth}

## Activation Functions

For multilayer networks, we need nonlinear, differentiable activation functions. Without them, stacking layers would merely result in a single linear transformation ($\mathbf{W}_2(\mathbf{W}_1\mathbf{x}) = \mathbf{W}'\mathbf{x}$). 

![Common activation functions. Sigmoid and tanh saturate at the tails, causing gradients to vanish. ReLU is piecewise linear, preserving gradients for positive inputs.](/notes/intro-neural-networks/figures/fig-cb11d119e3.svg){#fig-cb11d119e3}

Geometrically, linear transformations ($\mathbf{W}\mathbf{x}$) only stretch, rotate, or shear the space. Activation functions are responsible for *bending* or *folding* the space. The Rectified Linear Unit (ReLU), defined as $\max(0, z)$, acts like origami: it folds the negative quadrants of the space onto the boundaries of the positive ones, allowing the network to carve complex decision boundaries out of the input space.

## Multilayer Perceptron (MLP)

To solve non-linear problems like XOR, we stack multiple layers of neurons. A multilayer perceptron (MLP) consists of an input layer, one or more hidden layers, and an output layer. 

Instead of computing neurons one by one, we use linear algebra to compute an entire layer simultaneously. Let $\mathbf{o}^{(\ell-1)} \in \mathbb{R}^{d_{in}}$ be the output of the previous layer. We define a weight matrix $\mathbf{W}^{(\ell)} \in \mathbb{R}^{d_{out} \times d_{in}}$ and a bias vector $\mathbf{b}^{(\ell)} \in \mathbb{R}^{d_{out}}$. The forward pass for layer $\ell$ is:
$$
\mathbf{a}^{(\ell)} = \mathbf{W}^{(\ell)}\mathbf{o}^{(\ell-1)} + \mathbf{b}^{(\ell)},\qquad 
\mathbf{o}^{(\ell)} = f^{(\ell)}(\mathbf{a}^{(\ell)}),
$$
where each *row* of $\mathbf{W}^{(\ell)}$ corresponds to the weights of a single neuron in the new layer. The matrix multiplication efficiently computes the dot products of all neurons against the input simultaneously.

```python
class Layer:
    def __init__(self, in_dim, out_dim):
        self.W = np.random.randn(out_dim, in_dim)
        self.b = np.random.randn(out_dim)
        
    def __call__(self, x):
        # Affine transformation for a single input vector x (a column of a batch)
        z = np.dot(self.W, x) + self.b
        return np.maximum(0, z) # ReLU activation

class MLP:
    def __init__(self, sizes):
        # sizes: [in_dim, hidden_1, hidden_2, ..., out_dim]
        self.layers = [Layer(sizes[i], sizes[i+1]) 
                       for i in range(len(sizes)-1)]
        
    def __call__(self, x):
        for layer in self.layers:
            x = layer(x) # Forward pass sequentially
        return x
```

# Measuring the Error: Loss Functions
Once the network produces an output $\hat{\mathbf{y}} = \mathbf{o}^{(L)}$, we need a mechanism to measure how far it is from the target $\mathbf{t}$. This is the role of the **Loss Function** $\mathcal{L}(\hat{\mathbf{y}}, \mathbf{t})$. The choice of loss function dictates how the network penalizes mistakes.

## Mean Squared Error

For regression tasks (predicting continuous numbers), we want to penalize the distance between the prediction and the target. We use the squared error:
$$
\mathcal{L}_{\text{MSE}} = \frac{1}{2}\|\mathbf{t} - \hat{\mathbf{y}}\|^2
$$
Why square it? First, it ensures the error is always positive. Second, it heavily penalizes large errors (being off by 10 costs 100, while being off by 1 costs 1), which encourages the network to fix its worst mistakes first.

## Cross-Entropy Loss
For classification tasks, the network outputs raw scores called *logits*. We first use the Softmax function to squash these into probabilities that sum to 1:
$$
\text{Softmax}(\hat{y}_i) = \frac{e^{\hat{y}_i}}{\sum_j e^{\hat{y}_j}}
$$
To measure the error, we use Cross-Entropy. Unlike MSE, Cross-Entropy punishes the network exponentially if it is *confident but wrong*. If the true class is $i$, the loss is:
$$
\mathcal{L}_{\text{CE}} = -\log(\text{Softmax}(\hat{y}_i))
$$
If the network predicts a probability of $0.99$ for the true class, $\mathcal{L} \approx 0.01$. If it predicts $0.01$, $\mathcal{L} \approx 4.6$. This steep penalty forces the network to learn the correct class boundaries quickly.

## Universal Approximation Theorem

Let $\sigma: \mathbb{R}\to\mathbb{R}$ be a continuous, bounded, non-constant activation function. 

Then for any continuous function $f: [0,1]^d \to \mathbb{R}$ and any $\varepsilon>0$, there exist $N\in\mathbb{N}$, vectors $\mathbf{w}_j\in\mathbb{R}^d$, scalars $v_j, b_j\in\mathbb{R}$ such that
    $$
    \sup_{\mathbf{x}\in[0,1]^d} \left| \sum_{j=1}^N v_j\,\sigma(\mathbf{w}_j\cdot\mathbf{x} + b_j) - f(\mathbf{x}) \right| < \varepsilon.
    $$

The theorem guarantees that the hypothesis space of an MLP (with enough neurons) contains a function that can approximate any continuous function arbitrarily well. This proves that our architectural components possess the mathematical capacity to model complex phenomena. However, the theorem says nothing about *how* to find those parameters $\theta$.

![Visualization of the Universal Approximation Theorem. The dark curve is a highly oscillatory target function <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mn>1.5</mn><mi>sin</mi><mo>⁡</mo><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mi>cos</mi><mo>⁡</mo><mo stretchy="false">(</mo><mn>3</mn><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">f(x) = 1.5\sin(x)\cos(3x)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1.5</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop">sin</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop">cos</span><span class="mopen">(</span><span class="mord">3</span><span class="mord mathnormal">x</span><span class="mclose">)</span></span></span></span>. The pink lines represent the piecewise linear approximation formed by a neural network.](/notes/intro-neural-networks/figures/fig-bfe6200ad2.svg){#fig-bfe6200ad2 .fullwidth}

