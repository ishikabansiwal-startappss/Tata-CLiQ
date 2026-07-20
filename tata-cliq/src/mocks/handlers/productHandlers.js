import { http, HttpResponse } from 'msw';
import { products, categories, brands, reviews, heroBanners, promotionBanners } from '../data/products';

export const productHandlers = [
  // Get all products with optional filters
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const brand = url.searchParams.get('brand');
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');
    const rating = url.searchParams.get('rating');
    const sort = url.searchParams.get('sort');
    const search = url.searchParams.get('search');
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 12;
    const featured = url.searchParams.get('featured');
    const isNew = url.searchParams.get('isNew');

    let filtered = [...products];

    if (category) {
      filtered = filtered.filter((p) => p.categorySlug === category);
    }
    if (brand) {
      filtered = filtered.filter((p) => p.brandSlug === brand);
    }
    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseInt(maxPrice));
    }
    if (rating) {
      filtered = filtered.filter((p) => p.rating >= parseFloat(rating));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (featured === 'true') {
      filtered = filtered.filter((p) => p.isFeatured);
    }
    if (isNew === 'true') {
      filtered = filtered.filter((p) => p.isNew);
    }

    // Sorting
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sort === 'discount') filtered.sort((a, b) => b.discount - a.discount);
    else if (sort === 'newest') filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    else if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return HttpResponse.json({
      products: paginated,
      pagination: { page, limit, total, totalPages },
    });
  }),

  // Get single product
  http.get('/api/products/:id', ({ params }) => {
    const product = products.find((p) => p.id === parseInt(params.id));
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }
    const productReviews = reviews.filter((r) => r.productId === product.id);
    return HttpResponse.json({ product, reviews: productReviews });
  }),

  // Get all categories
  http.get('/api/categories', () => {
    return HttpResponse.json({ categories });
  }),

  // Get all brands
  http.get('/api/brands', () => {
    return HttpResponse.json({ brands });
  }),

  // Get hero banners
  http.get('/api/banners/hero', () => {
    return HttpResponse.json({ banners: heroBanners });
  }),

  // Get promotional banners
  http.get('/api/banners/promotions', () => {
    return HttpResponse.json({ banners: promotionBanners });
  }),

  // Search suggestions
  http.get('/api/search/suggestions', ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.toLowerCase() || '';
    if (!q) return HttpResponse.json({ suggestions: [] });

    const suggestions = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map((p) => ({ id: p.id, name: p.name, image: p.images[0], price: p.price }));

    return HttpResponse.json({ suggestions });
  }),
];