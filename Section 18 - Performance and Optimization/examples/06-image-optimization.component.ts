/**
 * Section 18 — Example 06: NgOptimizedImage Directive
 *
 * NgOptimizedImage (ngSrc) is Angular's built-in image optimization directive.
 * It enforces performance best practices automatically:
 *
 *   - Requires width and height → prevents Cumulative Layout Shift (CLS)
 *   - Adds loading="lazy" for non-priority images → improves LCP
 *   - Generates srcset for responsive images → right size for each device
 *   - Warns in dev mode when image is oversized for its display size
 *   - Integrates with image CDNs (Cloudinary, Imgix, ImageKit, etc.)
 *   - Preloads priority images with <link rel="preload">
 *
 * Import: NgOptimizedImage from '@angular/common'
 * Usage:  replace src="..." with ngSrc="..."
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';

// ---------------------------------------------------------------------------
// Example component — all common NgOptimizedImage patterns
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ----------------------------------------------------------------
         1. Basic usage — always provide width and height (in CSS pixels).
         These are the INTRINSIC dimensions of the image, not the display size.
         Angular uses them to reserve layout space and prevent CLS.
    ---------------------------------------------------------------- -->
    <section>
      <h2>1. Basic Image</h2>
      <img
        ngSrc="/assets/product.jpg"
        width="400"
        height="300"
        alt="Product photo"
      />
      <!--
        Angular automatically adds:
          loading="lazy"          — deferred loading for off-screen images
          decoding="async"        — non-blocking image decode
          fetchpriority="auto"    — lets browser prioritize intelligently
      -->
    </section>

    <!-- ----------------------------------------------------------------
         2. Priority image (above-the-fold, hero images)
         The priority attribute:
           - Removes loading="lazy" (fetches immediately)
           - Adds fetchpriority="high"
           - Adds <link rel="preload"> to the <head> for earliest fetch
         Use priority for the LARGEST image visible on first paint (LCP element).
    ---------------------------------------------------------------- -->
    <section>
      <h2>2. Priority (Hero) Image</h2>
      <img
        ngSrc="/assets/hero-banner.jpg"
        width="1200"
        height="500"
        alt="Hero banner"
        priority
      />
      <!--
        In dev mode: Angular warns if you don't mark the LCP image as priority.
        In prod: forgetting priority delays LCP and hurts your Lighthouse score.
      -->
    </section>

    <!-- ----------------------------------------------------------------
         3. Fill mode — image fills its container.
         Use when you don't know the image's intrinsic dimensions,
         or when you want CSS to control the display size.

         Requires: parent element has position: relative (or absolute/fixed)
         and an explicit height.
    ---------------------------------------------------------------- -->
    <section>
      <h2>3. Fill Mode</h2>
      <div style="position: relative; width: 100%; height: 300px; overflow: hidden;">
        <img
          ngSrc="/assets/background.jpg"
          fill
          style="object-fit: cover;"
          alt="Background image"
        />
      </div>
      <!--
        fill replaces the need for width/height attributes.
        The image fills the parent container — great for hero sections
        and card cover images with unknown aspect ratios.
      -->
    </section>

    <!-- ----------------------------------------------------------------
         4. Responsive srcset — sizes attribute for art direction.
         Tell the browser what percentage of the viewport width
         the image occupies so it can pick the right srcset size.
    ---------------------------------------------------------------- -->
    <section>
      <h2>4. Responsive with sizes</h2>
      <img
        ngSrc="/assets/product.jpg"
        width="800"
        height="600"
        alt="Responsive product image"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <!--
        Angular generates a srcset automatically:
        /assets/product.jpg?w=640  640w,
        /assets/product.jpg?w=750  750w,
        /assets/product.jpg?w=828  828w,
        ...

        With sizes="(max-width: 768px) 100vw, 50vw":
          - On mobile (≤768px): use 100% of viewport width → pick ~640w
          - On desktop (>768px): use 50% of viewport width → pick ~828w
        Browser selects the optimal image for the user's screen.
      -->
    </section>

    <!-- ----------------------------------------------------------------
         5. CDN integration example (see app.config.ts below)
         When a CDN loader is configured, ngSrc is treated as a relative path
         and the loader builds the full CDN URL with optimization parameters.
    ---------------------------------------------------------------- -->
    <section>
      <h2>5. CDN Image (with Imgix loader)</h2>
      <img
        ngSrc="product-photo.jpg"
        width="400"
        height="300"
        alt="CDN-optimized product"
        sizes="(max-width: 600px) 100vw, 400px"
      />
      <!--
        With provideImgixLoader('https://my-cdn.imgix.net') configured,
        Angular generates URLs like:
        https://my-cdn.imgix.net/product-photo.jpg?auto=format&fit=crop&w=400&h=300
        https://my-cdn.imgix.net/product-photo.jpg?auto=format&fit=crop&w=800&h=600
        → WebP served automatically, correctly sized for every device
      -->
    </section>
  `,
  styles: [`
    section { margin: 2rem 0; }
    img { max-width: 100%; border-radius: 8px; }
  `],
})
export class ProductPageComponent {}

// ---------------------------------------------------------------------------
// app.config.ts — CDN loader setup (for reference)
// ---------------------------------------------------------------------------

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

// Built-in CDN loaders (import from @angular/common):
//   provideImgixLoader(baseUrl)
//   provideCloudinaryLoader(cloudName)
//   provideImageKitLoader(baseUrl)
//   provideNetlifyLoader(baseUrl)

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter([]),
    // Use Imgix CDN — all ngSrc values are relative paths from the CDN base URL
    provideImgixLoader('https://my-company.imgix.net'),
  ],
};

// ---------------------------------------------------------------------------
// Quick reference: NgOptimizedImage attribute cheatsheet
// ---------------------------------------------------------------------------
//
// REQUIRED:
//   ngSrc="..."          — image path (replaces src)
//   width="N"            — intrinsic width in px (OMIT if using fill)
//   height="N"           — intrinsic height in px (OMIT if using fill)
//   alt="..."            — always required for accessibility
//
// OPTIONAL:
//   priority             — hero/LCP images; adds preload, removes lazy
//   fill                 — fills parent container (omit width/height)
//   sizes="..."          — responsive hint for srcset selection
//   ngSrcset="400w, 800w" — explicit srcset widths (overrides auto-srcset)
//   loaderParams="{...}" — extra params passed to the CDN loader
//
// DEV MODE WARNINGS (fixed automatically or flagged):
//   - Missing alt attribute
//   - LCP image not marked priority
//   - Image displayed at >10% larger than its natural dimensions
//   - Missing parent dimensions when using fill
