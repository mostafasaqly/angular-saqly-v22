// Section 23 — Project: E-Commerce Mini App
export default {
  id: 23,
  title: 'مشروع: تطبيق تجارة إلكترونية',
  titleEn: 'Project: E-Commerce Mini App',
  level: 'متوسط – متقدم',
  levelEn: 'Intermediate–Advanced',
  intro: 'بناء تطبيق تجارة إلكترونية كامل خطوة بخطوة في Angular v22. ستبني: عرض المنتجات مع الفلترة، بطاقة المنتج، سلة مشتريات تعمل بـ Signals وتُحفظ في localStorage، صفحة تفاصيل المنتج، وصفحة الدفع.',
  introEn: 'Build a complete e-commerce app step by step in Angular v22. You will build: product listing with filtering, product card component, a shopping cart powered by Signals with localStorage persistence, a product detail page, and a checkout page.',

  lessons: [
    'الخطوة 1 — إنشاء المشروع والـ Routing',
    'الخطوة 2 — تعريف النوع Product والـ CartItem',
    'الخطوة 3 — بناء CartService',
    'الخطوة 4 — بطاقة المنتج (ProductCardComponent)',
    'الخطوة 5 — صفحة المنتجات مع الفلترة',
    'الخطوة 6 — صفحة تفاصيل المنتج',
    'الخطوة 7 — أيقونة السلة في الـ Navbar',
    'الخطوة 8 — صفحة السلة والدفع',
  ],
  lessonsEn: [
    'Step 1 — Create Project and Routing',
    'Step 2 — Define Product and CartItem Types',
    'Step 3 — Build CartService',
    'Step 4 — Product Card Component',
    'Step 5 — Products Page with Filtering',
    'Step 6 — Product Detail Page',
    'Step 7 — Cart Icon in Navbar',
    'Step 8 — Cart Page and Checkout',
  ],

  content: [
    // ── STEP 1 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 1 — إنشاء المشروع والـ Routing' },
    { type: 'paragraph', text: 'أنشئ المشروع وعرّف المسارات الأربعة الأساسية للمتجر.' },
    {
      type: 'code',
      code: `# إنشاء المشروع
ng new ecommerce-app --standalone --routing --style=css
cd ecommerce-app`,
    },
    {
      type: 'code',
      code: `// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // الصفحة الرئيسية → قائمة المنتجات
  {
    path: '',
    loadComponent: () => import('./features/products/products.component')
      .then(m => m.ProductsComponent)
  },
  // تفاصيل منتج معين
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail.component')
      .then(m => m.ProductDetailComponent)
  },
  // صفحة السلة
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component')
      .then(m => m.CartComponent)
  },
  // صفحة الدفع
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component')
      .then(m => m.CheckoutComponent)
  },
  { path: '**', redirectTo: '' }
];`,
    },
    {
      type: 'code',
      code: `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // withComponentInputBinding يُتيح ربط route params بـ input() مباشرةً
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
  ]
};`,
    },

    // ── STEP 2 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 2 — تعريف النوع Product والـ CartItem' },
    { type: 'paragraph', text: 'عرّف الأنواع أولاً حتى يستفيد كل الكود من TypeScript.' },
    {
      type: 'code',
      code: `// shared/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}`,
    },

    // ── STEP 3 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 3 — بناء CartService' },
    { type: 'paragraph', text: 'CartService هو قلب المتجر — يُخزّن السلة في Signals ويحفظها في localStorage تلقائياً بـ effect().' },
    {
      type: 'code',
      code: `// features/cart/cart.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { Product, CartItem } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'cart_items';

  // تحميل البيانات من localStorage عند البداية
  private _items = signal<CartItem[]>(this.loadFromStorage());

  // ── ما يُكشف للمكوّنات ──
  readonly items      = this._items.asReadonly();
  readonly isEmpty    = computed(() => this._items().length === 0);
  readonly itemCount  = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  constructor() {
    // حفظ تلقائي في localStorage عند كل تغيير
    effect(() => {
      localStorage.setItem(this.KEY, JSON.stringify(this._items()));
    });
  }

  // ── الأفعال ──

  add(product: Product): void {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        // المنتج موجود → زِد الكمية
        return items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      // منتج جديد → أضفه للسلة
      return [...items, { product, quantity: 1 }];
    });
  }

  remove(productId: number): void {
    this._items.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) { this.remove(productId); return; }
    this._items.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  clear(): void {
    this._items.set([]);
  }

  isInCart(productId: number): boolean {
    return this._items().some(i => i.product.id === productId);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }
}`,
    },
    { type: 'tip', text: 'effect() يُشغَّل تلقائياً عند أي تغيير في _items — لا تحتاج لاستدعاء localStorage.setItem في كل action يدوياً.' },

    // ── STEP 4 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 4 — بطاقة المنتج (ProductCardComponent)' },
    { type: 'paragraph', text: 'مكوّن قابل للاستخدام في أي مكان — يستقبل Product ويُرسل حدث addToCart.' },
    {
      type: 'code',
      code: `// features/products/product-card.component.ts
import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <div class="product-card">

      <!-- صورة المنتج تُوجّه لصفحة التفاصيل -->
      <a [routerLink]="['/products', product().id]">
        <img [src]="product().imageUrl" [alt]="product().name" loading="lazy" />
      </a>

      <div class="card-body">
        <span class="category">{{ product().category }}</span>
        <h3>
          <a [routerLink]="['/products', product().id]">{{ product().name }}</a>
        </h3>

        <!-- التقييم -->
        <div class="rating">
          ⭐ {{ product().rating }} / 5
        </div>

        <div class="card-footer">
          <span class="price">{{ product().price | currency:'USD' }}</span>

          <!-- زر الإضافة للسلة -->
          <button
            (click)="addToCart()"
            [class.in-cart]="inCart()"
            [disabled]="product().stock === 0"
          >
            {{ inCart() ? '✓ في السلة' : '+ أضف للسلة' }}
          </button>
        </div>

        @if (product().stock === 0) {
          <p class="out-of-stock">نفد المخزون</p>
        }
      </div>
    </div>
  \`
})
export class ProductCardComponent {
  product = input.required<Product>();

  private cart = inject(CartService);

  // محسوبة — تتحدث تلقائياً عند تغيير السلة
  inCart = computed(() => this.cart.isInCart(this.product().id));

  addToCart() {
    this.cart.add(this.product());
  }
}`,
    },

    // ── STEP 5 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 5 — صفحة المنتجات مع الفلترة' },
    { type: 'paragraph', text: 'صفحة المنتجات تجلب البيانات بـ httpResource() وتُطبّق الفلترة بـ computed().' },
    {
      type: 'code',
      code: `// features/products/products.component.ts
import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { httpResource } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ProductCardComponent, CurrencyPipe],
  template: \`
    <div class="page">
      <h1>المنتجات</h1>

      <!-- أدوات الفلترة -->
      <div class="filters">
        <input
          [(ngModel)]="search"
          placeholder="🔍 ابحث عن منتج..."
        />

        <select [(ngModel)]="selectedCategory">
          <option value="">كل الفئات</option>
          @for (cat of categories(); track cat) {
            <option [value]="cat">{{ cat }}</option>
          }
        </select>

        <div class="price-filter">
          <label>السعر حتى: {{ maxPrice() | currency:'USD':'symbol':'1.0-0' }}</label>
          <input
            type="range"
            [ngModel]="maxPrice()"
            (ngModelChange)="maxPrice.set($event)"
            min="0" max="1000"
          />
        </div>
      </div>

      <!-- حالة التحميل -->
      @if (allProducts.isLoading()) {
        <div class="products-grid">
          @for (_ of [1,2,3,4,5,6]; track $index) {
            <div class="skeleton-card"></div>
          }
        </div>
      }

      <!-- حالة الخطأ -->
      @else if (allProducts.error()) {
        <p class="error">فشل تحميل المنتجات. حاول مجدداً.</p>
      }

      <!-- المنتجات -->
      @else {
        <p class="results-count">{{ filteredProducts().length }} منتج</p>
        <div class="products-grid">
          @for (p of filteredProducts(); track p.id) {
            <app-product-card [product]="p" />
          } @empty {
            <p class="empty">لا توجد منتجات تطابق بحثك</p>
          }
        </div>
      }
    </div>
  \`
})
export class ProductsComponent {
  // جلب كل المنتجات — يُعاد التحميل لو تغيّر الـ URL
  allProducts = httpResource<Product[]>('/api/products');

  // حالة الفلترة
  search           = '';
  selectedCategory = '';
  maxPrice         = signal(1000);

  // الفئات المستخرجة من البيانات
  categories = computed(() => {
    const cats = this.allProducts.value()?.map(p => p.category) ?? [];
    return [...new Set(cats)].sort();
  });

  // المنتجات بعد تطبيق كل الفلاتر
  filteredProducts = computed(() => {
    const products = this.allProducts.value() ?? [];
    const q        = this.search.toLowerCase().trim();
    return products.filter(p =>
      (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      p.price <= this.maxPrice()
    );
  });
}`,
    },

    // ── STEP 6 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 6 — صفحة تفاصيل المنتج' },
    { type: 'paragraph', text: 'صفحة التفاصيل تستقبل id من الـ URL مباشرةً عبر input() وتجلب بيانات المنتج تلقائياً.' },
    {
      type: 'code',
      code: `// features/products/product-detail.component.ts
import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a routerLink="/">المنتجات</a>
      @if (product.value()) {
        <span> / {{ product.value()!.name }}</span>
      }
    </nav>

    <!-- حالة التحميل -->
    @if (product.isLoading()) {
      <div class="skeleton-detail"></div>
    }

    <!-- حالة الخطأ -->
    @else if (product.error()) {
      <p class="error">المنتج غير موجود. <a routerLink="/">عودة للمنتجات</a></p>
    }

    <!-- تفاصيل المنتج -->
    @else if (product.value(); as p) {
      <div class="detail-layout">

        <div class="detail-image">
          <img [src]="p.imageUrl" [alt]="p.name" />
        </div>

        <div class="detail-info">
          <span class="category">{{ p.category }}</span>
          <h1>{{ p.name }}</h1>
          <div class="rating">⭐ {{ p.rating }} / 5</div>
          <p class="description">{{ p.description }}</p>

          <div class="price-row">
            <span class="price">{{ p.price | currency:'USD' }}</span>
            @if (p.stock > 0) {
              <span class="stock">{{ p.stock }} متوفر</span>
            } @else {
              <span class="out-of-stock">نفد المخزون</span>
            }
          </div>

          <button
            (click)="addToCart(p)"
            [class.in-cart]="inCart()"
            [disabled]="p.stock === 0"
            class="add-btn"
          >
            @if (inCart()) { ✓ تم الإضافة للسلة }
            @else          { + أضف للسلة }
          </button>

          <a routerLink="/cart" class="view-cart-link">
            عرض السلة ({{ cart.itemCount() }})
          </a>
        </div>

      </div>
    }
  \`
})
export class ProductDetailComponent {
  // id يأتي تلقائياً من route parameter بفضل withComponentInputBinding()
  id   = input.required<string>();
  cart = inject(CartService);

  // يُعاد الطلب تلقائياً عند تغيير id()
  product = httpResource<Product>(
    () => \`/api/products/\${this.id()}\`
  );

  inCart = computed(() =>
    this.cart.isInCart(Number(this.id()))
  );

  addToCart(p: Product) {
    this.cart.add(p);
  }
}`,
    },

    // ── STEP 7 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 7 — أيقونة السلة في الـ Navbar' },
    { type: 'paragraph', text: 'أضف Navbar بسيطاً في AppComponent يعرض عدد العناصر في السلة.' },
    {
      type: 'code',
      code: `// app.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CartService } from './features/cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: \`
    <!-- Navbar ثابت في الأعلى -->
    <header class="navbar">
      <a routerLink="/" class="logo">🛍️ متجري</a>

      <nav class="nav-links">
        <a routerLink="/">المنتجات</a>
      </nav>

      <!-- أيقونة السلة مع عداد -->
      <a routerLink="/cart" class="cart-icon">
        🛒
        @if (cart.itemCount() > 0) {
          <span class="cart-badge">{{ cart.itemCount() }}</span>
        }
        <!-- إجمالي السعر -->
        @if (!cart.isEmpty()) {
          <span class="cart-total">{{ cart.totalPrice() | number:'1.2-2' }} $</span>
        }
      </a>
    </header>

    <!-- محتوى الصفحة الحالية -->
    <main class="app-main">
      <router-outlet />
    </main>
  \`
})
export class AppComponent {
  cart = inject(CartService);
}`,
    },

    // ── STEP 8 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 8 — صفحة السلة والدفع' },
    { type: 'paragraph', text: 'صفحة السلة تعرض كل العناصر وتُتيح تعديل الكميات والحذف، وصفحة الدفع تُكمل العملية.' },
    {
      type: 'code',
      code: `// features/cart/cart.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <h1>سلة المشتريات</h1>

    @if (cart.isEmpty()) {
      <!-- سلة فارغة -->
      <div class="empty-cart">
        <p>🛒 السلة فارغة</p>
        <a routerLink="/" class="btn-primary">تسوّق الآن</a>
      </div>

    } @else {
      <!-- عناصر السلة -->
      <div class="cart-items">
        @for (item of cart.items(); track item.product.id) {
          <div class="cart-item">
            <img [src]="item.product.imageUrl" [alt]="item.product.name" />

            <div class="item-info">
              <h3>{{ item.product.name }}</h3>
              <span class="item-price">{{ item.product.price | currency:'USD' }}</span>
            </div>

            <!-- التحكم في الكمية -->
            <div class="quantity-ctrl">
              <button (click)="cart.updateQuantity(item.product.id, item.quantity - 1)">−</button>
              <span>{{ item.quantity }}</span>
              <button (click)="cart.updateQuantity(item.product.id, item.quantity + 1)">+</button>
            </div>

            <!-- الإجمالي للعنصر -->
            <span class="item-total">
              {{ item.product.price * item.quantity | currency:'USD' }}
            </span>

            <!-- حذف -->
            <button (click)="cart.remove(item.product.id)" class="remove-btn">✕</button>
          </div>
        }
      </div>

      <!-- ملخص الطلب -->
      <div class="cart-summary">
        <div class="summary-row">
          <span>عدد المنتجات</span>
          <span>{{ cart.itemCount() }}</span>
        </div>
        <div class="summary-row total">
          <span>الإجمالي</span>
          <strong>{{ cart.totalPrice() | currency:'USD' }}</strong>
        </div>

        <a routerLink="/checkout" class="btn-checkout">
          إتمام الشراء ←
        </a>
        <button (click)="cart.clear()" class="btn-clear">
          إفراغ السلة
        </button>
      </div>
    }
  \`
})
export class CartComponent {
  cart = inject(CartService);
}`,
    },
    {
      type: 'code',
      code: `// features/checkout/checkout.component.ts
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CurrencyPipe],
  template: \`
    <h1>إتمام الشراء</h1>

    @if (orderPlaced()) {
      <!-- رسالة النجاح بعد الطلب -->
      <div class="success-msg">
        <h2>✅ تم تأكيد طلبك!</h2>
        <p>سيصلك خلال 3-5 أيام عمل.</p>
        <button (click)="goHome()">العودة للتسوق</button>
      </div>

    } @else {
      <!-- ملخص سريع للسلة -->
      <div class="order-summary">
        <h3>ملخص الطلب</h3>
        @for (item of cart.items(); track item.product.id) {
          <div class="summary-item">
            <span>{{ item.product.name }} × {{ item.quantity }}</span>
            <span>{{ item.product.price * item.quantity | currency:'USD' }}</span>
          </div>
        }
        <div class="summary-total">
          <strong>الإجمالي: {{ cart.totalPrice() | currency:'USD' }}</strong>
        </div>
      </div>

      <!-- نموذج بيانات الشحن -->
      <form [formGroup]="form" (ngSubmit)="placeOrder()">
        <h3>بيانات الشحن</h3>

        <label>الاسم الكامل
          <input formControlName="name" placeholder="أحمد محمد" />
        </label>

        <label>البريد الإلكتروني
          <input formControlName="email" type="email" placeholder="example@mail.com" />
        </label>

        <label>العنوان
          <textarea formControlName="address" placeholder="المدينة، الشارع، رقم المبنى"></textarea>
        </label>

        <label>رقم الهاتف
          <input formControlName="phone" placeholder="+20 1xx xxx xxxx" />
        </label>

        <button type="submit" [disabled]="form.invalid || isLoading()">
          {{ isLoading() ? 'جارٍ التأكيد...' : 'تأكيد الطلب' }}
        </button>
      </form>
    }
  \`
})
export class CheckoutComponent {
  cart      = inject(CartService);
  fb        = inject(FormBuilder);
  router    = inject(Router);

  orderPlaced = signal(false);
  isLoading   = signal(false);

  form = this.fb.nonNullable.group({
    name:    ['', Validators.required],
    email:   ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    phone:   ['', Validators.required],
  });

  placeOrder() {
    if (this.form.invalid) return;
    this.isLoading.set(true);

    // محاكاة إرسال الطلب للـ API
    setTimeout(() => {
      this.cart.clear();         // إفراغ السلة بعد الطلب
      this.isLoading.set(false);
      this.orderPlaced.set(true);
    }, 1500);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}`,
    },
    { type: 'tip', text: 'في التطبيق الحقيقي، استبدل setTimeout بـ this.http.post("/api/orders", orderData) ثم اشترك في الاستجابة لتأكيد الطلب قبل إفراغ السلة.' },
    {
      type: 'qa',
      question: 'لماذا نستخدم httpResource() بدلاً من ngOnInit + subscribe في صفحة التفاصيل؟',
      answer: 'httpResource() يُعيد الطلب تلقائياً عند تغيير id(). لو تنقّل المستخدم من منتج لآخر بدون مغادرة الصفحة، يُحمّل البيانات الجديدة فوراً. مع ngOnInit تحتاج subscribe يدوي لـ ActivatedRoute.params لتحقيق نفس السلوك.',
    },
    {
      type: 'qa',
      question: 'كيف تمنع المستخدم من الوصول لصفحة الدفع والسلة فارغة؟',
      answer: 'أنشئ guard بسيط: export const cartNotEmptyGuard: CanActivateFn = () => { const cart = inject(CartService); const router = inject(Router); return cart.isEmpty() ? router.createUrlTree(["/cart"]) : true; }. ثم أضفه لمسار checkout: canActivate: [cartNotEmptyGuard].',
    },
  ],

  contentEn: [
    // ── STEP 1 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 1 — Create Project and Routing' },
    { type: 'paragraph', text: 'Create the project and define the four core routes of the store.' },
    {
      type: 'code',
      code: `# Create the project
ng new ecommerce-app --standalone --routing --style=css
cd ecommerce-app`,
    },
    {
      type: 'code',
      code: `// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Home → product listing
  {
    path: '',
    loadComponent: () => import('./features/products/products.component')
      .then(m => m.ProductsComponent)
  },
  // Product detail
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail.component')
      .then(m => m.ProductDetailComponent)
  },
  // Cart page
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component')
      .then(m => m.CartComponent)
  },
  // Checkout page
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component')
      .then(m => m.CheckoutComponent)
  },
  { path: '**', redirectTo: '' }
];`,
    },
    {
      type: 'code',
      code: `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // withComponentInputBinding lets route params bind to input() directly
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
  ]
};`,
    },

    // ── STEP 2 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 2 — Define Product and CartItem Types' },
    { type: 'paragraph', text: 'Define the types first so all code benefits from TypeScript.' },
    {
      type: 'code',
      code: `// shared/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}`,
    },

    // ── STEP 3 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 3 — Build CartService' },
    { type: 'paragraph', text: 'CartService is the heart of the store — it keeps the cart in Signals and auto-saves to localStorage with effect().' },
    {
      type: 'code',
      code: `// features/cart/cart.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { Product, CartItem } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'cart_items';

  private _items = signal<CartItem[]>(this.loadFromStorage());

  readonly items      = this._items.asReadonly();
  readonly isEmpty    = computed(() => this._items().length === 0);
  readonly itemCount  = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  constructor() {
    // Auto-save to localStorage on every change
    effect(() => {
      localStorage.setItem(this.KEY, JSON.stringify(this._items()));
    });
  }

  add(product: Product): void {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  remove(productId: number): void {
    this._items.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) { this.remove(productId); return; }
    this._items.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  clear(): void { this._items.set([]); }

  isInCart(productId: number): boolean {
    return this._items().some(i => i.product.id === productId);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }
}`,
    },
    { type: 'tip', text: 'effect() runs automatically on any change to _items — no need to manually call localStorage.setItem in every action.' },

    // ── STEP 4 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 4 — Product Card Component' },
    { type: 'paragraph', text: 'A reusable component that works anywhere — receives a Product and shows an add-to-cart button.' },
    {
      type: 'code',
      code: `// features/products/product-card.component.ts
import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <div class="product-card">
      <a [routerLink]="['/products', product().id]">
        <img [src]="product().imageUrl" [alt]="product().name" loading="lazy" />
      </a>
      <div class="card-body">
        <span class="category">{{ product().category }}</span>
        <h3><a [routerLink]="['/products', product().id]">{{ product().name }}</a></h3>
        <div class="rating">⭐ {{ product().rating }} / 5</div>
        <div class="card-footer">
          <span class="price">{{ product().price | currency:'USD' }}</span>
          <button
            (click)="addToCart()"
            [class.in-cart]="inCart()"
            [disabled]="product().stock === 0"
          >
            {{ inCart() ? '✓ In Cart' : '+ Add to Cart' }}
          </button>
        </div>
        @if (product().stock === 0) {
          <p class="out-of-stock">Out of stock</p>
        }
      </div>
    </div>
  \`
})
export class ProductCardComponent {
  product = input.required<Product>();
  private cart = inject(CartService);
  inCart  = computed(() => this.cart.isInCart(this.product().id));
  addToCart() { this.cart.add(this.product()); }
}`,
    },

    // ── STEP 5 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 5 — Products Page with Filtering' },
    { type: 'paragraph', text: 'The products page fetches data with httpResource() and applies filtering with computed().' },
    {
      type: 'code',
      code: `// features/products/products.component.ts
import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { httpResource } from '@angular/common/http';
import { Product } from '../../shared/models/product.model';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ProductCardComponent],
  template: \`
    <h1>Products</h1>

    <div class="filters">
      <input [(ngModel)]="search" placeholder="🔍 Search products..." />
      <select [(ngModel)]="selectedCategory">
        <option value="">All categories</option>
        @for (cat of categories(); track cat) {
          <option [value]="cat">{{ cat }}</option>
        }
      </select>
      <div class="price-filter">
        <label>Max price: \${{ maxPrice() }}</label>
        <input type="range" [ngModel]="maxPrice()" (ngModelChange)="maxPrice.set($event)" min="0" max="1000" />
      </div>
    </div>

    @if (allProducts.isLoading()) {
      <p>Loading...</p>
    } @else if (allProducts.error()) {
      <p class="error">Failed to load products.</p>
    } @else {
      <p class="results-count">{{ filteredProducts().length }} products</p>
      <div class="products-grid">
        @for (p of filteredProducts(); track p.id) {
          <app-product-card [product]="p" />
        } @empty {
          <p class="empty">No products match your search</p>
        }
      </div>
    }
  \`
})
export class ProductsComponent {
  allProducts      = httpResource<Product[]>('/api/products');
  search           = '';
  selectedCategory = '';
  maxPrice         = signal(1000);

  categories = computed(() => {
    const cats = this.allProducts.value()?.map(p => p.category) ?? [];
    return [...new Set(cats)].sort();
  });

  filteredProducts = computed(() => {
    const products = this.allProducts.value() ?? [];
    const q        = this.search.toLowerCase().trim();
    return products.filter(p =>
      (!q || p.name.toLowerCase().includes(q)) &&
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      p.price <= this.maxPrice()
    );
  });
}`,
    },

    // ── STEP 6 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 6 — Product Detail Page' },
    { type: 'paragraph', text: 'The detail page receives id from the URL via input() and auto-fetches product data.' },
    {
      type: 'code',
      code: `// features/products/product-detail.component.ts
import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <nav class="breadcrumb">
      <a routerLink="/">Products</a>
      @if (product.value()) { <span> / {{ product.value()!.name }}</span> }
    </nav>

    @if (product.isLoading()) { <div class="skeleton-detail"></div> }
    @else if (product.error()) {
      <p class="error">Product not found. <a routerLink="/">Go back</a></p>
    }
    @else if (product.value(); as p) {
      <div class="detail-layout">
        <img [src]="p.imageUrl" [alt]="p.name" />
        <div class="detail-info">
          <span class="category">{{ p.category }}</span>
          <h1>{{ p.name }}</h1>
          <div class="rating">⭐ {{ p.rating }} / 5</div>
          <p>{{ p.description }}</p>
          <div class="price-row">
            <span class="price">{{ p.price | currency:'USD' }}</span>
            @if (p.stock > 0) { <span class="stock">{{ p.stock }} in stock</span> }
            @else              { <span class="out-of-stock">Out of stock</span> }
          </div>
          <button (click)="addToCart(p)" [class.in-cart]="inCart()" [disabled]="p.stock === 0">
            @if (inCart()) { ✓ Added to Cart }
            @else          { + Add to Cart }
          </button>
          <a routerLink="/cart">View Cart ({{ cart.itemCount() }})</a>
        </div>
      </div>
    }
  \`
})
export class ProductDetailComponent {
  id   = input.required<string>(); // auto-bound from :id route param
  cart = inject(CartService);

  product = httpResource<Product>(() => \`/api/products/\${this.id()}\`);
  inCart  = computed(() => this.cart.isInCart(Number(this.id())));
  addToCart(p: Product) { this.cart.add(p); }
}`,
    },

    // ── STEP 7 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 7 — Cart Icon in Navbar' },
    { type: 'paragraph', text: 'Add a simple Navbar in AppComponent that shows the cart item count.' },
    {
      type: 'code',
      code: `// app.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from './features/cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, DecimalPipe],
  template: \`
    <header class="navbar">
      <a routerLink="/" class="logo">🛍️ My Store</a>

      <nav class="nav-links">
        <a routerLink="/">Products</a>
      </nav>

      <a routerLink="/cart" class="cart-icon">
        🛒
        @if (cart.itemCount() > 0) {
          <span class="cart-badge">{{ cart.itemCount() }}</span>
        }
        @if (!cart.isEmpty()) {
          <span class="cart-total">\${{ cart.totalPrice() | number:'1.2-2' }}</span>
        }
      </a>
    </header>

    <main class="app-main">
      <router-outlet />
    </main>
  \`
})
export class AppComponent {
  cart = inject(CartService);
}`,
    },

    // ── STEP 8 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 8 — Cart Page and Checkout' },
    { type: 'paragraph', text: 'The cart page shows all items with quantity controls, and the checkout page completes the order.' },
    {
      type: 'code',
      code: `// features/cart/cart.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <h1>Shopping Cart</h1>

    @if (cart.isEmpty()) {
      <div class="empty-cart">
        <p>🛒 Your cart is empty</p>
        <a routerLink="/" class="btn-primary">Shop Now</a>
      </div>
    } @else {
      <div class="cart-items">
        @for (item of cart.items(); track item.product.id) {
          <div class="cart-item">
            <img [src]="item.product.imageUrl" [alt]="item.product.name" />
            <div class="item-info">
              <h3>{{ item.product.name }}</h3>
              <span>{{ item.product.price | currency:'USD' }}</span>
            </div>
            <div class="quantity-ctrl">
              <button (click)="cart.updateQuantity(item.product.id, item.quantity - 1)">−</button>
              <span>{{ item.quantity }}</span>
              <button (click)="cart.updateQuantity(item.product.id, item.quantity + 1)">+</button>
            </div>
            <span class="item-total">{{ item.product.price * item.quantity | currency:'USD' }}</span>
            <button (click)="cart.remove(item.product.id)" class="remove-btn">✕</button>
          </div>
        }
      </div>

      <div class="cart-summary">
        <div class="summary-row total">
          <span>Total</span>
          <strong>{{ cart.totalPrice() | currency:'USD' }}</strong>
        </div>
        <a routerLink="/checkout" class="btn-checkout">Proceed to Checkout →</a>
        <button (click)="cart.clear()" class="btn-clear">Clear Cart</button>
      </div>
    }
  \`
})
export class CartComponent {
  cart = inject(CartService);
}`,
    },
    {
      type: 'code',
      code: `// features/checkout/checkout.component.ts
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CurrencyPipe],
  template: \`
    <h1>Checkout</h1>

    @if (orderPlaced()) {
      <div class="success-msg">
        <h2>✅ Order Confirmed!</h2>
        <p>Your order will arrive in 3–5 business days.</p>
        <button (click)="goHome()">Continue Shopping</button>
      </div>
    } @else {
      <div class="order-summary">
        <h3>Order Summary</h3>
        @for (item of cart.items(); track item.product.id) {
          <div class="summary-item">
            <span>{{ item.product.name }} × {{ item.quantity }}</span>
            <span>{{ item.product.price * item.quantity | currency:'USD' }}</span>
          </div>
        }
        <div class="summary-total">
          <strong>Total: {{ cart.totalPrice() | currency:'USD' }}</strong>
        </div>
      </div>

      <form [formGroup]="form" (ngSubmit)="placeOrder()">
        <h3>Shipping Details</h3>
        <label>Full Name    <input formControlName="name" /></label>
        <label>Email        <input formControlName="email" type="email" /></label>
        <label>Address      <textarea formControlName="address"></textarea></label>
        <label>Phone        <input formControlName="phone" /></label>
        <button type="submit" [disabled]="form.invalid || isLoading()">
          {{ isLoading() ? 'Placing order...' : 'Place Order' }}
        </button>
      </form>
    }
  \`
})
export class CheckoutComponent {
  cart     = inject(CartService);
  fb       = inject(FormBuilder);
  router   = inject(Router);

  orderPlaced = signal(false);
  isLoading   = signal(false);

  form = this.fb.nonNullable.group({
    name:    ['', Validators.required],
    email:   ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    phone:   ['', Validators.required],
  });

  placeOrder() {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    // Replace setTimeout with this.http.post('/api/orders', ...) in production
    setTimeout(() => {
      this.cart.clear();
      this.isLoading.set(false);
      this.orderPlaced.set(true);
    }, 1500);
  }

  goHome() { this.router.navigate(['/']); }
}`,
    },
    { type: 'tip', text: 'In production, replace setTimeout with this.http.post("/api/orders", orderData) and only call cart.clear() after a successful API response.' },
    {
      type: 'qa',
      question: 'Why use httpResource() instead of ngOnInit + subscribe on the detail page?',
      answer: 'httpResource() automatically re-fetches when id() changes. If the user navigates from one product to another without leaving the page, it loads new data instantly. With ngOnInit you would need to manually subscribe to ActivatedRoute.params to achieve the same behavior.',
    },
    {
      type: 'qa',
      question: 'How do you prevent access to the checkout page when the cart is empty?',
      answer: 'Create a simple guard: export const cartNotEmptyGuard: CanActivateFn = () => { const cart = inject(CartService); const router = inject(Router); return cart.isEmpty() ? router.createUrlTree(["/cart"]) : true; }. Then add it to the checkout route: canActivate: [cartNotEmptyGuard].',
    },
  ],
};
