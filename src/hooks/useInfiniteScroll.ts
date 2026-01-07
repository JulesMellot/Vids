import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollOptions {
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
    threshold?: number;
}

export const useInfiniteScroll = ({
    onLoadMore,
    hasMore,
    isLoading,
    threshold = 0.5,
}: UseInfiniteScrollOptions) => {
    const { ref, inView } = useInView({
        threshold,
    });

    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            onLoadMore();
        }
    }, [inView, hasMore, isLoading, onLoadMore]);

    return { ref };
};

export default useInfiniteScroll;
