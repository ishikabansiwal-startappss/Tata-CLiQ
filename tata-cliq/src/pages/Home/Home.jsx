import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHeroBanners, usePromotionBanners, useCategories, useFeaturedProducts, useNewArrivals } from '../../hooks/useProducts';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import { ProductCardSkeleton } from '../../components/common/Skeleton/Skeleton';
import './Home.scss';

const Home = React.memo(() => {
  const navigate = useNavigate();
  const { data: heroData, isLoading: heroLoading } = useHeroBanners();
  const { data: promoData } = usePromotionBanners();
  const { data: categoriesData } = useCategories();
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedProducts();
  const { data: newArrivalsData, isLoading: newArrivalsLoading } = useNewArrivals();

  const banners = heroData?.banners || [];
  const promotions = promoData?.banners || [];
  const categories = categoriesData?.categories || [];
  const featured = featuredData?.products || [];
  const newArrivals = newArrivalsData?.products || [];

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero">
        {heroLoading ? (
          <div className="hero__skeleton" />
        ) : (
          <div className="hero__slider">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`hero__slide ${index === 0 ? 'active' : ''}`}
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <div className="hero__overlay" />
                <div className="container hero__content">
                  <span className="hero__subtitle">{banner.subtitle}</span>
                  <h1 className="hero__title">{banner.title}</h1>
                  <p className="hero__description">{banner.description}</p>
                  <Link to={banner.link} className="hero__cta">
                    {banner.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="section categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories__grid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="categories__card"
              >
                <div className="categories__image-wrapper">
                  <img src={cat.image} alt={cat.name} className="categories__image" loading="lazy" />
                </div>
                <span className="categories__name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured">
        <div className="container">
          <h2 className="section-title">Featured Collection</h2>
          <div className="featured__grid">
            {featuredLoading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : featured.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
          <div className="featured__cta">
            <Link to="/products?featured=true" className="featured__cta-btn">
              View All Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="section promotions">
        <div className="container">
          <div className="promotions__grid">
            {promotions.slice(0, 3).map((promo) => (
              <Link
                key={promo.id}
                to={promo.link}
                className="promotions__card"
                style={{ backgroundImage: `url(${promo.image})` }}
              >
                <div className="promotions__overlay" />
                <div className="promotions__content">
                  <h3 className="promotions__title">{promo.title}</h3>
                  <span className="promotions__subtitle">{promo.subtitle}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section new-arrivals">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <div className="new-arrivals__grid">
            {newArrivalsLoading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
          <div className="featured__cta">
            <Link to="/products?sort=newest" className="featured__cta-btn">
              Discover More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

Home.displayName = 'Home';
export default Home;