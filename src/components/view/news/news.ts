import './news.css';
import type { NewsArticle } from '../../types/api';

class News {
    draw(data: NewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItemEl = (newsClone.querySelector('.news__item') as HTMLElement | null);
            if (newsItemEl && idx % 2) newsItemEl.classList.add('alt');

            const photoEl = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            if (photoEl) photoEl.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const titleEl = newsClone.querySelector('.news__description-title') as HTMLElement | null;
            if (titleEl) titleEl.textContent = item.title;

            const sourceEl = newsClone.querySelector('.news__description-source') as HTMLElement | null;
            if (sourceEl) sourceEl.textContent = item.source.name;

            const contentEl = newsClone.querySelector('.news__description-content') as HTMLElement | null;
            if (contentEl) contentEl.textContent = item.description ?? '';

            const readMoreEl = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement | null;
            if (readMoreEl) readMoreEl.setAttribute('href', item.url);

            fragment.appendChild(newsClone);
        });

        const newsContainer = document.querySelector('.news') as HTMLElement | null;
        if (!newsContainer) return;
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;