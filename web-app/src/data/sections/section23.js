// Section 23 — Project: E-Commerce Mini App
export default {
  id: 23,
  title: 'مشروع: تطبيق تجارة إلكترونية',
  titleEn: 'Project: E-Commerce Mini App',
  level: 'متوسط – متقدم',
  levelEn: 'Intermediate–Advanced',
  intro: 'بناء تطبيق تجارة إلكترونية كامل يطبّق: عرض المنتجات، سلة المشتريات مع Signals، الفلترة والبحث، صفحة تفاصيل المنتج، وصفحة الدفع. المشروع يُلخّص كل المفاهيم من الأقسام السابقة في تطبيق واقعي.',
  introEn: 'Build a complete e-commerce application applying: product listing, cart with Signals, filtering and search, product detail page, and checkout. The project consolidates all concepts from previous sections into a real-world app.',

  lessons: [
    'هيكل المشروع والـ routes',
    'صفحة المنتجات مع الفلترة',
    'بطاقة المنتج كمكوّن قابل للاستخدام',
    'سلة المشتريات (CartService)',
    'صفحة تفاصيل المنتج',
    'Breadcrumb وال navigation',
    'صفحة الدفع (Checkout)',
    'تحسينات أداء التطبيق النهائي',
  ],
  lessonsEn: [
    'Project Structure and Routes',
    'Products Page with Filtering',
    'Product Card as Reusable Component',
    'Shopping Cart (CartService)',
    'Product Detail Page',
    'Breadcrumb and Navigation',
    'Checkout Page',
    'Final App Performance Optimizations',
  ],

  content: [
    { type: 'heading', text: 'هيكل المشروع' },
    {
      type: 'code',
      code: `// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component')
      .then(m => m.ProductsComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component')
      .then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component')
      .then(m => m.CheckoutComponent),
    canActivate: [cartNotEmptyGuard]
  },
  { path: '**', redirectTo: 'products' }
];`,
    },

    { type: 'heading', text: 'سلة المشتريات (CartService)' },
    {
      type: 'code',
      code: `interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'cart_items';

  private _items = signal<CartItem[]>(this.loadFromStorage());

  readonly items      = this._items.asReadonly();
  readonly itemCount  = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );
  readonly isEmpty    = computed(() => this._items().length === 0);

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._items()));
    });
  }

  add(product: Product): void {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
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

  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }
}`,
    },

    { type: 'heading', text: 'صفحة المنتجات مع الفلترة' },
    {
      type: 'code',
      code: `@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCardComponent, FormsModule],
  template: \`
    <div class="filters">
      <input [(ngModel)]="search" placeholder="بحث عن منتج..." />
      <select [(ngModel)]="category">
        <option value="">كل الفئات</option>
        @for (cat of categories(); track cat) {
          <option [value]="cat">{{ cat }}</option>
        }
      </select>
      <input type="range" [(ngModel)]="maxPrice" [min]="0" [max]="1000" />
      <span>حتى {{ maxPrice | currency:'USD' }}</span>
    </div>

    @if (products.isLoading()) {
      <div class="grid">
        @for (_ of [1,2,3,4,5,6]; track $index) {
          <div class="skeleton-card"></div>
        }
      </div>
    } @else {
      <div class="grid">
        @for (product of filteredProducts(); track product.id) {
          <app-product-card
            [product]="product"
            (addToCart)="cart.add($event)"
          />
        } @empty {
          <p class="empty">لا توجد منتجات تطابق بحثك</p>
        }
      </div>
    }
  \`
})
export class ProductsComponent {
  cart     = inject(CartService);
  search   = '';
  category = '';
  maxPrice = 1000;

  allProducts = httpResource<Product[]>('/api/products');

  categories = computed(() => {
    const cats = this.allProducts.value()?.map(p => p.category) ?? [];
    return [...new Set(cats)];
  });

  filteredProducts = computed(() => {
    const products = this.allProducts.value() ?? [];
    const q        = this.search.toLowerCase();
    return products.filter(p =>
      (!q || p.name.toLowerCase().includes(q)) &&
      (!this.category || p.category === this.category) &&
      p.price <= this.maxPrice
    );
  });
}`,
    },

    { type: 'heading', text: 'صفحة تفاصيل المنتج مع input() routing' },
    {
      type: 'code',
      code: `// في routes — تفعيل withComponentInputBinding()
// app.config.ts
providers: [
  provideRouter(routes, withComponentInputBinding())
]

// product-detail.component.ts
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink],
  template: \`
    @if (productResource.isLoading()) {
      <div class="skeleton-detail">...</div>
    } @else if (productResource.value(); as p) {
      <nav class="breadcrumb">
        <a routerLink="/products">المنتجات</a> / {{ p.name }}
      </nav>

      <div class="detail-layout">
        <img [ngSrc]="p.imageUrl" width="500" height="500" priority [alt]="p.name" />
        <div class="info">
          <h1>{{ p.name }}</h1>
          <p class="price">{{ p.price | currency:'USD' }}</p>
          <p class="description">{{ p.description }}</p>
          <div class="rating">⭐ {{ p.rating }} / 5</div>
          <button (click)="addToCart(p)" class="btn-primary">
            إضافة للسلة ({{ cart.itemCount() }})
          </button>
        </div>
      </div>
    }
  \`
})
export class ProductDetailComponent {
  // id يأتي تلقائياً من route parameter
  id   = input.required<string>();
  cart = inject(CartService);

  productResource = httpResource<Product>(
    () => \`/api/products/\${this.id()}\`
  );

  addToCart(product: Product): void {
    this.cart.add(product);
  }
}`,
    },
    {
      type: 'qa',
      question: 'كيف يعمل cartNotEmptyGuard وما هدفه؟',
      answer: 'يمنع المستخدم من الوصول لصفحة /checkout إذا كانت السلة فارغة. يستخدم CartService.isEmpty() للتحقق. إذا كانت السلة فارغة، يُعيد التوجيه لـ /products مع رسالة توضيحية.',
    },
    {
      type: 'qa',
      question: 'لماذا نستخدم httpResource() بدلاً من ngOnInit في صفحة تفاصيل المنتج؟',
      answer: 'httpResource() يُعيد التحميل تلقائياً عند تغيير this.id() — مفيد إذا تنقّل المستخدم مباشرة من منتج لمنتج آخر دون مغادرة الصفحة. مع ngOnInit، الطلب الأول فقط يحدث ما لم تُضف subscribe للـ params يدوياً.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Project Structure' },
    {
      type: 'code',
      code: `// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component')
      .then(m => m.ProductsComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component')
      .then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component')
      .then(m => m.CheckoutComponent),
    canActivate: [cartNotEmptyGuard]
  },
  { path: '**', redirectTo: 'products' }
];`,
    },

    { type: 'heading', text: 'Shopping Cart (CartService)' },
    {
      type: 'code',
      code: `@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'cart_items';

  private _items = signal<CartItem[]>(this.loadFromStorage());

  readonly items      = this._items.asReadonly();
  readonly itemCount  = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );
  readonly isEmpty = computed(() => this._items().length === 0);

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._items()));
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
}`,
    },

    { type: 'heading', text: 'Products Page with Filtering' },
    {
      type: 'code',
      code: `@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="filters">
      <input [(ngModel)]="search" placeholder="Search products..." />
      <select [(ngModel)]="category">
        <option value="">All categories</option>
        @for (cat of categories(); track cat) {
          <option [value]="cat">{{ cat }}</option>
        }
      </select>
    </div>

    <div class="grid">
      @for (product of filteredProducts(); track product.id) {
        <app-product-card [product]="product" (addToCart)="cart.add($event)" />
      } @empty {
        <p>No products match your search</p>
      }
    </div>
  \`
})
export class ProductsComponent {
  cart     = inject(CartService);
  search   = '';
  category = '';

  allProducts = httpResource<Product[]>('/api/products');

  categories = computed(() => {
    const cats = this.allProducts.value()?.map(p => p.category) ?? [];
    return [...new Set(cats)];
  });

  filteredProducts = computed(() => {
    const products = this.allProducts.value() ?? [];
    const q        = this.search.toLowerCase();
    return products.filter(p =>
      (!q || p.name.toLowerCase().includes(q)) &&
      (!this.category || p.category === this.category)
    );
  });
}`,
    },

    { type: 'heading', text: 'Product Detail Page with input() routing' },
    {
      type: 'code',
      code: `// app.config.ts — enable withComponentInputBinding()
providers: [provideRouter(routes, withComponentInputBinding())]

// product-detail.component.ts
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    @if (productResource.value(); as p) {
      <nav class="breadcrumb">
        <a routerLink="/products">Products</a> / {{ p.name }}
      </nav>
      <div class="detail-layout">
        <img [ngSrc]="p.imageUrl" width="500" height="500" priority [alt]="p.name" />
        <div class="info">
          <h1>{{ p.name }}</h1>
          <p class="price">{{ p.price | currency }}</p>
          <p>{{ p.description }}</p>
          <button (click)="addToCart(p)">
            Add to Cart ({{ cart.itemCount() }})
          </button>
        </div>
      </div>
    }
  \`
})
export class ProductDetailComponent {
  id   = input.required<string>();  // auto-bound from route param
  cart = inject(CartService);

  productResource = httpResource<Product>(
    () => \`/api/products/\${this.id()}\`
  );

  addToCart(product: Product): void {
    this.cart.add(product);
  }
}`,
    },
    {
      type: 'qa',
      question: 'How does cartNotEmptyGuard work and what is its purpose?',
      answer: 'It prevents the user from reaching /checkout when the cart is empty. It uses CartService.isEmpty() to check. If the cart is empty, it redirects to /products with a query param indicating why.',
    },
    {
      type: 'qa',
      question: 'Why use httpResource() instead of ngOnInit on the product detail page?',
      answer: 'httpResource() automatically reloads when this.id() changes — useful if the user navigates from one product to another without leaving the page. With ngOnInit, only the first request fires unless you manually subscribe to route params changes.',
    },
  ],
};
