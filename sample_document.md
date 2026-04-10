# Sample Mathematical Document

## Introduction

This is a sample document demonstrating LaTeX math support in Markdown to PDF conversion.

## Mathematical Expressions

### Inline Math

The famous equation is $E = mc^2$, where $E$ is energy, $m$ is mass, and $c$ is the speed of light.

For a variable $x$, we can express the relationship as $y = \beta_0 + \beta_1 x + \epsilon$.

### Display Math

The quadratic formula is:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

For logistic regression, we use:

$$
\log\left(\frac{\pi_j}{\pi_J}\right) = \beta_{j0} + \beta_{j1}X_1 + \beta_{j2}X_2 + \cdots + \beta_{jp}X_p
$$

### Greek Letters

Common statistical parameters include:
- $\alpha$ (alpha) - significance level
- $\beta$ (beta) - regression coefficient
- $\pi$ (pi) - probability
- $\theta$ (theta) - parameter
- $\mu$ (mu) - mean
- $\sigma$ (sigma) - standard deviation

### More Complex Expressions

The likelihood ratio test statistic:

$$
\text{LR} = -2 \times \log(\text{likelihood}) = 2[\ell_{\text{full}} - \ell_{\text{null}}]
$$

Sum notation:

$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$

## Code Example

Here's some sample R code:

```r
# Linear regression
model <- lm(y ~ x1 + x2, data = df)
summary(model)
```

## Table Example

| Variable | Coefficient | Std. Error | p-value |
|----------|-------------|------------|---------|
| Intercept | 2.5 | 0.3 | < 0.001 |
| x1 | 1.2 | 0.2 | < 0.001 |
| x2 | -0.8 | 0.15 | < 0.001 |

## Conclusion

This document demonstrates the converter's capabilities with mathematical expressions, code blocks, and tables.
