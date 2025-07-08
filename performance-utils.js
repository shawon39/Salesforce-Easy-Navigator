// Performance Utilities for Salesforce Easy Navigator
// Provides debouncing, caching, lazy loading, and other optimizations

class PerformanceUtils {
    constructor() {
        this.cache = new Map();
        this.debounceTimers = new Map();
        this.observers = new Map();
        this.performanceMetrics = {
            startTime: performance.now(),
            domReady: null,
            firstPaint: null,
            interactions: 0
        };
        this.initializePerformanceTracking();
    }

    // Initialize performance tracking
    initializePerformanceTracking() {
        // Track DOM ready time
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.performanceMetrics.domReady = performance.now() - this.performanceMetrics.startTime;
                this.logPerformanceMetric('DOM Ready', this.performanceMetrics.domReady);
            });
        } else {
            this.performanceMetrics.domReady = performance.now() - this.performanceMetrics.startTime;
        }

        // Track first paint
        if ('performance' in window && 'getEntriesByType' in performance) {
            setTimeout(() => {
                const paintEntries = performance.getEntriesByType('paint');
                const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
                if (firstPaint) {
                    this.performanceMetrics.firstPaint = firstPaint.startTime;
                    this.logPerformanceMetric('First Paint', firstPaint.startTime);
                }
            }, 0);
        }

        // Track user interactions
        ['click', 'keydown', 'scroll'].forEach(event => {
            document.addEventListener(event, () => {
                this.performanceMetrics.interactions++;
            }, { passive: true });
        });
    }

    // Debounce function calls to improve performance
    debounce(key, func, delay = 300) {
        return (...args) => {
            // Clear existing timer
            if (this.debounceTimers.has(key)) {
                clearTimeout(this.debounceTimers.get(key));
            }

            // Set new timer
            const timer = setTimeout(() => {
                func.apply(this, args);
                this.debounceTimers.delete(key);
            }, delay);

            this.debounceTimers.set(key, timer);
        };
    }

    // Throttle function calls
    throttle(key, func, delay = 100) {
        let lastCall = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }

    // Cache management
    setCache(key, value, ttl = 5 * 60 * 1000) { // 5 minutes default TTL
        this.cache.set(key, {
            value,
            timestamp: Date.now(),
            ttl
        });
    }

    getCache(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        const now = Date.now();
        if (now - cached.timestamp > cached.ttl) {
            this.cache.delete(key);
            return null;
        }

        return cached.value;
    }

    clearCache(key) {
        if (key) {
            this.cache.delete(key);
        } else {
            this.cache.clear();
        }
    }

    // Lazy load components
    lazyLoad(selector, callback) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        elements.forEach(element => observer.observe(element));
        this.observers.set(selector, observer);
    }

    // Optimize DOM operations with document fragments
    createDocumentFragment(htmlString) {
        const template = document.createElement('template');
        template.innerHTML = htmlString.trim();
        return template.content;
    }

    // Batch DOM updates
    batchDOMUpdates(updates) {
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                updates.forEach(update => {
                    if (typeof update === 'function') {
                        update();
                    }
                });
                resolve();
            });
        });
    }

    // Optimize scroll handlers
    optimizeScrollHandler(element, handler) {
        let ticking = false;
        
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handler();
                    ticking = false;
                });
                ticking = true;
            }
        };

        element.addEventListener('scroll', scrollHandler, { passive: true });
        return scrollHandler;
    }

    // Memory cleanup
    cleanup() {
        // Clear timers
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.debounceTimers.clear();

        // Clear cache
        this.cache.clear();

        // Disconnect observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }

    // Log performance metrics
    logPerformanceMetric(name, value) {
        if (console && console.log) {
            console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`);
        }
    }

    // Get performance report
    getPerformanceReport() {
        const report = {
            ...this.performanceMetrics,
            cacheSize: this.cache.size,
            activeObservers: this.observers.size,
            activeTimers: this.debounceTimers.size,
            memoryUsage: null
        };

        // Add memory usage if available
        if ('memory' in performance) {
            report.memoryUsage = {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            };
        }

        return report;
    }

    // Optimize images
    optimizeImages(container) {
        const images = container.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" if not already present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Add error handling
            img.addEventListener('error', () => {
                img.style.display = 'none';
            });
        });
    }

    // Preload critical resources
    preloadResource(url, type = 'script') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = type;
        document.head.appendChild(link);
    }

    // Optimize CSS animations
    optimizeAnimations(element) {
        element.style.willChange = 'transform, opacity';
        element.addEventListener('animationend', () => {
            element.style.willChange = 'auto';
        });
    }

    // Virtual scrolling for large lists
    createVirtualScroll(container, items, renderItem, itemHeight = 50) {
        const scrollContainer = document.createElement('div');
        scrollContainer.style.height = '200px';
        scrollContainer.style.overflow = 'auto';
        
        const contentContainer = document.createElement('div');
        contentContainer.style.height = `${items.length * itemHeight}px`;
        contentContainer.style.position = 'relative';
        
        scrollContainer.appendChild(contentContainer);
        container.appendChild(scrollContainer);

        const renderVisibleItems = () => {
            const scrollTop = scrollContainer.scrollTop;
            const containerHeight = scrollContainer.clientHeight;
            
            const startIndex = Math.floor(scrollTop / itemHeight);
            const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight) + 1, items.length);
            
            // Clear existing items
            contentContainer.innerHTML = '';
            
            // Render visible items
            for (let i = startIndex; i < endIndex; i++) {
                const item = renderItem(items[i], i);
                item.style.position = 'absolute';
                item.style.top = `${i * itemHeight}px`;
                item.style.height = `${itemHeight}px`;
                contentContainer.appendChild(item);
            }
        };

        this.optimizeScrollHandler(scrollContainer, renderVisibleItems);
        renderVisibleItems(); // Initial render
    }

    // Resource pooling for frequently created objects
    createObjectPool(createFn, resetFn, initialSize = 10) {
        const pool = [];
        
        // Pre-populate pool
        for (let i = 0; i < initialSize; i++) {
            pool.push(createFn());
        }

        return {
            get: () => {
                if (pool.length > 0) {
                    return pool.pop();
                }
                return createFn();
            },
            
            release: (obj) => {
                resetFn(obj);
                pool.push(obj);
            },
            
            clear: () => {
                pool.length = 0;
            }
        };
    }

    // Measure execution time
    measureExecutionTime(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        this.logPerformanceMetric(name, end - start);
        return result;
    }

    // Optimize event listeners
    optimizeEventListeners(element, events) {
        const controller = new AbortController();
        const signal = controller.signal;

        events.forEach(({ event, handler, options = {} }) => {
            element.addEventListener(event, handler, { 
                ...options, 
                signal,
                passive: true
            });
        });

        return () => controller.abort();
    }

    // Compress and decompress data for storage
    compressData(data) {
        try {
            return JSON.stringify(data);
        } catch (e) {
            console.error('Compression error:', e);
            return null;
        }
    }

    decompressData(compressedData) {
        try {
            return JSON.parse(compressedData);
        } catch (e) {
            console.error('Decompression error:', e);
            return null;
        }
    }

    // Optimize storage operations
    optimizeStorage(key, data, compress = true) {
        const finalData = compress ? this.compressData(data) : data;
        return chrome.storage.local.set({ [key]: finalData });
    }

    // Get optimized storage
    getOptimizedStorage(key, decompress = true) {
        return new Promise((resolve) => {
            chrome.storage.local.get([key], (result) => {
                const data = result[key];
                if (data && decompress) {
                    resolve(this.decompressData(data));
                } else {
                    resolve(data);
                }
            });
        });
    }
}

// Global performance utils instance
window.performanceUtils = new PerformanceUtils();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceUtils;
} 