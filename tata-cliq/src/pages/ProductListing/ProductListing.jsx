import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts, useCategories, useBrands } from '../../hooks/useProducts';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import { ProductCardSkeleton } from '../../components/common/Skeleton/Skeleton';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import './ProductListing.scss';

const ProductListing = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const sort = searchParams.get('sort') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  const { data, isLoading } = useProducts({ category, brand, sort, minPrice, maxPrice, page, limit: 12 });
  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrands();

  const products = data?.products || [];
  const pagination = data?.pagination || {};
  const categories = categoriesData?.categories || [];
  const brands = brandsData?.brands || [];

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.set('page', '1');
    setSearchParams(params);
  };

  const sortOptions = [
    { value: '', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'discount', label: 'Biggest Discount' },
    { value: 'newest', label: 'Newest First' },
    { value: 'name', label: 'Name A-Z' },
  ];

  return (
    <div className="product-listing">
      <div className="container">
        <div className="product-listing__header">
          <h1 className="product-listing__title">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
          </h1>
          <div className="product-listing__controls">
            <select
              value={sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="product-listing__sort"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              className="product-listing__filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </button>
          </div>
        </div>

        <div className={`product-listing__layout ${showFilters ? 'filters-open' : ''}`}>
          <aside className="product-listing__filters">
            <div className="filter-section">
              <div className="filter-section__header">
                <h4>Category</h4>
                {category && (
                  <button
                    className="filter-clear-btn"
                    onClick={() => updateFilter('category', '')}
                  >
                    Clear
                  </button>
                )}
              </div>
              {categories.map((cat) => (
                <label key={cat.id} className={`filter-checkbox ${category === cat.slug ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat.slug}
                    onChange={() => updateFilter('category', category === cat.slug ? '' : cat.slug)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
            <div className="filter-section">
              <div className="filter-section__header">
                <h4>Brand</h4>
                {brand && (
                  <button
                    className="filter-clear-btn"
                    onClick={() => updateFilter('brand', '')}
                  >
                    Clear
                  </button>
                )}
              </div>
              {brands.map((b) => (
                <label key={b.id} className={`filter-checkbox ${brand === b.slug ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="brand"
                    checked={brand === b.slug}
                    onChange={() => updateFilter('brand', brand === b.slug ? '' : b.slug)}
                  />
                  <span>{b.name}</span>
                </label>
              ))}
            </div>
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="filter-price">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => updateFilter('minPrice', e.target.value)}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
                />
              </div>
            </div>
          </aside>

          <div className="product-listing__content">
            {isLoading ? (
              <div className="product-listing__grid">
                {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                title="No products found"
                message="Try adjusting your filters or search criteria."
              />
            ) : (
              <>
                <div className="product-listing__grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {pagination.totalPages > 1 && (
                  <div className="pagination">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        className={`pagination__btn ${page === p ? 'active' : ''}`}
                        onClick={() => updateFilter('page', p.toString())}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProductListing.displayName = 'ProductListing';
export default ProductListing;