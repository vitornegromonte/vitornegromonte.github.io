---

title: "Machine Learning Field Notes"
keyword: "Field Notes"
summary: "Collecting study notes on deep learning."
role: "Maintainer"
date: 2026-06-09
tags: ["Study Notes", "Deep Learning", "Math", "Statistics"]
url: "https://github.com/vitornegromonte/ml-notes"
repo: "https://github.com/vitornegromonte/ml-notes"
featured: true
draft: false
category: "Study"
abstract: "Personal machine learning and deep learning study notes, written in LaTeX using Edward Tufte style."
---------------------------------------------------------------------------------------------------------------

The project contains material similar to what I publish in the [Field Notes](/notes) section, but makes the original LaTeX source files and compiled PDFs available as well. Ultimately, it will evolve into a small handbook on Deep Learning written in Portuguese, inspired by [The Little Book of Deep Learning](https://fleuret.org/francois/lbdl.html) by [François Fleuret](https://scholar.google.com/citations?user=Bj1tRlsAAAAJ).

Other major inspirations include [Lilian Weng](https://scholar.google.com/citations?user=dCa-pW8AAAAJ)’s [Lil’Log](https://lilianweng.github.io/); [Dive into Deep Learning](https://d2l.ai/) by [Aston Zhang](https://www.astonzhang.com/), [Zack C. Lipton](http://zacklipton.com/), [Mu Li](https://www.cs.cmu.edu/~muli/), and [Alex J. Smola](https://alex.smola.org/), which I used in college and which inspired me to turn the handbook into a website; and [Alice’s Adventures in a Differentiable Wonderland](https://www.sscardapane.it/alice-book/) by [Simone Scardapane](https://www.sscardapane.it/).

The project is structured as a progressive journey through the foundations and modern practice of Deep Learning. We begin by building a miniature automatic differentiation engine (`mini_nn`) from scratch, demystifying the “black box” behind modern frameworks, and gradually work our way toward modern paradigms such as Attention and self-supervised learning.

The handbook was originally organized as follows:

1. [**The Geometry of Neural Networks:**](https://github.com/vitornegromonte/ml-notes/tree/main/intro-ann) From the biological neuron to the mathematical perceptron and Multi-Layer Perceptrons (MLPs), developing a geometric intuition for how neural networks deform and represent spaces.

2. [**Differentiable Programming and Optimization:**](https://github.com/vitornegromonte/ml-notes/tree/main/autodiff_opt) Computational graphs, reverse-mode automatic differentiation (backpropagation), and the mechanics of gradient-based optimization, including SGD, Momentum, and Adam.

3. [**Generalization and Regularization:**](https://github.com/vitornegromonte/ml-notes/tree/main/generalization) The bias-variance tradeoff, the double-descent phenomenon, and techniques for controlling memorization, including L2 regularization, Dropout, and Batch Normalization.

4. **Inductive Bias: Convolutional Neural Networks:** Encoding spatial structure into neural architectures, the mathematics of cross-correlation, and the emergence of hierarchical feature representations.

5. **Latent Representations (Embeddings):** Moving beyond sparse one-hot encodings toward dense vector spaces, contrastive learning, and the geometry of meaning.

6. **Attention and Transformers:** The mechanism that helped unify modern approaches to vision and language, from soft lookups using Queries, Keys, and Values to Multi-Head Attention.

7. **The Modern Workflow: Pre-training and Fine-Tuning:** Self-supervised learning, foundation models, and parameter-efficient fine-tuning (PEFT), including techniques such as LoRA.

### Older study and presentation notes

1. [**Introduction to Generative AI — A Primer on Image Synthesis**](https://github.com/vitornegromonte/ml-notes/tree/main/genai-imagen)
2. [**World Models — Survey**](https://github.com/vitornegromonte/ml-notes/tree/main/world-models)
3. [**Recurrent Neural Networks**](https://github.com/vitornegromonte/ml-notes/tree/main/rnn)
