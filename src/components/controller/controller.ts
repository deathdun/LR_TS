import AppLoader from './appLoader';
import type { ArticlesResponse, SourcesResponse } from '../types/api'

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: ArticlesResponse) => void): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement | null;

        if (!newsContainer) return;

        while (target && target !== newsContainer) {
            if (target.classList && target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') ?? '';
                if (sourceId) {
                    super.getResp<ArticlesResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                q: '',
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;