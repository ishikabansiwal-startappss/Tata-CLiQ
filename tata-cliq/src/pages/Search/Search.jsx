import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import { ProductCardSkeleton } from '../../components/common/Skeleton/Skeleton';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { trackSearch, trackEngagement } from '../../services/analytics';
import './Search.scss';

const Search = React.memo(() => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const trackedSearch = useRef(false);

  const { data, isLoading } = useProducts({ search: query, limit: 20 });
  const products = data?.products || [];

  useEffect(() => {
    if (query && !trackedSearch.current) {
      trackedSearch.current = true;
      trackSearch(query, products.length);
    }
  }, [query, products.length]);

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-page__header">
          <h1>Search Results</h1>
          {query && <p className="search-page__query">Showing results for "{query}"</p>}
        </div>

        {isLoading ? (
          <div className="search-page__grid">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="No results found"
            message={`We couldn't find any products matching "${query}". Try using different keywords.`}
          />
        ) : (
          <>
            <p className="search-page__count">{products.length} products found</p>
            <div className="search-page__grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
});

Search.displayName = 'Search';
export default Search;