import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../services/db';
import { v4 as uuidv4 } from 'uuid';

export const useFolders = () => {
    const folders = useLiveQuery(() => db.folders.toArray());

    const createFolder = async (name: string, parentId: string | null = null) => {
        const id = uuidv4();
        await db.folders.add({
            id,
            name,
            parentId,
            color: '#7c7cf5',
            icon: 'folder',
            filters: {
                minDuration: null,
                maxDuration: null,
                minLikeRatio: null,
                maxAge: null,
            },
            homeEnabled: false,
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            syncStatus: 'pending',
        });
        return id;
    };

    const deleteFolder = async (id: string) => {
        await db.folders.delete(id);
        // Optionally move subscriptions back to root or other folder
        await db.subscriptions.where('folderId').equals(id).modify({ folderId: null });
    };

    const updateFolder = async (id: string, updates: any) => {
        await db.folders.update(id, {
            ...updates,
            updatedAt: new Date(),
            syncStatus: 'pending',
        });
    };

    return {
        folders,
        createFolder,
        deleteFolder,
        updateFolder,
    };
};

export default useFolders;
