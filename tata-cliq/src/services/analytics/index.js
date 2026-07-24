import ReactGA from "react-ga4";

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isInitialized = false;

export const initializeAnalytics = () => {
  if (!measurementId || isInitialized) return;
  ReactGA.initialize(measurementId);
  isInitialized = true;
};

// ─── Page & Navigation ───

export const trackPageView = (path, title) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
    title: title || document.title,
  });
};

// ─── Ecommerce: Product List ───

export const trackViewItemList = (items, listName = "All Products") => {
  if (!items?.length) return;
  ReactGA.event("view_item_list", {
    item_list_name: listName,
    items: items.map((p) => buildItem(p)),
  });
};

export const trackSelectItem = (product, listName = "All Products") => {
  ReactGA.event("select_item", {
    item_list_name: listName,
    items: [buildItem(product)],
  });
};

// ─── Ecommerce: Product Detail ───

export const trackViewItem = (product) => {
  ReactGA.event("view_item", {
    currency: "INR",
    value: product.price,
    value:product.name,
    value:product.id,
    items: [buildItem(product)],
  });
};

// ─── Ecommerce: Cart ───

export const trackAddToCart = (product, quantity = 1) => {
  ReactGA.event("add_to_cart", {
    currency: "INR",
    value: product.price * quantity,
    value:product.name,
    value:product.id,
    items: [buildItem(product, quantity)],
  });
};

export const trackRemoveFromCart = (product) => {
  ReactGA.event("remove_from_cart", {
    currency: "INR",
    value: product.price,
    value:product.name,
    value:product.id,
    items: [buildItem(product)],
  });
};

export const trackViewCart = (items, total) => {
  ReactGA.event("view_cart", {
    currency: "INR",
    value: total,
    items: items.map((i) => buildItem(i, i.quantity)),
  });
};

// ─── Ecommerce: Checkout ───

export const trackBeginCheckout = (items, total) => {
  ReactGA.event("begin_checkout", {
    currency: "INR",
    value: total,
    items: items.map((i) => buildItem(i, i.quantity)),
  });
};

export const trackAddShippingInfo = (items, total, shippingTier = "standard") => {
  ReactGA.event("add_shipping_info", {
    currency: "INR",
    value: total,
    shipping_tier: shippingTier,
    items: items.map((i) => buildItem(i, i.quantity)),
  });
};

export const trackAddPaymentInfo = (items, total, paymentType = "cod") => {
  ReactGA.event("add_payment_info", {
    currency: "INR",
    value: total,
    payment_type: paymentType,
    items: items.map((i) => buildItem(i, i.quantity)),
  });
};

export const trackPurchase = (items, total, transactionId) => {
  ReactGA.event("purchase", {
    transaction_id: transactionId,
    currency: "INR",
    value: total,
    items: items.map((i) => buildItem(i, i.quantity)),
  });
};

// ─── Ecommerce: Wishlist ───

export const trackAddToWishlist = (product) => {
  ReactGA.event("add_to_wishlist", {
    currency: "INR",
    value: product.price,
    items: [buildItem(product)],
  });
};

// ─── Search ───

export const trackSearch = (query, resultsCount) => {
  ReactGA.event("search", {
    search_term: query,
    search_results: resultsCount,
  });
};

// ─── Filtering & Sorting ───

export const trackViewItemListFilter = (filterType, filterValue) => {
  ReactGA.event("view_item_list", {
    item_list_name: `${filterType}: ${filterValue}`,
  });
};

export const trackFilter = (filterType, filterValue) => {
  ReactGA.event("filter", {
    filter_type: filterType,
    filter_value: filterValue,
  });
};

export const trackSort = (sortBy) => {
  ReactGA.event("sort", {
    sort_by: sortBy,
  });
};

// ─── User Engagement ───

export const trackLogin = (method = "email") => {
  ReactGA.event("login", { method });
};

export const trackSignUp = (method = "email") => {
  ReactGA.event("sign_up", { method });
};

export const trackEngagement = (action, label) => {
  ReactGA.event("engagement", {
    action,
    label,
  });
};

// ─── Error Tracking ───

export const trackError = (errorType, message) => {
  ReactGA.event("exception", {
    description: `${errorType}: ${message}`,
    fatal: false,
  });
};

// ─── Helper ───

function buildItem(product, quantity) {
  return {
    item_id: String(product.id),
    item_name: product.name,
    item_brand: product.brand || "",
    item_category: product.category || "",
    price: product.price,
    quantity: quantity || 1,
  };
}

export const buildProductItem = buildItem;