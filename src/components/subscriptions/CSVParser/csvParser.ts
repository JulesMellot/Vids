export interface RawSubscription {
    channelId: string;
    channelUrl: string;
    channelTitle: string;
}

export const parseSubscriptionsCSV = (csvText: string): RawSubscription[] => {
    const lines = csvText.split('\n');
    const result: RawSubscription[] = [];

    // Skip header "Channel Id,Channel Url,Channel Title"
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = line.split(',');
        if (parts.length >= 3) {
            result.push({
                channelId: parts[0],
                channelUrl: parts[1],
                channelTitle: parts[2],
            });
        }
    }

    return result;
};
